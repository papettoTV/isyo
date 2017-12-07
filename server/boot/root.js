'use strict';

var path    = require("path");
var Hashids = require('hashids');
var hashids = new Hashids('', 10);
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  // router.get('/', server.loopback.status());
  router.get('/', function (req, res) {
    console.log("get /",res.req.user);

    var schema = req.headers["x-forwarded-proto"];
    var url = schema + '://' + req.headers.host + req.url;
    var app_id = process.env.clientID;
    var ogp_image_url = schema + '://' + req.headers.host + "/img/isyo-ogp.png";
    res.render("index",{url:url,app_id:app_id,ogp_image_url:ogp_image_url});
  });

  router.get('/logon', ensureLoggedIn('/notlogon'), function (req, res) {
    // console.log("/logon",res.req);
    console.log("/logon",res.req.user);

    var userId = res.req.user.id;

	  res.json({'userId':userId});
  });

  router.get('/notlogon', function (req, res) {
	  res.json({'userId':null});
  });

  // save isyo
  server.post('/save', ensureLoggedIn('/notlogon'), function (req, res) {

    console.log("post /save",res.req.user);
    console.log(req.body);
    // console.log(res);

    // load isyo model
    var isyo = server.models.isyo;
    var isyoHash = req.body.isyoId || "";
    var userId = res.req.user.id;

    var save_data = req.body;

    var json={
      "res":true,
      "data":save_data
    };
    // Error: No default engine was specified and no extension was provided.
    // res.render('save');

    // 更新
    if(isyoHash != ""){
      save_data.hash = isyoHash;

      // isyo.findById(isyoId,function(err,obj){
      isyo.find({"where":{"hash":isyoHash}},function(err,_obj){
        console.log("findByHash",err,_obj);
        var obj = _obj[0];
        obj.body = save_data.body;
        obj.userId = userId;
        isyo.upsert(obj,function(err,_obj){
          console.log("isyo.upsert",err,_obj);
          res.json(json);
        });
    });
    // 新規登録
    }else{
      // save data & add uniq ID
      console.log("save_data",save_data);
      save_data.userId = userId;
      isyo.create(save_data,function(err,obj){
        console.log("isyo.insert");
        console.log(obj);

        json.id=obj.id;
        // var hash = hashids.encode(obj.id);
        var hash = hashids.encodeHex(obj.id);
        // console.log(obj);
        console.log("hash",hash);
        // update
        obj.updateAttributes({hash:hash}, function(err, obj) {
          console.log("update");
          console.log(err);
          // response
          json.data.hash = hash;
          json.new = 1;
          res.json(json);
        });
      });
    }

  });


  router.get('/show/:isyoHash', function (req, res) {
    var newflg = null;
    show(req,res,server,newflg);
  });
  router.get('/show/:isyoHash/:newflg', function (req, res) {
    var newflg = req.params.newflg;
    show(req,res,server,newflg);
  }); // router.get


  router.get('/authredirect', function (req, res) {
    var userId = res.req.user.id;

    server.models.isyo.find({"where":{"userId":userId}},function(err,obj){
      console.log("/authredirect",obj);
      if(obj.length  > 0){
        // res.redirect("/show/"+obj[0].id);
        // res.redirect("/#/show/"+obj[0].hash);
        res.redirect("/show/"+obj[0].hash);
      }else{
        res.redirect("/#/input");
      }
    });

  });

  // router.get('/pay/', function (req, res) {
  // server.get('/pay', function (req, res) {
  server.post('/pay', function (req, res) {
    // server.post('/pay', ensureLoggedIn('/notlogon'), function (req, res) {

    console.log("/pay request",req.body);
    var post_data = req.body;

    // stripe info
    var stripe = require('stripe')(process.env.STRIPE_API_KEY);
    var userDataId = "cus_BqVAMhKUnuPJaZ";
    var userData = {id: userDataId, email: 'customer@example.com'};

    // var userId = res.req.user.id;
    var userId = "59dd62bbb2372ff96cd1ed1c";
    var isyoId = "59e4d12a906d420e4221d86c";

    var stripeCustomers;
    if(userData.id){
      stripeCustomers = stripe.customers.retrieve(userData.id);
    }else{
      stripeCustomers = stripe.customers.create({email:userData.email});
    }

    var obj={
      amount:1000,
      userId:userId,
      isyoId:isyoId
    };
    var payment = server.models.payment;
    payment.upsert(obj,function(err,obj){
      console.log("isyo.upsert",err,obj);
    });
    // return;

    // Create a new customer and then a new charge for that customer:
    // stripe.customers.create({
    // stripe.customers.retrieve(userData.id).then(function(err,customer){
    stripeCustomers.then(function(customer){
      console.log("then customer",customer.id,customer.email);
      return stripe.customers.createSource(customer.id, {
        // source: 'tok_visa'
        source: {
          "customer": userDataId,
          "object": "card",
          "exp_month": post_data.expiry_month,
          "exp_year": "20" + post_data.expiry_year,
          "number": post_data.number,
          "cvc":post_data.cvc,
          "currency":"jpy",
          "default_for_currency":true,
        }
      });
    }).then(function(source) {
      console.log("then createSource",source);
      return stripe.charges.create({
        amount: 1000,
        currency: 'jpy',
        customer: source.customer
      });
    }).then(function(charge) {
      console.log("then charge",charge);
      // New charge created on a new customer
      var payment = server.models.payment;
      console.log("payment",payment);
      var obj={
        amount:1000,
        userId:userId,
        isyoId:isyoId,
        updated:new Date(),
      };
      payment.upsert(obj,function(err,_obj){
        console.log("isyo.upsert",err,_obj);
        var json = {
          charge : charge,
          payment : _obj,
        };

        res.json(json);
      });

    }).catch(function(err) {
      if(err){
        console.log("/pay error",err);

        var json = {
          error : err.raw
        };

        res.json(json);
      }
    });

  });

  server.use(router);


  function show(req,res,server,newflg){

    // console.log(req);
    // console.log("res=",res);
    // console.log(res.req.user);

    var schema = req.headers["x-forwarded-proto"];
    // console.log("schema=",schema);

    var isyoHash = req.params.isyoHash;
    var userId = null;
    if(res.req.user){
      userId = res.req.user.id || null;
    }
    var url = schema + '://' + req.headers.host + req.url;
    var app_id = process.env.clientID;
    var ogp_image_url = schema + '://' + req.headers.host + "/img/isyo-ogp-fb.png";

    console.log(url);
    console.log("view=isyodetail",isyoHash,userId);

    server.models.isyo.find({"where":{"hash":isyoHash}},function(err,isyo){
      if(err){
        console.log("err occur",err);
        res.redirect("/");
        return;
      }

      console.log("isyo.find",isyo);

      // 執筆者のプロファイル情報取得
      // TODO isyo.find と同時にqueryする
      server.models.userIdentity.find({"where":{"userId":isyo[0].userId}},function(err,userIdentity){
        console.log("userIdentity",userIdentity);

        if(err){
          console.log("err occur",err);
          res.redirect("/");
          return;
        }

        // 他人の記事を見ようとした場合
        if(String(isyo[0].userId) != userId){
          console.log("isyo not yours",isyo[0].userId,userId);
          res.render("hide",{url:url,app_id:app_id,profile:userIdentity[0].profile,ogp_image_url:ogp_image_url});
          return;
        }

        // 自身の記事の場合
        var body_html = "";
        var _isyo = isyo[0];

        var message_arr = _isyo.body.split("\n");
        console.log(message_arr);
        message_arr.forEach(function(_mes){
          if(_mes.length > 0){
            body_html += "<p>" + _mes + "</p>";
          }else{
            body_html += "<p>&nbsp;</p>";
          }
        });
        res.render('show',{body:body_html,isyoHash:_isyo.hash,url:url,app_id:app_id,ogp_image_url:ogp_image_url,newflg:newflg});
      }); // userIdentity.find

    }); // isyo.find
  }

};

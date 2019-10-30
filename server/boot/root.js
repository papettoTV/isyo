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
<<<<<<< HEAD
    var isyoId = req.body.isyoId || "";
=======
    var isyoHash = req.body.isyoId || "";
>>>>>>> 7a6413c41940a75409f09aa784a96c3c7ebd5153
    var userId = res.req.user.id;

    var save_data = req.body;

    var json={
      "res":true,
      "data":save_data
    };
    // Error: No default engine was specified and no extension was provided.
    // res.render('save');

<<<<<<< HEAD
    if(isyoId != ""){
      save_data.id = isyoId;

      isyo.findById(isyoId,function(err,obj){
        console.log("findById",err,obj);
        obj.body = save_data.body;
        obj.userId = userId;
        isyo.upsert(obj,function(err,obj){
          console.log("isyo.upsert",err,obj);
          json.id=obj.id;
          res.json(json);
        });
    });
=======
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
>>>>>>> 7a6413c41940a75409f09aa784a96c3c7ebd5153
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
<<<<<<< HEAD
=======
          json.data.hash = hash;
          json.new = 1;
>>>>>>> 7a6413c41940a75409f09aa784a96c3c7ebd5153
          res.json(json);
        });
      });
    }

  });


<<<<<<< HEAD
  router.get('/show/:isyoid', function (req, res) {
  // router.get('/show/:isyoid', ensureLoggedIn('/'), function (req, res) {
    // console.log(req);
    // console.log(res.req.user);

    var isyoId = req.params.isyoid;
=======
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

  server.use(router);


  function show(req,res,server,newflg){

    // console.log(req);
    // console.log("res=",res);
    // console.log(res.req.user);

    var schema = req.headers["x-forwarded-proto"];
    // console.log("schema=",schema);

    var isyoHash = req.params.isyoHash;
>>>>>>> 7a6413c41940a75409f09aa784a96c3c7ebd5153
    var userId = null;
    if(res.req.user){
      userId = res.req.user.id || null;
    }
<<<<<<< HEAD
    var url = req.protocol + '://' + req.headers.host + req.url;

    console.log(url);
	  console.log("view=isyodetail",isyoId,userId);

    server.models.isyo.find({"where":{"id":isyoId}},function(err,isyo){
=======
    var url = schema + '://' + req.headers.host + req.url;
    var app_id = process.env.clientID;
    var ogp_image_url = schema + '://' + req.headers.host + "/img/isyo-ogp-fb.png";

    console.log(url);
    console.log("view=isyodetail",isyoHash,userId);

    server.models.isyo.find({"where":{"hash":isyoHash}},function(err,isyo){
>>>>>>> 7a6413c41940a75409f09aa784a96c3c7ebd5153
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
<<<<<<< HEAD
          res.render("hide",{url:url,profile:userIdentity[0].profile});
=======
          res.render("hide",{url:url,app_id:app_id,profile:userIdentity[0].profile,ogp_image_url:ogp_image_url});
>>>>>>> 7a6413c41940a75409f09aa784a96c3c7ebd5153
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
<<<<<<< HEAD
        res.render('show',{body:body_html,isyoId:_isyo.id,url:url});
      }); // userIdentity.find

    }); // isyo.find
  }); // router.get


  router.get('/authredirect', function (req, res) {
    var userId = res.req.user.id;

    server.models.isyo.find({"where":{"userId":userId}},function(err,obj){
      console.log("/authredirect",obj);
      if(obj.length  > 0){
        res.redirect("/show/"+obj[0].id);
      }else{
        res.redirect("/#/input");
      }
    });

  });

  server.use(router);
=======
        res.render('show',{body:body_html,isyoHash:_isyo.hash,url:url,app_id:app_id,ogp_image_url:ogp_image_url,newflg:newflg});
      }); // userIdentity.find

    }); // isyo.find
  }

>>>>>>> 7a6413c41940a75409f09aa784a96c3c7ebd5153
};

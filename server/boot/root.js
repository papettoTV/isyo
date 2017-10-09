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

	  res.sendFile(path.join(__dirname+'/../../client/public/index.html'));
  });

  router.get('/my', ensureLoggedIn('/notlogon'), function (req, res) {
	  res.sendFile(path.join(__dirname+'/../../client/public/my.html'));
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
    var isyoId = req.body.isyoId || "";
    var userId = res.req.user.id;

    var save_data = req.body;

    var json={
      "res":true,
      "data":save_data
    };
    // Error: No default engine was specified and no extension was provided.
    // res.render('save');

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
          res.json(json);
        });
      });
    }

  });


  router.get('/show/:isyoid', function (req, res) {
  // router.get('/show/:isyoid', ensureLoggedIn('/'), function (req, res) {
    // console.log(req);
    // console.log(res.req.user);

    var isyoId = req.params.isyoid;
    var userId = null;
    if(res.req.user){
      userId = res.req.user.id || null;
    }
    var url = req.protocol + '://' + req.headers.host + req.url;

    console.log(url);
	  console.log("view=isyodetail",isyoId,userId);

    server.models.isyo.find({"where":{"id":isyoId}},function(err,isyo){
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
          res.render("hide",{url:url,profile:userIdentity[0].profile});
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
};

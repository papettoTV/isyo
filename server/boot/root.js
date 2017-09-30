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


  // router.get('/isyo/:isyoid', function (req, res) {
  router.get('/show/:isyoid', ensureLoggedIn('/'), function (req, res) {

    var isyoId = req.params.isyoid;
    var userId = res.req.user.id;

	  console.log("view=isyodetail",isyoId,userId);

    server.models.isyo.find({"where":{"id":isyoId,"userId":userId}},function(err,obj){
      if(err){
        console.log("err occur",err);
        res.redirect("/");
      }else{

        console.log("isyo.find",obj);
        if(obj.length==0){
          console.log("isyo not find");
          res.redirect("/");
          return;
        }
        var body_html = "";
        var isyo = obj[0];

        var message_arr = isyo.body.split("\n");
        console.log(message_arr);
        message_arr.forEach(function(_mes){
          if(_mes.length > 0){
            body_html += "<p>" + _mes + "</p>";
          }else{
            body_html += "<p>&nbsp;</p>";
          }
        })
      }
      res.render('show',{body:body_html,isyoId:isyo.id});
    });
  });


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

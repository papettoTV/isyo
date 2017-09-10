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
  router.get('/top', function (req, res) {
	  console.log("view=top");

    var isyo = server.models.isyo;
    // isyo.status(function(a,b){
    //   console.log("Isyo.status");
    //   console.log(a,b);
    // });

	  // res.sendFile(path.join(__dirname+'/../../client/public/index.html'));
	  res.render('show');
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
  server.post('/save', function (req, res) {

    console.log("post /save",res.req.user);
    console.log(req.body);
    // console.log(res);

    // load isyo model
    var isyo = server.models.isyo;

    var save_data = req.body;

    var json={
      "res":true,
      "data":save_data
    };
        // Error: No default engine was specified and no extension was provided.
        // res.render('save');

    // save data & add uniq ID
    isyo.create(save_data,function(err,obj){
      console.log("isyo.create");
      console.log(obj);
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
  });


  // router.get('/isyo/:isyoid', function (req, res) {
  router.get('/isyo/:isyoid', ensureLoggedIn('/'), function (req, res) {

    var isyoid = req.params.isyoid;

	  console.log("view=isyodetail",isyoid);

	  // res.sendFile(path.join(__dirname+'/../../client/public/index.html'));
	  res.render('show');
  });

  server.use(router);
};

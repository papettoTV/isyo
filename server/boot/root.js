'use strict';

var path    = require("path");
var Hashids = require('hashids');
var hashids = new Hashids('', 10);

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  // router.get('/', server.loopback.status());
  router.get('/top', function (req, res) {
	  console.log("view=top");

    var isyo = server.models.isyo;
    isyo.status(function(a,b){
      console.log("Isyo.status");
      console.log(a,b);
    });

	  res.sendFile(path.join(__dirname+'/../../client/public/index.html'));
  });
  // router.get('/:view', function (req, res) {
	 //  console.log("view=",req.params.view);
	 //  res.sendFile(path.join(__dirname+'/../../client/public/save.html'));
  // });

  // save isyo
  server.post('/save', function (req, res) {

    console.log("post /save");
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
        res.json(json);

    // // save data & add uniq ID
    // // isyo.save(save_data,function(data){
    // isyo.create(save_data,function(err,obj){
    //   console.log("create");
    //   console.log(obj);
    //   console.log(err);
    //   var id = obj.id;
    //   // make uniq hash key
    //   var hash = hashids.encode(id);
    //   // update 
    //   // isyo.update({id:id,hash:hash},function(err,obj){
    //   // console.log("create");
    //   // console.log(obj);
    //   // console.log(err);
    //     // response
    //     res.render('save');
    //   // });
    // });
  });

  server.use(router);
};

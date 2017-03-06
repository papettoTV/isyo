'use strict';

var path    = require("path");

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  // router.get('/', server.loopback.status());
  router.get('/top', function (req, res) {
	  console.log("view=top");
	  res.sendFile(path.join(__dirname+'/../../client/public/index.html'));
  });
  router.get('/:view', function (req, res) {
	  console.log("view=",req.params.view);
	  res.sendFile(path.join(__dirname+'/../../client/public/index.html'));
  });
  server.use(router);
};

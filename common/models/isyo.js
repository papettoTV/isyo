'use strict';

module.exports = function(Isyo) {
  Isyo.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    // var response;
    // if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
    //   response = 'We are open for business.';
    // } else {
    //   response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    // }
    var response = "saved";
    cb(null, response);
  };
  // Isyo.save = function(data,cb) {
  //   console.log("save");
  //   console.log(data);
  //   cb();
  // }
  // Isyo.update = function(data,cb) {
  //   console.log("update");
  //   console.log(data);
  //   cb();
  // }
  // Isyo.remoteMethod(
  //   'status', {
  //     http: {
  //       path: '/save',
  //       verb: 'post'
  //     },
  //     returns: {
  //       arg: 'status',
  //       type: 'object'
  //     }
  //   }
  // );

// remote method before hooks
  Isyo.beforeRemote('status', function(context, unused, next) {
    console.log('beforeRemote status');
    next();
  });
  Isyo.remoteMethod('save',{
    accepts: {arg: 'body', type: 'string'},
    returns: {arg: 'id', type: 'string'},
    http: {path: '/save', verb: 'post'}
  });
};

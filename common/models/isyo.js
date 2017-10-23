'use strict';

// function Isyo() {
module.exports = function Isyo(Isyo) {
  // this.ee = new EventEmitter();
  // this.id = id;
  // this.model = {flows:[]};
  // this.projectRecord = null;
  Isyo.get = function(userId,cb) {
  // Isyo.prototype.get = function(userId,cb) {
    Isyo.find({userId}, function(err, isyo) {
      console.log("isyo.js find",isyo);
      cb(isyo);
    });
  }

  // Isyo.prototype.getIsyo = function(userId,cb) {
  //   Isyo.find({userId}, function(err, isyo) {
  //     console.log("isyo.js find",isyo);
  //     cb(isyo);
  //   });
  // }

}

// module.exports = function(id) {
//     return new Isyo(id);
// }

// module.exports = function(id) {
//     return new Isyo(id);
// }

(function() {
  var EventEmitter, Oasys;
  EventEmitter = require('events').EventEmitter;
  Oasys = (function() {
    function Oasys() {
      this.util = require('./util');
    }
    return Oasys;
  })();
  Oasys.prototype.__proto__ = EventEmitter.prototype;
  Oasys.prototype.ready = function() {
    return this.emit('ready');
  };
  module.exports = new Oasys;
}).call(this);

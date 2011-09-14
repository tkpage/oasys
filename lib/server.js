(function() {
  var app, everyone, express, host, nowjs, oasys, port, stylus;
  module.exports = function() {};
  require.paths.unshift('./node_modules');
  express = require('express');
  stylus = require('stylus');
  nowjs = require('now');
  oasys = require('./lib/oasys');
  app = express.createServer();
  app.configure(function() {
    app.set('views', __dirname + '/view');
    app.set('view engine', 'jade');
    app.set('view options', {
      layout: false
    });
    app.set('view cache', false);
  });
  host = process.env.VCAP_APP_HOST || 'localhost';
  port = process.env.VMC_APP_PORT || 80;
  app.listen(port, host);
  app.get('/', function(req, res) {
    res.render('index.jade');
  });
  everyone = nowjs.initialize(app);
  everyone.now.distributeMessage = function(msgin) {
    oasys.util.getNetworkIP(everyone.now.receiveMessage);
  };
}).call(this);

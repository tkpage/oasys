// server
require.paths.unshift('./node_modules')
var host = process.env.VCAP_APP_HOST || 'localhost';
var port = process.env.VMC_APP_PORT || 80;
var html = require('fs').readFileSync(__dirname+'/index.html');
var server = require('http').createServer(function(req, res){res.end(html);});
	server.listen(port, host);


// database
var mongourl = "mongodb://";
if(process.env.VCAP_SERVICES){
  	var env = JSON.parse(process.env.VCAP_SERVICES);
  	var obj = env['mongodb-1.8'][0]['credentials'];
	mongourl += obj.username + ":" + obj.password + "@";
    mongourl += obj.hostname + ":" + obj.port;
	mongourl += "/" + obj.db;
}else{
	mongourl += 'localhost:27017/test';
}

var mongoose = require('mongoose');
mongoose.connect(mongourl);
mongoose.model('Chat', new mongoose.Schema({
	name	: {type: String},
	msg		: {type: String},
	date	: {type: Date, default: Date.now}
}));


// test
var oasys = require('./lib/oasys');
oasys.util.getNetworkIP(console.log);


// handlers
var nowjs = require('now');
var everyone = nowjs.initialize(server);

everyone.now.distributeMessage = function(message){
	var Chat = mongoose.model('Chat');
	var chat = new Chat();
	chat.name = this.now.name;
	chat.msg = message;
	chat.save();
	Chat.count({name:chat.name}, function(err, count){
		everyone.now.receiveMessage(chat.name, chat.msg, count);
	});	
};





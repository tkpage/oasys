// nodejs
require.paths.unshift('./node_modules')


// server
var html = require('fs').readFileSync(__dirname+'/index.html');
var server = require('http').createServer(function(req, res){res.end(html);});
if(process.env.VCAP_APP_HOST){
	var host = process.env.VCAP_APP_HOST;
	var port = process.env.VMC_APP_PORT;
	server.listen(port, host);
	console.log('Server is running at ' + host + ':' + port);
}else{
	var socket = require('net').createConnection(80, 'www.google.com');
	socket.on('connect', function(){
		var host = socket.address().address;
		var port = 80;
		server.listen(port, host);
		console.log('Server is running at ' + host + ':' + port);
	});
	socket.on('error', function(){
		var host = 'localhost';
		var port = 80;
		server.listen(port, host);
		//console.log('Server is running at ' + host + ':' + port);
	});
}


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


// handlers
var nowjs = require("now");
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





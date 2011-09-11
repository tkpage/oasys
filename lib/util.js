module.exports = {
	getNetworkIP: function(callback){
		var socket = require('net').createConnection(80, 'www.google.com');
		socket.on('connect', function(){
			callback(socket.address().address);
			socket.end();
		});
		socket.on('error', function(e){
			callback(undefined);
		});
	},
	
	getRandom: function(){
		return Math.random();
	}
	
};





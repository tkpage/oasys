var Class = require('Class');

var Oasys = Class.create({
	initialize: function(){
		this.util = require('./util.js');
	}
});


module.exports = new Oasys();

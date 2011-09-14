var Class = require('Class');

var Person = Class.create({
	initialize: function(isDancing){
		this.dancing = isDancing;
	},
	dance: function(){
		return this.dancing;
	}
});

var Ninja = Class.create(Person, {
	initialize: function($super){
		$super(false);
	},
	dance: function($super){
		return $super();
	},
	swingSword: function(){
		return true;
	}
});

module.exports = Ninja;

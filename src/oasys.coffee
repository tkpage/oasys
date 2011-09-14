EventEmitter = require('events').EventEmitter

class Oasys
	constructor: ->
		@util = require './util'
	
Oasys.prototype.__proto__ = EventEmitter.prototype

Oasys.prototype.ready = -> @emit 'ready'

module.exports = new Oasys

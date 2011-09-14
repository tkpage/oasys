module.exports = ->

## node modules
require.paths.unshift './node_modules'
express = require 'express'
stylus = require 'stylus'
nowjs = require 'now'
oasys = require './lib/oasys'


## server
app = express.createServer()
app.configure ->
	app.set 'views', __dirname + '/view'
	app.set 'view engine', 'jade'
	app.set 'view options', layout: false
	app.set 'view cache', false
	return

host = process.env.VCAP_APP_HOST or 'localhost'
port = process.env.VMC_APP_PORT or 80;
app.listen port, host

## routing
app.get '/', (req, res) ->
	res.render 'index.jade'
	return

## handler
everyone = nowjs.initialize app
everyone.now.distributeMessage = (msgin) ->
	oasys.util.getNetworkIP everyone.now.receiveMessage
	return


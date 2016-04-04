//var app = require('express')();

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendfile('index.html');
});

app.use(express.static(__dirname + '/dev'));

io.on('connection', function(socket){
	console.log('Usuário conectado');
	socket.on('disconnect', function(){
		console.log('Usuário Desconectado');
	});

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('linstening on :*3000');
});
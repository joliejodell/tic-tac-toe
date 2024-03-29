var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/", express.static('public'));

io.on('connection', function(socket) {
	socket.on('move', function(move) {
		io.emit('move', move);
	});
	socket.on('reset', function(reset) {
		io.sockets.emit('reset', reset);
	});

});

http.listen(3000, function() {
	console.log('listening on *:3000');
});
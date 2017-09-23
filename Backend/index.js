var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const translate = require('./routes/translate');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
    var translated = translate.translateMessage(msg, 'en', 'zh');
  });
});

// Current users in chat room.
var usernames = {};

io.sockets.on('connection', function (socket) {

	// Call to room management, place user in new room or wait.
	socket.on('adduser', function(userID, fromLang, toLang)  {
		socket.userID = userID;
		socket.roomID = roomID;
		usernames[userID] = userID;
		socket.join(roomID);
		socket.broadcast.to(roomID).emit('updatechat', 'SERVER', 'Someone has joined you. Say hello!');
		socket.emit('updaterooms', rooms, 'room1');
	});

	// User sends message, call translation, and update chatroom.
	socket.on('sendchat', function(msg, fromLang, toLang) {
		var translated = translate.translateMessage(msg, fromLang, toLang);

		console.log('message: ' + msg);
		io.sockets.in(socket.room).emit('updatechat', socket.userID, translated);
		io.sockets.in(socket.room).emit('updatechat', socket.userID, msg);
	});

	// User disconnects from chat.
	socket.on('disconnect', function() {
		delete usernames[socket.userID];
		io.sockets.emit('updateusers', usernames);
		socket.leave(socket.room);
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// Import custom functions.
const translate = require('./routes/translate');
const roomManagement = require('./routes/roomManagement');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
    var translated = translate.translateMessage(msg, 'en', 'tlh');
  });
});

// Current users in chat room.
usernames = {};

// Current rooms on the server.
rooms = [];

io.sockets.on('connection', function (socket) {

	// Call to room management, place user in new room or wait.
	socket.on('adduser', function(userID, fromLang, toLang)  {

		socket.userID = userID;
		// usernames[userID] = userID;
		var found = false;
		var room = roomManagement.searchRooms(userID, toLang, fromLang);

		if(room == null) {
			// Matching room not found - create room
			room = roomManagement.createRoom(userID, toLang, fromLang);
		} else {
			// Matching room found - join room
			found = true;
		}

		socket.room = room.roomID;
		socket.join(room.roomID);

		if(found) {
			socket.broadcast.to(room.roomID).emit('updaterooms', 'Connected.');
			socket.emit('updaterooms', 'Connected.');
		}
		// socket.emit('updaterooms', room.roomID);
	});

	// User sends message, call translation, and update chatroom.
	socket.on('sendchat', function(msg, fromLang, toLang) {
		var callback = (error, response, body) => {
			if (!error && response.statusCode == 200) {
				var translated = body;
				console.log('GOT TRANSLATION');
				console.log(translated);
				translated = translated.replace("<string xmlns=\"http://schemas.microsoft.com/2003/10/Serialization/\">", "");
				translated = translated.replace("</string>", "");
				console.log(translated);
				io.sockets.in(socket.room).emit('updatechat', socket.userID, msg, translated);
			} else {
				console.log(body);
			}
		}

		translate.translateMessage(msg, fromLang, toLang, callback);
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

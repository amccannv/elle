var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// Import custom functions.
const translate = require('./routes/translate');
const roomManagement = require('./routes/roomManagement');
const textToSpeech = require('./routes/textToSpeech');

// Set up CORS for translate function
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve main testing index.html.
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Convert given text to speech.
app.get('/textToSpeech', function(req, res) {
	textToSpeech.synthesizeAudio('test', 'en-ca').then((error, response, body) => {
		console.log(response);
	});
});

// Call for hover translate.
app.get('/translate', function(req, res, next) {

	var callback = (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var translated = body;
			translated = translated.replace("<string xmlns=\"http://schemas.microsoft.com/2003/10/Serialization/\">", "");
			translated = translated.replace("</string>", "");
			console.log(translated + 'here');
			res.send(translated);
		} else {
			console.log(body);
		}
	};
	console.log(req.query.fromLang);
	translate.translateMessage(req.query.msg, req.query.fromLang, req.query.toLang, callback, res);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
    var translated = translate.translateMessage(msg, 'en', 'tlh');
  });
});

// Current users in chat room.
// usernames = {};

// Current rooms on the server.
rooms = [];
translatedMessage = '';

io.sockets.on('connection', function (socket) {

	// Call to room management, place user in new room or wait.
	socket.on('adduser', function(userID, fromLang, toLang)  {

		socket.userID = userID;
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
			io.sockets.in(socket.room).emit('updaterooms', 'Connected.');
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
		};

		translate.translateMessage(msg, fromLang, toLang, callback);
	});

	// User disconnects from chat.
	socket.on('disconnect', function() {
		io.sockets.in(socket.room).emit('disconnect', 'User disconnected. Room is now offline.');
		roomManagement.disconnect(socket.room);
		socket.leave(socket.room);
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

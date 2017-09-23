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
  });
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		var translated = translate.translateMessage('Andrew is the sweetest boy.', 'en', 'it');
		//translate.translateMessage('yo what up', 'EN', 'IT');
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

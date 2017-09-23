var randomstring = require('randomstring');

// Generate new chat room.
exports.createRoom = function(hostID, hostToLang, hostFromLang) {

	var newRoom = new Object();
	newRoom.host = hostID;
	newRoom.second = '';
	newRoom.hostFromLang = hostFromLang;
	newRoom.hostToLang = hostToLang;
	newRoom.roomID = randomstring.generate();
	newRoom.waiting = true;

	rooms.push(newRoom);
};

exports.searchRoom = function(room, secondToLang, secondFromLang) {

	var hostFromLang = room.hostFromLang;
	var hostToLang = room.hostToLang;
	var waiting = room.waiting;

	//if(secondFromLang == hostToLang && secondToLang == hostFromLang)

};
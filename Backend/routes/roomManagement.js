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

exports.searchRooms = function(secondID, secondToLang, secondFromLang) {

	var arrayLength = rooms.length;

	for (var i = 0; i < arrayLength; i++) {
		var room = rooms[i];
		var hostFromLang = room.hostFromLang;
		var hostToLang = room.hostToLang;
		var waiting = room.waiting;

		if (secondFromLang == hostToLang && secondToLang == hostFromLang && waiting == true) {
			room.waiting = false;
			room.second = secondID;
			return room;
		} else {
			this.createRoom(secondID, secondToLang, secondFromLang);
			return false;
		}
	}

};
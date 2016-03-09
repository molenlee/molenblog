var socket = require('socket.io')
module.exports = function(server){
	var io = socket(server);


	/**
	 * code 
 	 */
 	var defaultOption = {
 		mode : 'ace/mode/javascript',
		theme : 'ace/theme/tomorrow_night_bright',
		fontsize: '12px',
		ns : '/code'
 	}
 	var nsp = io.of(defaultOption.ns),
		rooms = {};



	function Room(id){
		this.id = id;
		this.mode = defaultOption.mode;
		this.theme = defaultOption.theme;
		this.fontsize = defaultOption.fontsize;
		this.creatTime = +new Date();
		this.deltas = [];
	}

	nsp.on('connection', function (socket) {
		socket.on('disconnection', function(){
			console.info('hehe  disconnection')
		});

		socket.on('disconnect', function(){
			console.info('hehe  disconnect');
		});

		socket.on('joinRoom', function(roomId, fn){
			/*
				leave room
			 */
			for(var id in socket.rooms){
				socket.leave(id);
			}

			/*
				if system does't create room, create it
			 */
			if(rooms[roomId] === null || rooms[roomId] === undefined){
				var room = new Room(roomId);
				rooms[roomId] = room;
			}

			/*
				excute callback
			 */
			socket.join(roomId, function(){
				fn(rooms[roomId]);
			});
		});

		socket.on('enterCode', function(data, roomId){
			rooms[roomId]['deltas'] =  rooms[roomId]['deltas'].concat(data); 
			socket.broadcast.to(roomId).emit('enterCode', data);
			//io.to(roomId).emit('enterCode',data);
		});

		socket.on('checkIsSameRoom', function(roomId, socketId, fn){
			ns = io.of(defaultOption.ns || '/'); 
			_socket = ns.connected[socketId];
			if(_socket && _socket.rooms.indexOf(roomId) !== -1) {
				fn();
			}
		});

		socket.on('changeOption', function(data){
			var roomId = data.roomId;
			var room = rooms[roomId];
			room[data.type] = data.value;

			socket.broadcast.to(roomId).emit('changeOption', data);
		});

		socket.on('changeFontSize', function(data){
			var roomId = data.roomId;
			var room = rooms[roomId];
			room['fontsize'] = data.value;

			socket.broadcast.to(roomId).emit('changeFontSize', data);
		});



		function findClientsSocket(roomId, namespace) {
		    var res = [],
		        ns = io.of(namespace || '/'); // the default namespace is "/"

		    if (ns) {
		        for (var id in ns.connected) {
		            if (roomId) {
		                var index = ns.connected[id].rooms.indexOf(roomId);
		                if (index !== -1) {
		                    res.push(ns.connected[id]);
		                }
		            } else {
		                res.push(ns.connected[id]);
		            }
		        }
		    }
		    return res;
		}
	 });
}

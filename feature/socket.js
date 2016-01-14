var socket = require('socket.io')

module.exports = function(server){
	var io = socket(server);


	/**
	 * code 
 	 */
 	nsp = '/code'
	var code = io.of(nsp);

	rooms = {
		// '0001': {
		// 	'id': '0001',
		// 	'name': '测试名称',
		// 	'title': '测试标题',
		// 	'desc' :'测试描述'
		// }
	};


	code.on('connection', function (socket) {
		socket.on('disconnection', function(){
			console.info('hehe  disconnection')
		})
		socket.on('disconnect', function(){
			// 浏览器刷新也会触发
			setTimeout(function(){
				for(var key in rooms){
					res = findClientsSocket(key, nsp)
					if(res.length == 0){
						delete rooms[key]
					}
					else{
						socket.broadcast.to(key).emit('setRoomNumber', res.length);
					}
				}
			}, 1000)
		})


		socket.on('getRoomList', function(data, fn){
			fn(rooms)
		});

		socket.on('creatRoom', function(data, fn){
			var id = +new Date() + '' ;
			data['id'] = id
			rooms[id] = data;
			fn(data);
		});



		socket.on('joinRoom', function(data, fn){
			for(var key in rooms){
				console.info('1')
				if (key == data){
					console.info('2')
					continue;
				}
				console.info(3)
				void function(key){
					socket.leave(key, function(){
						console.info('need check key is ' + key)
						checkSingleRomm(key);
						socket.broadcast.to(key).emit('setRoomNumber', findClientsSocket(key, nsp).length);
					});
				}(key)
				
			}

			socket.join(data, function(){
				fn(rooms[data]);
				socket.broadcast.to(data).emit('setRoomNumber', findClientsSocket(data, nsp).length);
			});
		});

		socket.on('enterCode', function(data, roomID){
			// io.to(roomID).emit('enterCode', data);
			socket.broadcast.to(roomID).emit('enterCode', data);
			// io.sockets.in(roomID).emit('enterCode', data);
		});

		


		// socket.on('leaveGroup', function(data){	
		// 	socket.leave(data, function(){
		// 		console.info('leave')
		// 	});
		// })


		socket.on('getRoomNumber', function (data, fn) {
			res = findClientsSocket(data, nsp);
			fn(res.length);
		});

		function checkSingleRomm(roomID){
			console.info('roomID is ' + roomID)
			var res = findClientsSocket(roomID, nsp);
			if (res.length == 0){
				delete rooms[roomID];
			}
		}

		function findClientsSocket(roomId, namespace) {
		    var res = [],
		        ns = io.of(namespace || "/"); // the default namespace is "/"

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

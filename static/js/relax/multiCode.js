require.config({
	paths: {
		'jquery': '/lib/jQuery/jQuery',
		'jqueryui': '/lib/jQueryUI/jquery-ui',
		'io': '/lib/socket/socket.io',
		'underscore': '/lib/underscore/underscore',
		'text': '/lib/textjs/text',
		'backbone': '/lib/backbone/backbone'
	}
});
require(['require', 'jquery','io', 'underscore', 'backbone', 'jqueryui'], function(require, $, io, _, Backbone){
	var ListView = Backbone.View.extend({
		render: function(){
			this.$el.html(_.template($('#roomTable').html())());
			this.initData();
			return this;
		},
		initData: function(){
			var socket = window.socket;
			socket.emit('getRoomList', {}, function(data){
				data = data || {};
				_html = '';
				for(var key in data){
					value = data[key];
					_html += _.template($('#roomItem').html())(value);
				}
				$('#container .room-table tbody').html( _html );
			});
		},
		events: {
			'click #creat-room': 'creatRoom'
		},
		creatRoom: function(ev){
			var v = this;
			$($('#creat-room-template').html()).dialog({
				modal: true,
				buttons: [
					{
						text: 'OK',
						click: function() {
							data = $('#creat-form').serializeArray()
							o = {}
							for(var key in data){
								value = data[key];
								o[value.name] = value.value;
							}
							socket.emit('creatRoom', o, function(data){
								window.router.navigate('room/' + data.id ,{trigger: true})
							});
							$( this ).dialog( "close" );
						}
					}
				]
			});
		}
	});

	var RoomModel = Backbone.Model

	var RoomView = Backbone.View.extend({
		render: function(){
			var v = this,
				m = v.model,
				roomID = m.get('roomID'),
				socket = window.socket;
			socket.emit('joinRoom', roomID, function(data){
				if (!data){
					document.write('暂无改房间');
					return
				}
				v.$el.append(_.template( $('#single-room-template').html() )(data) );

				socket.emit('getRoomNumber', roomID, function(data){
					$('.person-number').html(data)
				});
			})
			return v;
		},
		events: {
			'keyup .enter-code': 'enterCode'
		},
		enterCode: function(ev){
			var v = this,
				m = v.model,
				roomID = m.get('roomID'),
				$target = $(ev.target),
				socket = window.socket;
			socket.emit('enterCode', $target.val(), roomID)
		}

	});






	// socket.emit('joinGroup', 'react0')
	// socket.emit('joinGroup', 'react1')
	// socket.emit('leaveGroup', 'last')

	// if(window.navigator.userAgent.indexOf('Safari') > -1){
	// 	socket.emit('leaveGroup', 'react1')
	// 	socket.emit('leaveGroup', 'last')
	// }
	
	// socket.on('news', function (data) {
	// 	socket.emit('getRoomNumber', 'last') 
	// });

	// //event attach
	// $('#creat-room').bind('click', function(e){
	// 	$('#creat-room-template').dialog()
	// });

	

	var Router = Backbone.Router.extend({
		routes: {
			''	:	'listView',    
			'list'	:	'listView',  
			'room/:id': 'joinRoom'
		},
		listView: function(){
			var listView = new ListView();
			this.setView(listView);
		},
		'joinRoom': function(id){
			var roomView = new RoomView({model: new RoomModel({roomID: id})});
			this.setView(roomView);
		},
		setView: function(view){
			$('#container').html(view.render().el)
		}
	});

	var socket = window.socket = window.socket || io.connect('/code');
	socket.on('enterCode', function (data) {
		$('.enter-code').val(data)
	});

	socket.on('setRoomNumber', function(data){
		$('.person-number').html(data)
	});


	window.router = new Router();
	Backbone.history.start();
	

});
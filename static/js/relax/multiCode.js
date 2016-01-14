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
require(['require', 'jquery','io', 'underscore', 'backbone','jqueryui'], function(require, $, io, _, Backbone){
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
					value.descTitle = value.desc;
					if (value.desc && value.desc.length > 20){
						value.desc = value.desc.slice(0, 20);
					}

					_html += _.template($('#roomItem').html())(value);
				}
				if (_html.length == 0){
					_html = '<tr><td colspan=4>暂无房间...</td></tr>'
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
				width: 600,
				height:500,
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
				v.$el.append(_.template( $('#single-room-template').html() )(data, null) );


    			ace.require("ace/ext/language_tools");
			    var editor = v.editor = ace.edit($('#enter-code', v.$el)[0]);
			    editor.session.setMode("ace/mode/javascript");
			    editor.setTheme("ace/theme/tomorrow_night_bright");
			    // enable autocompletion and snippets
			    editor.setOptions({
			        enableBasicAutocompletion: true,
			        enableSnippets: true,
			        enableLiveAutocompletion: true
			    });
			    editor.$blockScrolling = Infinity

			    socket.on('enterCode', function (data) {
					editor.setValue(data)
				});


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
				value = v.editor.getValue(),
				socket = window.socket;
			socket.emit('enterCode', value, roomID)
		}

	});

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
	//var socket = window.socket = window.socket || io.connect('http://localhost:8080/code');
	

	socket.on('setRoomNumber', function(data){
		$('.person-number').html(data)
	});


	window.router = new Router();
	Backbone.history.start();
	

});
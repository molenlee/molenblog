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
	var themeData = [
	    ["Chrome"         ],
	    ["Clouds"         ],
	    ["Crimson Editor" ],
	    ["Dawn"           ],
	    ["Dreamweaver"    ],
	    ["Eclipse"        ],
	    ["GitHub"         ],
	    ["IPlastic"       ],
	    ["Solarized Light"],
	    ["TextMate"       ],
	    ["Tomorrow"       ],
	    ["XCode"          ],
	    ["Kuroir"],
	    ["KatzenMilch"],
	    ["SQL Server"           ,"sqlserver"               , "light"],
	    ["Ambiance"             ,"ambiance"                ,  "dark"],
	    ["Chaos"                ,"chaos"                   ,  "dark"],
	    ["Clouds Midnight"      ,"clouds_midnight"         ,  "dark"],
	    ["Cobalt"               ,"cobalt"                  ,  "dark"],
	    ["idle Fingers"         ,"idle_fingers"            ,  "dark"],
	    ["krTheme"              ,"kr_theme"                ,  "dark"],
	    ["Merbivore"            ,"merbivore"               ,  "dark"],
	    ["Merbivore Soft"       ,"merbivore_soft"          ,  "dark"],
	    ["Mono Industrial"      ,"mono_industrial"         ,  "dark"],
	    ["Monokai"              ,"monokai"                 ,  "dark"],
	    ["Pastel on dark"       ,"pastel_on_dark"          ,  "dark"],
	    ["Solarized Dark"       ,"solarized_dark"          ,  "dark"],
	    ["Terminal"             ,"terminal"                ,  "dark"],
	    ["Tomorrow Night"       ,"tomorrow_night"          ,  "dark"],
	    ["Tomorrow Night Blue"  ,"tomorrow_night_blue"     ,  "dark"],
	    ["Tomorrow Night Bright","tomorrow_night_bright"   ,  "dark"],
	    ["Tomorrow Night 80s"   ,"tomorrow_night_eighties" ,  "dark"],
	    ["Twilight"             ,"twilight"                ,  "dark"],
	    ["Vibrant Ink"          ,"vibrant_ink"             ,  "dark"]
	];
	var supportedModes = {
	    ABAP:        ["abap"],
	    ABC:         ["abc"],
	    ActionScript:["as"],
	    ADA:         ["ada|adb"],
	    Apache_Conf: ["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],
	    AsciiDoc:    ["asciidoc|adoc"],
	    Assembly_x86:["asm|a"],
	    AutoHotKey:  ["ahk"],
	    BatchFile:   ["bat|cmd"],
	    C_Cpp:       ["cpp|c|cc|cxx|h|hh|hpp|ino"],
	    C9Search:    ["c9search_results"],
	    Cirru:       ["cirru|cr"],
	    Clojure:     ["clj|cljs"],
	    Cobol:       ["CBL|COB"],
	    coffee:      ["coffee|cf|cson|^Cakefile"],
	    ColdFusion:  ["cfm"],
	    CSharp:      ["cs"],
	    CSS:         ["css"],
	    Curly:       ["curly"],
	    D:           ["d|di"],
	    Dart:        ["dart"],
	    Diff:        ["diff|patch"],
	    Dockerfile:  ["^Dockerfile"],
	    Dot:         ["dot"],
	    Dummy:       ["dummy"],
	    DummySyntax: ["dummy"],
	    Eiffel:      ["e|ge"],
	    EJS:         ["ejs"],
	    Elixir:      ["ex|exs"],
	    Elm:         ["elm"],
	    Erlang:      ["erl|hrl"],
	    Forth:       ["frt|fs|ldr"],
	    FTL:         ["ftl"],
	    Gcode:       ["gcode"],
	    Gherkin:     ["feature"],
	    Gitignore:   ["^.gitignore"],
	    Glsl:        ["glsl|frag|vert"],
	    golang:      ["go"],
	    Groovy:      ["groovy"],
	    HAML:        ["haml"],
	    Handlebars:  ["hbs|handlebars|tpl|mustache"],
	    Haskell:     ["hs"],
	    haXe:        ["hx"],
	    HTML:        ["html|htm|xhtml"],
	    HTML_Ruby:   ["erb|rhtml|html.erb"],
	    HTML_Elixir: ["eex|html.eex"],
	    INI:         ["ini|conf|cfg|prefs"],
	    Io:          ["io"],
	    Jack:        ["jack"],
	    Jade:        ["jade"],
	    Java:        ["java"],
	    JavaScript:  ["js|jsm|jsx"],
	    JSON:        ["json"],
	    JSONiq:      ["jq"],
	    JSP:         ["jsp"],
	    JSX:         ["jsx"],
	    Julia:       ["jl"],
	    LaTeX:       ["tex|latex|ltx|bib"],
	    Lean:        ["lean|hlean"],
	    LESS:        ["less"],
	    Liquid:      ["liquid"],
	    Lisp:        ["lisp"],
	    LiveScript:  ["ls"],
	    LogiQL:      ["logic|lql"],
	    LSL:         ["lsl"],
	    Lua:         ["lua"],
	    LuaPage:     ["lp"],
	    Lucene:      ["lucene"],
	    Makefile:    ["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],
	    Markdown:    ["md|markdown"],
	    Mask:        ["mask"],
	    MATLAB:      ["matlab"],
	    Maze:        ["mz"],
	    MEL:         ["mel"],
	    MUSHCode:    ["mc|mush"],
	    MySQL:       ["mysql"],
	    Nix:         ["nix"],
	    ObjectiveC:  ["m|mm"],
	    OCaml:       ["ml|mli"],
	    Pascal:      ["pas|p"],
	    Perl:        ["pl|pm"],
	    pgSQL:       ["pgsql"],
	    PHP:         ["php|phtml|shtml|php3|php4|php5|phps|phpt|aw|ctp"],
	    Powershell:  ["ps1"],
	    Praat:       ["praat|praatscript|psc|proc"],
	    Prolog:      ["plg|prolog"],
	    Properties:  ["properties"],
	    Protobuf:    ["proto"],
	    Python:      ["py"],
	    R:           ["r"],
	    RDoc:        ["Rd"],
	    RHTML:       ["Rhtml"],
	    Ruby:        ["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],
	    Rust:        ["rs"],
	    SASS:        ["sass"],
	    SCAD:        ["scad"],
	    Scala:       ["scala"],
	    Scheme:      ["scm|sm|rkt|oak|scheme"],
	    SCSS:        ["scss"],
	    SH:          ["sh|bash|^.bashrc"],
	    SJS:         ["sjs"],
	    Smarty:      ["smarty|tpl"],
	    snippets:    ["snippets"],
	    Soy_Template:["soy"],
	    Space:       ["space"],
	    SQL:         ["sql"],
	    SQLServer:   ["sqlserver"],
	    Stylus:      ["styl|stylus"],
	    SVG:         ["svg"],
	    Swift:       ["swift"],
	    Tcl:         ["tcl"],
	    Tex:         ["tex"],
	    Text:        ["txt"],
	    Textile:     ["textile"],
	    Toml:        ["toml"],
	    Twig:        ["twig|swig"],
	    Typescript:  ["ts|typescript|str"],
	    Vala:        ["vala"],
	    VBScript:    ["vbs|vb"],
	    Velocity:    ["vm"],
	    Verilog:     ["v|vh|sv|svh"],
	    VHDL:        ["vhd|vhdl"],
	    XML:         ["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml"],
	    XQuery:      ["xq"],
	    YAML:        ["yaml|yml"],
	    Django:      ["html"]
	};


	$(function(){
		var ListView = Backbone.View.extend({
			initialize: function(){
				this.word = ["other developers", "interviewers", "your friends"];
			},
			render: function(){
				this.$el.html(_.template($('#index').html())());
				this.renderChangeAble();
				return this;

			},
			events: {
				'click #creat-room': 'creatRoom'
			},
			creatRoom: function(ev){
				window.router.navigate('#room/' + +new Date(), {trigger: true})
				console.info(ev);
			},
			renderChangeAble: function(){
				var that = this;
				var $target = $('.changeable', that.$el);
				var eventsArray = [];
				var index = 0;

				for(var i = 0, _length = that.word.length; i < _length; i++){
					var currentword = that.word[i];
					void function(currentword){
						for(var j = 0, _length1 = currentword.length; j <= _length1; j++){
							void function(j){
								eventsArray.push(function(){
									$target.html(currentword.slice(0, j))
								})
							}(j)
						}
						eventsArray.push('pause');
						for(var j = currentword.length - 1; j >= 0; j--){
							void function(j){
								eventsArray.push(function(){
									$target.html(currentword.slice(0, j))
								})
							}(j)
						}
					}(currentword)
				}

				setTimeout(function(){
					var fun = eventsArray[index];
					index++;
					if (index == eventsArray.length){
						index = 0;
					}
					if (typeof(fun) == 'function'){
						fun()
						setTimeout(arguments.callee, 50);
					}
					else{
						setTimeout(arguments.callee, 1000);
					}

				},80)
			}

		});

		var RoomModel = Backbone.Model;

		var RoomView = Backbone.View.extend({
			className: 'room-container',
			initialize: function(){
				var v = this,
					socket = window.socket;
				var themes = this.themes = themeData.map(function(data) {
				    var name = data[1] || data[0].replace(/ /g, "_").toLowerCase();
				    var theme = {
				        caption: data[0],
				        theme: "ace/theme/" + name,
				        isDark: data[2] == "dark",
				        name: name
				    };
				    return theme;
				});

				var modes = this.modes = [];

				var nameOverrides = {
				    ObjectiveC: "Objective-C",
				    CSharp: "C#",
				    golang: "Go",
				    C_Cpp: "C and C++",
				    coffee: "CoffeeScript",
				    HTML_Ruby: "HTML (Ruby)",
				    HTML_Elixir: "HTML (Elixir)",
				    FTL: "FreeMarker"
				};

				var Mode = function(name, caption, extensions) {
				    this.name = name;
				    this.caption = caption;
				    this.mode = "ace/mode/" + name;
				    this.extensions = extensions;
				    if (/\^/.test(extensions)) {
				        var re = extensions.replace(/\|(\^)?/g, function(a, b){
				            return "$|" + (b ? "^" : "^.*\\.");
				        }) + "$";
				    } else {
				        var re = "^.*\\.(" + extensions + ")$";
				    }

				    this.extRe = new RegExp(re, "gi");
				};

				for (var name in supportedModes) {
				    var data = supportedModes[name];
				    var displayName = (nameOverrides[name] || name).replace(/_/g, " ");
				    var filename = name.toLowerCase();
				    var mode = new Mode(filename, displayName, data[0]);
				    modes.push(mode);
				}

				socket.on('changeOption', function(data){
					
					socket.triggerChangeOption = false;

					$('#' + data.type, v.$el).val(data.value.slice(data.value.lastIndexOf('/')+1));
					v.changeOption(data.value, data.type);

					socket.triggerChangeOption = true;
				});

				socket.on('changeFontSize', function(data){
					
					socket.triggerChangeOption = false;

					$('#fontsize').val(data.value);
					v.changeFontSize(data.value);

					socket.triggerChangeOption = true;
				});
			},
			render: function(){
				var v = this,
					m = v.model,
					roomId = m.get('roomId'),
					socket = window.socket;

				socket.emit('joinRoom', roomId, function(data){
					console.info(data)
					v.$el.append(_.template( $('#room-template').html() )() );

					v.fillDropdown($('#mode', this.$el), v.modes);
					v.fillDropdown($('#theme', this.$el),  {
						    Bright: v.themes.filter(function(x){return !x.isDark}),
						    Dark: v.themes.filter(function(x){return x.isDark}),
					});

	    			ace.require("ace/ext/language_tools");
				    var editor = window.editor = v.editor = ace.edit($('#enter-code', v.$el)[0]);
				    // editor.session.setMode("ace/mode/javascript");
				    // editor.setTheme("ace/theme/tomorrow_night_bright");
				    

				    socket.triggerChangeOption = false;
				    $('#mode', v.$el).val(data.mode.slice(data.mode.lastIndexOf('/')+1));
				    v.changeOption(data.mode, 'mode');

				    $('#theme', v.$el).val(data.theme.slice(data.theme.lastIndexOf('/')+1));
				    v.changeOption(data.theme, 'theme');


				    $('#fontsize', v.$el).val(data.fontsize);
				    v.changeFontSize(data.fontsize);
				    socket.triggerChangeOption = true;


				    // enable autocompletion and snippets
				    editor.setOptions({
				        enableBasicAutocompletion: true,
				        enableSnippets: true,
				        enableLiveAutocompletion: true
				    });

				    editor.$blockScrolling = Infinity;

				    socket.triggerChange = false;
					editor.getSession().getDocument().applyDeltas(data['deltas']);
					socket.triggerChange = true;

				    editor.on('change', function(ev, obj){
				    	if (!socket.triggerChange){
				    		return
				    	}

				    	deltas = window.deltas;
				    	deltas.push(ev);

				    	if (window.timeoutProcess){
				    		return;
				    	}
				    	else{
				    		window.timeoutProcess = setTimeout(function(){
					    		socket.emit('enterCode', deltas, roomId);
					    		window.timeoutProcess = null;
					    		deltas.length = 0;
					    	},1000);
				    	}
				    });

				    socket.on('enterCode', function (data) {
				    	socket.triggerChange = false;
				    	editor.getSession().getDocument().applyDeltas(data);
				    	socket.triggerChange = true;
					});


					// rtc.connect("ws://localhost:8080/code'");
					// rtc.on('add remote stream', function(stream, socketId) {
					// 	console.info('socketId is ' + socketId);
					// 	socket.emit('checkIsSameRoom', roomId, socketId, function(){
					// 		console.info('hahah in same room')
					// 		// rtc.attachStream(stream, 'you-remote');
					// 	});
					//  });
				});
				return v;
			},
			events: {
				'click .open-camera': 'openCamera',
				'click .room-slider .room-function button.have-list': 'openFunctionContainer',
				'click .room-slider .room-function-container .close': 'closeFunctionContainer',
				'change #mode, #theme': 'changeOption',
				'change #fontsize': 'changeFontSize'
			},

			fillDropdown: function(el, values) {

			    this.dropdown(values).forEach(function(e) {
			        el.append(e);
			    });
			},
			dropdown: function(values){
				var v = this;
				if (Array.isArray(values))
			        return this.optgroup(values);

			    return Object.keys(values).map(function(i) {
			        return v.elt("optgroup", {"label": i}, v.optgroup(values[i]));
			    });
			},
			optgroup: function(values){
				var v = this;
				return values.map(function(item) {
			        if (typeof item == "string")
			            item = {name: item, caption: item};
			        return v.elt("option", {value: item.value || item.name}, item.caption || item.desc);
			    });
			},
			elt: function(tag, attributes, content) {
			    var el = window.document.createElement(tag);
			    if (typeof content == "string") {
			        el.appendChild(document.createTextNode(content));
			    } else if (content) {
			        content.forEach(function(ch) {
			            el.appendChild(ch);
			        });
			    }

			    for (var i in attributes)
			        el.setAttribute(i, attributes[i]);
			    return el;
			},
			openCamera: function(ev){
				socket = window.socket;
				rtc.createStream({
					"video": { "mandatory": {}, "optional": [] },
					"audio": true
				}, function(stream) {
					document.getElementById('you').src = URL.createObjectURL(stream);
					document.getElementById('you').play();
				});
			},
			openFunctionContainer: function(ev){
				var $roomslider = $('.room-slider', this.$el);
				$roomslider.addClass('active');

				var $target = $(ev.currentTarget);
				$target.addClass('active');

				var flag = $target.parents('li').attr('data-flag');
				$('.room-function-container li[data-flag="' + flag + '"]' , $roomslider).removeClass('hidden')

			},
			closeFunctionContainer: function(ev){
				var $roomslider = $('.room-slider', this.$el);
				$roomslider.removeClass('active');

				$('.room-function button.have-list', $roomslider).removeClass('active');
				$('.room-function-container li.function-container-item' , $roomslider).addClass('hidden')
			},
			changeOption: function(ev, type){
				var value = ev,
					v = this,
					socket = window.socket,
					type = type || $(ev.target).prop('id'),
					roomId = v.model.get('roomId');
				if (typeof ev !== 'string'){
					value = 'ace/' + type + '/' + $(ev.target).val()
				}

				if(type == 'mode'){
					v.editor.session.setMode(value);
				}
				else{
					v.editor.setTheme(value);
				}

				if(socket.triggerChangeOption){
					socket.emit('changeOption', {value : value, type: type, roomId: roomId});
				}
			},
			changeFontSize: function(ev){
				var value = ev,
					v = this,
					roomId = v.model.get('roomId');
				if (typeof ev !== 'string'){
					value = $(ev.target).val();
				}

				v.editor.setFontSize(value);

				if(socket.triggerChangeOption){
					socket.emit('changeFontSize', {value : value, roomId: roomId});
				}
			}
		});

		var Router = Backbone.Router.extend({
			routes: {
				''	:	'listView',    
				'room/:id': 'joinRoom'
			},
			listView: function(){
				var listView = new ListView();
				this.setView(listView);
			},
			'joinRoom': function(id){
				var roomView = new RoomView({model: new RoomModel({roomId: id})});
				this.setView(roomView);
			},
			setView: function(view){
				$('#container').html(view.render().el);
			}
		});

		var socket = window.socket = window.socket || io.connect('/code');
		//var socket = window.socket = window.socket || io.connect('http://localhost:8080/code');
		window.deltas = new Array();
		window.timeoutProcess = null;


		socket.on('setRoomNumber', function(data){
			$('.person-number').html(data);
		});




		window.router = new Router();
		Backbone.history.start();
	});
	
	

});
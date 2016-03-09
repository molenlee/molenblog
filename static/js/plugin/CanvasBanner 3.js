require.config({
	paths: {
		'jquery': '../jQuery/jQuery',
	}
});

define(['jquery'], function($){
	var CanvasBanner = function(option){
		var opt = {
			canvas: '',
			amount: [10,10],
			backgroundImage:[],
			canvasWidth: 0,
			canvasHeight: 0
		};
		this.option = $.extend({}, opt, option);
	}

	var data = [],
		backgroundImages = [],
		image = null,
		x_zoom = 1,
		y_zoom = 1,
		_ctx = null,
		out = 0;



	CanvasBanner.prototype = {
		constructor: CanvasBanner,
		init: function(){
			var that = this;
			var option = that.option;
			var ctx = $(option.canvas).eq(0)[0].getContext('2d');

			var width = option.canvasWidth / option.amount[0];
			var height = option.canvasHeight / option.amount[1];
			
			for(var k = 0; k < option.backgroundImage.length; k++){
				var _image = new Image();
				_image.src = option.backgroundImage[k];
				backgroundImages[k] = _image;

			
				void function(k){
					backgroundImages[k].onload = function(){
						var _width = this.width;
						var _height = this.height;

						this.x_zoom = _width / option.canvasWidth;
						this.y_zoom = _height / option.canvasHeight;

						//init data
						for(var i = 0; i < option.amount[0]; i++){
							data[i] = [];
							for(var j = 0; j < option.amount[1]; j++){
								data[i][j] = new Rectangle(i * width * this.x_zoom, j * height * this.y_zoom, 
										width * this.x_zoom, height * this.y_zoom,
											i * width, j * height, width, height);
							}
						}

						if (k == 0 ){
							image = backgroundImages[0];
							x_zoom = this.x_zoom;
							y_zoom = this.y_zoom;
							_ctx = ctx;
							_ctx.clearRect(0, 0, option.canvasWidth, option.canvasHeight);
							drawImages(option.amount, image, _ctx, x_zoom, y_zoom)
						}
							
						
					};
				}(k)
			}
			this.addEvent();
		},
		addEvent: function(){
			var that = this;
			var option = this.option;
			var canvas = $(option.canvas).eq(0)[0];

			canvas.addEventListener('click', function(e){
				var x = ( parseInt(e.offsetX * that.option.amount[0] / that.option.canvasWidth))

				var y = (parseInt(e.offsetY * that.option.amount[1] / that.option.canvasHeight))

				requestAnimationFrame(function(){
					that.initData(x, y);
				})
			});
		},
		set: function(attibute, value){
			this[attibute] = value;
			return this;
		},
		get: function(attibute){
			return this[attibute];
		},
		initData: function(x, y){
			//动画策略
			var that = this;
			var rectangle = null;
			var option = this.option;
			for(var i = 0; i < option.amount[0]; i++){
				for(var j = 0; j < option.amount[1]; j++){
					rectangle = data[i][j];
					
					
					var time = 40,
						sqrt = Math.sqrt((x - i) * (x - i) + (y - j) * (y - j));
					var	speed = time / sqrt;

					if (sqrt < 10){ 
					// if(true)
					// if(Math.abs((x - i)) < 10 && Math.abs((y - j)) < 10){
						rectangle.rotate += rectangle.direction * Math.random() / 500;
						if(x >= i && y > j){
							rectangle.canvasX -= speed;
							rectangle.canvasY -= speed;
						}
						else if(x < i && y >= j){
							rectangle.canvasX += speed;
							rectangle.canvasY -= speed;
						}
						else if (x <= i && y < j){
							rectangle.canvasX += speed;
							rectangle.canvasY += speed;
						}
						else {
							rectangle.canvasX -= speed;
							rectangle.canvasY += speed;
						}
					}
					

					
					// rectangle.canvasX -= time / (x - i);
					// rectangle.canvasY -= time / (y - j);
					// rectangle.canvasX -= 2;
					// rectangle.canvasY -= 2;
				}
			}
			_ctx.clearRect(0, 0, option.canvasWidth, option.canvasHeight);

			drawImages(option.amount, image, _ctx, x_zoom, y_zoom);
			if (out < data.length * data[0].length){
				requestAnimationFrame(function(){
					that.initData(x, y);
				})
			}
			else{
				console.log(out , data.length * data[0].length)
			}
		}
	}

	function drawImages(amount, image, ctx, x_zoom, y_zoom){
		//test draw
		for(var i = 0; i < amount[0]; i++){
			for(var j = 0; j < amount[1]; j++){
				data[i][j].draw(image, ctx, x_zoom, y_zoom);
			}
		}
	}


	var Rectangle = function(imageX, imageY, imageWidth, imageHeight, canvasX, canvasY, canvasWidth, canvasHeight){
		var that = this;

		that.direction = (Math.random() > 0.5 ? -Math.PI : Math.PI);

		that.rotate = 0;
		that.imageX = imageX || 0;
		that.imageY = imageY || 0;
		that.imageWidth = imageWidth || 0;
		that.imageHeight = imageHeight || 0;
		that.canvasX = canvasX || 0;
		that.canvasY = canvasY || 0;
		that.canvasWidth = canvasWidth || 0;
		that.canvasHeight = canvasHeight || 0;
		that.out = false;
	};

	Rectangle.prototype = {
		set: function(attibute, value){
			this[attibute] = value;
			return this;
		},

		draw: function(image, context){
			if (!image || !context)
				throw new Erroe('image or context is undefined');
			if (!this.out  && (this.canvasX < 0 || this.canvasY < 0)){
				this.out = true;
				out++;
			}
				

			context.save(); //保存画笔状态 
	        context.rotate(this.rotate); //开始旋转 
			context.drawImage(image, this.imageX, this.imageY, this.imageWidth, this.imageHeight, 
				this.canvasX, this.canvasY, this.canvasWidth, this.canvasHeight);
			context.restore(); //绘制结束以后，恢复画笔状态 
		}
	}

	return CanvasBanner;

});





























































require.config({
	paths: {
		'jquery': '/lib/jQuery/jQuery',
	}
});

require(['jquery'], function($){
	$(function(){
		CanvasRenderingContext2D.prototype.sector = function(x, y, radius, sDeg, eDeg) {
		    // 初始保存
			this.save();
			// 位移到目标点
			this.translate(x, y);
			this.beginPath();
			// 画出圆弧
			this.arc(0,0,radius,sDeg, eDeg);
			// 再次保存以备旋转
			this.save();
			// 旋转至起始角度
			this.rotate(eDeg);
			// 移动到终点，准备连接终点与圆心
			this.moveTo(radius,0);
			// 连接到圆心
			this.lineTo(0,0);
			// 还原
			this.restore();
			// 旋转至起点角度
			this.rotate(sDeg);
			// 从圆心连接到起点
			this.lineTo(radius,0);
			this.closePath();
			// 还原到最初保存的状态
			this.restore();
			return this;
		};

		var speed = 10,
			rolate = 0,
			result = null,
			context = null,
			rw_data = null;

		$.get('/data/relax/rollingwheel',{}, function(data){
			var canvas = $('#rollingWheel-canvas')[0]
			context = canvas.getContext('2d');
			if(data.code = 200){
				initBack((rw_data = data.ret), context)
				drawPointer(context);
			}
			else{
				//TODO
			}

			$('#rollingWheel-canvas').bind('click', function(ev){
				if (Math.sqrt((ev.offsetX - 500) * (ev.offsetX - 500) + (ev.offsetY - 500) * (ev.offsetY - 500)) < 50){
					$(this).unbind('click');

					getResult();
				}
				
				// console.info(ev.offsetX)
				// console.info(ev.offsetY)
			})
			
		});



		function getResult(){
			var si = setInterval(function(){
				if(--speed  <= 3){
					window.clearInterval(si)
				}
			}, 500)

			init(rw_data, context);

			$.get('/relex/rolling_wheel_result', {}, function(data){
				if(data.code == 200){
					result = data.ret;
					console.info(result)
				}
			});
		}

		//test
		

		

		function init(data, context){
			context.clearRect(0, 0, 1000, 1000);
			

			initBack(data, context);
			drawPointer(context, result);

			if(speed <= 3 && result){
				var PI2 = 2 * Math.PI ;
				var duce_value = (rolate % PI2) - (result['random'] - result['size'] / 2) * PI2;
				if( Math.abs(duce_value) < PI2 / 180 ){
					return
				}
			}
			requestAnimationFrame(function(){
				init(data, context);
			})
			
		}

		
		function drawPointer(context){
			context.save(); //保存画笔状态 
			context.translate(500, 500);
	        context.rotate(rolate); //开始旋转 
			rolate += Math.PI * 2 / 360 * speed;

			context.beginPath();
			context.moveTo(-10 , 50);
			context.lineTo(10, 50);
			context.lineTo(0,200);
			context.lineWidth = 10;
			context.fillStyle = '#fff';
			context.closePath();
			context.fill();
			context.restore(); //绘制结束以后，恢复画笔状态 

			// setTimeout(function(){
			// 	drawPointer(context)
			// }, 1000)
			
		}

		function initBack(data, context){
			context.save();

			context.save();
			context.fillStyle="#0082e5";
			context.beginPath();
			context.arc(500,500,400,0,Math.PI*2,true); //Math.PI*2是JS计算方法，是圆
			context.closePath();
			context.fill();
			context.restore();

			// context.fillStyle="#fff";
			// context.beginPath();
			// context.arc(500,500,380,0,Math.PI*2,true); //Math.PI*2是JS计算方法，是圆
			// context.closePath();
			// context.fill();


			//扇形
			var start = Math.PI / 2;
			var end = 0;
			for(var i in data){
				var item  = data[i];
				context.fillStyle = item['color'];
				end = (start + Math.PI * 2 * item['size']) ;
				context.sector(500, 500, 380, start, end).fill();

				context.save();
				context.translate(500, 500);
				context.rotate((end - ((end - start) / 2)) - Math.PI / 2);
				context.translate(0, 150);
				context.strokeStyle="#fff";
				context.font=' 30px Arial';
				context.textAlign='center';
				context.textBaseline='middle';
				context.strokeText(item['name'],0 , 100);
				context.restore();

				start = end;
			}


			context.fillStyle="#0082e5";
			context.beginPath();
			context.arc(500,500,50,0,Math.PI*2,true); //Math.PI*2是JS计算方法，是圆
			context.closePath();
			context.fill();

			
			context.translate(500, 500);
			context.strokeStyle="#red";
			context.font=' 40px Arial';
			context.textAlign='center';
			context.textBaseline='middle';
			context.strokeText('摇',0 , 0);    
			context.restore();  

		}
		

	})
});
require.config({
	paths: {
		"jquery": "../jQuery/jQuery",
	}
});

define(['jquery'], function($){
	var CanvasBanner = function(option){
		var opt = {
			canvas: '',
			amount: [30, 30],
			backgroundImage:[],
			canvasWidth: 0,
			canvasHeight: 0
		}
		this.option = $.extend({}, opt, option);
	}

	CanvasBanner.prototype = {
		constructor: CanvasBanner,
		init: function(){
			var that = this;
			var data = [];
			//init data

			for(var i = 0; i < that.amount[0]; i++){
				for(var j = 0; j < that.amount[1]; j++){
					
				}
			}
		}
	}








	return CanvasBanner;

});
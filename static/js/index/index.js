require.config({
	paths: {
		'jquery': '../jQuery/jQuery',
		'CanvasBanner':'../plugin/CanvasBanner'
	}
});

require(['jquery','CanvasBanner'], function($, cb){
	var cb = new cb({
		backgroundImage: ['../images/index/EarthAndMoon.jpg'],
		canvasWidth: '1024',
		canvasHeight: '576',
		canvas: '#index-canvas',
		amount: [30, 20]
	});
	cb.init();
});
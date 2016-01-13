require.config({
	paths: {
		'jquery': '/lib/jQuery/jQuery',
		'CanvasBanner':'/js/plugin/CanvasBanner'
	}
});

require(['jquery','CanvasBanner'], function($, cb){
	var cb = new cb({
		backgroundImage: ['images/2015_10_26/git.jpg'],
		canvasWidth: '1024',
		canvasHeight: '576',
		canvas: '#index-canvas',
		amount: [60, 40]
	});
	cb.init();
});
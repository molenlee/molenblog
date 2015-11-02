require.config({
	paths: {
		'jquery': '../jQuery/jQuery',
		'CanvasBanner':'../plugin/CanvasBanner'
	}
});

require(['jquery','CanvasBanner'], function($, cb){
	var cb = new cb();
	cb.init();
});
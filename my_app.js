$(document).ready(function(){
	$('.cover').animate({height: '100%'}, 1000, 'swing')
		.animate({width: '80%'}, 1200, 'swing')
	$('.slider').delay(1000).animate({left: '100%'}, 1200, 'swing')
	// $('nav').delay(1000).animate({left: '100%'}, 1200, 'swing')
	// $('nav').transition({x: 0}, 1200, 'swig')
});
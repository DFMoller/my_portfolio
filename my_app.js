$(document).ready(function(){
	$('.cover').animate({height: '100%'}, 1000, 'swing')
		.animate({width: '80%'}, 1200, 'swing')
	$('#slider1').delay(1000).animate({left: '100%'}, 1200, 'swing')

	// Init Scroll Magic
	var controller = new ScrollMagic.Controller();

	var ourScene = new ScrollMagic.Scene({
		triggerElement: '#section2'
	})
	.setClassToggle('#sun-top-half', 'fade-in') //add class to sun-top-half
	.addTo(controller);
});
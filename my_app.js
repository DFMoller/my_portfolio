$(document).ready(function(){
	$('.cover').animate({height: '100%'}, 1000, 'swing')
		.animate({width: '80%'}, 1200, 'swing')
	$('#slider1').delay(1000).animate({left: '100%'}, 1200, 'swing')

	// Init Scroll Magic
	var controller = new ScrollMagic.Controller();

	//  Build a scene--SUN-LOGO
	var sunTopHalfScene = new ScrollMagic.Scene({
		triggerElement: '#section2',
		triggerHook: 0.6
		// This is where triggerHook will go: triggerHook: 1 for example. Remember to add comma after last command...
		// reverse: false --- if we want the animation to only happen once...
	})
	.setClassToggle('#sun-top-half', 'fade-in') //add class to sun-top-half
	// .addIndicators({})
	.addTo(controller);

	// SUN-SLIDER
	var sunSlider = new ScrollMagic.Scene({
		triggerElement: '#section2',
		// reverse: false
		triggerHook: 0.6
	})
	.setClassToggle('#slider2', 'slide-down') //add class to sun-top-half
	.addTo(controller);



	var slider3 = new ScrollMagic.Scene({
		triggerElement: '#section3',
		// reverse: false
		triggerHook: 0.25
	})
	.setClassToggle('#slider3', 'slide-from-right') //add class to sun-top-half
	// .addIndicators({})
	.addTo(controller);

});
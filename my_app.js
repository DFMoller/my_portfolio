$(document).ready(function(){
//The following line comes from the imagesloaded.pkgd.min.js library. It checks that the cover image is loaded before animations start.
	$('.cover').imagesLoaded(function(){ 
		$('.cover').animate({height: '100%'}, 1000, 'swing')
			.animate({width: '80%'}, 1200, 'swing')
		$('#slider1').delay(1000).animate({left: '100%'}, 1200, 'swing')
		$('#disclaimer').delay(2000).animate({top: '45%'}, 1000, 'swing')
	})
	

	// Init Scroll Magic
	var controller = new ScrollMagic.Controller();

	 // Build a scene--SUN-LOGO
	var sunTopHalfScene = new ScrollMagic.Scene({
		triggerElement: '#section2',
		triggerHook: 0.6
		// This is where triggerHook will go: triggerHook: 1 for example. Remember to add comma after last command...
		// reverse: false --- if we want the animation to only happen once...
	})
	.setClassToggle('#sun-top-half', 'fade-in') //add class to sun-top-half
	// .addIndicators({})
	.addTo(controller);



	var project01Slider = new ScrollMagic.Scene({
		triggerElement: '#project01-slider',
		// reverse: false
		triggerHook: 0.9
	})
	.setClassToggle('#project01-slider', 'slide-from-right') //add class to sun-top-half
	.addTo(controller);



	var project02Slider = new ScrollMagic.Scene({
		triggerElement: '#project02-slider',
		// reverse: false
		triggerHook: 0.9
	})
	.setClassToggle('#project02-slider', 'slide-from-left') //add class to sun-top-half
	.addTo(controller);


// 	WORK EXPERIENCE
	// Stone3
	var stone3Slider = new ScrollMagic.Scene({
		triggerElement: '#stonethree',
		triggerHook: 0.7
	})
	.setClassToggle('#stone3-slider', 'slide-down')
	.addTo(controller);
	var stone3Content = new ScrollMagic.Scene({
		triggerElement: '#stonethree',
		triggerHook: 0.7
	})
	.setClassToggle('#stone3-content', 'slide-up')
	.addTo(controller);

	// YellowTail
	var ytSlider = new ScrollMagic.Scene({
		triggerElement: '#yellowtail',
		triggerHook: 0.7
	})
	.setClassToggle('#yt-slider', 'slide-up')
	.addTo(controller);
	var ytContent = new ScrollMagic.Scene({
		triggerElement: '#yellowtail',
		triggerHook: 0.7
	})
	.setClassToggle('#yt-content', 'slide-down')
	.addTo(controller);

	// WildClover
	var wildCloverSlider = new ScrollMagic.Scene({
		triggerElement: '#wildclover',
		triggerHook: 0.7
	})
	.setClassToggle('#wildclover-slider', 'slide-down')
	.addTo(controller);
	var wildCloverContent = new ScrollMagic.Scene({
		triggerElement: '#wildclover',
		triggerHook: 0.7
	})
	.setClassToggle('#wildclover-content', 'slide-up')
	.addTo(controller);
});
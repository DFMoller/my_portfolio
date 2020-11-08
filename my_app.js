$(document).ready(function(){
//The following line comes from the imagesloaded.pkgd.min.js library. It checks that the cover image is loaded before animations start.
	$('.cover').imagesLoaded(function(){ 

		function widthLimiter() {
			if (x.matches){
				$('.cover').animate({height: '80%'}, 1000, 'swing')
				$('.cover').animate({width: '80%'}, 1200, 'swing')
			}
			else{
				$('.cover').animate({height: '58%'}, 1000, 'swing')
			}
		}
		var x = window.matchMedia("(min-width: 700px)")
		widthLimiter(x)
		x.addListener(widthLimiter)

		$('#slider1').delay(1000).animate({left: '100%'}, 1200, 'swing')
	});
	

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


	var project03Slider = new ScrollMagic.Scene({
		triggerElement: '#project03-slider',
		// reverse: false
		triggerHook: 0.9
	})
	.setClassToggle('#project03-slider', 'slide-from-right') //add class to sun-top-half
	.addTo(controller);

//**********************************************vvvvvvvvvv******************TO BE UPDATED*************************
// 	WORK EXPERIENCE
	// Stone3
	var stone3Slider = new ScrollMagic.Scene({
		triggerElement: '#section4',
		triggerHook: 0.2
	})
	.setClassToggle('#stone3-slider', 'slide-down')
	.addTo(controller);
	var stone3Content = new ScrollMagic.Scene({
		triggerElement: '#section4',
		triggerHook: 0.2
	})
	.setClassToggle('#stone3-content', 'slide-up')
	.addTo(controller);

	// YellowTail
	var ytSlider = new ScrollMagic.Scene({
		triggerElement: '#section4',
		triggerHook: 0.2
	})
	.setClassToggle('#yt-slider', 'slide-up')
	.addTo(controller);
	var ytContent = new ScrollMagic.Scene({
		triggerElement: '#section4',
		triggerHook: 0.2
	})
	.setClassToggle('#yt-content', 'slide-down')
	.addTo(controller);

	// WildClover
	var wildCloverSlider = new ScrollMagic.Scene({
		triggerElement: '#section4',
		triggerHook: 0.2
	})
	.setClassToggle('#wildclover-slider', 'slide-down')
	.addTo(controller);
	var wildCloverContent = new ScrollMagic.Scene({
		triggerElement: '#section4',
		triggerHook: 0.2
	})
	.setClassToggle('#wildclover-content', 'slide-up')
	.addTo(controller);
});
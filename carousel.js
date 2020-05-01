document.addEventListener('DOMContentLoaded', (event) => {

	const carouselSlide = document.querySelector('.carousel-slider');
	const carouselElements = document.querySelectorAll('.carouselslider .element');

	const element1 = document.querySelector('#element1');
	const element2 = document.querySelector('#element2');
	const element3 = document.querySelector('#element3');

	const prevButton = document.querySelector('#prevButton');
	const nextButton = document.querySelector('#nextButton');

	const leftDot = document.querySelector('.left-dot');
	const midDot = document.querySelector('.mid-dot');
	const rightDot = document.querySelector('.right-dot');

	//counter
	let counter = 0;
	midDot.classList.add('full');
	if(nextButton){
		const elementWidth = $('.carousel .element').width();
		const sliderWidth = $('.carousel-slider').width()

		//Button Listeners
		nextButton.addEventListener('click', ()=>{
			if(counter == 1) return;
			if (counter == 0){
				rightDot.classList.add('full');
				midDot.classList.remove('full');
				leftDot.classList.remove('full');
				nextButton.classList.add('hidden');
			}
			if (counter == -1){
				rightDot.classList.remove('full');
				midDot.classList.add('full');
				leftDot.classList.remove('full');
				prevButton.classList.remove('hidden');
			}
			carouselSlide.style.transition = "transform 0.4s ease-in-out";
			counter++;
			carouselSlide.style.transform = 'translateX(' + (-0.5*sliderWidth -counter*(elementWidth+80)) + 'px)';
		})
		prevButton.addEventListener('click', ()=>{
			if(counter == -1) return;
			if (counter == 0){
				rightDot.classList.remove('full');
				midDot.classList.remove('full');
				leftDot.classList.add('full');
				prevButton.classList.add('hidden');
			}
			if (counter == 1){
				rightDot.classList.remove('full');
				midDot.classList.add('full');
				leftDot.classList.remove('full');
				nextButton.classList.remove('hidden');
			}
			carouselSlide.style.transition = "transform 0.4s ease-in-out";
			counter--;
			carouselSlide.style.transform = 'translateX(' + (-0.5*sliderWidth -counter*(elementWidth+80)) + 'px)';
		})
		console.log(rightDot.classList);
		console.log(rightDot.classList);
	}
})
	

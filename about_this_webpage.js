document.addEventListener('DOMContentLoaded', (event) => {

	window.onscroll = function() {stickyNav()}

	const navBar = document.querySelector('nav');
	
	var fromTop = navBar.offsetTop;

	function stickyNav() {
		if(window.pageYOffset >= fromTop) {
			navBar.classList.add('sticky');
		} else {
			navBar.classList.remove('sticky');
		}
	}

})
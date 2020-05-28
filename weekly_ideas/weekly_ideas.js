document.addEventListener('DOMContentLoaded', (event) => {

	window.onscroll = function() {stickyNav()}

	const navBar = document.querySelector('.iotw-title-container');
	
	var fromTop = navBar.offsetTop;

	function stickyNav() {
		if(window.pageYOffset >= (fromTop - 20)) {
			navBar.classList.add('sticky');
		} else {
			navBar.classList.remove('sticky');
		}
	}

})
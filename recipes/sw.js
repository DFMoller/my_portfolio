// Install the SW
self.addEventListener('install', evt => {
	console.log('service worker has been installed');
})

// listen for activation of the SW
self.addEventListener('activate', evt => {
	console.log('service worker has been activated');
})
// signup
document.addEventListener('DOMContentLoaded', (event) => {

	const signupBtn = document.querySelector('#signup-link');
	const signupContainer = document.querySelector('.signup-container');
	const signupForm = document.querySelector('#signup-form');
	const signoutBtn = document.querySelector('#signout-link');
	const loginForm = document.querySelector('#login-form');
	const newRecipeBtn = document.querySelector('#new-recipe-Btn');
	const createContainer = document.querySelector('.create-container');
	const recipeList = document.querySelector('#all-recipes');
	const accountDetails = document.querySelector('#account-details');
	const addAdmin = document.querySelector('#add-admin');

	// add admin cloud function
	addAdmin.addEventListener('submit', (e) => {
		e.preventDefault();
		const adminEmail = document.querySelector('#email-for-admin').value;
		// make reference to cloud function I wrote in index.js
		const addAdminRole = functions.httpsCallable('addAdminRole');
		addAdminRole({ email: adminEmail }).then(result => {
			console.log(result);
			addAdmin.reset();
		})
	})

	// listen for auth status changes
	auth.onAuthStateChanged(user => {
		if(user)
		{
			console.log('test1');
			// check for admin and then setup UI
			user.getIdTokenResult().then(idTokenResult => {
				user.admin = idTokenResult.claims.admin;
				setupUI(user);
			})

			// get data (recipes)
			db.collection('recipes').onSnapshot(snapshot => {
				setupRecipes(snapshot.docs, user);
			}, err => {
				console.log(err.message);
			});

			// global variable for username - stored in different doc, not under user.
			db.collection('users').doc(user.uid).get().then((doc) => {
				window.userName = doc.data().username; // this is a global variable
			})
		}
		else{
			recipeList.innerHTML = "<h1>SIGN IN TO VIEW RECIPES</h1>";
			window.userName = null;
			console.log('User Logged Out');
			loginForm.classList.remove('hidden');
			signupBtn.classList.remove('hidden');
			newRecipeBtn.classList.add('hidden');
			signoutBtn.classList.add('hidden');
			createContainer.classList.add('hidden');
			accountDetails.innerHTML = '';

			// remove admin elements also
			const adminItems = document.querySelectorAll('.admin');
			adminItems.forEach(item => {
				item.classList.add('hidden');
			})
		}
	})

	// ********************************CREATE NEW RECIPES********************************************
	const createForm = document.querySelector('#create-form');

	createForm.addEventListener('submit', (e) => {

		e.preventDefault();

		const ingredients = document.querySelector('#new-ingredients');
		const numIngredients = ingredients.childElementCount;
		const steps = document.querySelector('#new-steps');
		const numSteps = steps.childElementCount;
		const addImg = document.querySelector('.upload-img-btn');

		// // uploading image
		// var imageName = ''; // for later use
		// addImg.addEventListener('change', function(e){
		// 	console.log('event has listened');
		// 	// get file
		// 	var file = e.target.files[0];
		// 	imageName = file.name; // for later use

		// 	// create storage ref
		// 	var storageRef = firebase.storage().ref('recipe_pics/' + file.name);

		// 	// upload file
		// 	storageRef.put(file).then(() => {
		// 		console.log("image uploaded");
		// 	}).catch(err => {
		// 		console.log("Image upload error: ", err);
		// 	})
		// })

		// fetching newer ingredients from form
		var i;
		let iJson = "";
		for (i = 2; i <= numIngredients; i++){
			const iJsonInstance = `"ingredient${i}": "${createForm[`ingredient${i}`].value}", `;
			iJson += iJsonInstance;
		}

		// fetching newer steps from form
		var j;
		let sJson = "";
		for (j = 2; j <= numSteps; j++){
			const sJsonInstance = `"step${j}": "${createForm[`step${j}`].value}", `;
			sJson += sJsonInstance;
		}

		console.log(userName);

		// compiling JSON for adding to firebase
		const jsonString = `{
			"numIngredients": ${ingredients.childElementCount},
			"numSteps": ${steps.childElementCount},
			"ingredient1": "${createForm['ingredient1'].value}",
			"step1": "${createForm['step1'].value}",
			${iJson}
			${sJson}
			"username": "${userName}",
			"title": "${createForm['title'].value}"
		}`;
		const parsedJson = JSON.parse(jsonString);
		db.collection('recipes').add(parsedJson).then(() => {
			createForm.reset();
			createContainer.classList.add('hidden');
		});

	})

	// *********************************SIGN UP A NEW USER******************************
	signupBtn.addEventListener('click', function(){
		console.log('click');
		signupContainer.classList.toggle('hidden');
		document.querySelector('.signup-form svg').addEventListener('click', function(){
			signupContainer.classList.add('hidden');
		})
	})
	signupForm.addEventListener('submit', (e) => {
		e.preventDefault(); // so the page does not refresh after submitting form
		console.log('test');
		// get user info
		const email = signupForm['signup-email'].value;
		const password = signupForm['signup-password'].value;

		// sign up the user
		auth.createUserWithEmailAndPassword(email, password).then(cred => {
			return db.collection('users').doc(cred.user.uid).set({
				username: signupForm['user-name'].value
			});
		}).then(() => {
			console.log('User Signed Up');
			signupForm.reset();
			signupContainer.classList.add('hidden');
			signupForm.querySelector('.error').innerHTML = "";
		}).catch(err => {
			signupForm.querySelector('.error').innerHTML = err.message;
		})
	})

	// sign out the user
	signoutBtn.addEventListener('click', (e) => {
		e.preventDefault();
		auth.signOut();
	})

	// login users
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const email = loginForm['login-email'].value;
		const password = loginForm['login-pwd'].value;

		auth.signInWithEmailAndPassword(email, password).then(cred => {
			loginForm.classList.add('hidden');
			loginForm.reset();
			signupContainer.classList.add('hidden');
			loginForm.querySelector('.error').innerHTML = "";
		}).catch(err => {
			console.log(err.message);
			loginForm.querySelector('.error').innerHTML = err.message;
		})
	})
})
	
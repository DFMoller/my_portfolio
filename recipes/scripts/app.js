// setup UI
const setupUI = (user) => {

	const loginForm = document.querySelector('#login-form');
	const signupBtn = document.querySelector('#signup-link');
	const newRecipeBtn = document.querySelector('#new-recipe-Btn');
	const signoutBtn = document.querySelector('#signout-link');
	const addAdmin = document.querySelector('#add-admin');
	const addAdminBox = document.querySelector('.add-admin-box');
	const adminArrow = document.querySelector('.admin-options');
	const newAdminLink = document.querySelector('.new-admin-dropdown button');
	const newAdminDropdown = document.querySelector('.new-admin-dropdown');
	const closeNewAdmin = document.querySelector('#add-admin svg');

	console.log('User Logged In ', user);

	// for normal user logged in to see
	loginForm.classList.add('hidden');
	signupBtn.classList.add('hidden');
	newRecipeBtn.classList.remove('hidden');
	signoutBtn.classList.remove('hidden');

	showEmail(user);

	// for admins to see
	const adminItems = document.querySelectorAll('.admin');
	if (user.admin){
		adminItems.forEach(item => {
			console.log('user = admin');
			item.classList.remove('hidden');
		})
		// setup admin options UI
		adminArrow.addEventListener('click', function(){
			newAdminDropdown.classList.toggle('appear-slide-down');
			newAdminLink.addEventListener('click', function(){
				addAdminBox.classList.remove('hidden');
				closeNewAdmin.addEventListener('click', function(){
					addAdminBox.classList.add('hidden');
					newAdminDropdown.classList.remove('appear-slide-down');
				})
			})
		})
	}
	else{
		adminItems.forEach(item => {
			item.classList.add('hidden');
			console.log('test2');
		})
	}
}


// ****************************setup recipes from firebase to display******************************
const setupRecipes = (data, user) => {

	// same admin auth as in auth.js, just to govern delete button in recipe
	user.getIdTokenResult().then(idTokenResult => {
		user.admin = idTokenResult.claims.admin;

		var deleteBtnVisibility = "";
		if (user.admin){
			deleteBtnVisibility = "";
		}
		else{
			deleteBtnVisibility = "hidden";
		}

		let html = '';
		data.forEach(doc => {
			const recipe = doc.data();
			const numIngredients = recipe.numIngredients;
			const numSteps = recipe.numSteps;

			// Steps of recipe
			var i;
			let steps = '';
			for(i = 0; i < numSteps; i++){
				var field = `step${i+1}`;
				var value = recipe[`${field}`];
				const step = `<li>${value}</li>`;
				steps += step;
			}

			// Ingredients of recipe
			var j = 0;
			let ingredients = '';
			//These 4 lines are the first iteration of the for loop. This is to remove comma.
			var field = `ingredient${j+1}`;
			var value = recipe[`${field}`];
			const ingredient = `${value}`;
			ingredients += ingredient;

			for(j = 1; j < numIngredients; j++){
				var field = `ingredient${j+1}`;
				var value = recipe[`${field}`];
				const ingredient = `, ${value}`;
				ingredients += ingredient;
			}
			const li = `
				<li class="item" id="${doc.id}">
					<span class="userID">${recipe.username}</span>
					<img src="img/food-picture-default.png" alt="picture">
					<div class="text">
						<h2>${recipe.title}</h2>
						<p><i style="font-size: 13px;">${ingredients}</i></p>
						<ol class="steps">
							${steps}
						</ol>
					</div>
					<div class="delete-btn-box ${deleteBtnVisibility}"><a class="delete-btn admin">Delete</a></div>
				</li>
			`;
			html += li;
		})
		const recipeList = document.querySelector('#all-recipes');
		recipeList.innerHTML = html;

		// activate delete button with popup
		const deleteBtns = document.querySelectorAll('.delete-btn');
		deleteBtns.forEach(deleteBtn => {
			deleteBtn.addEventListener('click', function(){
				const confirmDelete = document.querySelector('.confirm-delete-recipe');
				const deleteYes = document.querySelector('.delete-recipe-yes');
				const deleteNo = document.querySelector('.delete-recipe-no');
				confirmDelete.classList.remove('hidden');
				deleteYes.addEventListener('click', (e) => {
					e.preventDefault();
					db.collection('recipes').doc(`${deleteBtn.parentNode.parentNode.id}`).delete().then(() => {
						confirmDelete.reset();
						confirmDelete.classList.add('hidden');
					});
					
				})
				deleteNo.addEventListener('click', (e) => {
					e.preventDefault();
					confirmDelete.reset();
					confirmDelete.classList.add('hidden');
				})
			})
		})

	})
}

const showEmail = (user) => {
	const accountDetails = document.querySelector('#account-details');
	const html = `${user.email}`;
	accountDetails.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', (event) => {

	const newRecipeBtn = document.querySelector('#new-recipe-Btn');
	const createContainer = document.querySelector('.create-container');
	const newSteps = document.querySelector('#new-steps');
	const addStepBtn = document.querySelector('#add-step-Btn');
	const addIngredientBtn = document.querySelector('#add-ingredient-Btn');
	const newIngredients = document.querySelector('#new-ingredients');

	// open new recipe form
	newRecipeBtn.addEventListener('click', function(){
		createContainer.classList.toggle('hidden');
		document.querySelector('.exitCreate').addEventListener('click', function(){
			createContainer.classList.add('hidden');
		})
	})

	// Creating new recipe ingredients (only functionality of form)
	addIngredientBtn.addEventListener('click', function(){
		var length = newIngredients.childElementCount;
		var inputNode = document.createElement("input");
		var xLabel = document.createElement("label");
		var numLabel = document.createElement("label");
		var xTextNode = document.createTextNode("x");
		var numTextNode = document.createTextNode(`${length + 1}`);
		var boxNode = document.createElement("div");
		boxNode.classList.add('newer-ingredients-box');

		inputNode.setAttribute("type", "text");
		inputNode.setAttribute("id", `ingredient${length + 1}`);
		inputNode.classList.add('newer-ingredients');
		inputNode.required = true;

		// x-button next to ingredient input
		xLabel.setAttribute("for", `ingredient${length + 1}`);
		xLabel.setAttribute("id", `ingredient-x${length + 1}`)
		xLabel.appendChild(xTextNode);
		xLabel.style.cssText = "position: absolute; top: 50%; transform: translateY(-50%); right: -10%; color: var(--green1);";

		// remove previous x-button
		if (length > 1) {
			var prevX = document.querySelector(`#ingredient-x${length}`);
			prevX.classList.add('hidden');
		}

		// number of the ingredient
		numLabel.setAttribute("for", `ingredient${length + 1}`);
		numLabel.appendChild(numTextNode);
		// numLabel.style.cssText = "position: absolute; top: 50%; transform: translateY(-50%); left: -10%;";
		numLabel.classList.add('input-num');

		boxNode.appendChild(inputNode);
		boxNode.appendChild(xLabel);
		boxNode.appendChild(numLabel);
		newIngredients.appendChild(boxNode);
		console.log(length + 1);

		// to delete new ingredient inputs
		xLabel.addEventListener('click', function(){
			xLabel.parentNode.parentNode.removeChild(xLabel.parentNode);
			console.log(newIngredients.childElementCount);

			// add back previous x
			if (length > 1){
				var prevX = document.querySelector(`#ingredient-x${length}`);
				prevX.classList.remove('hidden');
			}
		})
	})
	
	// Creating new recipe steps (only functionality of form)
	addStepBtn.addEventListener('click', function(){

		var length = newSteps.childElementCount;
		var inputNode = document.createElement("input");
		var xLabel = document.createElement("label");
		var xTextNode = document.createTextNode("x");
		var numLabel = document.createElement("label");
		var numTextNode = document.createTextNode(`${length + 1}`);
		var boxNode = document.createElement("div");
		boxNode.classList.add('newer-steps-box');

		inputNode.setAttribute("type", "text");
		inputNode.setAttribute("id", `step${length + 1}`);
		inputNode.classList.add('newer-steps');
		inputNode.required = true;
		
		xLabel.setAttribute("for", `step${length + 1}`);
		xLabel.setAttribute("id", `step-x${length + 1}`);
		xLabel.appendChild(xTextNode);
		xLabel.style.cssText = "position: absolute; top: 50%; transform: translateY(-50%); right: -10%; color: var(--green1);";

		// remove previous x-button
		if (length > 1) {
			var prevX = document.querySelector(`#step-x${length}`);
			prevX.classList.add('hidden');
		}

		// number of the step
		numLabel.setAttribute("for", `ingredient${length + 1}`);
		numLabel.appendChild(numTextNode);
		// numLabel.style.cssText = "position: absolute; top: 50%; transform: translateY(-50%); left: -10%;";
		numLabel.classList.add('input-num');

		boxNode.appendChild(inputNode);
		boxNode.appendChild(xLabel);
		boxNode.appendChild(numLabel);
		newSteps.appendChild(boxNode);
		console.log(length + 1);

		// to delete new step inputs
		xLabel.addEventListener('click', function(){
			xLabel.parentNode.parentNode.removeChild(xLabel.parentNode);
			console.log(newSteps.childElementCount);

			// add back previous x
			if (length > 1){
				var prevX = document.querySelector(`#step-x${length}`);
				prevX.classList.remove('hidden');
			}
		})
	})
})


const recipeTitle = document.querySelector('h1');
const recipeCategories = document.querySelector('h4');
const recipeDescription = document.querySelector('p');
const tag = document.getElementById('pais');
const recipeImage = document.getElementById('recipe-img');

const ingredientsList = document.querySelector('ul#ingredients');
const tags = document.querySelector('ul#horizontal-list');
const btn = document.querySelector("button");
const baseURL = "https://www.themealdb.com/api/json/v1/1/random.php"

function getDataFromAPI() {
	
	fetch(baseURL).then(response => {
		return response.json();
	}).then(response => {

		//Alterando título, descrição e imagem da receita
		recipeTitle.textContent = response.meals[0].strMeal;
		recipeDescription.textContent = response.meals[0].strInstructions;
		recipeCategories.textContent = response.meals[0].strTags;
		recipeImage.src = response.meals[0].strMealThumb;
		tag.textContent = response.meals[0].strArea;

		//Alterando lista de ingredientes 
		var ingredients = [];
		const meal = response.meals[0];
		
		for (i=1; i<=20; i++) {
			if(meal[`strIngredient${i}`]) {
				ingredients.push(`${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}` );
			}
		}

		ingredientsList.querySelectorAll('*').forEach(n => n.remove());

		ingredients.map(ingredient => {
			const listEl = document.createElement('li');
			var text = document.createTextNode(ingredient);
			
			listEl.appendChild(text);
			ingredientsList.appendChild(listEl);
		});
	});

}

btn.onclick = function() { 
    getDataFromAPI();
}

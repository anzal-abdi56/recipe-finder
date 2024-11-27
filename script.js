const API_URL = "https://recipe-finder-jpeh.onrender.com/recipes";

document.getElementById("showFormButton").addEventListener("click", function() {
    const formContainer = document.getElementById("formContainer");
    formContainer.classList.toggle("hidden");
});

async function getRecipes() {
    try {
        const response = await fetch(API_URL);
        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.log("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    const container = document.querySelector(".recipe-list");
    container.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';
        recipeDiv.innerHTML = `
          <h2>${recipe.name}</h2>
          <img src="${recipe.image}" alt="${recipe.name}">
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        `;
        container.appendChild(recipeDiv);
    })
}


getRecipes();

function postRecipes() {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const image = document.getElementById('image').value;
        const ingredients = document.getElementById('ingredients').value;

        let details = {
            name: name,
            image: image,
            ingredients: ingredients
        };

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(details)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Recipe has been added.');
            form.reset(); 
            getRecipes(); 
        })
        .catch(error => console.log("Error posting recipe:", error));
    });
}

postRecipes();


document.getElementById("search-btn").addEventListener("click", async function(event) {
    event.preventDefault();  

    const query = document.getElementById("search-input").value.toLowerCase();
    
    try {
        const response = await fetch(API_URL);
        const recipes = await response.json();
        
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query) || 
            recipe.ingredients.toLowerCase().includes(query)
        );
        
        displayRecipes(filteredRecipes);
    } catch (error) {
        console.log("Error searching recipes:", error);
    }
});

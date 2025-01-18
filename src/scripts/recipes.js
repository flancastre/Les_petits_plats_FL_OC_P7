// recipes.js
const recipesContainer = document.querySelector("#recipes-container"); // Assurez-vous que le conteneur existe dans le HTML
const recipeCountElement = document.getElementById("recipe-count");

// Fonction pour afficher les recettes
export const displayRecipes = (recipes, query) => {
  recipesContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter les nouvelles recettes

  if (recipes.length === 0) {
    recipesContainer.innerHTML = `<p>Aucune recette ne contient  "${query}" vous pouvez chercher «tarte aux pommes », « poisson », etc...</p>`;
    recipeCountElement.innerHTML = `0 recettes`;
    console.log(query);

    return;
  }

  recipeCountElement.innerHTML = `${recipes.length} recettes`;

  const limit = 6; // Limite à 6 recettes
  const recipesToDisplay = recipes.slice(0, limit);

  recipesToDisplay.forEach((recipe) => {
    const recipeElement = `
      <article class="shadow-lg rounded-lg bg-white relative">
        <p class="py-2 px-4 rounded-full right-5 top-5 absolute bg-[#FFD15B]">${
          recipe.time
        }min</p>
        <img class="h-96 w-full object-cover rounded-t-lg" src="assets/recipes/${
          recipe.image
        }" alt="${recipe.name}">
        <div class="flex flex-col p-4">
          <h3 class="font-bold">${recipe.name}</h3>
          <p class="my-2 uppercase text-gray-500">Recette</p>
          <p class="my-2">${recipe.description}</p>
          <p class="my-2 uppercase text-gray-500">Ingrédients</p>
          <div class="my-2 grid grid-cols-2">
            ${recipe.ingredients
              .map(
                (ingredient) => `
              <p class="mb-2">${ingredient.ingredient} <br> 
                <span class="text-gray-500">${
                  ingredient.quantity ? ingredient.quantity : ""
                } ${ingredient.unit ? ingredient.unit : ""}</span>
              </p>
            `
              )
              .join("")}
          </div>
        </div>
      </article>
    `;

    recipesContainer.innerHTML += recipeElement;
  });
};

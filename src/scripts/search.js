// search.js
import { displayRecipes } from "./recipes.js";
import { populateDropdowns } from "./dropdownPopulate.js";

export let currentDisplayedRecipes = [];

// Fonction de recherche
export const searchRecipes = (query, recipes) => {
  if (query.length < 3) {
    if (currentDisplayedRecipes === recipes) return;

    displayRecipes(recipes);
    populateDropdowns(recipes);
    currentDisplayedRecipes = recipes;
    return;
  }

  const lowerCaseQuery = query.toLowerCase();
  const words = lowerCaseQuery.split(" ");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesTitle = words.every((word) =>
      recipe.name.toLowerCase().includes(word)
    );
    const matchesIngredients = recipe.ingredients.some((ingredientObj) =>
      words.every((word) =>
        ingredientObj.ingredient.toLowerCase().includes(word)
      )
    );
    const matchesDescription = words.every((word) =>
      recipe.description.toLowerCase().includes(word)
    );

    return matchesTitle || matchesIngredients || matchesDescription;
  });

  displayRecipes(filteredRecipes);
  populateDropdowns(filteredRecipes);
  currentDisplayedRecipes = filteredRecipes;
};

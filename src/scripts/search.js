// search.js
import { displayRecipes } from "./recipes.js";
import { populateDropdowns } from "./dropdownPopulate.js";
import { updateDropdown } from "./dropdowns.js";

export let currentDisplayedRecipes = [];

// Fonction de recherche principale
export const searchRecipes = (query, recipes) => {
  if (query.length < 3) {
    if (currentDisplayedRecipes === recipes) return;

    displayRecipes(recipes, query);
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

  displayRecipes(filteredRecipes, query);
  populateDropdowns(filteredRecipes);
  currentDisplayedRecipes = filteredRecipes;
};

// Fonction de recherche dans les Ingrédients
export const searchIngredients = (query, recipes) => {
  const lowerCaseQuery = query.toLowerCase();

  // Extraire tous les ingrédients uniques de toutes les recettes
  const allIngredients = recipes.flatMap((recipe) =>
    recipe.ingredients.map((ingredientObj) => ingredientObj.ingredient)
  );

  // Filtrer les ingrédients selon la recherche
  const filteredIngredients = allIngredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(lowerCaseQuery)
  );

  // Mettre à jour le dropdown des ingrédients
  updateDropdown("ingredients", filteredIngredients);
};

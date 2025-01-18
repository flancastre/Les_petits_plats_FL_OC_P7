// main.js
import { recipes } from "../data/recipes.js"; // Assurez-vous que le chemin est correct
import { displayRecipes } from "./recipes.js";
import { populateDropdowns } from "./dropdownPopulate.js";
import {
  searchRecipes,
  currentDisplayedRecipes,
  searchIngredients,
} from "./search.js";
import { initializeDropdowns } from "./dropdowns.js";

// Charger et afficher les recettes
document.addEventListener("DOMContentLoaded", () => {
  try {
    displayRecipes(recipes); // Afficher les recettes lors du chargement de la page
    populateDropdowns(recipes); // Remplir les dropdowns
    initializeDropdowns(); // Initialiser les dropdowns
    const recipeCountElement = document.getElementById("recipe-count");

    // Mettre à jour le texte de la balise avec le nombre de recettes
    recipeCountElement.innerHTML = `${recipes.length} recettes`;
  } catch (error) {
    console.error("Erreur lors du chargement des recettes :", error);
  }
});

// Barre de recherche
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  searchRecipes(query, recipes);
});

//Barre de recherche ingrédients
const searchInputIngrédients = document.querySelector("#ingredients-search");
searchInputIngrédients.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  searchIngredients(query, recipes);
});

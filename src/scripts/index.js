// ALGO 1

// ------------AFFICHER DROPDOWN
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  let activeDropdown = null; // Variable pour suivre le dropdown actuellement ouvert

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const content = dropdown.querySelector(".dropdown-content");
    const icon = dropdown.querySelector(".dropdown-icon");

    // Fonction pour ouvrir un dropdown
    function openDropdown() {
      if (activeDropdown && activeDropdown !== dropdown) {
        closeDropdown(activeDropdown); // Ferme le dropdown précédemment ouvert
      }
      content.classList.remove("hidden");
      icon.src = "./assets/dropdown-open.png";
      activeDropdown = dropdown; // Définit le dropdown actif
    }

    // Fonction pour fermer un dropdown
    function closeDropdown(dropdownToClose) {
      const contentToClose = dropdownToClose.querySelector(".dropdown-content");
      const iconToClose = dropdownToClose.querySelector(".dropdown-icon");
      contentToClose.classList.add("hidden");
      iconToClose.src = "./assets/dropdown-close.png";
      if (activeDropdown === dropdownToClose) {
        activeDropdown = null; // Réinitialise le dropdown actif
      }
    }

    // Toggle du dropdown actuel
    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Empêche de fermer immédiatement
      if (content.classList.contains("hidden")) {
        openDropdown();
      } else {
        closeDropdown(dropdown);
      }
    });

    // Fermer le dropdown actif si on clique ailleurs
    document.addEventListener("click", (e) => {
      if (activeDropdown && !activeDropdown.contains(e.target)) {
        closeDropdown(activeDropdown);
      }
    });
  });
});

// -----------REMPLIR DROPDOWN

// Récupérer les éléments uniques dans chaque catégorie
const getUniqueItems = (data, category) => {
  const items = new Set(); // Utiliser un Set pour éviter les doublons

  data.forEach((recipe) => {
    if (category === "ingredients") {
      // Ingrédients : ajouter l'élément "ingredient" de chaque recette
      recipe[category].forEach((item) => {
        items.add(item.ingredient);
      });
    } else if (category === "appliance") {
      // Appareil : ajouter directement l'appareil à chaque recette
      items.add(recipe[category]);
    } else if (category === "ustensils") {
      // Ustensiles : ajouter chaque ustensile s'il y en a
      recipe[category].forEach((item) => {
        items.add(item);
      });
    }
  });

  return [...items]; // Convertir en tableau
};

// Afficher les éléments uniques dans les dropdowns
const populateDropdowns = (data) => {
  // Ingrédients
  const ingredients = getUniqueItems(data, "ingredients");
  const ingredientsDropdown = document
    .querySelector(".dropdown-content")
    .querySelector("p");
  ingredientsDropdown.innerHTML = ingredients
    .map((ingredient) => `<p class="my-2">${ingredient}</p>`)
    .join("");

  // Appareils
  const appliances = getUniqueItems(data, "appliance");
  const appliancesDropdown = document
    .querySelectorAll(".dropdown-content")[1]
    .querySelector("p");
  appliancesDropdown.innerHTML = appliances
    .map((appliance) => `<p class="my-2">${appliance}</p>`)
    .join("");

  // Ustensiles
  const ustensils = getUniqueItems(data, "ustensils");
  const ustensilsDropdown = document
    .querySelectorAll(".dropdown-content")[2]
    .querySelector("p");
  ustensilsDropdown.innerHTML = ustensils
    .map((ustensil) => `<p class="my-2 capitalize">${ustensil}</p>`)
    .join("");
};

// ---------------------------------
// index.js
import { recipes } from "../data/recipes.js"; // Assurez-vous que le chemin est correct.
console.log(recipes);

const recipesContainer = document.querySelector("#recipes-container"); // Assurez-vous que le conteneur existe dans le HTML

// Fonction pour afficher les recettes
const displayRecipes = (recipes) => {
  recipesContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter les nouvelles recettes

  if (recipes.length === 0) {
    recipesContainer.innerHTML = "<p>Aucune recette trouvée.</p>";
    return;
  }

  const limit = 6; // Limite à 10 recettes
  const recipesToDisplay = recipes.slice(0, limit); // Extraire les 10 premières recettes

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

    // Ajouter l'article au conteneur
    recipesContainer.innerHTML += recipeElement;
  });
};

// Charger et afficher les recettes
document.addEventListener("DOMContentLoaded", () => {
  try {
    displayRecipes(recipes); // Afficher les recettes lors du chargement de la page
    // Sélectionner la balise <p> où afficher le nombre de recettes
    populateDropdowns(recipes);
    const recipeCountElement = document.getElementById("recipe-count");

    // Mettre à jour le texte de la balise avec le nombre de recettes
    recipeCountElement.innerHTML = `${recipes.length} recettes`;
  } catch (error) {
    console.error("Erreur lors du chargement des recettes :", error);
  }
});

// ALGO 1

const searchInput = document.querySelector("#search-input"); // Barre de recherche principale
let currentDisplayedRecipes = recipes; // Contient les recettes actuellement affichées
// Fonction de recherche
const searchRecipes = (query) => {
  // Si moins de 3 caractères et que toutes les recettes sont déjà affichées, ne rien faire
  if (query.length < 3) {
    if (currentDisplayedRecipes === recipes) {
      return;
    }

    // Réafficher toutes les recettes si ce n'est pas déjà fait
    displayRecipes(recipes);
    populateDropdowns(recipes); // Mettre à jour les dropdowns avec toutes les recettes
    currentDisplayedRecipes = recipes; // Mettre à jour l'état des recettes affichées
    return;
  }

  // Convertir la recherche en minuscule pour éviter les problèmes de casse
  const lowerCaseQuery = query.toLowerCase();

  // Découper la chaîne de recherche en mots
  const words = lowerCaseQuery.split(" "); // Découper la recherche en mots

  // Filtrer les recettes
  const filteredRecipes = recipes.filter((recipe) => {
    // Vérifier le titre : chaque mot doit être présent
    const matchesTitle = words.every((word) =>
      recipe.name.toLowerCase().includes(word)
    );

    // Vérifier les ingrédients : chaque mot doit être présent dans un ingrédient
    const matchesIngredients = recipe.ingredients.some((ingredientObj) =>
      words.every((word) =>
        ingredientObj.ingredient.toLowerCase().includes(word)
      )
    );

    // Vérifier la description : chaque mot doit être présent
    const matchesDescription = words.every((word) =>
      recipe.description.toLowerCase().includes(word)
    );

    // Retourner vrai si l'un des champs correspond
    return matchesTitle || matchesIngredients || matchesDescription;
  });

  // Afficher les recettes filtrées
  displayRecipes(filteredRecipes);
  populateDropdowns(filteredRecipes); // Mettre à jour les dropdowns avec les recettes filtrées
  currentDisplayedRecipes = filteredRecipes; // Mettre à jour l'état des recettes affichées
};

// Écouteur d'événement sur la barre de recherche
searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim(); // Texte saisi, sans espaces inutiles

  // Toujours appeler la fonction de recherche, elle gère à la fois les cas de recherche et de suppression
  searchRecipes(query);
});

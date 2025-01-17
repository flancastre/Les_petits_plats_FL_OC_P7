// dropdownPopulate.js

// Récupérer les éléments uniques dans chaque catégorie
export const getUniqueItems = (data, category) => {
  const items = new Set(); // Utiliser un Set pour éviter les doublons

  data.forEach((recipe) => {
    if (category === "ingredients") {
      recipe[category].forEach((item) => {
        items.add(item.ingredient);
      });
    } else if (category === "appliance") {
      items.add(recipe[category]);
    } else if (category === "ustensils") {
      recipe[category].forEach((item) => {
        items.add(item);
      });
    }
  });

  return [...items]; // Convertir en tableau
};

// Afficher les éléments uniques dans les dropdowns
export const populateDropdowns = (data) => {
  const ingredients = getUniqueItems(data, "ingredients");
  const appliances = getUniqueItems(data, "appliance");
  const ustensils = getUniqueItems(data, "ustensils");

  // Ingrédients
  const ingredientsDropdown = document
    .querySelector(".dropdown-content")
    .querySelector("p");
  ingredientsDropdown.innerHTML = ingredients
    .map((ingredient) => `<p class="my-2">${ingredient}</p>`)
    .join("");

  // Appareils
  const appliancesDropdown = document
    .querySelectorAll(".dropdown-content")[1]
    .querySelector("p");
  appliancesDropdown.innerHTML = appliances
    .map((appliance) => `<p class="my-2">${appliance}</p>`)
    .join("");

  // Ustensiles
  const ustensilsDropdown = document
    .querySelectorAll(".dropdown-content")[2]
    .querySelector("p");
  ustensilsDropdown.innerHTML = ustensils
    .map((ustensil) => `<p class="my-2 capitalize">${ustensil}</p>`)
    .join("");
};

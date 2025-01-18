// dropdowns.js
let activeDropdown = null; // Variable pour suivre le dropdown actuellement ouvert

// Fonction pour ouvrir un dropdown
export function openDropdown(dropdown) {
  const content = dropdown.querySelector(".dropdown-content");
  const icon = dropdown.querySelector(".dropdown-icon");

  if (activeDropdown && activeDropdown !== dropdown) {
    closeDropdown(activeDropdown); // Ferme le dropdown précédemment ouvert
  }

  content.classList.remove("hidden");
  icon.src = "./assets/dropdown-open.png";
  activeDropdown = dropdown; // Définit le dropdown actif
}

// Fonction pour fermer un dropdown
export function closeDropdown(dropdownToClose) {
  const contentToClose = dropdownToClose.querySelector(".dropdown-content");
  const iconToClose = dropdownToClose.querySelector(".dropdown-icon");

  contentToClose.classList.add("hidden");
  iconToClose.src = "./assets/dropdown-close.png";

  if (activeDropdown === dropdownToClose) {
    activeDropdown = null; // Réinitialise le dropdown actif
  }
}

// Fonction pour initialiser les dropdowns
export function initializeDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const content = dropdown.querySelector(".dropdown-content");

    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Empêche de fermer immédiatement
      if (content.classList.contains("hidden")) {
        openDropdown(dropdown);
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
}

// Fonction pour mettre à jour le dropdown
export const updateDropdown = (category, filteredItems) => {
  const dropdownContent = document
    .querySelector(".dropdown-content")
    .querySelector("p");

  // Crée un Set pour enlever les doublons
  const uniqueItems = [...new Set(filteredItems)];
  dropdownContent.innerHTML = "";

  if (uniqueItems.length > 0) {
    filteredItems.forEach((item) => {
      const p = document.createElement("p");
      p.classList.add("my-2");
      p.textContent = item;
      dropdownContent.appendChild(p);
    });
  } else {
    dropdownContent.innerHTML = "<p>Aucun résultat trouvé</p>";
  }
};

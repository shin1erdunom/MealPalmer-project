import { estFavori, toggleFavori, ajouterAuPlanning } from "./storage.js";

const modale = document.getElementById("modale-recette");
const modaleContenu = document.querySelector(".modale-contenu");
const fermerModaleBtn = document.getElementById("fermer-modale");

let dernierElementFocus = null;

export function ouvrirModale(recette, elementDeclencheur) {
  dernierElementFocus = elementDeclencheur;

  document.getElementById("modale-image").src = recette.image;
  document.getElementById("modale-image").alt = `image de ${recette.nom}`;
  document.getElementById("modale-categorie").textContent = recette.categorie;
  document.getElementById("modale-origine").textContent = recette.origine;
  document.getElementById("modale-temps").textContent = `${recette.tempsPreparation} min`;
  document.getElementById("modale-titre").textContent = recette.nom;

  const listeIngredients = document.getElementById("modale-ingredients");
  listeIngredients.innerHTML = "";
  recette.ingredients.forEach((ingredient) => {
    const item = document.createElement("li");
    item.innerHTML = `<span>${ingredient.nom}</span><span>${ingredient.quantite}${ingredient.unite}</span>`;
    listeIngredients.appendChild(item);
  });

  const listeInstructions = document.getElementById("modale-instructions");
  listeInstructions.innerHTML = "";
  recette.instructions.forEach((etape, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<span class="etape-numero">${index + 1}</span><p>${etape}</p>`;
    listeInstructions.appendChild(item);
  });

  const boutonFavoriModale = document.getElementById("modale-favori");
  boutonFavoriModale.querySelector("img").src = estFavori(recette.id)
    ? "img/heart_filled.png"
    : "img/heart_empty.png";
  boutonFavoriModale.onclick = function () {
    toggleFavori(recette.id);
    boutonFavoriModale.querySelector("img").src = estFavori(recette.id)
      ? "img/heart_filled.png"
      : "img/heart_empty.png";
  };

  const boutonAjouterPlanning = document.getElementById("modale-ajouter-planning");
  boutonAjouterPlanning.onclick = function () {
    const jour = document.getElementById("jour-select").value;
    const repas = document.getElementById("repas-select").value;
    ajouterAuPlanning(jour, repas, recette.id);
    fermerModale();
  };

  modale.hidden = false;

  fermerModaleBtn.focus();
}

function fermerModale() {
  modale.hidden = true;

  if (dernierElementFocus) {
    dernierElementFocus.focus();
  }
}

fermerModaleBtn.addEventListener("click", fermerModale);

document.addEventListener("keydown", function (evenement) {
  if (evenement.key === "Escape" && !modale.hidden) {
    fermerModale();
  }
});

document.addEventListener("keydown", function (evenement) {
  if (evenement.key !== "Tab" || modale.hidden) {
    return;
  }

  const elementsFocusables = modaleContenu.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const premier = elementsFocusables[0];
  const dernier = elementsFocusables[elementsFocusables.length - 1];

  if (evenement.shiftKey) {
    if (document.activeElement === premier) {
      evenement.preventDefault();
      dernier.focus();
    }
  } else {
    if (document.activeElement === dernier) {
      evenement.preventDefault();
      premier.focus();
    }
  }
});
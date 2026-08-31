import { estFavori, toggleFavori } from "./storage.js";

const modale = document.getElementById("modale-recette");
const fermerModaleBtn = document.getElementById("fermer-modale");

export function ouvrirModale(recette) {
  document.getElementById("modale-image").src = recette.image;
  document.getElementById("modale-image").alt = `image de ${recette.nom}`;
  document.getElementById("modale-categorie").textContent = recette.categorie;
  document.getElementById("modale-origine").textContent = recette.origine;
  document.getElementById("modale-temps").textContent =
    `${recette.tempsPreparation} min`;
  document.getElementById("modale-titre").textContent = recette.nom;

  // Ingrédients
  const listeIngredients = document.getElementById("modale-ingredients");
  listeIngredients.innerHTML = "";
  recette.ingredients.forEach((ingredient) => {
    const item = document.createElement("li");
    item.innerHTML = `<span>${ingredient.nom}</span><span>${ingredient.quantite}${ingredient.unite}</span>`;
    listeIngredients.appendChild(item);
  });

  // Instructions numérotées
  const listeInstructions = document.getElementById("modale-instructions");
  listeInstructions.innerHTML = "";
  recette.instructions.forEach((etape, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<span class="etape-numero">${index + 1}</span><p>${etape}</p>`;
    listeInstructions.appendChild(item);
  });

  // Bouton favori dans la modale
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

  modale.hidden = false;
}

function fermerModale() {
  modale.hidden = true;
}

fermerModaleBtn.addEventListener("click", fermerModale);

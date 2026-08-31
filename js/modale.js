import { estFavori, toggleFavori } from "./storage.js";

const modale = document.getElementById("modale-recette");
const fermerModaleBtn = document.getElementById("fermer-modale");

export function ouvrirModale(recette) {
  document.getElementById("modale-image").src = recette.image;
  document.getElementById("modale-image").alt = `image de ${recette.nom}`;
  document.getElementById("modale-categorie").textContent = recette.categorie;
  document.getElementById("modale-titre").textContent = recette.nom;
  document.getElementById("modale-temps").textContent = `${recette.tempsPreparation} min`;

  const listeIngredients = document.getElementById("modale-ingredients");
  listeIngredients.innerHTML = "";
  recette.ingredients.forEach((ingredient) => {
    const item = document.createElement("li");
    item.textContent = `${ingredient.nom} - ${ingredient.quantite} ${ingredient.unite}`;
    listeIngredients.appendChild(item);
  });

  const listeInstructions = document.getElementById("modale-instructions");
  listeInstructions.innerHTML = "";
  recette.instructions.forEach((etape) => {
    const item = document.createElement("li");
    item.textContent = etape;
    listeInstructions.appendChild(item);
  });

  modale.hidden = false;
}

function fermerModale() {
  modale.hidden = true;
}

fermerModaleBtn.addEventListener("click", fermerModale);
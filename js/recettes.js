import { getRecettes } from "./data.js";
import { estFavori, toggleFavori } from "./storage.js";

let rechercheActuelle = "";
let filtreActuel = "";

function appliquerFiltres() {
  const recettesFiltrees = getRecettes().filter((recette) => {
    const correspondRecherche = recette.nom
      .toLowerCase()
      .includes(rechercheActuelle.toLowerCase());

    let correspondFiltre;
    if (filtreActuel === "rapide") {
      correspondFiltre = recette.tempsPreparation < 30;
    } else {
      correspondFiltre =
        filtreActuel === "" ||
        recette.origine === filtreActuel ||
        recette.categorie === filtreActuel;
    }
    return correspondRecherche && correspondFiltre;
  });
  const aucunResultat = document.getElementById("aucun-resultat");

  if (recettesFiltrees.length === 0) {
    aucunResultat.textContent =
      "Aucune recette ne correspond à votre recherche.";
  } else {
    aucunResultat.textContent = "";
  }
  afficherRecettes(recettesFiltrees);
}

export function afficherRecettes(recettes) {
  const recipeCard = document.getElementById("recipe-card");
  recipeCard.innerHTML = "";
  recettes.forEach((recette) => {
  const carte = document.createElement("div");
  carte.classList.add("img-card");
  carte.innerHTML = `<img src="${recette.image}" alt="image de ${recette.nom}">
                      <img src="${estFavori(recette.id) ? 'img/heart_filled.png' : 'img/heart_empty.png'}" alt="favoris" class="bouton-favori">
                      <span>${recette.categorie}</span>
                      <h3>${recette.nom}</h3>
                      <p>${recette.tempsPreparation} min</p>`;

  const boutonFavori = carte.querySelector(".bouton-favori");
  boutonFavori.addEventListener("click", function () {
    toggleFavori(recette.id);
    appliquerFiltres();
  });

  recipeCard.appendChild(carte);
});
}

const search = document.getElementById("search");

search.addEventListener("input", function () {
  rechercheActuelle = search.value;
  appliquerFiltres();
});

const boutonsFiltre = document.querySelectorAll("[data-filtre]");

boutonsFiltre.forEach((boutonFiltre) => {
  boutonFiltre.addEventListener("click", function () {
    filtreActuel = boutonFiltre.dataset.filtre;
    appliquerFiltres();
  });
});

const boutonTous = document.getElementById("tous");

boutonTous.addEventListener("click", function () {
  filtreActuel = "";
  appliquerFiltres();
});

import { getRecettes } from "./data.js";
import { getFavoris } from "./storage.js";
import { afficherRecettes } from "./recettes.js";

let rechercheFavoris = "";
let filtreFavoris = "";

export function afficherFavorisFiltres() {
  const idsFavoris = getFavoris();

  const recettesFavorites = getRecettes().filter((recette) => {
    const estFavorite = idsFavoris.includes(recette.id);

    const correspondRecherche = recette.nom
      .toLowerCase()
      .includes(rechercheFavoris.toLowerCase());

    let correspondFiltre;
    if (filtreFavoris === "rapide") {
      correspondFiltre = recette.tempsPreparation < 30;
    } else {
      correspondFiltre = filtreFavoris === "" || recette.categorie === filtreFavoris;
    }

    return estFavorite && correspondRecherche && correspondFiltre;
  });

  afficherRecettes(recettesFavorites, afficherFavorisFiltres);
}

export function initialiserRechercheFavoris() {
  const champRecherche = document.getElementById("search-favoris");
  champRecherche?.addEventListener("input", function () {
    rechercheFavoris = champRecherche.value;
    afficherFavorisFiltres();
  });
}

export function initialiserFiltresFavoris() {
  const boutonsFiltre = document.querySelectorAll(".bouton-fav [data-filtre]");

  boutonsFiltre.forEach((bouton) => {
    bouton.addEventListener("click", function () {
      filtreFavoris = bouton.dataset.filtre;
      afficherFavorisFiltres();
    });
  });

  const boutonTous = document.getElementById("all-recipes");
  boutonTous?.addEventListener("click", function () {
    filtreFavoris = "";
    afficherFavorisFiltres();
  });
}
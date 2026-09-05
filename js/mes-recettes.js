import { getRecettesPerso } from "./storage.js";
import { afficherRecettes } from "./recettes.js";

let rechercheMesRecettes = "";
let filtreMesRecettes = "";

export function afficherMesRecettesFiltrees() {
  const recettesFiltrees = getRecettesPerso().filter((recette) => {
    const correspondRecherche = recette.nom
      .toLowerCase()
      .includes(rechercheMesRecettes.toLowerCase());
    const correspondFiltre =
      filtreMesRecettes === "" || recette.categorie === filtreMesRecettes;
    return correspondRecherche && correspondFiltre;
  });

  afficherRecettes(recettesFiltrees, afficherMesRecettesFiltrees);
}

export function initialiserRechercheMesRecettes() {
  const champRecherche = document.getElementById("search-mes-recettes");
  champRecherche?.addEventListener("input", function () {
    rechercheMesRecettes = champRecherche.value;
    afficherMesRecettesFiltrees();
  });
}

export function initialiserFiltresMesRecettes() {
  const boutonsFiltre = document.querySelectorAll(".bouton-search [data-filtre]");
  boutonsFiltre.forEach((bouton) => {
    bouton.addEventListener("click", function () {
      filtreMesRecettes = bouton.dataset.filtre;
      afficherMesRecettesFiltrees();
    });
  });

  const boutonTout = document.getElementById("tout");
  boutonTout?.addEventListener("click", function () {
    filtreMesRecettes = "";
    afficherMesRecettesFiltrees();
  });
}

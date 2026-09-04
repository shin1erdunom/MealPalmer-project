import { chargerRecettes } from "./data.js";
import {
  afficherFavorisFiltres,
  initialiserRechercheFavoris,
  initialiserFiltresFavoris,
} from "./favoris.js";

async function main() {
  try {
    await chargerRecettes();
    afficherFavorisFiltres();
    initialiserRechercheFavoris();
    initialiserFiltresFavoris();
  } catch (erreur) {
    console.error("Erreur lors du chargement des favoris :", erreur);
  }
}

main();

const boutonsFiltre = document.querySelectorAll(".bouton-fav button");
boutonsFiltre.forEach((boutonFiltre) => {
  boutonFiltre.addEventListener("click", function () {
    boutonsFiltre.forEach((btn) => btn.classList.remove("bouton-actif"));
    boutonFiltre.classList.add("bouton-actif");

});
})
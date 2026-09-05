import { chargerRecettes } from "./data.js";
import { initialiserFormulaire } from "./formulaire.js";
import {
  afficherMesRecettesFiltrees,
  initialiserRechercheMesRecettes,
  initialiserFiltresMesRecettes,
} from "./mes-recettes.js";

async function main() {
  try {
    await chargerRecettes();
    afficherMesRecettesFiltrees();
    initialiserRechercheMesRecettes();
    initialiserFiltresMesRecettes();
    initialiserFormulaire();
  } catch (erreur) {
    console.error("Erreur lors du chargement de mes recettes :", erreur);
  }
}

main();

const boutonsFiltre = document.querySelectorAll(".bouton-search button");
boutonsFiltre.forEach((boutonFiltre) => {
  boutonFiltre.addEventListener("click", function () {
    boutonsFiltre.forEach((btn) => btn.classList.remove("bouton-active"));
    boutonFiltre.classList.add("bouton-active");

});
})

import { chargerRecettes } from "./data.js";
import { afficherRecettes } from "./recettes.js";
import { initialiserFormulaire } from "./formulaire.js";
import { getRecettesPerso } from "./storage.js";

async function main() {
  try {
    await chargerRecettes();
    afficherRecettes(getRecettesPerso());
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

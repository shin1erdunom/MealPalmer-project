import { chargerRecettes } from "./data.js";
import { afficherPlanning } from "./planning.js";

async function main() {
  try {
    await chargerRecettes();
    afficherPlanning();
  } catch (erreur) {
    console.error("Erreur lors du chargement du planning :", erreur);
  }
}

main();

const ajouterauPlanning = document.querySelector(".ajouter-au-planning");
const Planning = document.querySelector(".Planning");
const boutonsplus = document.querySelectorAll(".case:not(.remplie)");
let jour = "";
let repas = "";

boutonsplus.forEach((boutonPlus) => {
  boutonPlus.addEventListener("click", () => {
    jour = boutonPlus.dataset.jour;
    repas = boutonPlus.dataset.repas;
    ajouterauPlanning.style.display = "block";
  });
});

const fermerPlanning = document.getElementById("close-menu");
fermerPlanning.addEventListener("click", () => {
  ajouterauPlanning.style.display = "none";
});

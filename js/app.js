import { chargerRecettes, getRecettes } from "./data.js";
import { afficherRecettes } from "./recettes.js";

async function main() {
  const messageEtat = document.getElementById("message-etat");

  try {
    messageEtat.textContent = "Chargement en cours...";
    const recettes = await chargerRecettes();
    afficherRecettes(recettes);
    messageEtat.textContent = "";

    mettreAJourStatistiques();
  } catch (erreur) {
    messageEtat.textContent = "Un problème est survenu, veuillez réessayer";
  }
}

function mettreAJourStatistiques() {
  const italien = document.getElementById("italien");
  const vegetarien = document.getElementById("vegetarien");
  const rapide = document.getElementById("rapide");
  const autres = document.getElementById("autres");

  const recettesTab = getRecettes();
  const nbreRecetteTotal = recettesTab.length;

  let nbreItalien = 0;
  let nbreVegetarien = 0;
  let nbreRapide = 0;
  let nbreAutres = 0;

  recettesTab.forEach((recette) => {
    if (recette.origine === "Italienne") {
      nbreItalien++;
    } else if (recette.categorie === "Vegetarienne") {
      nbreVegetarien++;
    } else if (recette.tempsPreparation < 30) {
      nbreRapide++;
    } else {
      nbreAutres++;
    }
  });

  const pourcentageItalien = nbreRecetteTotal === 0 ? 0 : (nbreItalien / nbreRecetteTotal) * 100;
  const pourcentageVegetarien = nbreRecetteTotal === 0 ? 0 : (nbreVegetarien / nbreRecetteTotal) * 100;
  const pourcentageRapide = nbreRecetteTotal === 0 ? 0 : (nbreRapide / nbreRecetteTotal) * 100;
  const pourcentageAutres = nbreRecetteTotal === 0 ? 0 : (nbreAutres / nbreRecetteTotal) * 100;

  italien.style.width = `${pourcentageItalien}%`;
  vegetarien.style.width = `${pourcentageVegetarien}%`;
  rapide.style.width = `${pourcentageRapide}%`;
  autres.style.width = `${pourcentageAutres}%`;

  document.querySelector("#it-stat").textContent = `${pourcentageItalien}%`
    document.querySelector("#ve-stat").textContent = `${pourcentageVegetarien}%`
  document.querySelector("#ra-stat").textContent = `${pourcentageRapide}%`
  document.querySelector("#au-stat").textContent = `${pourcentageAutres}%`


}

main();

const boutons = document.querySelectorAll("#filtre button");
boutons.forEach((boutonActuel) => {
  boutonActuel.addEventListener("click", function () {
    boutons.forEach((b) => b.classList.remove("filter-active"));
    boutonActuel.classList.add("filter-active");
  });
});
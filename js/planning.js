import { getPlanning, retirerDuPlanning } from "./storage.js";
import { chargerRecettes } from "./data.js";

export async function afficherPlanning() {
  const planning = getPlanning();
  let recettes = [];

  try {
    recettes = await chargerRecettes();
  } catch (erreur) {
    console.error("Erreur lors du chargement des recettes pour le planning :", erreur);
    return;
  }

  const cases = document.querySelectorAll(".case");

  cases.forEach((caseElement) => {
    const jour = caseElement.dataset.jour;
    const repas = caseElement.dataset.repas;
    const idRecette = planning[jour][repas];
    const recette = idRecette ? recettes.find((r) => r.id === idRecette) : null;

    if (recette) {
      caseElement.classList.add("remplie");
      caseElement.innerHTML = `
        <img src="${recette.image}" alt="${recette.nom}">
        <span class="nom-recette-case">${recette.nom}</span>
        <button type="button" class="retirer-case" aria-label="Retirer ${recette.nom} du planning de ${jour} ${repas}">×</button>
      `;

      caseElement.querySelector(".retirer-case").addEventListener("click", function (evenement) {
        evenement.stopPropagation();
        retirerDuPlanning(jour, repas);
        afficherPlanning();
      });
    } else {
      caseElement.classList.remove("remplie");
      caseElement.innerHTML = `<span class="plus">+</span>`;
    }
  });
}

document.addEventListener("DOMContentLoaded", afficherPlanning);
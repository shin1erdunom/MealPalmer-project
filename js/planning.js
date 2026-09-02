import { getPlanning, retirerPlanning } from "./storage.js";
import { getRecettes } from "./data.js";

export function afficherPlanning() {
  const planning = getPlanning();
  Object.keys(planning).forEach((key) => {
    const [jour, repas] = key.split("-");
    const idRecette = planning[key];
    const recette = getRecettes().find((recette) => recette.id === idRecette);
    const caseElement = document.querySelector(
      `.case[data-jour="${jour}"][data-repas="${repas}"]`,
    );

    if (recette && caseElement) {
      caseElement.classList.add("remplie");
      caseElement.innerHTML = `
        <img src="${recette.image}" alt="${recette.nom}">
        <span class="nom-recette-case">${recette.nom}</span>
        <button type="button" class="retirer-case" aria-label="Retirer ${recette.nom} du planning de ${jour} ${repas}">×</button>
      `;

      const boutonRetirer = caseElement.querySelector(".retirer-case");
      boutonRetirer.addEventListener("click", function (evenement) {
        evenement.stopPropagation();
        retirerPlanning(jour, repas);
        caseElement.classList.remove("remplie");
        caseElement.innerHTML = '<span class="plus">+</span>';
      });
    }
  });
}
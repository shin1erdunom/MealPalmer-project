import { getPlanning } from "./storage";
import { chargerRecettes } from "./data.js";

export function afficherPlanning() {
  const planning = getPlanning();
  Object.keys(planning).forEach((key) => {
    const [jour, repas] = key.split("-");
    const idRecette = planning[jour][repas];
    const recette = getRecettes().find((recette) => recette.id === idRecette);
    const caseElement = document.querySelector(
      `.case[data-jour="${jour}"][data-repas="${repas}"]`,
    );

    if (recette) {
      caseElement.classList.add("remplie");
      caseElement.innerHTML = `
        <img src="${recette.image}" alt="${recette.nom}">
        <span class="nom-recette-case">${recette.nom}</span>
        <button type="button" class="retirer-case" aria-label="Retirer ${recette.nom} du planning de ${jour} ${repas}">×</button>
      `;
    }
  });
}

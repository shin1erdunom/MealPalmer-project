import { getRecettes } from "./data.js";

export function afficherRecettes(recettes) {
  const recipeCard = document.getElementById("recipe-card");
  recipeCard.innerHTML = "";
  recettes.forEach((recette) => {
    const carte = document.createElement("div");
    carte.innerHTML = `<img src="${recette.image}" alt="image de ${recette.nom}">
                        <span>${recette.categorie}</span>
                        <h3>${recette.nom}</h3>
                        <p>${recette.tempsPreparation}</p>`;

    recipeCard.appendChild(carte);
  });
}

const search = document.getElementById("search");

search.addEventListener("input", function () {
  const recherche = search.value;
  const recettesFiltrees = getRecettes().filter((recette) => {
    return recette.nom.toLowerCase().includes(recherche.toLowerCase());
  });
  afficherRecettes(recettesFiltrees);
});

const boutonsFiltre = document.querySelectorAll("[data-filtre]");

boutonsFiltre.forEach((boutonFiltre) => {
  boutonFiltre.addEventListener("click", function () {
    const boutonValue = boutonFiltre.dataset.filtre;
    const recettesFiltrees = getRecettes().filter((recette) => {
      return (
        recette.origine.includes(boutonValue) ||
        recette.categorie.includes(boutonValue)
      );
    });
    afficherRecettes(recettesFiltrees);
  });
});

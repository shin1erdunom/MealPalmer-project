import { getPlanning, getArticlesCoches, toggleArticleCoche, reinitialiserArticlesCoches } from "./storage.js";
import { getRecettes } from "./data.js";

const RAYONS = {
  Poulet: "Viandes",
  Boeuf: "Viandes",
  Poisson: "Poissons",
  Crevettes: "Poissons",
  Oeuf: "Produits laitiers",
  Lait: "Produits laitiers",
  Fromage: "Produits laitiers",
  Beurre: "Produits laitiers",
  Tofu: "Produits laitiers",
  Riz: "Épicerie",
  Farine: "Épicerie",
  Huile: "Épicerie",
  Sel: "Épicerie",
  Pâtes: "Épicerie",
  Tortilla: "Épicerie",
  Sucre: "Épicerie",
  Arachide: "Épicerie",
  Chocolat: "Épicerie",
  "Pâte miso": "Épicerie",
  "Algue wakame": "Épicerie",
  Haricot: "Épicerie",
  Plantain: "Fruits et légumes",
  Tomate: "Fruits et légumes",
  Oignon: "Fruits et légumes",
  Carotte: "Fruits et légumes",
  Poivron: "Fruits et légumes",
  Ail: "Fruits et légumes",
  Gingembre: "Fruits et légumes",
  Piment: "Fruits et légumes",
  "Pomme de terre": "Fruits et légumes",
  Laitue: "Fruits et légumes",
  Ananas: "Fruits et légumes",
  Banane: "Fruits et légumes",
  Mangue: "Fruits et légumes",
  Citron: "Fruits et légumes",
  Ndolé: "Fruits et légumes",
  Pain: "Épicerie",
};

function trouverRayon(nomIngredient) {
  return RAYONS[nomIngredient] ?? "Autres";
}


function fusionnerIngredients(ingredients) {
  const fusion = {};

  ingredients.forEach((ingredient) => {
    const cle = `${ingredient.nom}-${ingredient.unite}`;

    if (fusion[cle]) {
      fusion[cle].quantite += ingredient.quantite;
    } else {

      fusion[cle] = { ...ingredient };
    }
  });

  return Object.values(fusion);
}


function regrouperParRayon(ingredientsFusionnes) {
  const rayons = {};

  ingredientsFusionnes.forEach((ingredient) => {
    const rayon = trouverRayon(ingredient.nom);
    if (!rayons[rayon]) {
      rayons[rayon] = [];
    }
    rayons[rayon].push(ingredient);
  });

  return rayons;
}


export function genererListeCourses() {
  const planning = getPlanning();

  const recettesPlanifiees = Object.values(planning).map((id) =>
    getRecettes().find((recette) => recette.id === id),
  );

  const tousLesIngredients = recettesPlanifiees
    .filter((recette) => recette !== undefined)
    .map((recette) => recette.ingredients)
    .flat();

  const ingredientsFusionnes = fusionnerIngredients(tousLesIngredients);
  return regrouperParRayon(ingredientsFusionnes);
}


export function afficherListeCourses() {
  const rayons = genererListeCourses();
  const conteneur = document.getElementById("liste-courses");
  conteneur.innerHTML = "";

  const articlesCoches = getArticlesCoches();
  let totalArticles = 0;
  let totalCoches = 0;

  Object.keys(rayons).forEach((nomRayon) => {
    const carteRayon = document.createElement("div");
    carteRayon.classList.add("rayon-carte");
    carteRayon.innerHTML = `<h2>${nomRayon}</h2>`;

    const liste = document.createElement("ul");

    rayons[nomRayon].forEach((ingredient) => {
      totalArticles++;
      const cleArticle = `${ingredient.nom}-${ingredient.unite}`;
      const estCoche = articlesCoches.includes(cleArticle);
      if (estCoche) totalCoches++;

      const item = document.createElement("li");
      item.innerHTML = `
        <label>
          <input type="checkbox" ${estCoche ? "checked" : ""}>
          ${ingredient.nom}
          <span class="quantite-article">${ingredient.quantite}${ingredient.unite}</span>
        </label>
      `;

      const checkbox = item.querySelector("input");
      checkbox.addEventListener("change", function () {
        toggleArticleCoche(cleArticle);
        afficherListeCourses();
      });

      liste.appendChild(item);
    });

    carteRayon.appendChild(liste);
    conteneur.appendChild(carteRayon);
  });

  const progressionTexte = document.getElementById("progression");
  progressionTexte.textContent = `${totalCoches}/${totalArticles} articles achetés`;

  const barreProgression = document.getElementById("barre-de-progression");
  const pourcentage = totalArticles === 0 ? 0 : (totalCoches / totalArticles) * 100;
  barreProgression.style.width = `${pourcentage}%`;
}

export function initialiserBoutonReset() {
  const boutonReset = document.getElementById("reset");
  boutonReset?.addEventListener("click", function () {
    reinitialiserArticlesCoches();
    afficherListeCourses();
  });
}
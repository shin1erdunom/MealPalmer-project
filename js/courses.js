import { getPlanning, getArticlesCoches, toggleArticleCoche } from "./storage.js";
import { getRecettes } from "./data.js";

// Dictionnaire ingrédient -> rayon (complété à partir des ingrédients de recettes.json)
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

/**
 * Fusionne les ingrédients identiques (même nom ET même unité) en additionnant
 * leurs quantités. Deux mêmes ingrédients avec des unités différentes
 * (ex: "200 g" et "1 kg") restent sur des lignes séparées — voir README.
 */
function fusionnerIngredients(ingredients) {
  const fusion = {};

  ingredients.forEach((ingredient) => {
    const cle = `${ingredient.nom}-${ingredient.unite}`;

    if (fusion[cle]) {
      fusion[cle].quantite += ingredient.quantite;
    } else {
      // On copie l'objet (spread) pour ne jamais modifier les données
      // originales mises en cache dans data.js
      fusion[cle] = { ...ingredient };
    }
  });

  return Object.values(fusion);
}

/**
 * Regroupe une liste d'ingrédients fusionnés par rayon, à partir du
 * dictionnaire RAYONS.
 */
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

/**
 * Construit la liste de courses complète à partir du planning actuel.
 */
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

/**
 * Affiche la liste de courses regroupée par rayon dans le DOM,
 * avec des cases à cocher persistées dans localStorage.
 */
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
        afficherListeCourses(); // on rafraîchit tout pour recalculer la progression
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
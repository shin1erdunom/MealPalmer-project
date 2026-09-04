// storage.js — wrapper autour de localStorage (favoris + planning)

// ===== Favoris =====
export function getFavoris() {
  return JSON.parse(localStorage.getItem("favoris")) ?? [];
}

export function estFavori(id) {
  return getFavoris().includes(id);
}

export function toggleFavori(id) {
  const favoris = getFavoris();
  let nouveauxFavoris;

  if (favoris.includes(id)) {
    nouveauxFavoris = favoris.filter((favoriId) => favoriId !== id);
  } else {
    nouveauxFavoris = [...favoris, id];
  }

  localStorage.setItem("favoris", JSON.stringify(nouveauxFavoris));
}

// ===== Planning =====
export function getPlanning() {
  return JSON.parse(localStorage.getItem("planning")) ?? {};
}

export function sauvegarderPlanning(planning) {
  localStorage.setItem("planning", JSON.stringify(planning));
}

export function ajouterAuPlanning(jour, repas, idRecette) {
  let planning = getPlanning();
  let key = `${jour}-${repas}`;
  planning[key] = idRecette;
  sauvegarderPlanning(planning);
}

export function retirerPlanning(jour, repas) {
  let planning = getPlanning();
  let key = `${jour}-${repas}`;
  delete planning[key];
  sauvegarderPlanning(planning);
}

// ===== Liste de courses (articles cochés) =====
export function getArticlesCoches() {
  return JSON.parse(localStorage.getItem("articlesCoches")) ?? [];
}

export function toggleArticleCoche(cleArticle) {
  const articlesCoches = getArticlesCoches();
  let nouveauxArticles;

  if (articlesCoches.includes(cleArticle)) {
    nouveauxArticles = articlesCoches.filter((cle) => cle !== cleArticle);
  } else {
    nouveauxArticles = [...articlesCoches, cleArticle];
  }

  localStorage.setItem("articlesCoches", JSON.stringify(nouveauxArticles));
}

// ===== Recettes personnelles =====
export function getRecettesPerso() {
  return JSON.parse(localStorage.getItem("recettesPerso")) ?? [];
}

export function ajouterRecettePerso(recette) {
  const recettesPerso = getRecettesPerso();
  const nouvellesRecettes = [...recettesPerso, recette];
  localStorage.setItem("recettesPerso", JSON.stringify(nouvellesRecettes));
}
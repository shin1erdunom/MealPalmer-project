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


export function getPlanning(){
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
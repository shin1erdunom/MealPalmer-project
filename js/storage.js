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
  return JSON.parse(localStorage.getItem("planning")) ?? [];
}

export function sauvegarderPlanning(planning) {
  localStorage.setItem("planning", JSON.stringify(planning));
}

export function ajouterAuPlanning(jour, repas, idRecette) {
  let planning = getPlanning();

  if (!planning[jour]) {
    planning[jour] = {};
  }

  planning[jour][repas] = idRecette;

  sauvegarderPlanning(planning);
}

export function retirerDuPlanning(jour, repas) {
  let planning = getPlanning();

  if (planning[jour] && planning[jour][repas]) {
    delete planning[jour][repas];
    sauvegarderPlanning(planning);
  }
}
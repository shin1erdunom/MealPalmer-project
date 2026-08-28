export function getFavoris() {
  return JSON.parse(localStorage.getItem("favoris")) ?? [];
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

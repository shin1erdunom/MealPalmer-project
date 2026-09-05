
import { getRecettesPerso } from "./storage.js";

let recettesEnCache = null;

export async function chargerRecettes() {
  if (recettesEnCache !== null) {
    return recettesEnCache;
  }

  try {
    const reponse = await fetch('./data/recettes.json');

    if (!reponse.ok) {
      throw new Error(`Erreur ${reponse.status} : impossible de charger les recettes`);
    }

    const donnees = await reponse.json();
    recettesEnCache = donnees;
    return recettesEnCache;

  } catch (erreur) {
    console.error("Erreur lors du chargement des recettes :", erreur);
    throw erreur;
  }
}


export function getRecettes() {
  const recettesJSON = recettesEnCache ?? [];
  return [...recettesJSON, ...getRecettesPerso()];
}
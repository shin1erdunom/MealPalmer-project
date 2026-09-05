import { chargerRecettes } from "./data.js";
import { afficherListeCourses, initialiserBoutonReset } from "./courses.js";

async function main() {
  try {
    await chargerRecettes();
    afficherListeCourses();
    initialiserBoutonReset();
  } catch (erreur) {
    console.error("Erreur lors du chargement de la liste de courses :", erreur);
  }
}

main();
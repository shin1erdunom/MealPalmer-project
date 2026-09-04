import { chargerRecettes } from "./data.js";
import { afficherListeCourses } from "./courses.js";

async function main() {
  try {
    await chargerRecettes();
    afficherListeCourses();
  } catch (erreur) {
    console.error("Erreur lors du chargement de la liste de courses :", erreur);
  }
}

main();
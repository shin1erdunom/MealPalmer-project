import { chargerRecettes } from "./data.js";
import { afficherPlanning } from "./planning.js";

async function main() {
  try {
    await chargerRecettes();
    afficherPlanning();
  } catch (erreur) {
    console.error("Erreur lors du chargement du planning :", erreur);
  }
}

main();
import { chargerRecettes } from "./data.js";
import { afficherPlanning, initialiserPanneauAjout } from "./planning.js";

async function main() {
  try {
    await chargerRecettes();
    afficherPlanning();
    initialiserPanneauAjout();
  } catch (erreur) {
    console.error("Erreur lors du chargement du planning :", erreur);
  }
}

main();
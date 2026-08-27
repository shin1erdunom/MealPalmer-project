import { chargerRecettes } from "./data.js";
import { afficherRecettes } from "./recettes.js";
async function main() {
  const messageEtat = document.getElementById("message-etat");
  try {
    messageEtat.textContent = "Chargement en cours...";
    const recettes = await chargerRecettes();
    afficherRecettes(recettes);
    messageEtat.textContent = "";
  } catch (erreur) {
    messageEtat.textContent = "Un problème est survenu, veuillez réessayer";
  }
}

main();

const boutons = document.querySelectorAll("#filtre button");
boutons.forEach((butons) => {
  butons.addEventListener("click", function () {
    boutons.forEach((bouton) => {
      bouton.classList.remove("filter-active");
    });
    butons.classList.add("filter-active");
  });
});

import { getPlanning, ajouterAuPlanning, retirerPlanning } from "./storage.js";
import { getRecettes } from "./data.js";

const ajouterauPlanning = document.querySelector(".ajouter-au-planning");
const boutonsplus = document.querySelectorAll(".case:not(.remplie)");
const listeAjout = document.querySelector(".add");
const closeMenuBtn = document.getElementById("close-menu");
const cancelBtn = document.getElementById("cancel");

// "Post-it" pour mémoriser la case actuellement sélectionnée
let jour = "";
let repas = "";

export function afficherPlanning() {
  const planning = getPlanning();
  Object.keys(planning).forEach((key) => {
    const [j, r] = key.split("-");
    const idRecette = planning[key];
    const recette = getRecettes().find((recette) => recette.id === idRecette);
    const caseElement = document.querySelector(
      `.case[data-jour="${j}"][data-repas="${r}"]`,
    );

    if (recette && caseElement) {
      caseElement.classList.add("remplie");
      caseElement.innerHTML = `
        <img src="${recette.image}" alt="${recette.nom}">
        <span class="nom-recette-case">${recette.nom}</span>
        <button type="button" class="retirer-case" aria-label="Retirer ${recette.nom} du planning de ${j} ${r}">×</button>
      `;

      const boutonRetirer = caseElement.querySelector(".retirer-case");
      boutonRetirer.addEventListener("click", function (evenement) {
        evenement.stopPropagation();
        retirerPlanning(j, r);
        caseElement.classList.remove("remplie");
        caseElement.innerHTML = '<span class="plus">+</span>';
      });
    }
  });
}

function fermerPanneauAjout() {
  ajouterauPlanning.style.display = "none";
}

export function initialiserPanneauAjout() {
  // Ouvrir le panneau au clic sur une case vide
  boutonsplus.forEach((boutonPlus) => {
    boutonPlus.addEventListener("click", () => {
      jour = boutonPlus.dataset.jour;
      repas = boutonPlus.dataset.repas;
      ajouterauPlanning.hidden = false;
      ajouterauPlanning.style.display = "flex";
    });
  });

  // Fermer le panneau
  closeMenuBtn.addEventListener("click", fermerPanneauAjout);
  cancelBtn.addEventListener("click", fermerPanneauAjout);

  // Construire la liste des recettes disponibles, une seule fois
  listeAjout.innerHTML = "";
  getRecettes().forEach((recette) => {
    const item = document.createElement("div");
    item.classList.add("recette-a-ajouter");
    item.innerHTML = `
      <img src="${recette.image}" alt="${recette.nom}">
      <span>${recette.nom}</span>
      <div class="text-time">
        <img src="img/icon_clock.png" alt="">
        <p>${recette.tempsPreparation} min</p>
      </div>
      <button type="button" class="ajouter-recette-planning">Ajouter</button>
    `;

    const boutonAjouter = item.querySelector(".ajouter-recette-planning");
    boutonAjouter.addEventListener("click", () => {
      ajouterAuPlanning(jour, repas, recette.id);
      fermerPanneauAjout();
      afficherPlanning();
    });

    listeAjout.appendChild(item);
  });
}

const boutonsFiltre = document.querySelectorAll(".filtre button");
boutonsFiltre.forEach((boutonFiltre) => {
  boutonFiltre.addEventListener("click", function () {
    boutonsFiltre.forEach((btn) => btn.classList.remove("bouton-actif"));
    boutonFiltre.classList.add("bouton-actif");
    const filtre = boutonFiltre.id;
    const recettes = getRecettes();
    let recettesFiltrees = recettes;

    if (filtre === "petit-dej") {
      recettesFiltrees = recettes.filter((recette) => recette.categorie === "Petit-déjeuner");
    } else if (filtre === "vegetarien") {
      recettesFiltrees = recettes.filter((recette) => recette.vegetarien);
    } else if (filtre === "rapide") {
      recettesFiltrees = recettes.filter((recette) => recette.tempsPreparation <= 30);
    } else if (filtre === "diner") {
      recettesFiltrees = recettes.filter((recette) => recette.categorie === "Dîner");
    } else if (filtre === "dessert") {
      recettesFiltrees = recettes.filter((recette) => recette.categorie === "Dessert");
    }
    const aucunResultat = document.getElementById("aucun-resultat");
  if (recettesFiltrees.length === 0) {
    aucunResultat.style.display = "flex";
    aucunResultat.textContent =
      "Aucune recette ne correspond à votre recherche.";
  } else {
    aucunResultat.textContent = "";
  }

    listeAjout.innerHTML = "";
    recettesFiltrees.forEach((recette) => {
      const item = document.createElement("div");
      item.classList.add("recette-a-ajouter");
      item.innerHTML = `
        <img src="${recette.image}" alt="${recette.nom}">
        <span>${recette.nom}</span>
        <div class="text-time">
          <img src="img/icon_clock.png" alt="">
          <p>${recette.tempsPreparation} min</p>
        </div>
        <button type="button" class="ajouter-recette-planning">Ajouter</button>
      `;

      const boutonAjouter = item.querySelector(".ajouter-recette-planning");
      boutonAjouter.addEventListener("click", () => {
        ajouterAuPlanning(jour, repas, recette.id);
        fermerPanneauAjout();
        afficherPlanning();
      });

      listeAjout.appendChild(item);
    });
  });
});



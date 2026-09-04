import { ajouterRecettePerso } from "./storage.js";

const formulaireContainer = document.querySelector(".ajouter-une-recette");
const boutonAjouterRecette = document.getElementById("add-recipe");
const boutonAnnuler = document.getElementById("cancel");
const boutonEnregistrer = document.getElementById("save");

const champTitre = document.getElementById("title");
const messageErreurTitre = document.querySelector("#titre .message");
const champCategorie = document.getElementById("categorie");
const champOrigine = document.getElementById("origin");
const champTemps = document.getElementById("time");

const conteneurIngredients = document.querySelector(".ingredientgrid").parentElement;
const boutonAjouterIngredient = document.getElementById("add-ingredient");

const listeEtapes = document.querySelector(".etapes");
const boutonAjouterEtape = document.getElementById("add-step");

export function initialiserFormulaire() {
  boutonAjouterRecette.addEventListener("click", ouvrirFormulaire);
  boutonAnnuler.addEventListener("click", fermerFormulaire);
  boutonAjouterIngredient.addEventListener("click", ajouterLigneIngredient);
  boutonAjouterEtape.addEventListener("click", ajouterLigneEtape);
  boutonEnregistrer.addEventListener("click", validerEtEnregistrer);
}

function ouvrirFormulaire() {
  formulaireContainer.style.display = "block";
}

function fermerFormulaire() {
  formulaireContainer.style.display = "none";
}

// ===== Ajout dynamique d'une ligne d'ingrédient =====
function ajouterLigneIngredient() {
  const nombreLignes = document.querySelectorAll('[name="name-ingredient"]').length + 1;

  const champNom = document.createElement("input");
  champNom.type = "text";
  champNom.name = "name-ingredient";
  champNom.placeholder = "Ex: Pommes de terre";

  const champQuantite = document.createElement("input");
  champQuantite.type = "text";
  champQuantite.name = "quantity";
  champQuantite.placeholder = "Ex: 1kg";

  document.getElementById("Name-ingredient").appendChild(champNom);
  document.getElementById("quantite").appendChild(champQuantite);
}

// ===== Ajout dynamique d'une étape =====
function ajouterLigneEtape() {
  const numero = listeEtapes.querySelectorAll("li").length + 1;

  const item = document.createElement("li");
  item.innerHTML = `
    <div class="step-text">
      <span>${numero}</span>
      <p>Etape</p>
    </div>
    <textarea placeholder="Décrivez l'étape ici"></textarea>
  `;
  listeEtapes.appendChild(item);
}

// ===== Validation + enregistrement =====
function validerEtEnregistrer() {
  let formulaireValide = true;

  // Titre obligatoire
  if (champTitre.value.trim() === "") {
    messageErreurTitre.style.display = "flex";
    champTitre.setAttribute("aria-describedby", "erreur-titre");
    formulaireValide = false;
  } else {
    messageErreurTitre.style.display = "none";
    champTitre.removeAttribute("aria-describedby");
  }

  // Temps de préparation positif
  const temps = Number(champTemps.value);
  if (isNaN(temps) || temps <= 0) {
    formulaireValide = false;
  }

  // Ingrédients : au moins 1 avec nom ET quantité
  const nomsIngredients = document.querySelectorAll('[name="name-ingredient"]');
  const quantitesIngredients = document.querySelectorAll('[name="quantity"]');
  const ingredients = [];

  nomsIngredients.forEach((champ, index) => {
    const nom = champ.value.trim();
    const quantite = quantitesIngredients[index].value.trim();
    if (nom !== "" && quantite !== "") {
      ingredients.push({ nom, quantite, unite: "" });
    }
  });

  if (ingredients.length === 0) {
    formulaireValide = false;
  }

  // Instructions : au moins 1 étape remplie
  const champsEtapes = listeEtapes.querySelectorAll("textarea");
  const instructions = [];

  champsEtapes.forEach((champ) => {
    const texte = champ.value.trim();
    if (texte !== "") {
      instructions.push(texte);
    }
  });

  if (instructions.length === 0) {
    formulaireValide = false;
  }

  if (!formulaireValide) {
    return;
  }

  // Construction et sauvegarde de la recette
  const nouvelleRecette = {
    id: Date.now(), // identifiant unique basé sur l'horodatage
    nom: champTitre.value.trim(),
    categorie: champCategorie.value.trim(),
    origine: champOrigine.value.trim(),
    image: "",
    tempsPreparation: temps,
    ingredients: ingredients,
    instructions: instructions,
  };

  ajouterRecettePerso(nouvelleRecette);
  fermerFormulaire();
  window.location.reload();
}
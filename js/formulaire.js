import { getRecettes } from "./data.js";
import { afficherRecettes } from "./recettes.js";


const formulaireContainer = document.querySelector(".ajouter-une-recette");
const conteneurIngredients = document.querySelector(".ingredients");
const conteneurInstructions = document.querySelector(".instructions .etapes");
const btnAddIngredient = document.getElementById("add-ingredient");
const btnAddEtape = document.getElementById("add-etape");
const btnSave = document.getElementById("save");
const btnCancel = document.getElementById("cancel");


function ajouterChampIngredient() {
  const divIng = document.createElement("div");
  divIng.classList.add("ing");
  divIng.innerHTML = `
    <div class="ingredientgrid">
      <div>
        <label>Ingrédient</label>
        <input type="text" class="input-nom-ing" placeholder="ex: Farine">
      </div>
      <div>
        <label>Quantité / Unité</label>
        <input type="text" class="input-quantite-ing" placeholder="ex: 200g">
      </div>
    </div>
    <div class="trash">
      <button type="button" class="btn-supprimer-ing">
        <img src="img/icon_trash.png" alt="Supprimer">
      </button>
    </div>
  `;


  divIng.querySelector(".btn-supprimer-ing").addEventListener("click", () => {
    divIng.remove();
  });

  conteneurIngredients.appendChild(divIng);
}


function ajouterChampInstruction() {
  const nombreEtapes = conteneurInstructions.querySelectorAll("li").length + 1;
  const liEtape = document.createElement("li");
  liEtape.innerHTML = `
    <div class="step-text">
      <span>${nombreEtapes}</span>
      <p>Étape ${nombreEtapes}</p>
    </div>
    <textarea class="input-instruction" placeholder="Décrivez l'étape..."></textarea>
  `;

  conteneurInstructions.appendChild(liEtape);
}


function reinitialiserFormulaire() {
  document.getElementById("input-titre").value = "";
  document.getElementById("input-categorie").value = "";
  document.getElementById("input-origine").value = "";
  document.getElementById("input-temps").value = "";


  conteneurIngredients.innerHTML = "";
  ajouterChampIngredient();


  conteneurInstructions.innerHTML = "";
  ajouterChampInstruction();
}


function enregistrerRecette() {
  const nom = document.getElementById("input-titre")?.value.trim();
  const categorie = document.getElementById("input-categorie")?.value.trim();
  const origine = document.getElementById("input-origine")?.value.trim();
  const tempsPreparation = parseInt(document.getElementById("input-temps")?.value, 10);


  if (!nom || !categorie || isNaN(tempsPreparation)) {
    alert("Veuillez remplir au moins le titre, la catégorie et le temps de préparation.");
    return;
  }


  const ingredients = [];
  const lignesIngredients = conteneurIngredients.querySelectorAll(".ing");
  lignesIngredients.forEach((ligne) => {
    const nomIng = ligne.querySelector(".input-nom-ing")?.value.trim();
    const quantiteIng = ligne.querySelector(".input-quantite-ing")?.value.trim();

    if (nomIng) {
      ingredients.push({
        nom: nomIng,
        quantite: quantiteIng || "",
        unite: ""
      });
    }
  });


  const instructions = [];
  const champsInstructions = conteneurInstructions.querySelectorAll(".input-instruction");
  champsInstructions.forEach((champ) => {
    const texteEtape = champ.value.trim();
    if (texteEtape) {
      instructions.push(texteEtape);
    }
  });


  const nouvelleRecette = {
    id: Date.now().toString(),
    nom: nom,
    categorie: categorie,
    origine: origine || "Autre",
    tempsPreparation: tempsPreparation,
    image: "img/default_recipe.jpg",
    ingredients: ingredients,
    instructions: instructions
  };

  const recettes = getRecettes();
  recettes.push(nouvelleRecette);

  afficherRecettes(recettes);

  if (formulaireContainer) {
    formulaireContainer.style.display = "none";
  }
  reinitialiserFormulaire();
}

if (btnAddIngredient) {
  btnAddIngredient.addEventListener("click", ajouterChampIngredient);
}

if (btnAddEtape) {
  btnAddEtape.addEventListener("click", ajouterChampInstruction);
}

if (btnSave) {
  btnSave.addEventListener("click", (e) => {
    e.preventDefault();
    enregistrerRecette();
  });
}

if (btnCancel) {
  btnCancel.addEventListener("click", () => {
    if (formulaireContainer) {
      formulaireContainer.style.display = "none";
    }
    reinitialiserFormulaire();
  });
}
// src/data/facettes.js
// Séparer la configuration des facettes du code de rendu :
// pour ajouter/modifier une facette, on change seulement ce fichier.

export const CONFIG_FACETTES = [
  {
    id: "rayon",
    label: "Categorie",
    type: "checkbox",
    options: [
      "Fruits & légumes",
      "Produits laitiers",
      "Viandes & poissons",
      "Boulangerie",
      "Surgelés",
      "Épicerie sèche",
      "Boissons",
      "Produits ménagers",
    ]
  },
  {
    id: "preferences",
    label: "Préférences alimentaires",
    type: "checkbox",
    multiValeur: true,   // l'attribut produit correspondant est un tableau
    options: ["Bio", "Sans gluten", "Végane", "Sans lactose"]
  },
  {
    id: "marque",
    label: "Marque",
    type: "checkbox",
    options: ["Nature+", "Maison Dorée", "FraisCo"]
  },
  {
    id: "format",
    label: "Format",
    type: "checkbox",
    multiValeur: true,
    options: ["Petit", "Moyen", "Familial"]
  },
  {
    id: "promo",
    label: "Promotions",
    type: "toggle",
    optionLabel: "En rabais seulement"
  },
  {
    id: "prix",
    label: "Prix maximum",
    type: "range",
    min: 0,
    max: 250,
    step: 5
  }
];

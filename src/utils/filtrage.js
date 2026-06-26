// src/utils/filtrage.js
/**
 * Filtre les produits selon les filtres actifs et un terme de recherche.
 * AND entre facettes différentes, OR entre valeurs d'une même facette.
 * Retourne seulement les produits passant TOUS les filtres.
 */
export function filtrerProduits(produits, filtres, recherche = "") {
  const terme = recherche.trim().toLowerCase();

  return produits.filter((produit) => {
    // 0. Recherche texte libre (nom, description, rayon)
    if (terme) {
      const cible = `${produit.nom} ${produit.description} ${produit.rayon}`.toLowerCase();
      if (!cible.includes(terme)) return false;
    }

    // 1. Facettes checkbox simples (valeur unique sur le produit)
    const keysSimples = ["rayon", "marque"];
    for (const key of keysSimples) {
      if (filtres[key].length > 0 && !filtres[key].includes(produit[key])) {
        return false;
      }
    }

    // 2. Facettes multi-valeurs (l'attribut produit est un tableau)
    const keysMulti = ["preferences", "format"];
    for (const key of keysMulti) {
      if (filtres[key].length > 0) {
        const match = filtres[key].some((v) => produit[key].includes(v));
        if (!match) return false;
      }
    }

    // 3. Facette promo (toggle)
    if (filtres.promo && !produit.promo) return false;

    // 4. Facette prix (range)
    if (produit.prix > filtres.prix) return false;

    return true;
  });
}

export function filtresActifsCount(filtres) {
  let count = 0;
  count += filtres.rayon.length;
  count += filtres.preferences.length;
  count += filtres.marque.length;
  count += filtres.format.length;
  if (filtres.promo) count += 1;
  if (filtres.prix < 250) count += 1;
  return count;
}
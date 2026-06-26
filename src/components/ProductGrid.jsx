// src/components/ProductGrid.jsx
import { filtrerProduits } from "../utils/filtrage";
import ProductCard from "./ProductCard";

export default function ProductGrid({ produits, filtres, recherche, onAddToCart, setMobileOpen }) {
  const resultats = filtrerProduits(produits, filtres, recherche);

  return (
    <main className="product-grid">
      <div className="grid-toolbar">
        <p className="result-count">
          {resultats.length} produit{resultats.length !== 1 ? "s" : ""} trouvé
          {resultats.length !== 1 ? "s" : ""}
        </p>
        <button className="filter-mobile-btn" onClick={() => setMobileOpen(true)}>
          ⚙️ Filtres
        </button>
      </div>

      {resultats.length === 0 ? (
        <div className="no-result">
          <p>Aucun produit ne correspond à vos critères pour le moment.</p>
          <p className="no-result-sub">Essayez de retirer un filtre ou de modifier votre recherche.</p>
        </div>
      ) : (
        <div className="grid">
          {resultats.map((p) => (
            <ProductCard key={p.id} produit={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </main>
  );
}
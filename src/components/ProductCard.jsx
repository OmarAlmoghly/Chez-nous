// src/components/ProductCard.jsx
export default function ProductCard({ produit, onAddToCart }) {
  const prixActuel = produit.promo ? (produit.prix * 0.8).toFixed(2) : produit.prix.toFixed(2);
  const estHalal = produit.preferences.includes("Halal");

  return (
    <div className="card">
      {produit.promo && <span className="badge badge-promo">-20%</span>}
      <div className="card-image">{produit.emoji}</div>
      <div className="card-body">
        <p className="card-rayon">{produit.rayon} · {produit.marque}</p>
        <h4>{produit.nom}</h4>
        <p className="card-desc">{produit.description}</p>

        {/* Étiquettes claires : on informe sans qu'on ait à deviner */}
        {(estHalal || produit.alcool) && (
          <div className="card-etiquettes">
            {estHalal && <span className="etiquette etiquette-halal">☑ Halal</span>}
            {produit.alcool && <span className="etiquette etiquette-alcool">🍷 Contient de l'alcool</span>}
          </div>
        )}

        <div className="card-footer">
          <div className="prix">
            {produit.promo && <span className="prix-barre">{produit.prix.toFixed(2)} $</span>}
            <span className="prix-actuel">{prixActuel} $</span>
          </div>
          <button className="btn-add" onClick={() => onAddToCart(produit)}>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
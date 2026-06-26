// src/components/CheckoutFlow.jsx
import { useState } from "react";

const ETAPES = ["Panier", "Livraison", "Paiement", "Confirmation"];

export default function CheckoutFlow({ panier, setPanier, setPage, afficherToast }) {
  const [etape, setEtape] = useState(0);
  const [infos, setInfos] = useState({ nom: "", adresse: "", mode: "Livraison" });
  const [paiement, setPaiement] = useState({ carte: "", expiration: "", cvv: "" });
  const [numeroCommande, setNumeroCommande] = useState(null);
  const [erreurLivraison, setErreurLivraison] = useState("");
  const [erreurPaiement, setErreurPaiement] = useState("");

  const total = panier.reduce((sum, item) => {
    const prixUnit = item.promo ? item.prix * 0.8 : item.prix;
    return sum + prixUnit * item.qte;
  }, 0);

  const retirerArticle = (id) => setPanier(panier.filter((p) => p.id !== id));
  const changerQte = (id, delta) =>
    setPanier(panier.map((p) => (p.id === id ? { ...p, qte: Math.max(1, p.qte + delta) } : p)));

  const suivant = () => {
    if (etape === 1) {
      if (!infos.nom.trim() || !infos.adresse.trim()) {
        setErreurLivraison("⚠️ Veuillez remplir votre nom et votre adresse avant de continuer.");
        afficherToast && afficherToast("⚠️ Informations de livraison incomplètes");
        return;
      }
      setErreurLivraison("");
    }

    if (etape === 2) {
      if (!paiement.carte.trim() || !paiement.expiration.trim() || !paiement.cvv.trim()) {
        setErreurPaiement("⚠️ Veuillez remplir le numéro de carte, la date d'expiration et le CVV.");
        afficherToast && afficherToast("⚠️ Informations de paiement incomplètes");
        return;
      }
      setErreurPaiement("");
      setNumeroCommande("CN-" + Math.floor(100000 + Math.random() * 900000));
    }

    setEtape((e) => Math.min(e + 1, ETAPES.length - 1));
  };
  const precedent = () => setEtape((e) => Math.max(e - 1, 0));

  return (
    <div className="checkout">
      <ol className="stepper">
        {ETAPES.map((nom, i) => (
          <li
            key={nom}
            className={i === etape ? "step current" : i < etape ? "step done" : "step todo"}
          >
            <span className="step-circle">{i < etape ? "✓" : i + 1}</span>
            <span className="step-label">{nom}</span>
          </li>
        ))}
      </ol>

      {etape === 0 && (
        <section className="checkout-section">
          <h2>Votre panier</h2>
          {panier.length === 0 ? (
            <p>Votre panier est vide pour le moment. Retournez à la boutique pour ajouter des produits !</p>
          ) : (
            <>
              {panier.map((item) => (
                <div className="panier-ligne" key={item.id}>
                  <span className="panier-emoji">{item.emoji}</span>
                  <span className="panier-nom">{item.nom}</span>
                  <div className="panier-qte">
                    <button onClick={() => changerQte(item.id, -1)}>-</button>
                    <span>{item.qte}</span>
                    <button onClick={() => changerQte(item.id, 1)}>+</button>
                  </div>
                  <span className="panier-prix">
                    {((item.promo ? item.prix * 0.8 : item.prix) * item.qte).toFixed(2)} $
                  </span>
                  <button className="panier-retirer" onClick={() => retirerArticle(item.id)}>
                    Retirer
                  </button>
                </div>
              ))}
              <div className="panier-total">Total : {total.toFixed(2)} $</div>
            </>
          )}
        </section>
      )}

      {etape === 1 && (
        <section className="checkout-section">
          <h2>Informations de livraison</h2>
          <p className="section-help">Dites-nous où et comment vous voulez recevoir votre épicerie.</p>
          {erreurLivraison && <div className="alert alert-error" role="alert">{erreurLivraison}</div>}
          <label>
            Nom complet
            <input
              type="text"
              value={infos.nom}
              onChange={(e) => setInfos({ ...infos, nom: e.target.value })}
              placeholder="Ex. : Omar Almoghly"
              className={erreurLivraison && !infos.nom.trim() ? "input-error" : ""}
            />
          </label>
          <label>
            Adresse
            <input
              type="text"
              value={infos.adresse}
              onChange={(e) => setInfos({ ...infos, adresse: e.target.value })}
              placeholder="Ex. : 123 rue Principale, Ottawa"
              className={erreurLivraison && !infos.adresse.trim() ? "input-error" : ""}
            />
          </label>
          <label>
            Mode de réception
            <select value={infos.mode} onChange={(e) => setInfos({ ...infos, mode: e.target.value })}>
              <option>Livraison</option>
              <option>Cueillette en magasin</option>
            </select>
          </label>
        </section>
      )}

      {etape === 2 && (
        <section className="checkout-section">
          <h2>Paiement</h2>
          <p className="section-help">Vos informations sont protégées — il ne reste qu'une étape après celle-ci !</p>
          {erreurPaiement && <div className="alert alert-error" role="alert">{erreurPaiement}</div>}
          <label>
            Numéro de carte
            <input
              type="text"
              maxLength="16"
              value={paiement.carte}
              onChange={(e) => setPaiement({ ...paiement, carte: e.target.value })}
              placeholder="•••• •••• •••• ••••"
              className={erreurPaiement && !paiement.carte.trim() ? "input-error" : ""}
            />
          </label>
          <div className="form-row">
            <label>
              Expiration
              <input
                type="text"
                placeholder="MM/AA"
                value={paiement.expiration}
                onChange={(e) => setPaiement({ ...paiement, expiration: e.target.value })}
                className={erreurPaiement && !paiement.expiration.trim() ? "input-error" : ""}
              />
            </label>
            <label>
              CVV
              <input
                type="text"
                maxLength="3"
                value={paiement.cvv}
                onChange={(e) => setPaiement({ ...paiement, cvv: e.target.value })}
                className={erreurPaiement && !paiement.cvv.trim() ? "input-error" : ""}
              />
            </label>
          </div>
        </section>
      )}

      {etape === 3 && (
        <section className="checkout-section confirmation">
          <h2>✅ Merci, {infos.nom || "cher client"} !</h2>
          <p>Votre commande est confirmée et sera bientôt en route.</p>
          <p className="numero-commande">Numéro de commande : <strong>{numeroCommande}</strong></p>
          <p className="section-help">
            {infos.mode === "Livraison"
              ? "On vous livre ça directement chez vous, comme si c'était nous-mêmes qui faisions vos courses."
              : "Votre commande vous attendra en magasin, prête à être ramassée."}
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              setPanier([]);
              setEtape(0);
              setPage("shop");
            }}
          >
            Retour à la boutique
          </button>
        </section>
      )}

      {etape < 3 && (
        <div className="checkout-actions">
          {etape > 0 && (
            <button className="btn-secondary" onClick={precedent}>
              ← Retour
            </button>
          )}
          <button
            className="btn-primary"
            disabled={etape === 0 && panier.length === 0}
            onClick={suivant}
          >
            {etape === 2 ? "Confirmer la commande" : "Continuer →"}
          </button>
        </div>
      )}
    </div>
  );
}
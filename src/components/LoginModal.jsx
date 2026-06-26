// src/components/LoginModal.jsx
import { useState } from "react";

export default function LoginModal({ onClose, onLogin }) {
  const [nom, setNom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [recevoirOffres, setRecevoirOffres] = useState(true);
  const [erreur, setErreur] = useState("");

  const valider = (e) => {
    e.preventDefault();
    if (!nom.trim() || !courriel.trim()) {
      setErreur("⚠️ Veuillez remplir votre nom et votre courriel pour continuer.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(courriel)) {
      setErreur("⚠️ Veuillez entrer une adresse courriel valide.");
      return;
    }
    onLogin({ nom: nom.trim(), courriel: courriel.trim(), recevoirOffres });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>
        <h2>Connexion</h2>
        <p className="section-help">
          Connectez-vous pour être averti·e dès qu'il y a une offre sur nos produits.
        </p>

        {erreur && <div className="alert alert-error" role="alert">{erreur}</div>}

        <form onSubmit={valider}>
          <label>
            Nom complet
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex. : Sophie Tremblay"
            />
          </label>
          <label>
            Courriel
            <input
              type="email"
              value={courriel}
              onChange={(e) => setCourriel(e.target.value)}
              placeholder="ex. : sophie@courriel.com"
            />
          </label>

          <label className="toggle-label modal-toggle">
            <input
              type="checkbox"
              checked={recevoirOffres}
              onChange={() => setRecevoirOffres((v) => !v)}
            />
            🔔 M'avertir par courriel des offres et promotions
          </label>

          <button type="submit" className="btn-primary modal-submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
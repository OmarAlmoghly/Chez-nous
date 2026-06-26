// src/components/SurveyPage.jsx
import { useState } from "react";

export default function SurveyPage({ setPage }) {
  const [note, setNote] = useState(0);
  const [trouve, setTrouve] = useState(null);
  const [commentaire, setCommentaire] = useState("");
  const [envoye, setEnvoye] = useState(false);

  if (envoye) {
    return (
      <div className="survey-page">
        <h2>Merci mille fois ! 💚</h2>
        <p>Votre avis nous aide à faire de "Chez Nous" une meilleure épicerie, jour après jour.</p>
        <button className="btn-primary" onClick={() => setPage("shop")}>
          Retour à la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="survey-page">
      <h2>On aimerait connaître votre avis !</h2>
      <p className="section-help">Ça prend 30 secondes, et ça nous aide énormément. Merci d'être là avec nous.</p>

      <div className="survey-question">
        <label>Comment évaluez-vous votre expérience sur notre site ?</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={n <= note ? "star filled" : "star"}
              onClick={() => setNote(n)}
              aria-label={`${n} étoiles`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="survey-question">
        <label>Avez-vous trouvé ce que vous cherchiez aujourd'hui ?</label>
        <div className="survey-toggle-group">
          <button
            className={trouve === true ? "toggle-btn active" : "toggle-btn"}
            onClick={() => setTrouve(true)}
          >
            Oui 👍
          </button>
          <button
            className={trouve === false ? "toggle-btn active" : "toggle-btn"}
            onClick={() => setTrouve(false)}
          >
            Pas vraiment 👎
          </button>
        </div>
      </div>

      <div className="survey-question">
        <label>Un commentaire à partager ? (optionnel)</label>
        <textarea
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          placeholder="Dites-nous tout, on lit chaque message !"
          rows={3}
        />
      </div>

      <button className="btn-primary" disabled={note === 0} onClick={() => setEnvoye(true)}>
        Envoyer mon avis
      </button>
    </div>
  );
}

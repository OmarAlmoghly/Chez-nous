// src/App.jsx
import { useState } from "react";
import { PRODUITS } from "./data/produits";
import { CONFIG_FACETTES } from "./data/facettes";
import Header from "./components/Header";
import FacetPanel from "./components/FacetPanel";
import ProductGrid from "./components/ProductGrid";
import CheckoutFlow from "./components/CheckoutFlow";
import SurveyPage from "./components/SurveyPage";
import LoginModal from "./components/LoginModal";
import Toast from "./components/Toast";

const FILTRES_INITIAUX = {
  rayon: [],
  preferences: [],
  marque: [],
  format: [],
  promo: false,
  prix: 250,
};

const CATEGORIES = [...new Set(PRODUITS.map((p) => p.rayon))].sort();

export default function App() {
  const [page, setPage] = useState("shop");
  const [filtres, setFiltres] = useState(FILTRES_INITIAUX);
  const [panier, setPanier] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [utilisateur, setUtilisateur] = useState(null);
  const [loginOuvert, setLoginOuvert] = useState(false);
  const [toast, setToast] = useState("");

  const afficherToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToast(""), 2500);
  };

  const toggleCheckbox = (facetteId, valeur) => {
    setFiltres((prev) => {
      const actuel = prev[facetteId];
      const updated = actuel.includes(valeur)
        ? actuel.filter((v) => v !== valeur)
        : [...actuel, valeur];
      return { ...prev, [facetteId]: updated };
    });
  };

  const setRange = (id, val) => setFiltres((prev) => ({ ...prev, [id]: val }));
  const toggleSwitch = (id) => setFiltres((prev) => ({ ...prev, [id]: !prev[id] }));
  const clearAll = () => setFiltres(FILTRES_INITIAUX);

  const ajouterAuPanier = (produit) => {
    setPanier((prev) => {
      const existant = prev.find((p) => p.id === produit.id);
      if (existant) {
        return prev.map((p) => (p.id === produit.id ? { ...p, qte: p.qte + 1 } : p));
      }
      return [...prev, { ...produit, qte: 1 }];
    });
    afficherToast(`✅ « ${produit.nom} » ajouté au panier !`);
  };

  const allerVersPromotions = () => {
    setFiltres((prev) => ({ ...prev, promo: true }));
    setPage("shop");
    setMobileOpen(false);
  };

  const selectionnerRayon = (rayon) => {
    setFiltres((prev) => ({ ...prev, rayon: [rayon] }));
    setPage("shop");
  };

  const ouvrirLogin = () => setLoginOuvert(true);
  const seConnecter = ({ nom, recevoirOffres }) => {
    setUtilisateur(nom);
    setLoginOuvert(false);
    afficherToast(
      recevoirOffres
        ? `👋 Bienvenue, ${nom} ! Vous serez averti·e de nos prochaines offres.`
        : `👋 Bienvenue, ${nom} !`
    );
  };
  const seDeconnecter = () => {
    setUtilisateur(null);
    afficherToast("À bientôt !");
  };

  const nbArticlesPanier = panier.reduce((sum, p) => sum + p.qte, 0);

  return (
    <div className="app-shell">
      <Header
        page={page}
        setPage={setPage}
        nbArticlesPanier={nbArticlesPanier}
        categories={CATEGORIES}
        recherche={recherche}
        setRecherche={setRecherche}
        onAllerPromotions={allerVersPromotions}
        onSelectRayon={selectionnerRayon}
        utilisateur={utilisateur}
        onOpenLogin={ouvrirLogin}
        onLogout={seDeconnecter}
      />

      {page === "shop" && (
        <div className="app-layout">
          <FacetPanel
            config={CONFIG_FACETTES}
            filtres={filtres}
            onToggle={toggleCheckbox}
            onRange={setRange}
            onSwitch={toggleSwitch}
            onClearAll={clearAll}
            produits={PRODUITS}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
          <ProductGrid
            produits={PRODUITS}
            filtres={filtres}
            recherche={recherche}
            onAddToCart={ajouterAuPanier}
            setMobileOpen={setMobileOpen}
          />
        </div>
      )}

      {page === "checkout" && (
        <CheckoutFlow
          panier={panier}
          setPanier={setPanier}
          setPage={setPage}
          afficherToast={afficherToast}
        />
      )}

      {page === "survey" && <SurveyPage setPage={setPage} />}

      {loginOuvert && (
        <LoginModal onClose={() => setLoginOuvert(false)} onLogin={seConnecter} />
      )}

      <Toast message={toast} />

      <footer className="footer">
        Chez Nous — un projet étudiant SEG3525, Université d'Ottawa · 2026
      </footer>
    </div>
  );
}
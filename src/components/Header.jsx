// src/components/Header.jsx
import { useState, useRef, useEffect } from "react";

export default function Header({
  page,
  setPage,
  nbArticlesPanier,
  categories,
  recherche,
  setRecherche,
  onAllerPromotions,
  onSelectRayon,
  utilisateur,
  onOpenLogin,
  onLogout,
}) {
  const [categoriesOuvert, setCategoriesOuvert] = useState(false);
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const fermerSiExterieur = (e) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setCategoriesOuvert(false);
      }
    };
    document.addEventListener("click", fermerSiExterieur);
    return () => document.removeEventListener("click", fermerSiExterieur);
  }, []);

  const allerA = (cible) => {
    setPage(cible);
    setMenuMobileOuvert(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <button className="logo" onClick={() => allerA("shop")}>
          🛒 Chez <span>Nous</span>
        </button>

        <form
          className="navbar-search"
          onSubmit={(e) => {
            e.preventDefault();
            setPage("shop");
          }}
        >
          <input
            type="search"
            value={recherche}
            onChange={(e) => {
              setRecherche(e.target.value);
              if (page !== "shop") setPage("shop");
            }}
            placeholder="Chercher un produit"
            aria-label="Rechercher un produit"
          />
          <button type="submit" aria-label="Lancer la recherche">🔎</button>
        </form>

        <nav className="nav">
          <button
            className="nav-link"
            onClick={() => allerA("shop")}
          >
            Boutique
          </button>

          <div className="nav-dropdown" ref={categoriesRef}>
            <button
              className="nav-link nav-dropdown-trigger"
              onClick={() => setCategoriesOuvert((v) => !v)}
            >
              Catégorie ▾
            </button>
            {categoriesOuvert && (
              <div className="nav-dropdown-menu">
                {(categories || []).map((r) => (
                  <button key={r} onClick={() => { onSelectRayon(r); setCategoriesOuvert(false); }}>
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="nav-link nav-link-promo" onClick={onAllerPromotions}>
            🔥 Promotions
          </button>
          <button
            className="nav-link"
            onClick={() => allerA("survey")}
          >
            Sondage
          </button>
        </nav>

        <div className="header-actions">
          {utilisateur ? (
            <div className="account-pill">
              <span>👋 {utilisateur}</span>
              <button onClick={onLogout} className="account-logout">Quitter</button>
            </div>
          ) : (
            <button className="login-btn" onClick={onOpenLogin}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9V21h19.6v-1.7c0-3.3-6.5-4.9-9.8-4.9z"/>
              </svg>
              Connexion
            </button>
          )}

          <button className="cart-btn" onClick={() => allerA("checkout")}>
            🧺 Panier <span className="cart-count">{nbArticlesPanier}</span>
          </button>

          <button
            className="burger-btn"
            onClick={() => setMenuMobileOuvert((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>
        </div>
      </div>

      {menuMobileOuvert && (
        <nav className="nav-mobile">
          <button onClick={() => allerA("shop")}>Boutique</button>
          {(categories || []).map((r) => (
            <button key={r} onClick={() => { onSelectRayon(r); setMenuMobileOuvert(false); }}>
              {r}
            </button>
          ))}
          <button onClick={() => { onAllerPromotions(); setMenuMobileOuvert(false); }}>🔥 Promotions</button>
          <button onClick={() => allerA("survey")}>Sondage</button>
        </nav>
      )}

      <div className="promo-banner">
         Offrez-vous le frais : -20&nbsp;% sur tous les produits en promotion cette semaine !
      </div>
    </header>
  );
}
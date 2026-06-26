// src/components/FacetPanel.jsx
import FacetGroup from "./FacetGroup";

export default function FacetPanel({ config, filtres, onToggle, onRange, onSwitch, onClearAll, produits, mobileOpen, setMobileOpen }) {
  // Construit la liste des tags actifs (badges supprimables)
  const tags = [];
  config.forEach((f) => {
    if (f.type === "checkbox") {
      filtres[f.id].forEach((val) => tags.push({ facetteId: f.id, label: val }));
    } else if (f.type === "toggle" && filtres[f.id]) {
      tags.push({ facetteId: f.id, label: f.optionLabel, isSwitch: true });
    } else if (f.type === "range" && filtres[f.id] < f.max) {
      tags.push({ facetteId: f.id, label: `Max ${filtres[f.id]} $`, isRange: true });
    }
  });

  return (
    <aside className={mobileOpen ? "facet-panel open" : "facet-panel"}>
      <div className="facet-panel-header">
        <h2>Filtres</h2>
        {tags.length > 0 && (
          <button className="clear-all-btn" onClick={onClearAll}>
            Effacer tout
          </button>
        )}
        <button className="close-mobile-btn" onClick={() => setMobileOpen(false)}>✕</button>
      </div>

      {tags.length > 0 && (
        <div className="active-tags">
          {tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag.label}
              <button
                aria-label={`Retirer le filtre ${tag.label}`}
                onClick={() => {
                  if (tag.isSwitch) onSwitch(tag.facetteId);
                  else if (tag.isRange) onRange(tag.facetteId, config.find((c) => c.id === tag.facetteId).max);
                  else onToggle(tag.facetteId, tag.label);
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {config.map((facette) => (
        <FacetGroup
          key={facette.id}
          facette={facette}
          valeurActive={filtres[facette.id]}
          onToggle={onToggle}
          onRange={onRange}
          onSwitch={onSwitch}
          produits={produits}
        />
      ))}
    </aside>
  );
}
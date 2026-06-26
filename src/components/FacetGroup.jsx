// src/components/FacetGroup.jsx
export default function FacetGroup({ facette, valeurActive, onToggle, onRange, onSwitch, produits }) {
  // Heuristique : prévention des erreurs — on grise les options qui donneraient 0 résultat
  const compterOptions = (opt) => {
    if (!produits) return null;
    return produits.filter((p) => {
      const val = p[facette.id];
      return Array.isArray(val) ? val.includes(opt) : val === opt;
    }).length;
  };

  return (
    <div className="facet-group">
      <h3>{facette.label}</h3>

      {facette.type === "checkbox" && (
        <ul>
          {facette.options.map((opt) => {
            const count = compterOptions(opt);
            const disabled = count === 0;
            return (
              <li key={opt} className={disabled ? "disabled" : ""}>
                <label>
                  <input
                    type="checkbox"
                    disabled={disabled}
                    checked={valeurActive.includes(opt)}
                    onChange={() => onToggle(facette.id, opt)}
                  />
                  {opt}
                  {count !== null && <span className="facet-count">({count})</span>}
                </label>
              </li>
            );
          })}
        </ul>
      )}

      {facette.type === "toggle" && (
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={!!valeurActive}
            onChange={() => onSwitch(facette.id)}
          />
          {facette.optionLabel}
        </label>
      )}

      {facette.type === "range" && (
        <div className="range-group">
          <input
            type="range"
            min={facette.min}
            max={facette.max}
            step={facette.step}
            value={valeurActive}
            onChange={(e) => onRange(facette.id, Number(e.target.value))}
          />
          <div className="range-labels">
            <span>0 $</span>
            <span className="range-value">Max : {valeurActive} $</span>
            <span>{facette.max} $</span>
          </div>
        </div>
      )}
    </div>
  );
}

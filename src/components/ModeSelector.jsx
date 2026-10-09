export default function ModeSelector({ value, onChange, disabled }) {
  return (
    <fieldset className="mode-selector" disabled={disabled}>
      <legend>Extraction mode</legend>
      <label className={value === "atomic" ? "mode active" : "mode"}>
        <input type="radio" name="extractionMode" value="atomic" checked={value === "atomic"} onChange={(e) => onChange(e.target.value)} />
        <span><strong>Atomic comparison</strong><small>Split independently comparable subclauses and inherit parent context.</small></span>
      </label>
      <label className={value === "standard" ? "mode active" : "mode"}>
        <input type="radio" name="extractionMode" value="standard" checked={value === "standard"} onChange={(e) => onChange(e.target.value)} />
        <span><strong>Standard</strong><small>Keep subclauses grouped with their parent clauses.</small></span>
      </label>
    </fieldset>
  );
}

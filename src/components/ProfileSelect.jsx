import { DOCUMENT_PROFILES } from "../config/profiles";

export default function ProfileSelect({ id, label, value, onChange, disabled }) {
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        {DOCUMENT_PROFILES.map((profile) => (
          <option key={profile.value} value={profile.value}>{profile.label}</option>
        ))}
      </select>
      <p className="field-help">Select the extractor profile or let the backend detect it.</p>
    </div>
  );
}

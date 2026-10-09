import { useState } from "react";
import { ShieldCheck, RefreshCw } from "lucide-react";
import ProfileSelect from "./components/ProfileSelect";
import FileDropZone from "./components/FileDropZone";
import ModeSelector from "./components/ModeSelector";
import ResultPanel from "./components/ResultPanel";
import "./styles.css";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export default function App() {
  const [profileA, setProfileA] = useState("auto");
  const [profileB, setProfileB] = useState("auto");
  const [mode, setMode] = useState("atomic");
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [errorA, setErrorA] = useState("");
  const [errorB, setErrorB] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const canCompare = fileA && fileB && profileA && profileB && mode && !loading;

  function reset() {
    setProfileA("auto"); setProfileB("auto"); setMode("atomic");
    setFileA(null); setFileB(null); setErrorA(""); setErrorB("");
    setError(""); setResult(null);
  }

  async function compareDocuments() {
    if (!canCompare) return;
    if (!API_BASE_URL) {
      setError("Frontend demo mode: VITE_API_BASE_URL is not configured in the build pipeline.");
      return;
    }
    setLoading(true); setError(""); setResult(null);
    try {
      const form = new FormData();
      form.append("documentA", fileA);
      form.append("documentB", fileB);
      form.append("profileA", profileA);
      form.append("profileB", profileB);
      form.append("extractionMode", mode);
      form.append("outputSchema", "normalized-v1");

      const response = await fetch(`${API_BASE_URL}/api/comparisons`, { method: "POST", body: form });
      let payload = null;
      try { payload = await response.json(); } catch { payload = {}; }
      if (!response.ok) throw new Error(payload.message || payload.detail || `Comparison failed with HTTP ${response.status}.`);
      setResult(payload);
    } catch (e) {
      setError(e instanceof Error ? e.message : "The comparison failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <header className="hero">
        <div className="company-badge"><ShieldCheck size={16} />Company-hosted document analysis</div>
        <h1>PDF Requirement Comparison</h1>
        <p>Choose an extractor profile for each PDF, upload both documents, then generate the standardized comparison workbook.</p>
      </header>

      <section className="comparison-card">
        <h2>New comparison</h2>
        <div className="profile-grid">
          <ProfileSelect id="profile-a" label="PDF A format" value={profileA} onChange={setProfileA} disabled={loading} />
          <ProfileSelect id="profile-b" label="PDF B format" value={profileB} onChange={setProfileB} disabled={loading} />
        </div>

        <div className="upload-grid">
          <div><FileDropZone id="file-a" title="PDF A · First document" file={fileA} profile={profileA} disabled={loading} onFile={(f, e) => { setFileA(f); setErrorA(e); }} />{errorA && <p className="field-error">{errorA}</p>}</div>
          <div><FileDropZone id="file-b" title="PDF B · Second document" file={fileB} profile={profileB} disabled={loading} onFile={(f, e) => { setFileB(f); setErrorB(e); }} />{errorB && <p className="field-error">{errorB}</p>}</div>
        </div>

        <ModeSelector value={mode} onChange={setMode} disabled={loading} />
        {error && <div className="error-banner" role="alert">{error}</div>}

        <div className="actions">
          <button type="button" className="primary" disabled={!canCompare} onClick={compareDocuments}>{loading ? "Processing documents..." : "Compare documents"}</button>
          <button type="button" className="secondary" disabled={loading} onClick={reset}><RefreshCw size={17} />Reset</button>
        </div>
      </section>

      <ResultPanel result={result} requestedA={profileA} requestedB={profileB} mode={mode} />
      <footer>{API_BASE_URL ? "Comparison backend connected." : "Frontend demo mode. Set VITE_API_BASE_URL in the build workflow to connect the comparison backend."}</footer>
    </main>
  );
}

import { Download, CheckCircle2 } from "lucide-react";
import { profileLabel } from "../config/profiles";

function DownloadLink({ href, children }) {
  if (!href) return null;
  return <a className="download-link" href={href} target="_blank" rel="noreferrer"><Download size={17} />{children}</a>;
}

export default function ResultPanel({ result, requestedA, requestedB, mode }) {
  if (!result) return null;
  const a = result.detectedProfileA || result.profileA || requestedA;
  const b = result.detectedProfileB || result.profileB || requestedB;
  return (
    <section className="result-panel" aria-live="polite">
      <div className="result-title"><CheckCircle2 size={24} /><h2>Comparison completed</h2></div>
      <div className="result-grid">
        <div><span>PDF A profile</span><strong>{profileLabel(a)}</strong></div>
        <div><span>PDF B profile</span><strong>{profileLabel(b)}</strong></div>
        <div><span>Extraction mode</span><strong>{mode === "atomic" ? "Atomic comparison" : "Standard"}</strong></div>
        <div><span>Status</span><strong>{result.status || "Completed"}</strong></div>
      </div>
      <div className="downloads">
        <DownloadLink href={result.normalizedAUrl}>Download normalized PDF A</DownloadLink>
        <DownloadLink href={result.normalizedBUrl}>Download normalized PDF B</DownloadLink>
        <DownloadLink href={result.comparisonUrl || result.resultUrl}>Download comparison workbook</DownloadLink>
        <DownloadLink href={result.validationUrl}>Download validation report</DownloadLink>
      </div>
    </section>
  );
}

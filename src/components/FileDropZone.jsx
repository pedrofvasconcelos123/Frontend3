import { useRef, useState } from "react";
import { CloudUpload, FileText, X } from "lucide-react";
import { profileLabel } from "../config/profiles";

const MAX_BYTES = 50 * 1024 * 1024;

export default function FileDropZone({ id, title, file, profile, onFile, disabled }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function acceptFile(candidate) {
    if (!candidate) return;
    const isPdf = candidate.type === "application/pdf" || candidate.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) return onFile(null, "Only PDF files are supported.");
    if (candidate.size > MAX_BYTES) return onFile(null, "The PDF exceeds the 50 MB limit.");
    onFile(candidate, "");
  }

  function onDrop(event) {
    event.preventDefault();
    setDragging(false);
    if (!disabled) acceptFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div
      className={`drop-zone ${dragging ? "dragging" : ""} ${file ? "has-file" : ""}`}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => !disabled && !file && inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !disabled && !file) inputRef.current?.click(); }}
    >
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="application/pdf,.pdf"
        hidden
        disabled={disabled}
        onChange={(e) => acceptFile(e.target.files?.[0])}
      />

      {file ? (
        <>
          <FileText size={34} strokeWidth={1.8} />
          <strong>{file.name}</strong>
          <span>{(file.size / 1024 / 1024).toFixed(2)} MB · {profileLabel(profile)}</span>
          <button
            type="button"
            className="remove-file"
            aria-label={`Remove ${file.name}`}
            onClick={(e) => { e.stopPropagation(); if (inputRef.current) inputRef.current.value = ""; onFile(null, ""); }}
          ><X size={18} /></button>
        </>
      ) : (
        <>
          <CloudUpload size={38} strokeWidth={1.8} />
          <strong>{title}</strong>
          <span>Profile: {profileLabel(profile)}</span>
          <span>Select or drag a PDF · Maximum 50 MB</span>
        </>
      )}
    </div>
  );
}

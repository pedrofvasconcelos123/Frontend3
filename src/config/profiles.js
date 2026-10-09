export const DOCUMENT_PROFILES = [
  { value: "auto", label: "Auto-detect" },
  { value: "unece", label: "UN.ECE Regulation" },
  { value: "india_ais", label: "India AIS" },
  { value: "english_gb", label: "English GB Standard" },
  { value: "q_lah", label: "Q-LAH" },
  { value: "iso", label: "ISO Standard" },
  { value: "sae", label: "SAE Standard" },
  { value: "law", label: "Law" },
  { value: "law_amendment", label: "Law Amendment" },
  { value: "generic", label: "Generic numbered specification" },
];

export function profileLabel(value) {
  return DOCUMENT_PROFILES.find((profile) => profile.value === value)?.label ?? value;
}

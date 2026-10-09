# PDF Requirement Comparison Frontend

Complete replacement React/Vite frontend with independent PDF A and PDF B profile selectors.

## Features
- Independent profile selector for each PDF
- Auto-detect option
- Standard and atomic extraction modes
- Drag-and-drop PDF inputs
- PDF type and 50 MB validation
- Multipart request to `/api/comparisons`
- Standardized output schema value `normalized-v1`
- Result panel with normalized A, normalized B, comparison, and validation downloads
- Responsive styling based on the current deployed design
- Azure Static Web Apps GitHub workflow

## Local run
1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE_URL`.
3. Run `npm install`.
4. Run `npm run dev`.

## Backend request contract
Multipart fields:
- `documentA`
- `documentB`
- `profileA`
- `profileB`
- `extractionMode`
- `outputSchema=normalized-v1`

Expected JSON response fields:
- `status`
- `detectedProfileA`
- `detectedProfileB`
- `normalizedAUrl`
- `normalizedBUrl`
- `comparisonUrl`
- `validationUrl`

## GitHub replacement
Delete or replace the old repository files, but keep the repository's existing Azure deployment token secret if it already works. Upload all files from this package to the repository root. Add repository variable `VITE_API_BASE_URL`. If your existing Azure-generated workflow has a different filename or secret name, keep its Azure token value and merge the `env: VITE_API_BASE_URL` line into that workflow.

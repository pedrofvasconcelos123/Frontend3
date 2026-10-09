# Replace the existing frontend in GitHub

1. Download and extract this ZIP locally.
2. Open the existing frontend repository in GitHub.
3. Preserve the current `.github/workflows` file or note the exact Azure Static Web Apps token secret name.
4. Delete the old frontend source files from the repository root. Do not delete repository Settings, Actions secrets, environments, or the repository itself.
5. Upload all contents inside `pdf-requirement-comparison-frontend` to the repository root, including `.github`.
6. In GitHub repository Settings, create Actions variable `VITE_API_BASE_URL` with the comparison backend base URL.
7. Confirm the workflow uses the repository's actual Azure Static Web Apps token secret.
8. Commit to `main`. The included workflow builds `dist` and deploys it.

If the existing Azure workflow secret is not named `AZURE_STATIC_WEB_APPS_API_TOKEN`, replace that name in the included workflow with the existing secret name.

# X32 Masterclass & Operational Handbook - Agent Guide

This repository contains the documentation and operational handbook for the Behringer X32 mixing console. It utilizes a combination of **VitePress** for the documentation site and **Python** for scripts.

## Architecture

*   **VitePress Documentation Site:**
    *   The core content is located in the `docs/` directory.
    *   `create_mds.js` is a Node.js script that initially generates the markdown files.
    *   Dependencies are managed via `package.json` (VitePress and Vue).
*   **Python Scripts:**
    *   `scripts/check_updates.py`: A script that checks for firmware updates and uses the Google GenAI (`google-genai`) to synthesize release notes into Markdown documentation. It stores the update state in `docs/updates/state.json`.

## Environment Setup

The repository contains a `setup-env.sh` script to initialize the complete environment:
\`\`\`bash
./setup-env.sh
\`\`\`

This script will:
1.  Run `npm install` for the Node.js environment.
2.  Create a Python virtual environment (`.venv`).
3.  Install Python dependencies (specifically `google-genai`).

## Running the Application

### VitePress (Documentation)

The following `npm` scripts are available:

*   **Development Server:** Start the local dev server.
    \`\`\`bash
    npm run docs:dev
    \`\`\`
*   **Build:** Build the site for production.
    \`\`\`bash
    npm run docs:build
    \`\`\`
*   **Preview:** Preview the production build locally.
    \`\`\`bash
    npm run docs:preview
    \`\`\`

### Python Scripts

To run the update checking script, make sure to activate the Python environment and provide your Google Gemini API Key:

\`\`\`bash
source .venv/bin/activate
export GEMINI_API_KEY="your_api_key_here"
python scripts/check_updates.py
\`\`\`
*(Note: Without the API key, the script will still run but use a default fallback summary).*

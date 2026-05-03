# Setup Guide

## Prerequisites

- **Node.js** 18 or later — [nodejs.org](https://nodejs.org)
- **Anthropic API key** — [console.anthropic.com](https://console.anthropic.com) (needed at runtime, not build time)

---

## Local Development

```bash
# 1. Clone
git clone https://github.com/incrementaldan/Fusion_TOOL_DATA_EXTRACTOR.git
cd Fusion_TOOL_DATA_EXTRACTOR

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173/Fusion_TOOL_DATA_EXTRACTOR/](http://localhost:5173/Fusion_TOOL_DATA_EXTRACTOR/) in your browser.

---

## Production Build

```bash
npm run build   # outputs to dist/
npm run preview # serves the build locally for a final check
```

The `base` path is set to `/Fusion_TOOL_DATA_EXTRACTOR/` in `vite.config.js` to match the GitHub Pages deployment URL. If you self-host at a different path, update that value.

---

## Deployment (GitHub Pages)

The `dist/` folder is what gets served. Push it to your `gh-pages` branch, or use a GitHub Actions workflow that runs `npm run build` and deploys `dist/`.

---

## Runtime: Entering Your API Key

The app calls the Anthropic API directly from the browser — no backend required. Your key is never sent anywhere except `api.anthropic.com`.

1. Open the app.
2. Paste your `sk-ant-...` key into the **API key** field in the top-right corner.
3. The field border turns green when a key is present.

> The key is held in React state only — it is **not** saved to localStorage or any file. You will need to re-enter it each session.

---

## Usage

1. **Choose input mode** — *File* (screenshot or PDF) or *Text* (paste product page copy).
2. **Provide the tool data** — drag-and-drop, click to upload, Ctrl+V to paste a screenshot, or paste text.
3. **Click Extract** — the AI reads the input and populates all fields.
4. **Review & edit** — fields are grouped by section; only the fields relevant to the selected tool type are shown. Optional fields appear at reduced opacity.
5. **Set output unit** — toggle between **in** and **mm** (affects Fusion CSV values; descriptions always stay in inches).
6. **Export**:
   - **Copy for Fusion** — copies a 172-column tab-separated row to the clipboard, ready to paste into Fusion 360's tool library CSV import.
   - **Export to ProShop** — downloads a `.csv` file for ProShop ERP's tooling database.

---

## File Overview

| File | Purpose |
|------|---------|
| `src/App.jsx` | Entire app — single React component, ~1100 lines |
| `src/fieldVisibility.js` | Per-tool-type field show/hide/optional config |
| `field_matrix_v3_CORRECTED.xlsx` | Source-of-truth field matrix (do not edit without re-generating `fieldVisibility.js`) |
| `FUSION_Full_Type_List.json` | Reference Fusion 360 tool library export — used to verify column positions |
| `vite.config.js` | Vite config; sets `base` for GitHub Pages |

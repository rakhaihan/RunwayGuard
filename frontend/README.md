# RunwayGuard Frontend

React + Vite + Tailwind dashboard for runway FOD analysis.

## Run

```bash
cd frontend
npm install
npm run dev
```

Ensure the backend is running on port 8000 (Vite proxies `/api`).

## Dashboard components

- `Header` — branding and system status
- `RunwayStatusCard` / `RiskLevelCard` — operational metrics
- `UploadPanel` — image upload and scan trigger
- `DetectionResults` — preview with bbox overlay and object list
- `AlertBanner` / `RecommendedActionPanel` — alerts and guidance

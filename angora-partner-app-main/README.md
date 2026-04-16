# Angora Partner

Angora Partner is a dashboard-style partner app prototype for account health, weekly reports, inventory, purchase orders, FBA tracking, and team communication.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Current starter scope

- Imported from the provided standalone HTML prototype
- Split into `index.html`, `src/styles.css`, and `src/main.js`
- Added Vite for local development and production builds
- Added saved app state for the last-open tab, chart range, and selected report
- Added a live status-bar clock and mobile-safe layout handling

## Good next steps

- Replace the hard-coded account data with a real API or Supabase backend
- Turn the static lists into generated UI components from structured data
- Add authentication and role-based partner access
- Add search, filters, and action flows for orders and urgent alerts

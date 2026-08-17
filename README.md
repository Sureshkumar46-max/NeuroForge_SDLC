# NeuroForge — Module 6: AI Ticket Triage & Smart Assignment

Frontend-only implementation of Module 6, built to match the existing NeuroForge
shell (dark navy, blue accents, sidebar/topbar/card system) shown in the reference
video and blueprint doc.

## Run standalone

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`, redirects to `/ticket-triage`.

## Integrating into the real NeuroForge project

This package is structured so you drop the Module 6 pieces into the existing repo
and skip everything that's just here to make the package runnable on its own:

**Copy in as-is:**
- `src/pages/TicketTriage.jsx`
- `src/components/ticket-triage/*` (TicketDetails, AISuggestionPanel, AIReasoning,
  ConfidenceScore, TriageQueue, CreateTicketModal)
- `src/data/mockData.js` — swap for real API responses when the backend lands
- `src/api/ticketTriageApi.js` — stub functions with the exact shape the real
  endpoints should return; replace the mock bodies with real `fetch()` calls,
  nothing else needs to change
- The Module 6 block in `src/styles/layout.css` (everything is scoped, but check
  for class name collisions — `.card`, `.badge`, `.btn` etc. are generic and were
  written to match the existing app's own class names, so the real project likely
  already has equivalents)

**Do NOT copy — the real project already has these:**
- `src/components/layout/Sidebar.jsx`, `Topbar.jsx`, `AppShell.jsx` — instead, add
  the single `AI Ticket Triage` `<NavLink to="/ticket-triage">` entry into the
  existing Sidebar's nav list
- `src/pages/PlaceholderPage.jsx` — only exists so this package runs standalone
- `src/App.jsx`'s placeholder routes — just add the one `/ticket-triage` route to
  the existing router
- `src/components/ui/Button.jsx`, `Badge.jsx`, `Toast.jsx` — if the existing project
  has equivalents, use those; the class names here (`btn`, `btn-primary`, `badge`,
  `status-badge`) were chosen to match what's already in the app

## Folder structure

```
src/
 ├── api/
 │    └── ticketTriageApi.js       # stubbed endpoints, swap for real fetch() later
 ├── data/
 │    └── mockData.js              # ticket, AI suggestion, team, and queue mock data
 ├── components/
 │    ├── layout/                  # Sidebar, Topbar, AppShell (existing shell, reused)
 │    ├── ui/                      # Button, Badge, Toast — shared primitives
 │    └── ticket-triage/
 │         ├── TicketDetails.jsx
 │         ├── AISuggestionPanel.jsx
 │         ├── AIReasoning.jsx
 │         ├── ConfidenceScore.jsx
 │         ├── TriageQueue.jsx
 │         └── CreateTicketModal.jsx
 ├── pages/
 │    ├── TicketTriage.jsx         # Module 6 page — wires everything together
 │    └── PlaceholderPage.jsx      # standalone-only stand-in for other modules
 └── styles/
      ├── theme.css                # color/type/spacing tokens
      └── layout.css                # component styles (sidebar, cards, badges, table, modal, toast)
```

## Notes

- No backend calls are made. `src/api/ticketTriageApi.js` simulates latency with
  `setTimeout` so the loading/analyzing states are visible; point it at real
  endpoints when they exist.
- The "Analyzing ticket..." step sequence in `AISuggestionPanel` is driven by
  `TicketTriage.jsx`'s `triggerAnalysis()` — timed to roughly match the AI request
  round trip, not hardcoded to a fixed duration.
- Category/Priority badge colors, status badge colors, and the AI purple/blue accent
  all come from CSS custom properties in `theme.css` — change them there, not per-component.

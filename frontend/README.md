# NeuroForge — Module 3: Project & Portfolio Management (Frontend)

A **standalone** Module 3 frontend — no Module 2 code, pages, or routes are mixed in.
It's built to plug into your existing Module 2 app (React + Vite + Tailwind) and match
its dark navy / electric-blue enterprise theme, but this package only contains Module 3.

Run it on its own to preview:

```bash
npm install
npm run dev      # http://localhost:5173
```

## What's inside (Module 3 only)

```
src/
  layout/
    AppLayout.jsx      Shell combining Sidebar + Header — only here so this
                        package is previewable standalone. Replace with your
                        real Module 2 layout when integrating (see below).
    Sidebar.jsx         Same fixed/collapsible sidebar behavior as Module 2,
                        containing ONLY the 4 Module 3 nav items.
    Header.jsx          Org dropdown, search, notification bell, compact profile.
  components/projects/
    ProjectCard.jsx      Glassmorphism card used on Project Dashboard
    StatusBadge.jsx      Active / On Hold / Completed / Archived pill
    HealthBadge.jsx      On Track / At Risk / Delayed / Completed pill
    ProgressBar.jsx      Gradient progress bar (color shifts with %)
    AvatarGroup.jsx      Overlapping member avatars with "+N" overflow
    PageHeader.jsx        Icon + title + description + action slot
    StatCard.jsx          Small metric tile (icon, label, value)
  pages/projects/
    ProjectDashboard.jsx    Project cards grid, filters, search, summary stats
    CreateProject.jsx       Enterprise create-project form
    ProjectDetails.jsx      Atlassian-style detail view with stats rail
    PortfolioDashboard.jsx  Filterable/sortable portfolio grid
    Milestones.jsx          Timeline of milestone cards
    ProjectAnalytics.jsx    Recharts dashboard
  data/mockData.js         All mock projects, milestones, activity, chart data
  App.jsx                  Routes — Module 3 only:
                            /projects, /projects/new, /projects/:id,
                            /portfolio, /milestones, /analytics
```

There is **no** Dashboard / Organizations / Teams / Members page or route in this
package — those belong to your Module 2 codebase and are intentionally left out.

## Integrating into your Module 2 project (nothing gets overwritten)

1. Copy these three folders straight into your existing `src/`:
   - `src/components/projects/`
   - `src/pages/projects/`
   - `src/data/mockData.js`
   None of these touch your existing files — they're new, separate paths.
2. In your **existing** sidebar component, append the 4 items from
   `navSections` in this package's `Sidebar.jsx` (`Project Dashboard`, `Portfolio`,
   `Milestones`, `Analytics` — icons: `FolderKanban`, `Briefcase`, `Target`, `BarChart3`)
   to your current nav list. Don't replace your Module 2 items — add alongside them.
3. In your **existing** router, add the 6 routes listed in this package's `App.jsx`
   under your current Module 2 routes. Nothing about your existing routes changes.
4. **Tailwind tokens** — if your `tailwind.config.js` doesn't already define these
   (they match your palette exactly), add them:
   ```js
   colors: {
     base: '#050B18', sidebar: '#08111F', card: '#111827',
     border: { DEFAULT: 'rgba(59,130,246,0.18)', strong: 'rgba(59,130,246,0.35)' },
     primary: { DEFAULT: '#3B82F6', hover: '#2563EB' },
     muted: '#94A3B8', success: '#22C55E', warning: '#F59E0B', danger: '#EF4444',
   }
   ```
   The reusable classes (`.surface-card`, `.btn-primary`, `.btn-secondary`, `.input-field`,
   `.label-text`) are defined in `src/index.css` inside an `@layer components` block —
   copy that block into your existing global stylesheet if you don't already have equivalents.
5. **Wire up real data**: every page currently imports from `src/data/mockData.js`.
   Swap those imports for your real API calls / state — the shape of `projects[0]`
   in that file documents every field each component expects.

## Fidelity to Module 2

Matched by reviewing your Module 2 walkthrough video: fixed sidebar that never
scrolls (only content scrolls), user card pinned at the bottom, compact non-stretching
profile chip top-right, org switcher pill, dark navy cards (`#111827`) with thin blue
border, `rounded-xl`, hover lift + glow, same button language (blue gradient primary /
ghost secondary / subtle danger), Inter typeface, Lucide icons throughout.

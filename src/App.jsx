import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import TicketTriage from './pages/TicketTriage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';

/**
 * Routing convention follows the existing NeuroForge modules
 * (see Modules 1–5: /dashboard, /projects, /dev-tasks, /qa-portal, /client-portal, /admin-settings).
 *
 * Module 6 is added here as /ticket-triage. Do NOT change the other routes —
 * this file only needs to be merged into the existing router, it does not replace it.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/ticket-triage" replace />} />

          {/* Existing modules — placeholders here only so this package runs standalone.
              In the real app these already exist; do not overwrite them. */}
          <Route path="/dashboard" element={<PlaceholderPage title="Overview Dashboard" />} />
          <Route path="/projects" element={<PlaceholderPage title="Projects Board" />} />
          <Route path="/dev-tasks" element={<PlaceholderPage title="Developer Tasks" />} />
          <Route path="/qa-portal" element={<PlaceholderPage title="QA Portal" />} />
          <Route path="/client-portal" element={<PlaceholderPage title="Client Portal" />} />
          <Route path="/admin-settings" element={<PlaceholderPage title="Admin Settings" />} />

          {/* Module 6 — the actual deliverable */}
          <Route path="/ticket-triage" element={<TicketTriage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

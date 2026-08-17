import React from 'react';
import Sidebar from './Sidebar.jsx';

/**
 * AppShell — the persistent app frame (sidebar + main outlet).
 * The Topbar is rendered per-page since breadcrumbs differ by page.
 */
export default function AppShell({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

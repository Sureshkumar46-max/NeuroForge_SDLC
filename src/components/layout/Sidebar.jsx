import React from 'react';
import { NavLink } from 'react-router-dom';
import { currentUser } from '../../data/mockData.js';

/**
 * Sidebar — this mirrors the existing NeuroForge shell (Modules 1–5).
 * If a real Sidebar.jsx already exists in the project, DO NOT duplicate this file —
 * just add the "AI Ticket Triage" <NavLink> below into the existing nav list.
 */
const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview Dashboard', icon: 'grid' },
  { to: '/projects', label: 'Projects Board', icon: 'board' },
  { to: '/dev-tasks', label: 'Developer Tasks', icon: 'code' },
  { to: '/qa-portal', label: 'QA Portal', icon: 'shield' },
  { to: '/client-portal', label: 'Client Portal', icon: 'users' },
  { to: '/ticket-triage', label: 'AI Ticket Triage', icon: 'sparkle' },
  { to: '/admin-settings', label: 'Admin Settings', icon: 'settings' },
];

const ICONS = {
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  board: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h18M3 7v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7M3 7l2-4h14l2 4"/></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 5l-6 7 6 7M16 5l6 7-6 7"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4z"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>,
  sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/><circle cx="12" cy="12" r="4"/></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z"/></svg>,
};

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="side-brand">
        <div className="mark">N</div>
        <div>
          <div className="name">NeuroForge</div>
          <span className="tag">SDLC Platform</span>
        </div>
      </div>

      <div className="side-section">Workspace</div>
      <nav className="side-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 'side-link' + (isActive ? ' active' : '')}
          >
            {ICONS[item.icon]}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <div className="side-profile">
        <div className="avatar">{currentUser.initials}</div>
        <div className="who">
          <b>{currentUser.name}</b>
          <span className="role">{currentUser.role}</span>
        </div>
        <svg className="logout" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
        </svg>
      </div>
    </aside>
  );
}

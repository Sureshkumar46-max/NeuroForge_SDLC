import React from 'react';
import { currentUser } from '../../data/mockData.js';

/**
 * Topbar — breadcrumb + profile dropdown, reused from the existing shell.
 * `crumbs` is an array of strings; the last one renders as the active crumb.
 */
export default function Topbar({ crumbs = ['HexaCorp Global', 'Projects', 'AI Ticket Triage'] }) {
  return (
    <div className="topbar">
      <div className="crumb">
        {crumbs.map((c, i) => (
          <React.Fragment key={c}>
            {i === 0 ? <b>{c}</b> : i === crumbs.length - 1 ? <span className="cur">{c}</span> : c}
            {i < crumbs.length - 1 ? ' / ' : ''}
          </React.Fragment>
        ))}
      </div>
      <div className="topbar-right">
        <div className="profile-pill">
          <div className="av">{currentUser.initials}</div>
          <span>{currentUser.name}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
}

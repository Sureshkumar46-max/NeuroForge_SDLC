import React, { useMemo, useState } from 'react';
import Badge from '../ui/Badge.jsx';
import ConfidenceScore from './ConfidenceScore.jsx';
import { statusLabel } from '../../data/mockData.js';

/**
 * TriageQueue — "Recently Triaged Tickets" table with client-side search.
 * `onSelect(ticket)` fires when a row is clicked (loads it into the detail view).
 */
export default function TriageQueue({ tickets, onSelect }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tickets;
    return tickets.filter((t) =>
      `${t.id} ${t.title} ${t.category} ${t.priority} ${t.assignee} ${t.status}`
        .toLowerCase()
        .includes(q)
    );
  }, [tickets, query]);

  return (
    <div className="card queue-card">
      <div className="queue-toolbar">
        <h3 style={{ fontFamily: 'var(--display)', fontSize: 14.5, fontWeight: 700 }}>Recently Triaged Tickets</h3>
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Search tickets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="queue">
          <thead>
            <tr>
              <th>Ticket</th><th>Title</th><th>Category</th><th>Priority</th>
              <th>AI Confidence</th><th>Assignee</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} onClick={() => onSelect?.(t)}>
                <td className="qid">{t.id}</td>
                <td className="qtitle">{t.title}</td>
                <td><Badge tone={t.category}>{cap(t.category)}</Badge></td>
                <td><Badge tone={t.priority}>{cap(t.priority)}</Badge></td>
                <td className="qconf"><ConfidenceScore value={t.confidence} /></td>
                <td className="qassignee">
                  <span className="chip-avatar">{t.assigneeInitials}</span>{t.assignee}
                </td>
                <td><Badge tone={t.status}>{statusLabel(t.status)}</Badge></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '20px 0' }}>No tickets match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

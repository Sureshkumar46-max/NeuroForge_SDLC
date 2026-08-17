import React from 'react';
import ConfidenceScore from './ConfidenceScore.jsx';

/**
 * AIReasoning — "Why this suggestion?" card: reasoning text, similar tickets,
 * and a confidence breakdown grid. Hidden/skeletal while `analyzing` is true.
 */
export default function AIReasoning({ analyzing, suggestion }) {
  return (
    <div className="card reasoning-card">
      <div className="card-head">
        <h3>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 18v3M9 21h6M8 12a4 4 0 1 1 6.3 3.3c-.6.5-1.3 1.2-1.3 2.2v.5H11v-.5c0-1-.7-1.7-1.3-2.2A4 4 0 0 1 8 12zM12 2v2M4 8H2M22 8h-2"/>
          </svg>
          Why this suggestion?
        </h3>
      </div>

      {analyzing ? (
        <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>
          Reasoning will appear here once analysis finishes.
        </p>
      ) : (
        <>
          <p className="reasoning-text">{suggestion.reasoning}</p>

          <div className="similar-title">Similar Tickets</div>
          <div className="similar-list">
            {suggestion.similarTickets.map((t) => (
              <div className="similar-item" key={t.id}>
                <span className="sid">{t.id}</span>
                <span className="stitle">{t.title}</span>
                <span className="smatch">{t.match}% match</span>
              </div>
            ))}
          </div>

          <div className="similar-title">Confidence Breakdown</div>
          <div className="conf-strip">
            <ConfTile label="Category" value={suggestion.category.value} confidence={suggestion.category.confidence} />
            <ConfTile label="Priority" value={suggestion.priority.value} confidence={suggestion.priority.confidence} />
            <ConfTile label="Assignee" value={suggestion.assignee.value} confidence={suggestion.assignee.confidence} />
            <ConfTile label="Story Points" value={suggestion.storyPoints.value} confidence={suggestion.storyPoints.confidence} />
          </div>
        </>
      )}
    </div>
  );
}

function ConfTile({ label, value, confidence }) {
  return (
    <div className="conf-tile">
      <div className="lbl">{label}</div>
      <div className="v">{value}</div>
      <ConfidenceScore value={confidence} size="block" />
    </div>
  );
}

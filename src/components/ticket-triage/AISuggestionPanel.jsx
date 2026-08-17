import React from 'react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import ConfidenceScore from './ConfidenceScore.jsx';
import { analysisSteps } from '../../data/mockData.js';

const AI_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>
    <circle cx="12" cy="12" r="3.2"/>
  </svg>
);
const CHECK = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>;

/**
 * AISuggestionPanel — right column, top card.
 * Two states: `analyzing` (step-by-step progress) and the suggestions list.
 */
export default function AISuggestionPanel({
  analyzing,
  activeStepIndex,
  suggestion,
  analyzedLabel,
  onAccept,
  onOverride,
}) {
  return (
    <div className="card ai-card">
      <div className="card-head">
        <div className="ai-card-title">
          <div className="ai-icon">{AI_ICON}</div>
          <h3>AI Ticket Triage</h3>
        </div>
        <span className="ai-badge">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.3L19 9l-5.4 1.7L12 16l-1.6-5.3L5 9l5.4-1.7L12 2z"/></svg>
          AI POWERED
        </span>
      </div>

      {analyzing ? (
        <div className="analyzing">
          <div className="analyzing-title">Analyzing ticket...</div>
          <div className="analyze-steps">
            {analysisSteps.map((label, i) => {
              const state = i < activeStepIndex ? 'done' : i === activeStepIndex ? 'active' : '';
              return (
                <div className={`analyze-step ${state}`} key={label}>
                  <span className="dot">{state === 'done' ? CHECK : null}</span>
                  {label}
                </div>
              );
            })}
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(100, Math.round((activeStepIndex / analysisSteps.length) * 100))}%` }}
            />
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
              AI Suggestions
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{analyzedLabel}</span>
          </div>

          <div className="suggestions">
            <SuggestionRow
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>}
              label="Category"
              confidence={suggestion.category.confidence}
            >
              <Badge tone={suggestion.category.value.toLowerCase()}>{suggestion.category.value}</Badge>
            </SuggestionRow>

            <SuggestionRow
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg>}
              label="Priority"
              confidence={suggestion.priority.confidence}
            >
              <Badge tone={suggestion.priority.value.toLowerCase()}>{suggestion.priority.value}</Badge>
            </SuggestionRow>

            <SuggestionRow
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>}
              label="Story Points"
              confidence={suggestion.storyPoints.confidence}
            >
              {suggestion.storyPoints.value} points
            </SuggestionRow>

            <SuggestionRow
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>}
              label="Assignee"
              confidence={suggestion.assignee.confidence}
            >
              <span className="assignee-av">{initials(suggestion.assignee.value)}</span>
              {suggestion.assignee.value}
            </SuggestionRow>
          </div>

          <div className="accept-bar">
            <Button variant="primary" icon={CHECK} onClick={onAccept}>Accept AI Suggestions</Button>
            <Button onClick={onOverride}>Override Suggestions</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function SuggestionRow({ icon, label, confidence, children }) {
  return (
    <div className="sugg-row">
      <span className="sugg-label">{icon}{label}</span>
      <span className="sugg-val">{children}</span>
      <ConfidenceScore value={confidence} />
    </div>
  );
}

function initials(name = '') {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

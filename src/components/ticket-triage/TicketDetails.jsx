import React from 'react';
import Badge from '../ui/Badge.jsx';
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STORY_POINT_OPTIONS,
  ASSIGNEE_OPTIONS,
} from '../../data/mockData.js';

/**
 * TicketDetails — left column. Shows ticket info + editable fields
 * (Category / Priority / Story Points / Assignee).
 *
 * `fields` / `onFieldChange` are controlled by the parent (TicketTriage.jsx)
 * so Accept-AI-Suggestions and manual overrides both flow through one place.
 */
export default function TicketDetails({ ticket, fields, aiValues, onFieldChange }) {
  const isOverridden = (key) => fields[key] !== aiValues[key];

  return (
    <div className="card">
      <div className="ticket-id-row">
        <span className="ticket-id">{ticket.id}</span>
        <span className="status-pill status-open">{ticket.status}</span>
      </div>

      <h2 className="ticket-title">{ticket.title}</h2>
      <p className="ticket-desc">{ticket.description}</p>

      <div className="meta-grid">
        <div className="meta-item">
          <div className="lbl">Created by</div>
          <div className="val"><span className="chip-avatar">{initials(ticket.createdBy)}</span>{ticket.createdBy}</div>
        </div>
        <div className="meta-item">
          <div className="lbl">Created</div>
          <div className="val">{ticket.createdAt}</div>
        </div>
        <div className="meta-item">
          <div className="lbl">Project</div>
          <div className="val">{ticket.project}</div>
        </div>
        <div className="meta-item">
          <div className="lbl">Reporter</div>
          <div className="val"><span className="chip-avatar">{initials(ticket.reporter)}</span>{ticket.reporter}</div>
        </div>
        <div className="meta-item" style={{ gridColumn: '1/-1' }}>
          <div className="lbl">Labels</div>
          <div className="val">
            {ticket.labels.map((l) => <span className="label-tag" key={l}>{l}</span>)}
          </div>
        </div>
      </div>

      <FieldSelect
        label="Category"
        value={fields.category}
        options={CATEGORY_OPTIONS}
        overridden={isOverridden('category')}
        onChange={(v) => onFieldChange('category', v)}
      />

      <div className="two-col">
        <FieldSelect
          label="Priority"
          value={fields.priority}
          options={PRIORITY_OPTIONS}
          overridden={isOverridden('priority')}
          onChange={(v) => onFieldChange('priority', v)}
        />
        <FieldSelect
          label="Story Points"
          value={String(fields.storyPoints)}
          options={STORY_POINT_OPTIONS.map(String)}
          overridden={isOverridden('storyPoints')}
          onChange={(v) => onFieldChange('storyPoints', Number(v))}
        />
      </div>

      <FieldSelect
        label="Assignee"
        value={fields.assignee}
        options={ASSIGNEE_OPTIONS}
        overridden={isOverridden('assignee')}
        onChange={(v) => onFieldChange('assignee', v)}
      />
    </div>
  );
}

function FieldSelect({ label, value, options, overridden, onChange }) {
  return (
    <div className="field-group">
      <div className="field-label">
        {label}
        {overridden && <span className="overridden-flag">Overridden</span>}
      </div>
      <select
        className={`field-select${!overridden ? ' ai-touched' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function initials(name = '') {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

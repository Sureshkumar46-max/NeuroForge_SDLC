import React, { useState } from 'react';
import Button from '../ui/Button.jsx';

const AI_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14, display: 'inline', verticalAlign: '-2px', marginRight: 5 }}>
    <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>
    <circle cx="12" cy="12" r="3.2"/>
  </svg>
);

/**
 * CreateTicketModal — title/description form. On submit, calls onCreate(title, description)
 * and the parent kicks off the AI triage flow for the new ticket.
 */
export default function CreateTicketModal({ open, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!open) return null;

  function handleSubmit() {
    if (!title.trim()) return;
    onCreate({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
  }

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3>Create Ticket</h3>
        <p className="sub">AI will automatically triage this ticket once created.</p>

        <label>Title</label>
        <input
          type="text"
          placeholder="e.g. Users unable to upload profile images"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          rows={4}
          placeholder="Describe the issue in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-actions">
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="ai" icon={AI_ICON} onClick={handleSubmit}>Create &amp; Analyze</Button>
        </div>
      </div>
    </div>
  );
}

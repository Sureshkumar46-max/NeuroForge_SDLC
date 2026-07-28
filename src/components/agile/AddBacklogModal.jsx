import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { members, LABELS } from '../../data/mockData.js';

const emptyForm = { title: '', priority: 'medium', points: 3, assignee: members[0].id, due: '', labels: [] };

export default function AddBacklogModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm);

  if (!open) return null;

  const toggleLabel = (label) => {
    setForm((f) => ({
      ...f,
      labels: f.labels.includes(label) ? f.labels.filter((l) => l !== label) : [...f.labels, label],
    }));
  };

  const submit = () => {
    if (!form.title.trim()) return;
    onAdd(form);
    setForm(emptyForm);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg surface-card p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Add Backlog Item</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/[0.06] hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label-text">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Fix duplicate charge on retry"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label-text">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                className="input-field"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="label-text">Story points</label>
              <input
                type="number"
                min={1}
                max={21}
                value={form.points}
                onChange={(e) => setForm((f) => ({ ...f, points: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">Due</label>
              <input
                value={form.due}
                onChange={(e) => setForm((f) => ({ ...f, due: e.target.value }))}
                placeholder="Aug 12"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="label-text">Assignee</label>
            <select
              value={form.assignee}
              onChange={(e) => setForm((f) => ({ ...f, assignee: e.target.value }))}
              className="input-field"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-text">Labels</label>
            <div className="flex flex-wrap gap-2">
              {LABELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => toggleLabel(l)}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    form.labels.includes(l)
                      ? 'border-primary/40 bg-primary/15 text-primary'
                      : 'border-border bg-white/[0.03] text-muted hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={submit} className="btn-primary">
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

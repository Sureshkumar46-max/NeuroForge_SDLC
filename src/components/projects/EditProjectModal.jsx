import { useEffect, useState } from 'react';
import { X, Pencil } from 'lucide-react';
import Select from '../common/Select.jsx';
import { organizations, teams, managers } from '../../data/mockData.js';
import { initialsFromName } from '../../context/ProjectsContext.jsx';

const METHODOLOGIES = ['Agile', 'Scrum', 'Kanban', 'Waterfall'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES = ['Active', 'On Hold', 'Completed', 'Archived'];

export default function EditProjectModal({ project, onSave, onClose }) {
  const [form, setForm] = useState(() => ({
    name: project.name,
    description: project.description || '',
    organization: project.organization,
    team: project.team,
    manager: project.manager?.name || '',
    priority: project.priority,
    methodology: project.methodology,
    status: project.status,
    startDate: project.startDate || '',
    endDate: project.endDate || '',
    progress: project.progress ?? 0,
  }));

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const updateSelect = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const managerInitials = initialsFromName(form.manager);
    onSave({
      ...form,
      progress: Number(form.progress),
      manager: { name: form.manager, initials: managerInitials },
    });
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
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto surface-card p-6 lg:p-7">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <Pencil size={17} className="text-primary" /> Edit Project
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
            aria-label="Close edit form"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-text">Project Name</label>
            <input required value={form.name} onChange={update('name')} className="input-field" />
          </div>
          <div>
            <label className="label-text">Description</label>
            <textarea rows={3} value={form.description} onChange={update('description')} className="input-field resize-none" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="label-text">Organization</label>
              <Select value={form.organization} onChange={updateSelect('organization')} options={organizations} />
            </div>
            <div>
              <label className="label-text">Team</label>
              <Select value={form.team} onChange={updateSelect('team')} options={teams} />
            </div>
            <div>
              <label className="label-text">Project Manager</label>
              <Select value={form.manager} onChange={updateSelect('manager')} options={managers} />
            </div>
            <div>
              <label className="label-text">Priority</label>
              <Select value={form.priority} onChange={updateSelect('priority')} options={PRIORITIES} />
            </div>
            <div>
              <label className="label-text">Methodology</label>
              <Select value={form.methodology} onChange={updateSelect('methodology')} options={METHODOLOGIES} />
            </div>
            <div>
              <label className="label-text">Status</label>
              <Select value={form.status} onChange={updateSelect('status')} options={STATUSES} />
            </div>
            <div>
              <label className="label-text">Start Date</label>
              <input type="date" value={form.startDate} onChange={update('startDate')} className="input-field" />
            </div>
            <div>
              <label className="label-text">End Date</label>
              <input type="date" value={form.endDate} onChange={update('endDate')} className="input-field" />
            </div>
            <div className="md:col-span-2">
              <label className="label-text">Progress ({form.progress}%)</label>
              <input
                type="range"
                min={0}
                max={100}
                value={form.progress}
                onChange={update('progress')}
                className="w-full accent-[#3B82F6]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

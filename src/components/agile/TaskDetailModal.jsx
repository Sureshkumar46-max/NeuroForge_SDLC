import { X, Trash2, Check } from 'lucide-react';
import { PriorityBadge, StoryPointBadge, LabelChip } from '../common/Badges.jsx';
import MemberAvatar from './MemberAvatar.jsx';
import { memberById } from '../../data/mockData.js';

export default function TaskDetailModal({ task, open, onClose, onDelete, onSave }) {
  if (!open || !task) return null;

  const assignee = memberById(task.assignee);

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
        <div className="mb-4 flex items-start justify-between">
          <div>
            <span className="font-mono text-xs font-semibold text-muted">{task.id}</span>
            <h3 className="mt-1 text-base font-bold text-white">{task.title}</h3>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-white/[0.06] hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <StoryPointBadge points={task.points} />
          {task.labels.map((l) => (
            <LabelChip key={l} label={l} />
          ))}
        </div>

        <div className="mb-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="label-text">Assignee</p>
            <div className="flex items-center gap-2">
              <MemberAvatar id={task.assignee} size={26} />
              <span className="text-white">{assignee?.name}</span>
            </div>
          </div>
          <div>
            <p className="label-text">Due date</p>
            <p className="text-white">{task.due}</p>
          </div>
          <div>
            <p className="label-text">Comments</p>
            <p className="text-white">{task.comments}</p>
          </div>
          <div>
            <p className="label-text">Subtasks</p>
            <p className="text-white">{task.subtasks}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <button onClick={() => onDelete(task.id)} className="btn-danger-ghost">
            <Trash2 size={15} /> Delete
          </button>
          <button
            onClick={() => {
              onSave(task.id);
              onClose();
            }}
            className="btn-primary"
          >
            <Check size={16} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

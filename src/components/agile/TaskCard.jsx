import { Calendar, MessageSquare } from 'lucide-react';
import { PriorityBadge, StoryPointBadge, LabelChip } from '../common/Badges.jsx';
import MemberAvatar from './MemberAvatar.jsx';

export default function TaskCard({ task, onOpen, onDragStart, onDragEnd, dragging }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(task.id)}
      className={`surface-card surface-card-hover cursor-grab p-3.5 ${dragging ? 'opacity-40' : ''}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10.5px] font-semibold text-muted">{task.id}</span>
        <PriorityBadge priority={task.priority} />
      </div>
      <p className="mb-2.5 text-[13px] font-semibold leading-snug text-white">{task.title}</p>
      <div className="mb-2.5 flex flex-wrap gap-1.5">
        {task.labels.map((l) => (
          <LabelChip key={l} label={l} />
        ))}
        <StoryPointBadge points={task.points} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-[11px] text-muted">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {task.due}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={12} /> {task.comments}
          </span>
        </div>
        <MemberAvatar id={task.assignee} size={24} />
      </div>
    </div>
  );
}

import { PriorityBadge, StoryPointBadge, LabelChip } from '../common/Badges.jsx';
import MemberAvatar from './MemberAvatar.jsx';
import { memberById } from '../../data/mockData.js';

export default function BacklogRow({ task, onOpen }) {
  const assignee = memberById(task.assignee);
  return (
    <button
      onClick={() => onOpen(task.id)}
      className="grid w-full grid-cols-[90px_1fr_100px_90px_140px_90px] items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors hover:bg-white/[0.04]"
    >
      <span className="font-mono text-[11px] text-muted">{task.id}</span>
      <span className="truncate text-white">{task.title}</span>
      <PriorityBadge priority={task.priority} />
      <StoryPointBadge points={task.points} />
      <div className="flex flex-wrap gap-1">
        {task.labels.slice(0, 2).map((l) => (
          <LabelChip key={l} label={l} />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <MemberAvatar id={task.assignee} size={22} />
        <span className="truncate text-xs text-muted">{assignee?.name?.split(' ')[0]}</span>
      </div>
    </button>
  );
}

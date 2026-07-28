import { useMemo, useState } from 'react';
import { CalendarClock, Rocket } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader.jsx';
import StatCard from '../../components/common/StatCard.jsx';
import { PriorityBadge, StoryPointBadge } from '../../components/common/Badges.jsx';
import MemberAvatar from '../../components/agile/MemberAvatar.jsx';
import InfoModal from '../../components/common/InfoModal.jsx';
import { useAgile } from '../../context/AgileContext.jsx';
import { Layers, Gauge, Users2 } from 'lucide-react';

const DEFAULT_CAPACITY = 90;

export default function SprintPlanning() {
  const { tasks, moveTask } = useAgile();
  const [selected, setSelected] = useState([]);
  const [capacity, setCapacity] = useState(DEFAULT_CAPACITY);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const backlogTasks = useMemo(() => tasks.filter((t) => t.status === 'backlog'), [tasks]);

  const selectedPoints = backlogTasks
    .filter((t) => selected.includes(t.id))
    .reduce((sum, t) => sum + t.points, 0);

  const toggle = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const startSprint = () => {
    selected.forEach((id) => moveTask(id, 'todo'));
    setSelected([]);
    setConfirmOpen(true);
  };

  const pct = Math.min(100, Math.round((selectedPoints / capacity) * 100));

  return (
    <div>
      <PageHeader
        icon={CalendarClock}
        title="Sprint Planning"
        description="Select backlog items and confirm capacity to kick off Sprint 15"
        actions={
          <button className="btn-primary" disabled={selected.length === 0} onClick={startSprint}>
            <Rocket size={16} /> Start Sprint ({selected.length})
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Layers} label="Selected Items" value={selected.length} tone="primary" />
        <StatCard icon={Gauge} label="Selected Points" value={`${selectedPoints} / ${capacity}`} tone={pct > 100 ? 'danger' : 'success'} />
        <StatCard icon={Users2} label="Team Capacity" value={`${capacity} pts`} tone="warning" />
      </div>

      <div className="surface-card mb-6 p-5">
        <label className="label-text">Sprint capacity (story points)</label>
        <input
          type="range"
          min={40}
          max={140}
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${pct > 100 ? 'from-danger to-danger' : 'from-primary to-accent2'} transition-all duration-300`}
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          {selectedPoints} of {capacity} points allocated ({pct}%)
          {pct > 100 && <span className="ml-1 font-semibold text-danger">— over capacity</span>}
        </p>
      </div>

      <div className="surface-card p-2">
        <div className="grid grid-cols-[40px_90px_1fr_100px_90px_140px] gap-3 px-3 py-2 text-[10.5px] font-semibold uppercase tracking-wide text-muted/70">
          <span></span>
          <span>ID</span>
          <span>Title</span>
          <span>Priority</span>
          <span>Points</span>
          <span>Assignee</span>
        </div>
        <div className="divide-y divide-border/60">
          {backlogTasks.length === 0 ? (
            <p className="px-3 py-10 text-center text-sm text-muted">Backlog is empty — nothing left to plan.</p>
          ) : (
            backlogTasks.map((t) => (
              <label
                key={t.id}
                className="grid cursor-pointer grid-cols-[40px_90px_1fr_100px_90px_140px] items-center gap-3 px-3 py-3 text-sm transition-colors hover:bg-white/[0.04]"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(t.id)}
                  onChange={() => toggle(t.id)}
                  className="h-4 w-4 accent-primary"
                />
                <span className="font-mono text-[11px] text-muted">{t.id}</span>
                <span className="truncate text-white">{t.title}</span>
                <PriorityBadge priority={t.priority} />
                <StoryPointBadge points={t.points} />
                <MemberAvatar id={t.assignee} size={22} />
              </label>
            ))
          )}
        </div>
      </div>

      <InfoModal
        open={confirmOpen}
        icon={Rocket}
        title="Sprint 15 started"
        description="The selected items have moved to To Do on the Kanban Board."
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
}

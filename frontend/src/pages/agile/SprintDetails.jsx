import { Clock, ListChecks, Users2, Target } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader.jsx';
import StatCard from '../../components/common/StatCard.jsx';
import ProgressBar from '../../components/common/ProgressBar.jsx';
import MemberAvatar from '../../components/agile/MemberAvatar.jsx';
import { useAgile } from '../../context/AgileContext.jsx';
import { members } from '../../data/mockData.js';

const STATUS_ORDER = ['backlog', 'todo', 'progress', 'review', 'testing', 'done'];
const STATUS_LABELS = { backlog: 'Backlog', todo: 'To Do', progress: 'In Progress', review: 'Code Review', testing: 'Testing', done: 'Done' };

export default function SprintDetails() {
  const { tasks } = useAgile();
  const sprintTasks = tasks.filter((t) => t.status !== 'backlog');
  const totalPoints = sprintTasks.reduce((sum, t) => sum + t.points, 0);
  const donePoints = sprintTasks.filter((t) => t.status === 'done').reduce((sum, t) => sum + t.points, 0);
  const progressPct = totalPoints ? Math.round((donePoints / totalPoints) * 100) : 0;

  return (
    <div>
      <PageHeader
        icon={Clock}
        title="Sprint Details"
        description="Sprint 14 — Payments Reliability · Jul 21–Aug 3, 2026"
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Target} label="Sprint Goal" value="Reliability" tone="primary" sub="Reduce payment failures" />
        <StatCard icon={ListChecks} label="Tasks in Sprint" value={sprintTasks.length} tone="success" />
        <StatCard icon={Users2} label="Team Size" value={members.length} tone="warning" />
        <StatCard icon={Clock} label="Days Remaining" value="6" tone="danger" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="surface-card p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold text-white">Completion by status</h3>
          <div className="space-y-3">
            {STATUS_ORDER.filter((s) => s !== 'backlog').map((s) => {
              const count = sprintTasks.filter((t) => t.status === s).length;
              const pct = sprintTasks.length ? Math.round((count / sprintTasks.length) * 100) : 0;
              return (
                <div key={s}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-white">{STATUS_LABELS[s]}</span>
                    <span className="text-muted">{count} tasks</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent2" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <h3 className="mb-3 mt-6 text-sm font-bold text-white">Story points burned</h3>
          <ProgressBar value={progressPct} />
        </div>

        <div className="surface-card p-5">
          <h3 className="mb-4 text-sm font-bold text-white">Sprint team</h3>
          <div className="space-y-3">
            {members.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <MemberAvatar id={m.id} size={30} />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white">{m.name}</p>
                  <p className="truncate text-[11px] text-muted">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

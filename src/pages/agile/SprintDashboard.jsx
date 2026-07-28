import { LayoutGrid, ListChecks, Flame, Timer, TrendingUp, Check, MessageSquare, Plus, Flag, ArrowRightLeft } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader.jsx';
import StatCard from '../../components/common/StatCard.jsx';
import ProgressBar from '../../components/common/ProgressBar.jsx';
import MemberAvatar from '../../components/agile/MemberAvatar.jsx';
import { useAgile } from '../../context/AgileContext.jsx';
import { members, activity } from '../../data/mockData.js';

const ACTIVITY_ICONS = { check: Check, msg: MessageSquare, plus: Plus, move: ArrowRightLeft, flag: Flag };
const ACTIVITY_TONES = {
  success: 'bg-success/10 text-success',
  primary: 'bg-primary/10 text-primary',
  accent3: 'bg-accent3/10 text-accent3',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
};

export default function SprintDashboard() {
  const { tasks } = useAgile();

  const done = tasks.filter((t) => t.status === 'done').length;
  const inProgress = tasks.filter((t) => t.status === 'progress').length;
  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
  const donePoints = tasks.filter((t) => t.status === 'done').reduce((sum, t) => sum + t.points, 0);
  const progressPct = totalPoints ? Math.round((donePoints / totalPoints) * 100) : 0;
  const criticalOpen = tasks.filter((t) => t.priority === 'critical' && t.status !== 'done').length;

  return (
    <div>
      <PageHeader
        icon={LayoutGrid}
        title="Sprint Dashboard"
        description="Sprint 14 — Payments Reliability · Jul 21–Aug 3, 2026"
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ListChecks} label="Tasks Done" value={`${done}/${tasks.length}`} tone="success" />
        <StatCard icon={Timer} label="In Progress" value={inProgress} tone="primary" />
        <StatCard icon={Flame} label="Critical Open" value={criticalOpen} tone="danger" />
        <StatCard icon={TrendingUp} label="Story Points" value={`${donePoints}/${totalPoints}`} tone="warning" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="surface-card p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold text-white">Sprint burndown</h3>
          <ProgressBar value={progressPct} />
          <p className="mt-3 text-xs text-muted">
            {donePoints} of {totalPoints} story points completed. At this pace, the sprint is tracking{' '}
            <span className="font-semibold text-success">on schedule</span>.
          </p>

          <h3 className="mb-3 mt-6 text-sm font-bold text-white">Team capacity</h3>
          <div className="space-y-3">
            {members.map((m) => {
              const load = tasks.filter((t) => t.assignee === m.id && t.status !== 'done').length;
              const pct = Math.min(100, load * 18);
              return (
                <div key={m.id} className="flex items-center gap-3">
                  <MemberAvatar id={m.id} size={28} />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="truncate text-white">{m.name}</span>
                      <span className="text-muted">{load} active</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent2"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="surface-card p-5">
          <h3 className="mb-4 text-sm font-bold text-white">Recent activity</h3>
          <div className="space-y-4">
            {activity.map((a) => {
              const Icon = ACTIVITY_ICONS[a.icon] || Check;
              return (
                <div key={a.id} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${ACTIVITY_TONES[a.tone]}`}>
                    <Icon size={13} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs leading-snug text-muted">{a.text}</p>
                    <p className="mt-0.5 text-[10.5px] text-muted/60">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

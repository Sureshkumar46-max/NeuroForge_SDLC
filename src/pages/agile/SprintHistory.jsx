import { History, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader.jsx';
import { SprintStatusBadge } from '../../components/common/Badges.jsx';
import { sprintHistory } from '../../data/mockData.js';

export default function SprintHistory() {
  const avgVelocity = Math.round(sprintHistory.reduce((sum, s) => sum + s.velocity, 0) / sprintHistory.length);

  return (
    <div>
      <PageHeader icon={History} title="Sprint History" description={`${sprintHistory.length} past sprints · average velocity ${avgVelocity} pts`} />

      <div className="surface-card p-2">
        <div className="grid grid-cols-[1fr_120px_100px_90px_90px] gap-3 px-3 py-2 text-[10.5px] font-semibold uppercase tracking-wide text-muted/70">
          <span>Sprint</span>
          <span>Status</span>
          <span>Velocity</span>
          <span>Points</span>
          <span>Members</span>
        </div>
        <div className="divide-y divide-border/60">
          {sprintHistory.map((s) => (
            <div key={s.name} className="grid grid-cols-[1fr_120px_100px_90px_90px] items-center gap-3 px-3 py-3.5 text-sm">
              <div>
                <p className="text-white">{s.name}</p>
                <p className="text-[11px] text-muted">{s.duration}</p>
              </div>
              <SprintStatusBadge status={s.status} />
              <span className="flex items-center gap-1 text-white">
                <TrendingUp size={13} className="text-success" /> {s.velocity}
              </span>
              <span className="text-white">{s.points}</span>
              <span className="text-white">{s.members}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Target, Calendar, User } from 'lucide-react';
import PageHeader from '../../components/projects/PageHeader.jsx';
import ProgressBar from '../../components/projects/ProgressBar.jsx';
import HealthBadge from '../../components/projects/HealthBadge.jsx';
import { milestones } from '../../data/mockData.js';

export default function Milestones() {
  return (
    <div>
      <PageHeader
        icon={Target}
        title="Milestones"
        description="Key delivery checkpoints across every active project."
      />

      <div className="relative space-y-5 pl-6">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
        {milestones.map((m) => (
          <div key={m.id} className="relative">
            <span className="absolute -left-6 top-5 h-3 w-3 rounded-full border-2 border-base bg-primary shadow-glow" />
            <div className="surface-card surface-card-hover p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[15px] font-semibold text-white">{m.title}</p>
                  <p className="mt-1 text-xs text-muted">{m.project}</p>
                </div>
                <HealthBadge health={m.status} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <User size={13} /> {m.owner}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> Due {m.deadline}
                </span>
              </div>

              <div className="mt-4">
                <ProgressBar value={m.completion} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

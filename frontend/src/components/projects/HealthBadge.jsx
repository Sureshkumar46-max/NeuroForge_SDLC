import { CheckCircle2, AlertTriangle, OctagonAlert } from 'lucide-react';

const HEALTH_STYLES = {
  'On Track': { cls: 'text-success bg-success/10 border-success/30', Icon: CheckCircle2 },
  Completed: { cls: 'text-primary bg-primary/10 border-primary/30', Icon: CheckCircle2 },
  'At Risk': { cls: 'text-warning bg-warning/10 border-warning/30', Icon: AlertTriangle },
  Delayed: { cls: 'text-danger bg-danger/10 border-danger/30', Icon: OctagonAlert },
};

export default function HealthBadge({ health }) {
  const cfg = HEALTH_STYLES[health] || HEALTH_STYLES['On Track'];
  const { Icon } = cfg;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${cfg.cls}`}>
      <Icon size={12} />
      {health}
    </span>
  );
}

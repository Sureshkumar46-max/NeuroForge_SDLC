const PRIORITY_STYLES = {
  critical: 'bg-danger/10 text-danger border-danger/30',
  high: 'bg-warning/10 text-warning border-warning/30',
  medium: 'bg-primary/10 text-primary border-primary/30',
  low: 'bg-muted/10 text-muted border-muted/30',
};

export function PriorityBadge({ priority }) {
  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES.low;
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style}`}>
      {priority}
    </span>
  );
}

export function StoryPointBadge({ points }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-muted">
      {points} SP
    </span>
  );
}

export function LabelChip({ label }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-medium text-muted">
      {label}
    </span>
  );
}

const STATUS_LABELS = {
  completed: 'bg-primary/10 text-primary border-primary/30',
  archived: 'bg-muted/10 text-muted border-muted/30',
};

export function SprintStatusBadge({ status }) {
  const style = STATUS_LABELS[status] || STATUS_LABELS.archived;
  const label = status === 'completed' ? 'Completed' : 'Archived';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

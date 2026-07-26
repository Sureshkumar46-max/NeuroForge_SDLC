const STATUS_STYLES = {
  Active: 'bg-success/10 text-success border-success/30',
  Completed: 'bg-primary/10 text-primary border-primary/30',
  'On Hold': 'bg-warning/10 text-warning border-warning/30',
  Archived: 'bg-muted/10 text-muted border-muted/30',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Archived;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function StatCard({ icon: Icon, label, value, tone = 'primary', sub }) {
  const toneStyles = {
    primary: 'text-primary bg-primary/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    danger: 'text-danger bg-danger/10',
  };
  return (
    <div className="surface-card surface-card-hover flex items-center gap-3.5 p-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${toneStyles[tone]}`}>
        <Icon size={19} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs text-muted">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
        {sub && <p className="text-[11px] text-muted">{sub}</p>}
      </div>
    </div>
  );
}

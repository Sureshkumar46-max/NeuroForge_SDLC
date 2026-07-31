export default function ProgressBar({ value, label = true, size = 'md' }) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2';
  const color =
    value >= 75 ? 'from-success to-success' : value >= 40 ? 'from-primary to-primary-hover' : 'from-warning to-warning';

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-muted">Progress</span>
          <span className="font-semibold text-white">{value}%</span>
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-white/[0.06] ${height}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

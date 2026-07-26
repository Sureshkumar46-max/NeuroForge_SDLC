export default function AvatarGroup({ members = [], max = 4 }) {
  const shown = members.slice(0, max);
  const extra = members.length - shown.length;

  return (
    <div className="flex items-center">
      {shown.map((m, i) => (
        <div
          key={i}
          style={{ zIndex: shown.length - i, marginLeft: i === 0 ? 0 : -8 }}
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-gradient-to-br from-primary to-accent2 text-[10px] font-semibold text-white"
        >
          {m.initials}
        </div>
      ))}
      {extra > 0 && (
        <div
          style={{ marginLeft: -8 }}
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-white/10 text-[10px] font-semibold text-muted"
        >
          +{extra}
        </div>
      )}
    </div>
  );
}

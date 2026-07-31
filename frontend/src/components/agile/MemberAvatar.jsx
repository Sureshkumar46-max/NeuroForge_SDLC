import { memberById } from '../../data/mockData.js';

export default function MemberAvatar({ id, size = 26 }) {
  const m = memberById(id);
  if (!m) return null;
  return (
    <div
      title={m.name}
      style={{ width: size, height: size, fontSize: Math.max(9, size * 0.38) }}
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${m.gradient} font-semibold text-white`}
    >
      {m.initials}
    </div>
  );
}

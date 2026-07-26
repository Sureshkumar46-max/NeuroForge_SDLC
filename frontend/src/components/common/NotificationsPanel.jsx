import { Bell, FolderPlus, Users, UserPlus, Archive, CheckCheck } from 'lucide-react';

const ICONS = {
  Created: FolderPlus,
  Team: Users,
  Member: UserPlus,
  Archived: Archive,
};

function iconFor(text) {
  const match = Object.keys(ICONS).find((k) => text.includes(k));
  return ICONS[match] || Bell;
}

export default function NotificationsPanel({ notifications, onMarkAllRead, onSelect }) {
  return (
    <div className="absolute right-0 top-11 w-80 rounded-xl border border-border bg-card shadow-glow-lg animate-fade-in">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-white">Notifications</p>
        <button
          type="button"
          onClick={onMarkAllRead}
          className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-white"
        >
          <CheckCheck size={13} /> Mark all read
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto p-1.5">
        {notifications.length === 0 ? (
          <p className="px-3 py-6 text-center text-xs text-muted">You're all caught up.</p>
        ) : (
          notifications.map((n) => {
            const Icon = iconFor(n.text);
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => onSelect(n)}
                className={`flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs transition-colors hover:bg-white/[0.06] ${
                  !n.read ? 'bg-primary/[0.04]' : ''
                }`}
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={13} />
                </span>
                <div className="min-w-0">
                  <p className={`leading-snug ${!n.read ? 'text-white' : 'text-muted'}`}>{n.text}</p>
                  <p className="mt-0.5 text-[10px] text-muted/70">{n.time}</p>
                </div>
                {!n.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

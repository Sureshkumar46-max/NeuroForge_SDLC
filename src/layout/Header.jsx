import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Bell, Search, Settings, User, Keyboard, LifeBuoy } from 'lucide-react';
import useDismiss from '../hooks/useDismiss.js';
import { useWorkspace } from '../context/WorkspaceContext.jsx';
import { useAgile } from '../context/AgileContext.jsx';
import NotificationsPanel from '../components/common/NotificationsPanel.jsx';
import InfoModal from '../components/common/InfoModal.jsx';

const ORG_OPTIONS = ['NeuroForge Labs', 'Orion Client Org'];
const SETTINGS_ITEMS = [
  { label: 'Notification preferences', description: 'Choose which sprint and board events send you an alert.' },
  { label: 'Appearance: Dark', description: 'NeuroForge is currently locked to the dark theme.' },
  { label: 'Board preferences', description: 'Configure default columns, WIP limits, and swimlanes for your board.' },
  { label: 'Integrations', description: 'Manage connected tools like GitHub, Slack, and CI providers.' },
];
const PROFILE_ITEMS = [
  { label: 'View profile', description: 'Full profile management is coming soon to this workspace.', Icon: User },
  { label: 'Keyboard shortcuts', description: 'A full shortcut reference is coming soon.', Icon: Keyboard },
  { label: 'Help & support', description: 'Reach the NeuroForge support team from here once this ships.', Icon: LifeBuoy },
];

export default function Header() {
  const { notifications, unreadCount, markAllRead } = useWorkspace();
  const { tasks } = useAgile();
  const navigate = useNavigate();

  const [orgOpen, setOrgOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(ORG_OPTIONS[0]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [infoModal, setInfoModal] = useState(null);

  const orgRef = useDismiss(orgOpen, useCallback(() => setOrgOpen(false), []));
  const notifRef = useDismiss(notifOpen, useCallback(() => setNotifOpen(false), []));
  const settingsRef = useDismiss(settingsOpen, useCallback(() => setSettingsOpen(false), []));
  const profileRef = useDismiss(profileOpen, useCallback(() => setProfileOpen(false), []));
  const searchRef = useDismiss(searchOpen, useCallback(() => setSearchOpen(false), []));

  const closeAllExcept = (which) => {
    setOrgOpen(which === 'org' ? (o) => !o : false);
    setNotifOpen(which === 'notif' ? (o) => !o : false);
    setSettingsOpen(which === 'settings' ? (o) => !o : false);
    setProfileOpen(which === 'profile' ? (o) => !o : false);
    setSearchOpen(which === 'search' ? (o) => !o : false);
  };

  const openNotification = (n) => {
    setNotifOpen(false);
    setInfoModal({ title: n.text, description: `Logged ${n.time}. Open the relevant sprint or task from the sidebar to see full details.` });
  };

  const openSettingsItem = (item) => {
    setSettingsOpen(false);
    setInfoModal({ title: item.label, description: item.description });
  };

  const openProfileItem = (item) => {
    setProfileOpen(false);
    setInfoModal({ title: item.label, description: item.description });
  };

  const searchResults = query.trim()
    ? tasks
        .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()) || t.id.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-base/80 px-6 backdrop-blur-md">
      {/* Left — Organization dropdown + breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="relative" ref={orgRef}>
          <button
            onClick={() => closeAllExcept('org')}
            aria-haspopup="listbox"
            aria-expanded={orgOpen}
            className="flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:border-border-strong"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/20 text-[10px] font-bold text-primary">
              NF
            </span>
            {selectedOrg}
            <ChevronDown size={14} className="text-muted" />
          </button>
          {orgOpen && (
            <div
              role="listbox"
              className="absolute left-0 top-11 z-50 w-56 rounded-xl border border-border bg-card p-1.5 shadow-glow-lg animate-fade-in"
            >
              {ORG_OPTIONS.map((o) => (
                <button
                  key={o}
                  role="option"
                  aria-selected={o === selectedOrg}
                  onClick={() => {
                    setSelectedOrg(o);
                    setOrgOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-white/[0.05] hover:text-white ${
                    o === selectedOrg ? 'text-primary' : 'text-muted'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden items-center gap-2 text-sm text-muted md:flex">
          <span>Orion Platform</span>
          <span className="text-muted/50">/</span>
          <span className="font-semibold text-white">Agile Planning</span>
        </div>
      </div>

      {/* Right — search, notifications, settings, profile */}
      <div className="flex items-center gap-3">
        <div className="relative" ref={searchRef}>
          <button
            onClick={() => closeAllExcept('search')}
            aria-haspopup="true"
            aria-expanded={searchOpen}
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-white"
          >
            <Search size={17} />
          </button>
          {searchOpen && (
            <div className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-border bg-card p-3 shadow-glow-lg animate-fade-in">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks, sprints, members…"
                className="input-field mb-2"
              />
              {query.trim() && (
                <div className="max-h-72 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <p className="px-2 py-4 text-center text-xs text-muted">No results for "{query}"</p>
                  ) : (
                    searchResults.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery('');
                          navigate('/kanban-board');
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs text-muted transition-colors hover:bg-white/[0.05] hover:text-white"
                      >
                        <span className="truncate">{t.title}</span>
                        <span className="ml-2 shrink-0 font-mono text-[10px] text-muted/70">{t.id}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              closeAllExcept('notif');
              if (!notifOpen) markAllRead();
            }}
            aria-haspopup="true"
            aria-expanded={notifOpen}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-white"
          >
            <Bell size={17} />
            {unreadCount > 0 && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />}
          </button>
          {notifOpen && (
            <NotificationsPanel notifications={notifications} onMarkAllRead={markAllRead} onSelect={openNotification} />
          )}
        </div>

        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => closeAllExcept('settings')}
            aria-haspopup="true"
            aria-expanded={settingsOpen}
            aria-label="Settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-white"
          >
            <Settings size={17} />
          </button>
          {settingsOpen && (
            <div className="absolute right-0 top-11 z-50 w-64 rounded-xl border border-border bg-card p-1.5 shadow-glow-lg animate-fade-in">
              <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted/70">Settings</p>
              {SETTINGS_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => openSettingsItem(item)}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile — view/settings only, no logout option */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => closeAllExcept('profile')}
            aria-haspopup="true"
            aria-expanded={profileOpen}
            className="flex items-center gap-2.5 rounded-full border border-border bg-white/[0.03] py-1.5 pl-1.5 pr-3 transition-colors hover:border-border-strong"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-warning to-danger text-[11px] font-semibold text-white">
              RK
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold leading-tight text-white">Riya Kapoor</p>
              <p className="text-[10px] leading-tight text-muted">Product Manager</p>
            </div>
            <ChevronDown size={13} className="hidden text-muted sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-11 z-50 w-64 rounded-xl border border-border bg-card p-1.5 shadow-glow-lg animate-fade-in">
              <div className="flex items-center gap-2.5 border-b border-border px-3 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-warning to-danger text-xs font-semibold text-white">
                  RK
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">Riya Kapoor</p>
                  <p className="truncate text-[11px] text-muted">riya.kapoor@neuroforge.io</p>
                </div>
              </div>
              {PROFILE_ITEMS.map(({ label, description, Icon }) => (
                <button
                  key={label}
                  onClick={() => openProfileItem({ label, description })}
                  className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <InfoModal
        open={!!infoModal}
        icon={Settings}
        title={infoModal?.title}
        description={infoModal?.description}
        onClose={() => setInfoModal(null)}
      />
    </header>
  );
}

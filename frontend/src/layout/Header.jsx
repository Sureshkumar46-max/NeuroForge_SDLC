import { useState, useCallback } from 'react';
import { ChevronDown, Bell, Search, Settings, LogOut, User } from 'lucide-react';
import useDismiss from '../hooks/useDismiss.js';
import { useWorkspace } from '../context/WorkspaceContext.jsx';
import NotificationsPanel from '../components/common/NotificationsPanel.jsx';
import InfoModal from '../components/common/InfoModal.jsx';

const ORG_OPTIONS = ['NeuroForge Labs', 'Orion Retail Pvt Ltd', 'Vantage Health Systems'];
const SETTINGS_ITEMS = [
  { label: 'Account Preferences', description: 'Update your display name, timezone, and notification defaults.' },
  { label: 'Notification Settings', description: 'Choose which workspace events send you an alert.' },
  { label: 'Workspace Billing', description: 'View your current plan, seats, and invoice history.' },
  { label: 'API & Integrations', description: 'Manage API keys and connected third-party tools.' },
];

export default function Header() {
  const { notifications, unreadCount, markAllRead, signOut } = useWorkspace();

  const [orgOpen, setOrgOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(ORG_OPTIONS[0]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [infoModal, setInfoModal] = useState(null); // { title, description }

  const orgRef = useDismiss(orgOpen, useCallback(() => setOrgOpen(false), []));
  const notifRef = useDismiss(notifOpen, useCallback(() => setNotifOpen(false), []));
  const settingsRef = useDismiss(settingsOpen, useCallback(() => setSettingsOpen(false), []));
  const profileRef = useDismiss(profileOpen, useCallback(() => setProfileOpen(false), []));

  const closeAllExcept = (which) => {
    setOrgOpen(which === 'org' ? (o) => !o : false);
    setNotifOpen(which === 'notif' ? (o) => !o : false);
    setSettingsOpen(which === 'settings' ? (o) => !o : false);
    setProfileOpen(which === 'profile' ? (o) => !o : false);
  };

  const openNotification = (n) => {
    setNotifOpen(false);
    setInfoModal({ title: n.text, description: `Logged ${n.time}. Click into the relevant workspace section from the sidebar to see full details.` });
  };

  const openSettingsItem = (item) => {
    setSettingsOpen(false);
    setInfoModal({ title: item.label, description: item.description });
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-base/80 px-6 backdrop-blur-md">
      {/* Left — Organization dropdown + Project switcher */}
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

        <div className="hidden items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-2 text-sm text-muted md:flex">
          <Search size={14} />
          <input
            placeholder="Search projects, tasks…"
            className="w-48 bg-transparent text-sm text-white placeholder:text-muted/60 outline-none lg:w-64"
          />
        </div>
      </div>

      {/* Right — notifications, settings, compact profile, never stretches */}
      <div className="flex items-center gap-3">
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
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
            )}
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

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => closeAllExcept('profile')}
            aria-haspopup="true"
            aria-expanded={profileOpen}
            className="flex items-center gap-2.5 rounded-full border border-border bg-white/[0.03] py-1.5 pl-1.5 pr-3 transition-colors hover:border-border-strong"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent3 text-[11px] font-semibold text-white">
              AK
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold leading-tight text-white">Aditi Kapoor</p>
              <p className="text-[10px] leading-tight text-muted">Project Manager</p>
            </div>
            <ChevronDown size={13} className="hidden text-muted sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-11 z-50 w-60 rounded-xl border border-border bg-card p-1.5 shadow-glow-lg animate-fade-in">
              <div className="flex items-center gap-2.5 border-b border-border px-3 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent3 text-xs font-semibold text-white">
                  AK
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">Aditi Kapoor</p>
                  <p className="truncate text-[11px] text-muted">Project Manager</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  setInfoModal({ title: 'View Profile', description: 'Full profile management is coming soon to this workspace.' });
                }}
                className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <User size={15} /> View Profile
              </button>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  signOut();
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-danger transition-colors hover:bg-danger/10"
              >
                <LogOut size={15} /> Sign Out
              </button>
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

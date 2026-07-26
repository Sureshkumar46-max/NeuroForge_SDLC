import { NavLink } from 'react-router-dom';
import {
  FolderKanban,
  Briefcase,
  Target,
  BarChart3,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext.jsx';

// Module 3 — Project & Portfolio Management.
// In your real app, this section slots in alongside your existing
// Module 2 "Workspace" nav section (Dashboard / Organizations / Teams / Members) —
// see README.md for exactly how to merge the two.
const navSections = [
  {
    label: 'Projects',
    items: [
      { to: '/projects', label: 'Project Dashboard', icon: FolderKanban },
      { to: '/portfolio', label: 'Portfolio', icon: Briefcase },
      { to: '/milestones', label: 'Milestones', icon: Target },
      { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
];

const ROLE_STYLE = 'text-primary bg-primary/10 border-primary/30';

export default function Sidebar() {
  const { collapsed, toggleCollapsed, signOut } = useWorkspace();

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300 ${
        collapsed ? 'w-[76px]' : 'w-[248px]'
      }`}
    >
      {/* Logo — matches Module 2: blue "N" mark + wordmark + SDLC Platform badge */}
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent2 shadow-glow">
          <span className="text-base font-extrabold leading-none text-white">N</span>
        </div>
        {!collapsed && (
          <>
            <span className="truncate font-display text-[15px] font-bold tracking-tight text-white">
              NeuroForge
            </span>
            <span className="ml-auto shrink-0 rounded-md border border-border-strong bg-primary/10 px-2 py-1 text-center text-[9px] font-semibold uppercase leading-[1.15] tracking-wide text-primary">
              SDLC
              <br />
              Platform
            </span>
          </>
        )}
      </div>

      {/* Nav — only this scrolls if needed, sidebar itself never scrolls */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {navSections.map((section) => (
          <div key={section.label} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted/70">
                {section.label}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-primary/15 text-primary shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]'
                        : 'text-muted hover:bg-white/[0.04] hover:text-white'
                    }`
                  }
                >
                  <item.icon size={18} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggleCollapsed}
        className="mx-3 mb-2 flex items-center justify-center gap-2 rounded-lg border border-border py-2 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-white"
      >
        {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        {!collapsed && 'Collapse'}
      </button>

      {/* Workspace user card — fixed at bottom, compact, with working logout */}
      <div className="shrink-0 border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] p-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent3 text-xs font-semibold text-white">
            AK
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">Aditi Kapoor</p>
                <span
                  className={`mt-0.5 inline-block rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${ROLE_STYLE}`}
                >
                  Project Manager
                </span>
              </div>
              <button
                type="button"
                onClick={signOut}
                title="Sign out"
                aria-label="Sign out"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-danger/10 hover:text-danger"
              >
                <LogOut size={15} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

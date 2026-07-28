import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  FolderKanban,
  ListTodo,
  CalendarClock,
  Kanban,
  Clock,
  History,
  Bug,
  GitBranch,
  BarChart3,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext.jsx';
import { useAgile } from '../context/AgileContext.jsx';

const navSections = [
  {
    label: 'Workspace',
    items: [
      { to: '/overview', label: 'Overview', icon: LayoutGrid },
      { to: '/projects', label: 'Projects', icon: FolderKanban },
    ],
  },
  {
    label: 'Agile Planning',
    items: [
      { to: '/sprint-dashboard', label: 'Sprint Dashboard', icon: LayoutGrid },
      { to: '/backlog', label: 'Backlog', icon: ListTodo, badge: 'backlogCount' },
      { to: '/sprint-planning', label: 'Sprint Planning', icon: CalendarClock },
      { to: '/kanban-board', label: 'Kanban Board', icon: Kanban },
      { to: '/sprint-details', label: 'Sprint Details', icon: Clock },
      { to: '/sprint-history', label: 'Sprint History', icon: History },
    ],
  },
  {
    label: 'Delivery',
    items: [
      { to: '/bug-tracker', label: 'Bug Tracker', icon: Bug },
      { to: '/pipelines', label: 'Pipelines', icon: GitBranch },
    ],
  },
  {
    label: 'Insights',
    items: [{ to: '/analytics', label: 'Analytics', icon: BarChart3 }],
  },
];

export default function Sidebar() {
  const { collapsed, toggleCollapsed } = useWorkspace();
  const { tasks } = useAgile();
  const backlogCount = tasks.filter((t) => t.status === 'backlog').length;

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300 ${
        collapsed ? 'w-[76px]' : 'w-[248px]'
      }`}
    >
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
                  {!collapsed && item.badge === 'backlogCount' && typeof backlogCount === 'number' && (
                    <span className="ml-auto rounded-full bg-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-muted">
                      {backlogCount}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <button
        onClick={toggleCollapsed}
        className="mx-3 mb-2 flex items-center justify-center gap-2 rounded-lg border border-border py-2 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-white"
      >
        {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        {!collapsed && 'Collapse'}
      </button>

      <div className="shrink-0 border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] p-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-warning to-danger text-xs font-semibold text-white">
            RK
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">Riya Kapoor</p>
              <span className="mt-0.5 inline-block rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary">
                Product Manager
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

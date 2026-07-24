import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Plus, Search, Rocket, CheckCircle2, PauseCircle, Layers } from 'lucide-react';
import PageHeader from '../../components/projects/PageHeader.jsx';
import StatCard from '../../components/projects/StatCard.jsx';
import ProjectCard from '../../components/projects/ProjectCard.jsx';
import { useProjects } from '../../context/ProjectsContext.jsx';

const FILTERS = ['All', 'Active', 'On Hold', 'Completed'];

export default function ProjectDashboard() {
  const { projects } = useProjects();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === 'All' || p.status === filter;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [projects, filter, query]);

  const activeCount = projects.filter((p) => p.status === 'Active').length;
  const completedCount = projects.filter((p) => p.status === 'Completed').length;
  const onHoldCount = projects.filter((p) => p.status === 'On Hold').length;

  return (
    <div>
      <PageHeader
        icon={FolderKanban}
        title="Project Dashboard"
        description="All projects across your organizations, at a glance."
        actions={
          <Link to="/projects/new" className="btn-primary">
            <Plus size={16} /> New Project
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Layers} label="Total Projects" value={projects.length} tone="primary" />
        <StatCard icon={Rocket} label="Active" value={activeCount} tone="success" />
        <StatCard icon={PauseCircle} label="On Hold" value={onHoldCount} tone="warning" />
        <StatCard icon={CheckCircle2} label="Completed" value={completedCount} tone="primary" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-150 ${
                filter === f
                  ? 'bg-primary text-white shadow-glow'
                  : 'border border-border bg-white/[0.03] text-muted hover:border-border-strong hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-white/[0.03] px-3.5 py-2 sm:w-72">
          <Search size={14} className="text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full bg-transparent text-sm text-white placeholder:text-muted/60 outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="surface-card flex flex-col items-center justify-center gap-2 py-16 text-center">
          <FolderKanban size={28} className="text-muted" />
          <p className="text-sm font-medium text-white">No projects match this view</p>
          <p className="text-xs text-muted">Try a different filter or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}

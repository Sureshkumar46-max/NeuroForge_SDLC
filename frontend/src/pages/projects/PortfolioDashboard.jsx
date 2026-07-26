import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Search, ArrowUpDown } from 'lucide-react';
import PageHeader from '../../components/projects/PageHeader.jsx';
import HealthBadge from '../../components/projects/HealthBadge.jsx';
import ProgressBar from '../../components/projects/ProgressBar.jsx';
import Select from '../../components/common/Select.jsx';
import { organizations, teams } from '../../data/mockData.js';
import { useProjects } from '../../context/ProjectsContext.jsx';

const SORT_OPTIONS = ['Progress (high to low)', 'Progress (low to high)', 'Name (A–Z)', 'Risk'];
const RISK_ORDER = { High: 0, Medium: 1, Low: 2 };

export default function PortfolioDashboard() {
  const { projects } = useProjects();
  const [status, setStatus] = useState('All');
  const [team, setTeam] = useState('All');
  const [org, setOrg] = useState('All');
  const [methodology, setMethodology] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(SORT_OPTIONS[0]);

  const filtered = useMemo(() => {
    let list = projects.filter((p) => {
      return (
        (status === 'All' || p.status === status) &&
        (team === 'All' || p.team === team) &&
        (org === 'All' || p.organization === org) &&
        (methodology === 'All' || p.methodology === methodology) &&
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    });

    switch (sort) {
      case 'Progress (high to low)':
        list = [...list].sort((a, b) => b.progress - a.progress);
        break;
      case 'Progress (low to high)':
        list = [...list].sort((a, b) => a.progress - b.progress);
        break;
      case 'Name (A–Z)':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Risk':
        list = [...list].sort((a, b) => RISK_ORDER[a.risk] - RISK_ORDER[b.risk]);
        break;
      default:
        break;
    }
    return list;
  }, [projects, status, team, org, methodology, query, sort]);

  return (
    <div>
      <PageHeader
        icon={Briefcase}
        title="Portfolio Dashboard"
        description="Health, budget and ownership across the entire project portfolio."
      />

      {/* Filters */}
      <div className="surface-card relative z-20 mb-6 grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
        <Select value={status} onChange={setStatus} options={['All', 'Active', 'On Hold', 'Completed']} />
        <Select value={team} onChange={setTeam} options={['All', ...teams]} />
        <Select value={org} onChange={setOrg} options={['All', ...organizations]} />
        <Select value={methodology} onChange={setMethodology} options={['All', 'Agile', 'Scrum', 'Kanban', 'Waterfall']} />
        <div className="flex items-center gap-2 rounded-lg border border-border bg-white/[0.03] px-3 py-2.5">
          <Search size={14} className="text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="w-full bg-transparent text-sm text-white placeholder:text-muted/60 outline-none"
          />
        </div>
      </div>

      <div className="relative z-10 mb-4 flex items-center justify-between">
        <p className="text-xs text-muted">{filtered.length} project{filtered.length !== 1 && 's'}</p>
        <div className="flex items-center gap-2 text-xs text-muted">
          <ArrowUpDown size={13} className="shrink-0" />
          <Select value={sort} onChange={setSort} options={SORT_OPTIONS} className="w-56" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <Link
            key={p.id}
            to={`/projects/${p.id}`}
            className="surface-card surface-card-hover block p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{p.name}</p>
                <p className="mt-0.5 truncate text-xs text-muted">{p.organization}</p>
              </div>
              <HealthBadge health={p.health} />
            </div>

            <div className="mt-4">
              <ProgressBar value={p.progress} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="rounded-lg bg-white/[0.03] py-2">
                <p className="text-muted">Risk</p>
                <p
                  className={`font-semibold ${
                    p.risk === 'High' ? 'text-danger' : p.risk === 'Medium' ? 'text-warning' : 'text-success'
                  }`}
                >
                  {p.risk}
                </p>
              </div>
              <div className="rounded-lg bg-white/[0.03] py-2">
                <p className="text-muted">Budget</p>
                <p className="font-semibold text-white">{p.budgetUsed}%</p>
              </div>
              <div className="rounded-lg bg-white/[0.03] py-2">
                <p className="text-muted">Owner</p>
                <p className="truncate font-semibold text-white">{p.manager.name.split(' ')[0]}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

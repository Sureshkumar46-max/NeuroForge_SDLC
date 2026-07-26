import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Pencil, Archive, Trash2, Calendar, Users2, Layers,
  CheckCircle2, Clock, Bug, Gauge, ListChecks,
} from 'lucide-react';
import StatusBadge from '../../components/projects/StatusBadge.jsx';
import HealthBadge from '../../components/projects/HealthBadge.jsx';
import ProgressBar from '../../components/projects/ProgressBar.jsx';
import AvatarGroup from '../../components/projects/AvatarGroup.jsx';
import StatCard from '../../components/projects/StatCard.jsx';
import EditProjectModal from '../../components/projects/EditProjectModal.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import { useProjects } from '../../context/ProjectsContext.jsx';
import { useWorkspace } from '../../context/WorkspaceContext.jsx';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject, archiveProject, deleteProject } = useProjects();
  const { pushNotification } = useWorkspace();

  const project = projects.find((p) => p.id === id) ?? projects[0];

  const [editing, setEditing] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!project) {
    return (
      <div className="surface-card p-8 text-center">
        <p className="text-sm text-muted">This project no longer exists.</p>
        <button onClick={() => navigate('/projects')} className="btn-secondary mt-4">
          <ArrowLeft size={14} /> Back to Project Dashboard
        </button>
      </div>
    );
  }

  const handleSaveEdit = (patch) => {
    updateProject(project.id, patch);
    pushNotification(`Project Updated — "${patch.name}"`);
    setEditing(false);
  };

  const handleArchive = () => {
    archiveProject(project.id);
    pushNotification(`Project Archived — "${project.name}"`);
    setConfirmArchive(false);
  };

  const handleDelete = () => {
    deleteProject(project.id);
    setConfirmDelete(false);
    navigate('/projects');
  };

  return (
    <div>
      <button
        onClick={() => navigate('/projects')}
        className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Back to Project Dashboard
      </button>

      {/* Title block */}
      <div className="surface-card mb-6 flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-glow">
            <Layers size={20} className="text-white" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-bold text-white">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="mt-1 text-xs text-muted">
              {project.organization} · {project.team} · {project.sprint}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={() => setEditing(true)} className="btn-secondary">
            <Pencil size={15} /> Edit
          </button>
          <button onClick={() => setConfirmArchive(true)} className="btn-secondary">
            <Archive size={15} /> Archive
          </button>
          <button onClick={() => setConfirmDelete(true)} className="btn-danger-ghost">
            <Trash2 size={15} /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left / main column */}
        <div className="space-y-6 lg:col-span-2">
          <div className="surface-card p-6">
            <h3 className="mb-2 text-sm font-semibold text-white">Description</h3>
            <p className="text-sm leading-relaxed text-muted">{project.description}</p>
          </div>

          <div className="surface-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Project Health &amp; Progress</h3>
              <HealthBadge health={project.health} />
            </div>
            <ProgressBar value={project.progress} />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-lg bg-white/[0.03] py-2.5">
                <p className="text-muted">Risk</p>
                <p className="mt-0.5 font-semibold text-white">{project.risk}</p>
              </div>
              <div className="rounded-lg bg-white/[0.03] py-2.5">
                <p className="text-muted">Budget Used</p>
                <p className="mt-0.5 font-semibold text-white">{project.budgetUsed}%</p>
              </div>
              <div className="rounded-lg bg-white/[0.03] py-2.5">
                <p className="text-muted">Methodology</p>
                <p className="mt-0.5 font-semibold text-white">{project.methodology}</p>
              </div>
            </div>
          </div>

          <div className="surface-card p-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <Users2 size={16} className="text-primary" /> Members
            </h3>
            <AvatarGroup members={project.members} max={8} />
          </div>

          <div className="surface-card p-6">
            <h3 className="mb-3 text-sm font-semibold text-white">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.length === 0 ? (
                <p className="text-xs text-muted">No technologies listed yet.</p>
              ) : (
                project.techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border-strong bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    {t}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="surface-card p-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <Calendar size={16} className="text-primary" /> Timeline
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <p className="text-xs text-muted">Start Date</p>
                <p className="font-medium text-white">{project.startDate || '—'}</p>
              </div>
              <div className="h-px flex-1 bg-border" />
              <div className="text-right">
                <p className="text-xs text-muted">End Date</p>
                <p className="font-medium text-white">{project.endDate || '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right / stats column */}
        <div className="space-y-4">
          <StatCard icon={ListChecks} label="Total Tasks" value={project.stats.totalTasks} tone="primary" />
          <StatCard icon={CheckCircle2} label="Completed" value={project.stats.completed} tone="success" />
          <StatCard icon={Clock} label="Pending" value={project.stats.pending} tone="warning" />
          <StatCard icon={Bug} label="Bugs" value={project.stats.bugs} tone="danger" />
          <StatCard icon={Gauge} label="Velocity" value={`${project.stats.velocity} pts/sprint`} tone="primary" />
        </div>
      </div>

      {editing && (
        <EditProjectModal project={project} onSave={handleSaveEdit} onClose={() => setEditing(false)} />
      )}

      <ConfirmDialog
        open={confirmArchive}
        tone="primary"
        title="Archive this project?"
        description={`"${project.name}" will be marked as archived and moved out of active views.`}
        confirmLabel="Archive"
        onConfirm={handleArchive}
        onCancel={() => setConfirmArchive(false)}
      />

      <ConfirmDialog
        open={confirmDelete}
        tone="danger"
        title="Delete this project?"
        description={`This will permanently remove "${project.name}" from your workspace. This can't be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}

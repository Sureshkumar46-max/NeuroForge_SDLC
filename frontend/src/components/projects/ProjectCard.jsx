import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users2, Eye, Pencil, Archive, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import HealthBadge from './HealthBadge.jsx';
import ProgressBar from './ProgressBar.jsx';
import AvatarGroup from './AvatarGroup.jsx';
import EditProjectModal from './EditProjectModal.jsx';
import ConfirmDialog from '../common/ConfirmDialog.jsx';
import { useProjects } from '../../context/ProjectsContext.jsx';
import { useWorkspace } from '../../context/WorkspaceContext.jsx';

export default function ProjectCard({ project }) {
  const { updateProject, archiveProject, deleteProject } = useProjects();
  const { pushNotification } = useWorkspace();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
  };

  return (
    <div className="surface-card surface-card-hover group relative overflow-hidden bg-white/[0.02] p-5 backdrop-blur-sm animate-fade-in">
      {/* ambient glow accent */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to={`/projects/${project.id}`} className="block truncate text-[15px] font-semibold text-white hover:text-primary">
            {project.name}
          </Link>
          <p className="mt-0.5 truncate text-xs text-muted">
            {project.organization} · {project.team}
          </p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-muted">Project Manager</p>
          <p className="mt-0.5 font-medium text-white">{project.manager.name}</p>
        </div>
        <div>
          <p className="text-muted">Sprint</p>
          <p className="mt-0.5 font-medium text-white">{project.sprint}</p>
        </div>
        <div>
          <p className="text-muted">Members</p>
          <div className="mt-1 flex items-center gap-1.5">
            <Users2 size={13} className="text-muted" />
            <span className="font-medium text-white">{project.members.length}</span>
          </div>
        </div>
        <div>
          <p className="text-muted">Health</p>
          <div className="mt-1">
            <HealthBadge health={project.health} />
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <ProgressBar value={project.progress} />
      </div>

      <div className="relative mt-4 flex items-center gap-1.5 text-[11px] text-muted">
        <Calendar size={12} />
        <span>{project.startDate}</span>
        <span className="text-muted/50">→</span>
        <span>{project.endDate}</span>
      </div>

      <div className="relative mt-4 flex items-center justify-between border-t border-border pt-3.5">
        <AvatarGroup members={project.members} max={4} />
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => navigate(`/projects/${project.id}`)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-primary"
            title="View"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => setEditing(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-white"
            title="Edit"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => setConfirmArchive(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-warning/40 hover:text-warning"
            title="Archive"
          >
            <Archive size={14} />
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-danger/40 hover:text-danger"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
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

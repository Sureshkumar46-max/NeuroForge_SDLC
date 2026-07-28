import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  FolderKanban,
  Rocket,
  CheckCircle2,
  PauseCircle,
  Layers,
  Eye,
  Pencil,
  Archive,
  Trash2,
  Calendar,
  Users,
} from "lucide-react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useProjects } from "../../context/ProjectsContext";

const FILTERS = ["All", "Active", "On Hold", "Completed"];

const healthColor = {
  "On Track": "#10B981",
  "Delayed": "#EF4444",
  "At Risk": "#F59E0B",
};

const statusColor = {
  Active: "#10B981",
  "On Hold": "#F59E0B",
  Completed: "#3B82F6",
};

function ProjectDashboard() {
  const { projects, deleteProject, archiveProject } = useProjects();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.status === filter;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [projects, filter, query]);

  const activeCount = projects.filter((p) => p.status === "Active").length;
  const completedCount = projects.filter((p) => p.status === "Completed").length;
  const onHoldCount = projects.filter((p) => p.status === "On Hold").length;

  const handleDelete = (id) => {
    if (window.confirm("Delete this project? This cannot be undone.")) {
      deleteProject?.(id);
    }
  };

  const handleArchive = (id) => {
    archiveProject?.(id);
  };

  return (
    <WorkspaceLayout
      title="Project Dashboard"
      subtitle="All projects across your organizations, at a glance."
      pageClassName="project-dashboard-page"
      actions={
        <Link to="/projects/new">
          <Button icon={Plus} className="create-organization-btn">New Project</Button>
        </Link>
      }
    >
      <div className="stats-grid">
        <div className="metric-card">
          <div className="metric-icon metric-icon-blue"><Layers size={18} /></div>
          <strong>{projects.length}</strong>
          <span>Total projects</span>
        </div>
        <div className="metric-card">
          <div className="metric-icon metric-icon-green"><Rocket size={18} /></div>
          <strong>{activeCount}</strong>
          <span>Active</span>
        </div>
        <div className="metric-card">
          <div className="metric-icon metric-icon-amber"><PauseCircle size={18} /></div>
          <strong>{onHoldCount}</strong>
          <span>On hold</span>
        </div>
        <div className="metric-card">
          <div className="metric-icon metric-icon-blue"><CheckCircle2 size={18} /></div>
          <strong>{completedCount}</strong>
          <span>Completed</span>
        </div>
      </div>

      <Card title="Projects overview">
        <div className="filter-row">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
            <Search size={16} color="var(--ink-soft)" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {FILTERS.map((f) => (
              <span
                key={f}
                className="pill"
                onClick={() => setFilter(f)}
                style={{
                  cursor: "pointer",
                  background: filter === f ? "var(--brand)" : undefined,
                  color: filter === f ? "#fff" : undefined,
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <FolderKanban size={28} color="var(--ink-soft)" />
            <p style={{ marginTop: "12px", fontWeight: 600 }}>No projects match this view</p>
            <p style={{ color: "var(--ink-soft)" }}>Try a different filter or search term.</p>
          </div>
        ) : (
          <div className="org-grid">
            {filtered.map((p) => (
              <div className="workspace-card org-card" key={p.id}>
                <div className="org-card-header">
                  <div>
                    <h4>{p.name}</h4>
                    <p>{p.organization} · {p.department}</p>
                  </div>
                  <span
                    className="status-badge"
                    style={{
                      background: `${statusColor[p.status] || "#64748B"}22`,
                      color: statusColor[p.status] || "#64748B",
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <div>
                    <p style={{ fontSize: "12px", color: "var(--ink-soft)", marginBottom: "2px" }}>Project Manager</p>
                    <strong style={{ fontSize: "14px" }}>{p.projectManager || "—"}</strong>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "var(--ink-soft)", marginBottom: "2px" }}>Sprint</p>
                    <strong style={{ fontSize: "14px" }}>{p.sprint || "—"}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <div>
                    <p style={{ fontSize: "12px", color: "var(--ink-soft)", marginBottom: "2px" }}>
                      <Users size={12} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                      Members
                    </p>
                    <strong style={{ fontSize: "14px" }}>{p.membersCount ?? (p.members?.length || 0)}</strong>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "var(--ink-soft)", marginBottom: "2px" }}>Health</p>
                    <strong style={{ fontSize: "14px", color: healthColor[p.health] || "#94A3B8" }}>
                      {p.health || "—"}
                    </strong>
                  </div>
                </div>

                <div style={{ marginTop: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--ink-soft)", marginBottom: "4px" }}>
                    <span>Progress</span>
                    <span>{p.progress ?? 0}%</span>
                  </div>
                  <div style={{ height: "6px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${p.progress ?? 0}%`,
                        background: statusColor[p.status] || "#3B82F6",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>

                {(p.startDate || p.endDate) && (
                  <p style={{ fontSize: "12px", color: "var(--ink-soft)", marginTop: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={12} />
                    {p.startDate} → {p.endDate}
                  </p>
                )}

                {p.members?.length > 0 && (
                  <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                    {p.members.map((m, i) => (
                      <div
                        key={i}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: "var(--brand)",
                          color: "#fff",
                          fontSize: "11px",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {m.initials || m.name?.slice(0, 2)?.toUpperCase()}
                      </div>
                    ))}
                  </div>
                )}

                <div className="form-actions" style={{ marginTop: "14px" }}>
                  <Link className="text-link" to={`/projects/${p.id}`}>
                    View details
                  </Link>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      title="View"
                      onClick={() => navigate(`/projects/${p.id}`)}
                      style={{ background: "transparent", border: "none", color: "var(--ink-soft)", cursor: "pointer" }}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => navigate("/projects/new")}
                      style={{ background: "transparent", border: "none", color: "var(--ink-soft)", cursor: "pointer" }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      title="Archive"
                      onClick={() => handleArchive(p.id)}
                      style={{ background: "transparent", border: "none", color: "var(--ink-soft)", cursor: "pointer" }}
                    >
                      <Archive size={16} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(p.id)}
                      style={{ background: "transparent", border: "none", color: "#EF4444", cursor: "pointer" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </WorkspaceLayout>
  );
}

export default ProjectDashboard;
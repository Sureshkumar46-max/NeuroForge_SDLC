import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Pencil, Archive, Trash2, Calendar, Users2, Layers,
  CheckCircle2, Clock, Bug, Gauge, ListChecks,
} from "lucide-react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Card from "../../components/Card";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import { useProjects } from "../../context/ProjectsContext.jsx";

const healthColor = {
  "On Track": "#10B981",
  Delayed: "#EF4444",
  "At Risk": "#F59E0B",
};

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, archiveProject, deleteProject } = useProjects();

  const project = projects.find((p) => String(p.id) === String(id));

  const [confirmArchive, setConfirmArchive] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const smallBtnStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    fontSize: "12px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.03)",
    color: "#fff",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  const dangerBtnStyle = {
    ...smallBtnStyle,
    border: "1px solid rgba(239,68,68,0.3)",
    color: "#EF4444",
    background: "rgba(239,68,68,0.08)",
  };

  if (!project) {
    return (
      <WorkspaceLayout title="Project not found" subtitle="">
        <Card>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "var(--ink-soft)" }}>This project no longer exists.</p>
            <button style={{ ...smallBtnStyle, marginTop: "16px" }} onClick={() => navigate("/projects")}>
              <ArrowLeft size={14} /> Back to Project Dashboard
            </button>
          </div>
        </Card>
      </WorkspaceLayout>
    );
  }

  const handleArchive = () => {
    archiveProject(project.id);
    setConfirmArchive(false);
  };

  const handleDelete = () => {
    deleteProject(project.id);
    setConfirmDelete(false);
    navigate("/projects");
  };

  const statBoxStyle = {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const techList = project.techStackTags
    ? project.techStackTags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <WorkspaceLayout
      title={project.name}
      subtitle={`${project.organizationName || "—"} · ${project.teamName || "—"} · ${project.sprint || "—"}`}
      pageClassName="project-details-page"
      actions={
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button style={smallBtnStyle} onClick={() => navigate("/projects/new")}>
            <Pencil size={13} /> Edit
          </button>
          <button style={smallBtnStyle} onClick={() => setConfirmArchive(true)}>
            <Archive size={13} /> Archive
          </button>
          <button style={dangerBtnStyle} onClick={() => setConfirmDelete(true)}>
            <Trash2 size={13} /> Delete
          </button>
        </div>
      }
    >
      <button
        onClick={() => navigate("/projects")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "transparent",
          border: "none",
          color: "var(--ink-soft)",
          cursor: "pointer",
          fontSize: "13px",
          marginBottom: "16px",
        }}
      >
        <ArrowLeft size={14} /> Back to Project Dashboard
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", alignItems: "start" }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Card title="Description">
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}>
              {project.description || "No description provided."}
            </p>
          </Card>

          <Card title="Project Health & Progress">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "13px", color: "var(--ink-soft)" }}>Progress</span>
              <span
                className="status-badge"
                style={{
                  background: `${healthColor[project.healthStatus] || "#64748B"}22`,
                  color: healthColor[project.healthStatus] || "#64748B",
                }}
              >
                {project.healthStatus || "—"}
              </span>
            </div>
            <div style={{ height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", overflow: "hidden", marginBottom: "6px" }}>
              <div
                style={{
                  height: "100%",
                  width: `${project.progress ?? 0}%`,
                  background: healthColor[project.healthStatus] || "#3B82F6",
                  borderRadius: "4px",
                }}
              />
            </div>
            <p style={{ textAlign: "right", fontSize: "12px", color: "var(--ink-soft)", marginBottom: "16px" }}>
              {project.progress ?? 0}%
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              <div style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px" }}>
                <p style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Risk</p>
                <p style={{ fontWeight: 600 }}>{project.riskLevel || "—"}</p>
              </div>
              <div style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px" }}>
                <p style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Budget Used</p>
                <p style={{ fontWeight: 600 }}>{project.budgetUsed ?? 0}%</p>
              </div>
              <div style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px" }}>
                <p style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Methodology</p>
                <p style={{ fontWeight: 600 }}>{project.methodology || "—"}</p>
              </div>
            </div>
          </Card>

          <Card title="Project Manager">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "var(--brand)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {project.managerName ? project.managerName.slice(0, 2).toUpperCase() : "—"}
              </div>
              <span>{project.managerName || "Not assigned"}</span>
            </div>
          </Card>

          <Card title="Technology Stack">
            <div className="pill-row">
              {techList.length === 0 ? (
                <p style={{ color: "var(--ink-soft)", fontSize: "13px" }}>No technologies listed yet.</p>
              ) : (
                techList.map((t) => (
                  <span key={t} className="pill">{t}</span>
                ))
              )}
            </div>
          </Card>

          <Card title="Timeline">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Start Date</p>
                <p style={{ fontWeight: 600 }}>{project.startDate || "—"}</p>
              </div>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)", margin: "0 16px" }} />
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "12px", color: "var(--ink-soft)" }}>End Date</p>
                <p style={{ fontWeight: 600 }}>{project.endDate || "—"}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column — stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={statBoxStyle}>
            <ListChecks size={20} color="#3B82F6" />
            <div>
              <p style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Total Tasks</p>
              <strong style={{ fontSize: "18px" }}>{project.totalTasks ?? 0}</strong>
            </div>
          </div>
          <div style={statBoxStyle}>
            <CheckCircle2 size={20} color="#10B981" />
            <div>
              <p style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Completed</p>
              <strong style={{ fontSize: "18px" }}>{project.completedTasks ?? 0}</strong>
            </div>
          </div>
          <div style={statBoxStyle}>
            <Clock size={20} color="#F59E0B" />
            <div>
              <p style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Pending</p>
              <strong style={{ fontSize: "18px" }}>{project.pendingTasks ?? 0}</strong>
            </div>
          </div>
          <div style={statBoxStyle}>
            <Bug size={20} color="#EF4444" />
            <div>
              <p style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Bugs</p>
              <strong style={{ fontSize: "18px" }}>{project.bugs ?? 0}</strong>
            </div>
          </div>
          <div style={statBoxStyle}>
            <Gauge size={20} color="#3B82F6" />
            <div>
              <p style={{ fontSize: "12px", color: "var(--ink-soft)" }}>Velocity</p>
              <strong style={{ fontSize: "18px" }}>{project.velocity ?? 0} pts/sprint</strong>
            </div>
          </div>
        </div>
      </div>

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
    </WorkspaceLayout>
  );
}

export default ProjectDetails;
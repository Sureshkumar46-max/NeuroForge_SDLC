import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Plus, X } from "lucide-react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Card from "../../components/Card";
import { useProjects } from "../../context/ProjectsContext";

const API_BASE = "http://localhost:8080/api/projects";

function getAuthHeader() {
  const token = sessionStorage.getItem("nf_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const healthColor = {
  "On Track": "#10B981",
  "At Risk": "#F59E0B",
  Delayed: "#EF4444",
  Completed: "#3B82F6",
};

const STATUS_OPTIONS = ["On Track", "At Risk", "Delayed", "Completed"];

function Milestones() {
  const { projects, loading: projectsLoading } = useProjects();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [form, setForm] = useState({
    projectId: "",
    title: "",
    dueDate: "",
    status: "On Track",
  });

  const fetchAllMilestones = async () => {
    if (!projects.length) {
      setMilestones([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        projects.map((p) =>
          axios
            .get(`${API_BASE}/${p.id}/milestones`, { headers: getAuthHeader() })
            .then((res) => res.data)
            .catch((err) => {
              console.error(`Failed to fetch milestones for project ${p.id}:`, err);
              return [];
            })
        )
      );
      setMilestones(results.flat());
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectsLoading) return;
    fetchAllMilestones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, projectsLoading]);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.projectId || !form.title || !form.dueDate) {
      setFormError("Project, Title, Due Date ellam fill pannunga.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        title: form.title,
        dueDate: form.dueDate,
        status: form.status,
      };
      await axios.post(`${API_BASE}/${form.projectId}/milestones`, payload, {
        headers: getAuthHeader(),
      });
      setForm({ projectId: "", title: "", dueDate: "", status: "On Track" });
      setShowForm(false);
      fetchAllMilestones();
    } catch (err) {
      console.error("Failed to create milestone:", err);
      setFormError(err.response?.data?.message || err.response?.data || err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <WorkspaceLayout
      title="Milestones"
      subtitle="Key delivery checkpoints across every active project."
      pageClassName="milestones-page"
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
        <button
          className="btn-primary"
          onClick={() => setShowForm((s) => !s)}
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancel" : "Add Milestone"}
        </button>
      </div>

      <Card title="Delivery timeline">
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="workspace-card"
            style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {formError && <p style={{ color: "#EF4444", fontSize: "13px" }}>{formError}</p>}

            <select
              value={form.projectId}
              onChange={(e) => handleFormChange("projectId", e.target.value)}
              required
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Milestone title"
              value={form.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
              required
            />

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => handleFormChange("dueDate", e.target.value)}
              required
            />

            <select
              value={form.status}
              onChange={(e) => handleFormChange("status", e.target.value)}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Milestone"}
            </button>
          </form>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {loading || projectsLoading ? (
            <p>Loading milestones...</p>
          ) : error ? (
            <p style={{ color: "#EF4444" }}>Failed to load milestones.</p>
          ) : milestones.length === 0 ? (
            <p>No milestones yet.</p>
          ) : (
            milestones.map((m) => (
              <div key={m.id} className="workspace-card">
                <div className="org-card-header">
                  <div>
                    <h4>{m.title}</h4>
                    <p>{m.project?.name}</p>
                  </div>
                  <span
                    className="status-badge"
                    style={{
                      background: `${healthColor[m.status] || "#64748B"}22`,
                      color: healthColor[m.status] || "#64748B",
                    }}
                  >
                    {m.status}
                  </span>
                </div>

                <div className="pill-row" style={{ marginTop: "10px" }}>
                  <span className="pill">
                    <Calendar size={13} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                    Due {m.dueDate}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </WorkspaceLayout>
  );
}

export default Milestones;
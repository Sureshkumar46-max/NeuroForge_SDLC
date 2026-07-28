import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, X, Rocket } from "lucide-react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { organizations, teams, managers } from "../../data/mockData.js";
import { useProjects } from "../../context/ProjectsContext.jsx";

const METHODOLOGIES = ["Agile", "Scrum", "Kanban", "Waterfall"];
const PRIORITIES = ["Low", "Medium", "High", "Critical"];

export default function CreateProject() {
  const navigate = useNavigate();
  const { addProject } = useProjects();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState(organizations[0]);
  const [team, setTeam] = useState(teams[0]);
  const [manager, setManager] = useState(managers[0]);
  const [priority, setPriority] = useState(PRIORITIES[1]);
  const [methodology, setMethodology] = useState(METHODOLOGIES[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState(["React", "Spring Boot"]);
  const [logoName, setLogoName] = useState(null);

  const addTech = (e) => {
    e.preventDefault();
    const val = techInput.trim();
    if (val && !techStack.includes(val)) {
      setTechStack([...techStack, val]);
      setTechInput("");
    }
  };

  const removeTech = (t) => setTechStack(techStack.filter((x) => x !== t));

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject({
      name: name.trim() || "Untitled Project",
      description,
      organization,
      team,
      manager,
      priority,
      methodology,
      startDate,
      endDate,
      techStack,
    });
    navigate("/projects");
  };

  const labelStyle = { fontSize: "12px", fontWeight: 600, color: "var(--ink-soft)", marginBottom: "6px", display: "block" };
  const rowStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" };

  return (
    <WorkspaceLayout
      title="Create Project"
      subtitle="Set up a new project inside your organization's portfolio."
      pageClassName="create-project-page"
    >
      <Card title="Project Basics">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Project Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. NeuroBot AI Assistant"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the goal of this project…"
              style={{ width: "100%", resize: "none" }}
            />
          </div>

          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Organization</label>
              <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
                {organizations.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Team</label>
              <select value={team} onChange={(e) => setTeam(e.target.value)}>
                {teams.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Project Manager</label>
              <select value={manager} onChange={(e) => setManager(e.target.value)}>
                {managers.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", marginBottom: "16px" }}>
            <h4 style={{ marginBottom: "12px" }}>Methodology &amp; Timeline</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Methodology</label>
                <select value={methodology} onChange={(e) => setMethodology(e.target.value)}>
                  {METHODOLOGIES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", marginBottom: "16px" }}>
            <h4 style={{ marginBottom: "12px" }}>Technology Stack</h4>
            <div className="pill-row" style={{ marginBottom: "10px" }}>
              {techStack.map((t) => (
                <span key={t} className="pill">
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTech(t)}
                    style={{ marginLeft: "6px", background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add a technology and press Add…"
                style={{ flex: 1 }}
              />
              <Button variant="secondary" onClick={addTech}>Add</Button>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", marginBottom: "16px" }}>
            <h4 style={{ marginBottom: "12px" }}>Project Logo</h4>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "1px dashed rgba(255,255,255,0.2)",
                borderRadius: "12px",
                padding: "32px",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <UploadCloud size={22} color="var(--ink-soft)" />
              <p style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
                {logoName ? logoName : "Click to upload or drag and drop"}
              </p>
              <p style={{ fontSize: "11px", color: "var(--ink-soft)" }}>PNG or SVG, up to 2MB</p>
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => setLogoName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </div>

          <div className="form-actions" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px" }}>
            <Button type="button" variant="secondary" onClick={() => navigate("/projects")}>
              Cancel
            </Button>
            <Button type="submit" icon={Rocket}>
              Save Project
            </Button>
          </div>
        </form>
      </Card>
    </WorkspaceLayout>
  );
}
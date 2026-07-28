import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpDown } from "lucide-react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Card from "../../components/Card";
import { organizations, teams } from "../../data/mockData.js";
import { useProjects } from "../../context/ProjectsContext.jsx";

const SORT_OPTIONS = ["Progress (high to low)", "Progress (low to high)", "Name (A–Z)", "Risk"];
const RISK_ORDER = { High: 0, Medium: 1, Low: 2 };

const riskColor = {
  High: "#EF4444",
  Medium: "#F59E0B",
  Low: "#10B981",
};

const healthColor = {
  "On Track": "#10B981",
  Delayed: "#EF4444",
  "At Risk": "#F59E0B",
};

export default function PortfolioDashboard() {
  const { projects } = useProjects();
  const [status, setStatus] = useState("All");
  const [team, setTeam] = useState("All");
  const [org, setOrg] = useState("All");
  const [methodology, setMethodology] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(SORT_OPTIONS[0]);

  const filtered = useMemo(() => {
    let list = projects.filter((p) => {
      return (
        (status === "All" || p.status === status) &&
        (team === "All" || p.team === team) &&
        (org === "All" || p.organization === org) &&
        (methodology === "All" || p.methodology === methodology) &&
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    });

    switch (sort) {
      case "Progress (high to low)":
        list = [...list].sort((a, b) => b.progress - a.progress);
        break;
      case "Progress (low to high)":
        list = [...list].sort((a, b) => a.progress - b.progress);
        break;
      case "Name (A–Z)":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Risk":
        list = [...list].sort((a, b) => RISK_ORDER[a.risk] - RISK_ORDER[b.risk]);
        break;
      default:
        break;
    }
    return list;
  }, [projects, status, team, org, methodology, query, sort]);

  return (
    <WorkspaceLayout
      title="Portfolio Dashboard"
      subtitle="Health, budget and ownership across the entire project portfolio."
      pageClassName="portfolio-dashboard-page"
    >
      <Card title="Filters">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {["All", "Active", "On Hold", "Completed"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select value={team} onChange={(e) => setTeam(e.target.value)}>
            {["All", ...teams].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select value={org} onChange={(e) => setOrg(e.target.value)}>
            {["All", ...organizations].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <select value={methodology} onChange={(e) => setMethodology(e.target.value)}>
            {["All", "Agile", "Scrum", "Kanban", "Waterfall"].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              padding: "0 10px",
            }}
          >
            <Search size={16} color="var(--ink-soft)" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects"
              style={{ border: "none", background: "transparent" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "14px 0" }}>
          <span style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
            {filtered.length} project{filtered.length !== 1 && "s"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ArrowUpDown size={14} color="var(--ink-soft)" />
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORT_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="org-grid">
          {filtered.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="workspace-card org-card" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="org-card-header">
                <div>
                  <h4>{p.name}</h4>
                  <p>{p.organization}</p>
                </div>
                <span
                  className="status-badge"
                  style={{
                    background: `${healthColor[p.health] || "#64748B"}22`,
                    color: healthColor[p.health] || "#64748B",
                  }}
                >
                  {p.health}
                </span>
              </div>

              <div style={{ marginTop: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--ink-soft)", marginBottom: "4px" }}>
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div style={{ height: "6px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${p.progress}%`,
                      background: healthColor[p.health] || "#3B82F6",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginTop: "14px", textAlign: "center" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "8px" }}>
                  <p style={{ fontSize: "11px", color: "var(--ink-soft)" }}>Risk</p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: riskColor[p.risk] || "#94A3B8" }}>
                    {p.risk}
                  </p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "8px" }}>
                  <p style={{ fontSize: "11px", color: "var(--ink-soft)" }}>Budget</p>
                  <p style={{ fontSize: "13px", fontWeight: 600 }}>{p.budgetUsed}%</p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "8px" }}>
                  <p style={{ fontSize: "11px", color: "var(--ink-soft)" }}>Owner</p>
                  <p style={{ fontSize: "13px", fontWeight: 600 }}>{p.manager?.name?.split(" ")[0] || "—"}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </WorkspaceLayout>
  );
}
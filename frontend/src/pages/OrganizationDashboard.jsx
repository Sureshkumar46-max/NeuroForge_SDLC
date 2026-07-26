import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, Building2, Users, FolderKanban, Boxes } from "lucide-react";
import WorkspaceLayout from "../components/WorkspaceLayout";
import Button from "../components/Button";
import Card from "../components/Card";
import { industryOptions } from "../data/module2Data";
import { useWorkspace } from "../context/WorkspaceContext";

function OrganizationDashboard() {
  const { organizations } = useWorkspace();
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");

  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const matchesSearch = `${org.name} ${org.description}`.toLowerCase().includes(search.toLowerCase());
      const matchesIndustry = industry === "All" || org.industry === industry;
      return matchesSearch && matchesIndustry;
    });
  }, [industry, organizations, search]);

  return (
    <WorkspaceLayout
      title="Organization workspace"
      subtitle="Create, review and govern the organizations that will host your delivery teams."
      pageClassName="org-dashboard-page"
      actions={
        <Link to="/organizations/create">
          <Button icon={Plus} className="create-organization-btn">Create organization</Button>
        </Link>
      }
    >
      <div className="stats-grid">
        <div className="metric-card">
          <div className="metric-icon metric-icon-blue"><Boxes size={18} /></div>
          <strong>{organizations.length}</strong>
          <span>Organizations active</span>
        </div>
        <div className="metric-card">
          <div className="metric-icon metric-icon-amber"><Building2 size={18} /></div>
          <strong>{organizations.reduce((sum, org) => sum + org.teams, 0)}</strong>
          <span>Active teams</span>
        </div>
        <div className="metric-card">
          <div className="metric-icon metric-icon-green"><Users size={18} /></div>
          <strong>{organizations.reduce((sum, org) => sum + org.members, 0)}</strong>
          <span>Members onboarded</span>
        </div>
        <div className="metric-card">
          <div className="metric-icon metric-icon-blue"><FolderKanban size={18} /></div>
          <strong>{organizations.reduce((sum, org) => sum + org.projects, 0)}</strong>
          <span>Projects in motion</span>
        </div>
      </div>

      <Card title="Organizations overview">
        <div className="filter-row">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
            <Search size={16} color="var(--ink-soft)" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search organization"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "220px" }}>
            <Filter size={16} color="var(--ink-soft)" />
            <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
              <option value="All">All industries</option>
              {industryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="org-grid">
          {filteredOrganizations.map((org) => (
            <div className="workspace-card org-card" key={org.id}>
              <div className="org-card-header">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div className="org-logo">{org.logo}</div>
                  <div>
                    <h4>{org.name}</h4>
                    <p>{org.location}</p>
                  </div>
                </div>
                <span className={`status-badge ${org.status === "Active" ? "status-active" : "status-planning"}`}>
                  {org.status}
                </span>
              </div>
              <p>{org.description}</p>
              <div className="pill-row">
                <span className="pill">{org.industry}</span>
                <span className="pill">{org.companySize}</span>
              </div>
              <div className="pill-row">
                <span className="pill"><Building2 size={14} /> {org.teams} teams</span>
                <span className="pill"><Users size={14} /> {org.members} members</span>
                <span className="pill"><FolderKanban size={14} /> {org.projects} projects</span>
              </div>
              <div className="form-actions">
                <Link className="text-link" to={`/organizations/details/${org.id}`}>
                  View details
                </Link>
                <Link to="/teams">
                  <Button variant="secondary">Manage teams</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </WorkspaceLayout>
  );
}

export default OrganizationDashboard;

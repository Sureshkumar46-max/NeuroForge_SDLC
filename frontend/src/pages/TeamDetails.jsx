import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Users, Briefcase, Sparkles } from "lucide-react";
import WorkspaceLayout from "../components/WorkspaceLayout";
import Button from "../components/Button";
import Card from "../components/Card";
import { useWorkspace } from "../context/WorkspaceContext";

function TeamDetails() {
  const { teamId } = useParams();
  const { orgTeams, orgMembers, currentOrg } = useWorkspace();

  const team = useMemo(
    () => orgTeams.find((item) => String(item.id) === String(teamId)) || null,
    [orgTeams, teamId]
  );

  const teamMembers = useMemo(
    () => orgMembers.filter((member) => member.team === team?.name).slice(0, 4),
    [orgMembers, team?.name]
  );

  if (!team) {
    return (
      <WorkspaceLayout
        title="Team details"
        subtitle="Inspect the members, leadership and active delivery scope for this team."
      >
        <Card title="Team not found">
          <p>There is no selected team for this organization.</p>
        </Card>
      </WorkspaceLayout>
    );
  }

  return (
    <WorkspaceLayout
      title="Team details"
      subtitle="Inspect the members, leadership and active delivery scope for this team."
      actions={
        <Link to="/members/invite">
          <Button icon={Sparkles}>Invite members</Button>
        </Link>
      }
    >
      <div className="detail-grid">
        <Card title={team.name}>
          <div className="org-card" style={{ padding: 0, gap: "10px" }}>
            <div className="org-card-header">
              <div>
                <h4>{team.name}</h4>
                <p>{team.description}</p>
              </div>
              <span className={`status-badge ${team.status === "Active" ? "status-active" : team.status === "Planning" ? "status-planning" : "status-pending"}`}>
                {team.status}
              </span>
            </div>
            <div className="pill-row">
              <span className="pill">Lead: {team.lead}</span>
              <span className="pill">Members: {team.members}</span>
              <span className="pill">Projects: {team.projects}</span>
            </div>
          </div>
        </Card>

        <Card title="Team snapshot">
          <div className="stats-grid" style={{ gridTemplateColumns: "1fr" }}>
            <div className="metric-card">
              <div className="metric-icon metric-icon-blue"><Users size={18} /></div>
              <strong>{team.lead}</strong>
              <span>Team lead</span>
            </div>
            <div className="metric-card">
              <div className="metric-icon metric-icon-amber"><Users size={18} /></div>
              <strong>{teamMembers.length}</strong>
              <span>Active members</span>
            </div>
            <div className="metric-card">
              <div className="metric-icon metric-icon-green"><Briefcase size={18} /></div>
              <strong>{team.projects}</strong>
              <span>Active projects</span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Members">
        <div className="org-grid">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <div className="workspace-card" key={member.id}>
                <div className="member-row">
                  <span className="member-avatar">{member.avatar}</span>
                  <div>
                    <strong>{member.name}</strong>
                    <div style={{ color: "var(--ink-soft)", fontSize: "0.84rem" }}>{member.email}</div>
                  </div>
                </div>
                <div className="pill-row" style={{ marginTop: "10px" }}>
                  <span className="pill">{member.role}</span>
                  <span className="pill">{member.status}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No members are assigned to this team yet.</p>
          )}
        </div>
      </Card>
    </WorkspaceLayout>
  );
}

export default TeamDetails;

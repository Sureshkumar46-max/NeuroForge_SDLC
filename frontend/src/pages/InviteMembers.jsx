import { useState } from "react";
import { Link } from "react-router-dom";
import WorkspaceLayout from "../components/WorkspaceLayout";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { roleOptions } from "../data/module2Data";
import { useWorkspace } from "../context/WorkspaceContext";

function InviteMembers() {
  const { sendInvite, currentOrg, orgTeams } = useWorkspace();
  const [form, setForm] = useState({
    email: "",
    role: roleOptions[0],
    team: orgTeams[0]?.name || "Platform Engineering",
  });
  const [invite, setInvite] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email) {
      setError("Enter a valid email address.");
      return;
    }

    const newInvite = sendInvite(form);
    setInvite(newInvite);
  };

  return (
    <WorkspaceLayout
      title="Invite members"
      subtitle={`Invite teammates to ${currentOrg?.name} and place them into the right delivery team instantly.`}
    >
      <Card title="Send invitation">
        <form onSubmit={handleSubmit}>
          {invite && (
            <div className="success-text" role="status" aria-live="polite">
              Invitation created for <strong>{invite.email}</strong>.
              <div style={{ marginTop: 8 }}>
                Invite link: <code>{`${window.location.origin}/invite/accept/${invite.token}`}</code>
              </div>
            </div>
          )}
          {error && (
            <div className="error-text" role="alert" aria-live="assertive">
              {error}
            </div>
          )}
          <div className="form-grid">
            <div className="full-width">
              <Input
                label="Email address"
                name="email"
                type="email"
                placeholder="person@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={form.role} onChange={handleChange}>
                {roleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="team-select-field">
              <label htmlFor="team">Team</label>
              <select id="team" name="team" value={form.team} onChange={handleChange} className="team-select">
                {orgTeams.length > 0 ? (
                  orgTeams.map((team) => (
                    <option key={team.id} value={team.name}>
                      {team.name}
                    </option>
                  ))
                ) : (
                  <option value="Platform Engineering">Platform Engineering</option>
                )}
              </select>
            </div>
          </div>

          <div className="form-actions form-actions-compact invite-form-actions">
            <Link to="/members">
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button type="submit" className="send-invitation-btn">Send invitation</Button>
          </div>
        </form>
      </Card>
    </WorkspaceLayout>
  );
}

export default InviteMembers;

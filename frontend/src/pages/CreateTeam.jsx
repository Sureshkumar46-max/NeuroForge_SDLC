import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import WorkspaceLayout from "../components/WorkspaceLayout";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import { teamLeadOptions } from "../data/module2Data";
import { useWorkspace } from "../context/WorkspaceContext";
import axios from "axios";

const memberOptions = ["Mina Patel", "Aarav Singh", "Diana Brooks", "Kian Flores"];

function CreateTeam() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    lead: teamLeadOptions[0],
    members: ["Mina Patel", "Kian Flores"],
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { currentOrg, createTeam } = useWorkspace();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleMembersChange = (selected) => {
    setForm((prev) => ({ ...prev, members: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description) {
      setError("Team name and description are required.");
      return;
    }

    try {
      const team = await createTeam({
        name: form.name,
        description: form.description,
        lead: form.lead,
      });

      setSubmitted(true);

      setTimeout(() => {
        navigate(`/teams/details/${team.id}`);
      }, 600);

    } catch (error) {
      console.log(error);
      setError("Team creation failed");
    }
  };

  return (
    <WorkspaceLayout
      title="Create team"
      subtitle="Create a cross-functional delivery team and assign organization members immediately."
    >
      <Card title="Team details">
        <form onSubmit={handleSubmit}>
          {submitted && <div className="success-text">Team created successfully. Redirecting to team details...</div>}
          {error && <div className="error-text">{error}</div>}
          <div className="form-grid">
            <div className="full-width">
              <Input
                label="Team name"
                name="name"
                placeholder="e.g. Platform Engineering"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the purpose of the team and the delivery scope it owns."
              />
            </div>
            <div>
              <label htmlFor="lead">Team lead</label>
              <select id="lead" name="lead" value={form.lead} onChange={handleChange}>
                {teamLeadOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="create-team-members-field">
              <MultiSelectDropdown
                id="members"
                label="Members"
                options={memberOptions}
                selected={form.members}
                onChange={handleMembersChange}
                placeholder="Select members"
              />
            </div>
          </div>

          <div className="form-actions form-actions-compact">
            <Link to="/teams">
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button type="submit" className="save-team-btn">Save team</Button>
          </div>
        </form>
      </Card>
    </WorkspaceLayout>
  );
}

export default CreateTeam;

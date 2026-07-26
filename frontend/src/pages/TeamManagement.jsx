import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, PencilLine, Trash2, Check, X } from "lucide-react";
import WorkspaceLayout from "../components/WorkspaceLayout";
import Button from "../components/Button";
import Card from "../components/Card";
import { teamStatusOptions } from "../data/module2Data";
import { useWorkspace } from "../context/WorkspaceContext";

function TeamManagement() {
  const { orgTeams, updateTeam, deleteTeam } = useWorkspace();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", lead: "" });

  const filteredTeams = useMemo(() => {
    return orgTeams.filter((team) => {
      const matchesSearch = `${team.name} ${team.description}`.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "All" || team.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [orgTeams, search, status]);

  function startEdit(team) {
    setEditingId(team.id);
    setEditForm({ name: team.name, description: team.description, lead: team.lead });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({ name: "", description: "", lead: "" });
  }

  function saveEdit(teamId) {
    updateTeam(teamId, editForm);
    cancelEdit();
  }

  function handleDelete(team) {
    const confirmed = window.confirm(`Delete team "${team.name}"? This cannot be undone.`);
    if (confirmed) {
      deleteTeam(team.id);
    }
  }

  return (
    <WorkspaceLayout
      title="Team management"
      subtitle="Create a new team, monitor delivery groups and keep membership aligned with your org structure."
      actions={
        <Link to="/teams/create">
          <Button icon={Plus}>Create team</Button>
        </Link>
      }
    >
      <Card title="Delivery teams">
        <div className="filter-row">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
            <Search size={16} color="var(--ink-soft)" aria-hidden="true" />
            <label htmlFor="team-search" className="visually-hidden">
              Search teams
            </label>
            <input
              id="team-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search team"
              aria-label="Search teams"
            />
          </div>
          <div className="filter-control status-filter-control" style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "220px" }}>
            <Filter size={16} color="var(--ink-soft)" aria-hidden="true" />
            <label htmlFor="status-filter" className="visually-hidden">
              Filter by status
            </label>
            <select
              className="status-filter-select"
              id="status-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              {teamStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table className="data-table">
          <caption className="visually-hidden">Delivery team overview for current organization</caption>
          <thead>
            <tr>
              <th scope="col">Team</th>
              <th scope="col">Lead</th>
              <th scope="col">Members</th>
              <th scope="col">Projects</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) =>
                editingId === team.id ? (
                  <tr key={team.id}>
                    <td colSpan={2}>
                      <input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Team name"
                        style={{ marginBottom: "6px", width: "100%" }}
                      />
                      <input
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Description"
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td colSpan={1}>
                      <input
                        value={editForm.lead}
                        onChange={(e) => setEditForm({ ...editForm, lead: e.target.value })}
                        placeholder="Lead"
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>{team.members}</td>
                    <td>{team.projects}</td>
                    <td style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => saveEdit(team.id)}
                        title="Save"
                        style={{ background: "#10b981", border: 0, borderRadius: "6px", padding: "6px", cursor: "pointer", color: "#fff" }}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        title="Cancel"
                        style={{ background: "#64748b", border: 0, borderRadius: "6px", padding: "6px", cursor: "pointer", color: "#fff" }}
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={team.id}>
                    <td>
                      <strong>{team.name}</strong>
                      <div style={{ color: "var(--ink-soft)", fontSize: "0.84rem" }}>{team.description}</div>
                    </td>
                    <td>{team.lead}</td>
                    <td>{team.members}</td>
                    <td>{team.projects}</td>
                    <td>
                      <span className={`status-badge ${team.status === "Active" ? "status-active" : team.status === "Planning" ? "status-planning" : "status-pending"}`}>
                        {team.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Link className="text-link" to={`/teams/details/${team.id}`}>
                          View details
                        </Link>
                        <button
                          onClick={() => startEdit(team)}
                          title="Edit team"
                          style={{ background: "transparent", border: 0, cursor: "pointer", color: "var(--ink-soft)", display: "flex" }}
                        >
                          <PencilLine size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(team)}
                          title="Delete team"
                          style={{ background: "transparent", border: 0, cursor: "pointer", color: "#ef4444", display: "flex" }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={6} style={{ padding: "18px 10px", color: "var(--ink-soft)" }}>
                  No teams match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </WorkspaceLayout>
  );
}

export default TeamManagement;
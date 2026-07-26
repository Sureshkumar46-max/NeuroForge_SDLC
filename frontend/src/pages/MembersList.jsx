import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import WorkspaceLayout from "../components/WorkspaceLayout";
import Button from "../components/Button";
import Card from "../components/Card";
import { useWorkspace } from "../context/WorkspaceContext";

function MembersList() {
  const { orgMembers, currentOrg } = useWorkspace();
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    return orgMembers.filter((member) =>
      `${member.name} ${member.email} ${member.role} ${member.team}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [orgMembers, search]);

  return (
    <WorkspaceLayout
      title="Members list"
      subtitle={`Review the current roster for ${currentOrg?.name}, invite new collaborators, and keep team ownership visible.`}
      actions={
        <Link to="/members/invite">
          <Button icon={Plus}>Invite member</Button>
        </Link>
      }
    >
      <Card title="Organization roster">
        <div className="filter-row">
          <label htmlFor="member-search" className="visually-hidden">
            Search members
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
            <Search size={16} color="var(--ink-soft)" aria-hidden="true" />
            <input
              id="member-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members"
              aria-label="Search members"
            />
          </div>
        </div>

        <table className="data-table">
          <caption className="visually-hidden">Organization roster for current workspace</caption>
          <thead>
            <tr>
              <th scope="col">Member</th>
              <th scope="col">Role</th>
              <th scope="col">Team</th>
              <th scope="col">Status</th>
              <th scope="col" className="member-actions-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className="member-row">
                      <span className="member-avatar">{member.avatar}</span>
                      <div>
                        <strong>{member.name}</strong>
                        <div style={{ color: "var(--ink-soft)", fontSize: "0.84rem" }}>{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{member.role}</td>
                  <td>{member.team}</td>
                  <td>
                    <span className={`status-badge ${member.status === "Active" ? "status-active" : "status-pending"}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="member-actions-cell">
                    <div className="member-actions">
                      <button className="text-link member-action-btn">Edit</button>
                      <button className="text-link member-action-btn member-action-danger">Remove</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: "18px 10px", color: "var(--ink-soft)" }}>
                  No members match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </WorkspaceLayout>
  );
}

export default MembersList;

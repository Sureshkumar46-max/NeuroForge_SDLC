import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  FolderKanban,
  PencilLine,
  Trash2,
  Check,
  X,
} from "lucide-react";
import WorkspaceLayout from "../components/WorkspaceLayout";
import Button from "../components/Button";
import Card from "../components/Card";
import { useWorkspace } from "../context/WorkspaceContext";

function OrganizationDetails() {
  const { orgId } = useParams();
  const navigate = useNavigate();

  const {
    organizations,
    currentOrg,
    updateOrganization,
    deleteOrganization,
  } = useWorkspace();

  const [isEditing, setIsEditing] = useState(false);

  const organization = useMemo(() => {
    return (
      currentOrg ||
      organizations.find((org) => String(org.id) === String(orgId)) ||
      null
    );
  }, [organizations, currentOrg, orgId]);

  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    industry: "",
    companySize: "",
  });

  if (!organization) {
    return (
      <WorkspaceLayout
        title="Organization Details"
        subtitle="Organization not found"
      >
        <Card title="No Organization">
          <p>No organization found.</p>
        </Card>
      </WorkspaceLayout>
    );
  }

  const startEdit = () => {
    setEditForm({
      name: organization.name || "",
      description: organization.description || "",
      industry: organization.industry || "",
      companySize: organization.companySize || "",
    });

    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveEdit = async () => {
    await updateOrganization(organization.id, editForm);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const ok = window.confirm(
      `Delete "${organization.name}" ?`
    );

    if (!ok) return;

    await deleteOrganization(organization.id);

    navigate("/organizations");
  };

  return (
    <WorkspaceLayout
      title="Organization Details"
      subtitle="View and manage organization"
      actions={
        !isEditing ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              icon={PencilLine}
              variant="secondary"
              onClick={startEdit}
            >
              Edit
            </Button>

            <Button
              icon={Trash2}
              variant="secondary"
              onClick={handleDelete}
              style={{ color: "#ef4444" }}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button icon={Check} onClick={saveEdit}>
              Save
            </Button>

            <Button
              icon={X}
              variant="secondary"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          </div>
        )
      }
    >
      <div className="detail-grid">
        <Card title={organization.name}>
          <div className="org-card" style={{ padding: 0, gap: "12px" }}>
            {isEditing ? (
              <>
                <input
                  value={editForm.name || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Organization Name"
                />

                <input
                  value={editForm.description || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                />

                <input
                  value={editForm.industry || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      industry: e.target.value,
                    })
                  }
                  placeholder="Industry"
                />

                <input
                  value={editForm.companySize || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      companySize: e.target.value,
                    })
                  }
                  placeholder="Company Size"
                />
              </>
            ) : (
              <>
                <div className="org-card-header">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div className="org-logo">
                      {organization.name?.charAt(0)}
                    </div>

                    <div>
                      <h4>{organization.name}</h4>

                      <p>
                        {organization.industry || "No Industry"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`status-badge ${
                      organization.status === "Active"
                        ? "status-active"
                        : "status-planning"
                    }`}
                  >
                    {organization.status || "Active"}
                  </span>
                </div>

                <p>{organization.description || "No Description"}</p>

                <div className="pill-row">
                  <span className="pill">
                    Industry : {organization.industry || "-"}
                  </span>

                  <span className="pill">
                    Company Size : {organization.companySize || "-"}
                  </span>
                </div>
              </>
            )}
          </div>
        </Card>

        <Card title="Statistics">
          <div
            className="stats-grid"
            style={{ gridTemplateColumns: "1fr" }}
          >
            <div className="metric-card">
              <div className="metric-icon metric-icon-blue">
                <Building2 size={18} />
              </div>

              <strong>{organization.teams || 0}</strong>

              <span>Teams</span>
            </div>

            <div className="metric-card">
              <div className="metric-icon metric-icon-amber">
                <Users size={18} />
              </div>

              <strong>{organization.members || 0}</strong>

              <span>Members</span>
            </div>

            <div className="metric-card">
              <div className="metric-icon metric-icon-green">
                <FolderKanban size={18} />
              </div>

              <strong>{organization.projects || 0}</strong>

              <span>Projects</span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Quick Actions">
        <div className="form-actions">
          <Link to="/teams">
            <Button variant="secondary">
              Manage Teams
            </Button>
          </Link>

          <Link to="/members/invite">
            <Button>
              Invite Members
            </Button>
          </Link>
        </div>
      </Card>
    </WorkspaceLayout>
  );
}

export default OrganizationDetails;
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, LogOut, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWorkspace } from "../context/WorkspaceContext";

function Navbar({ title, subtitle, actions, onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { organizations, currentOrgId, setCurrentOrg } = useWorkspace();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const currentOrg = organizations.find((org) => org.id === currentOrgId);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <header className="workspace-topbar">
      <div className="workspace-topbar-left">
        <button className="mobile-menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={20} />
        </button>
      </div>

      <div className="workspace-topbar-title">
        <div className="workspace-status-pill">Enterprise admin console</div>
        <button className="back-link-btn" onClick={() => navigate("/organizations")}>
          <ArrowLeft size={16} />
          Back to organizations
        </button>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="workspace-topbar-actions">
        <div className="org-select-wrap">
          <label htmlFor="org-select">Organization</label>
          <select
            id="org-select"
            value={currentOrgId || ""}
            onChange={(e) => setCurrentOrg(Number(e.target.value))}
          >
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
        </div>
        {actions}
      </div>

      <div className="workspace-topbar-profile">
        <div className="profile-menu" ref={profileRef}>
          <button
            className={`workspace-user-pill ${profileOpen ? "open" : ""}`}
            type="button"
            onClick={() => setProfileOpen((value) => !value)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <span className="workspace-user-avatar">{user?.name?.split(" ")[0]?.[0] || "U"}</span>
            <div>
              <strong>{user?.name || "Workspace User"}</strong>
              <small>{user?.role || "User"}</small>
            </div>
            <ChevronDown className="profile-chevron" size={14} />
          </button>

          {profileOpen && (
            <div className="profile-dropdown" role="menu">
              <div className="profile-dropdown-head">
                <strong>{user?.name || "Workspace User"}</strong>
                <small>{user?.email || "workspace@neuroforge.ai"}</small>
              </div>
              <div className="profile-dropdown-meta">
                <span>Role: {user?.role || "User"}</span>
                <span>Org: {currentOrg?.name || "NeuroForge Workspace"}</span>
              </div>
              <button className="profile-logout-btn" type="button" onClick={handleLogout} role="menuitem">
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

function Sidebar({ items, open = false, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isNestedRoute = (path) => path.split("/").filter(Boolean).length > 1;
  const routeMatches = (path) =>
    location.pathname === path || (isNestedRoute(path) && location.pathname.startsWith(`${path}/`));

  const activeSection = items.find((item) => {
    const paths = [item.to, ...(item.children || []).map((child) => child.to)];
    return paths.some((path) => routeMatches(path));
  })?.to;

  const [expandedSection, setExpandedSection] = useState(activeSection || items[0]?.to);

  useEffect(() => {
    if (activeSection) {
      setExpandedSection(activeSection);
    }
  }, [activeSection]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className={`workspace-sidebar ${open ? "open" : ""}`}>
      <div className="workspace-sidebar-top">
        <div className="sidebar-top-row">
          <Logo />
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <p className="workspace-sidebar-subtitle">Workspace</p>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = item.icon;
          const hasChildren = Boolean(item.children?.length);
          const isExpanded = expandedSection === item.to;
          const isActive = item.to === activeSection;

          return (
            <div className={`sidebar-section ${isExpanded ? "expanded" : ""}`} key={item.to}>
              <button
                type="button"
                className={`sidebar-link sidebar-parent ${isActive ? "active" : ""}`}
                onClick={() => setExpandedSection((current) => (current === item.to ? "" : item.to))}
                aria-expanded={isExpanded}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {hasChildren && <ChevronDown className="sidebar-chevron" size={15} />}
              </button>

              {hasChildren && (
                <div className="sidebar-subnav">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    const childActive = routeMatches(child.to);

                    return (
                      <Link
                        key={child.to}
                        to={child.to}
                        className={`sidebar-sublink ${childActive ? "active" : ""}`}
                        onClick={onClose}
                      >
                        <ChildIcon size={14} />
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-user-card">
        <span className="sidebar-avatar">{user?.name?.split(" ")[0]?.[0] || "U"}</span>
        <div className="sidebar-user-copy">
          <strong>{user?.name || "Workspace User"}</strong>
          <small>{user?.role || "User"}</small>
        </div>
        <button className="sidebar-logout-btn" type="button" onClick={handleLogout} aria-label="Logout">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

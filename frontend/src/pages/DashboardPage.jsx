import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { LayoutDashboard, Building2, FolderKanban, TrendingUp, Power } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let userName = "User";
  let userRole = "User";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name || decoded.sub || "User";
      userRole = decoded.role || "User";
    } catch (e) {
      console.error("Invalid token", e);
    }
  }
  const userInitial = userName.charAt(0).toUpperCase();

  function handleSignOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const STATS = [
    { icon: <Building2 size={18} color="#fff" />, label: "Organizations active", value: "4", bg: "#2563eb" },
    { icon: <FolderKanban size={18} color="#fff" />, label: "Active teams", value: "19", bg: "#b45309" },
    { icon: <TrendingUp size={18} color="#fff" />, label: "Members onboarded", value: "175", bg: "#059669" },
    { icon: <LayoutDashboard size={18} color="#fff" />, label: "Projects in motion", value: "41", bg: "#6d28d9" },
  ];

  const NAV_ITEMS = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { label: "Organization", icon: <Building2 size={18} />, path: "/organization-dashboard" },
    { label: "Projects", icon: <FolderKanban size={18} />, path: "/projects" },
    { label: "Portfolio", icon: <TrendingUp size={18} />, path: "/portfolio" },
  ];

  const sidebarItemStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    borderRadius: "8px",
    background: active ? "#1e40af" : "transparent",
    color: active ? "#fff" : "#94a3b8",
    fontWeight: active ? "700" : "500",
    fontSize: "14px",
    cursor: "pointer",
    border: 0,
    width: "100%",
    textAlign: "left",
    transition: "all 0.2s ease",
  });

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a0e1a", fontFamily: "sans-serif", color: "#e2e8f0" }}>

      {/* SIDEBAR */}
      <aside style={{ width: "260px", background: "#0d1526", display: "flex", flexDirection: "column", padding: "20px 14px", borderRight: "1px solid #1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 6px 24px 6px" }}>
          <div style={{ background: "#2563eb", color: "#fff", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>N</div>
          <div>
            <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px" }}>NeuroForge</div>
            <div style={{ color: "#64748b", fontSize: "10px", letterSpacing: "0.5px" }}>SDLC PLATFORM</div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              style={sidebarItemStyle(item.label === "Dashboard")}
              onClick={() => navigate(item.path)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        {/* USER + SIGN OUT */}
        <div style={{ borderTop: "1px solid #1e293b", paddingTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#fff", fontSize: "13px" }}>
              {userInitial}
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>{userName}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>{userRole}</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            style={{ background: "transparent", border: 0, color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Power size={20} />
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "28px 36px", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <span style={{ background: "#152238", color: "#93c5fd", fontSize: "11px", fontWeight: "700", letterSpacing: "0.5px", padding: "6px 12px", borderRadius: "6px" }}>
            ENTERPRISE WORKSPACE
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#152238", padding: "6px 14px", borderRadius: "30px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold", color: "#fff" }}>
              {userInitial}
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>{userName}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>{userRole}</div>
            </div>
          </div>
        </div>

        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#fff", margin: "0 0 6px 0" }}>Welcome back, {userName}</h1>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 28px 0" }}>
          Your workspace at a glance — organizations, teams and delivery health.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
          {STATS.map((stat, idx) => (
            <div key={idx} style={{ background: "#101a2e", border: "1px solid #1e293b", borderRadius: "12px", padding: "20px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                {stat.icon}
              </div>
              <h2 style={{ margin: 0, fontSize: "30px", color: "#fff", fontWeight: "700" }}>{stat.value}</h2>
              <p style={{ margin: "6px 0 0 0", color: "#64748b", fontSize: "13px" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
import { useState } from "react";
import {
  Building2,
  LayoutDashboard,
  PlusCircle,
  ShieldAlert,
  UserPlus,
  UserRound,
  Users,
  FolderKanban,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/module2.css";

const navItems = [
  {
    label: "Organization",
    icon: Building2,
    to: "/organizations",
    children: [
      { label: "Organization Dashboard", icon: LayoutDashboard, to: "/organizations" },
      { label: "Create Organization", icon: PlusCircle, to: "/organizations/create" },
      { label: "Organization Details", icon: Building2, to: "/organizations/details" },
    ],
  },
  {
    label: "Teams",
    icon: Users,
    to: "/teams",
    children: [
      { label: "Team Management", icon: LayoutDashboard, to: "/teams" },
      { label: "Create Team", icon: PlusCircle, to: "/teams/create" },
      { label: "Team Details", icon: Users, to: "/teams/details" },
    ],
  },
  {
    label: "Members",
    icon: UserRound,
    to: "/members",
    children: [
      { label: "Members List", icon: UserRound, to: "/members" },
      { label: "Invite Members", icon: UserPlus, to: "/members/invite" },
    ],
  },
  {
    label: "Project & Portfolio",
    icon: FolderKanban,
    to: "/projects",
    children: [
      { label: "Project Dashboard", icon: LayoutDashboard, to: "/projects" },
      { label: "Create Project", icon: PlusCircle, to: "/projects/new" },
      { label: "Portfolio View", icon: FolderKanban, to: "/portfolio" },
      { label: "Milestones", icon: LayoutDashboard, to: "/milestones" },
      { label: "Analytics", icon: FolderKanban, to: "/analytics" },
    ],
  },
];

function WorkspaceLayout({ title, subtitle, actions, children, pageClassName = "" }) {
  const { user } = useAuth();
  const [navOpen, setNavOpen] = useState(false);

  if (user && !(["Super Admin", "Org Admin", "PM"].includes(user.role))) {
    return (
      <div className="workspace-shell access-denied-shell">
        <div className="workspace-card access-denied-card fade-in-up">
          <div className="access-denied-icon"><ShieldAlert size={22} /></div>
          <h2>Access restricted</h2>
          <p>Only Super Admin and Org Admin users can manage the organization and team workspace.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`workspace-shell ${pageClassName}`.trim()}>
      <Sidebar items={navItems} open={navOpen} onClose={() => setNavOpen(false)} />
      {navOpen && <div className="sidebar-overlay" onClick={() => setNavOpen(false)} />}
      <div className="workspace-main">
        <Navbar title={title} subtitle={subtitle} actions={actions} onMenuClick={() => setNavOpen((v) => !v)} />
        <main className="workspace-content fade-in-up">{children}</main>
      </div>
    </div>
  );
}

export default WorkspaceLayout;
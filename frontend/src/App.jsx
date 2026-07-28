import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { WorkspaceProvider } from "./context/WorkspaceContext";
import { WorkspaceUIProvider } from "./context/WorkspaceUIContext";
import { ProjectsProvider } from "./context/ProjectsContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import OrganizationDashboard from "./pages/OrganizationDashboard";
import CreateOrganization from "./pages/CreateOrganization";
import OrganizationDetails from "./pages/OrganizationDetails";
import TeamManagement from "./pages/TeamManagement";
import CreateTeam from "./pages/CreateTeam";
import TeamDetails from "./pages/TeamDetails";
import InviteMembers from "./pages/InviteMembers";
import MembersList from "./pages/MembersList";
import AcceptInvite from "./pages/AcceptInvite";

import ProjectDashboard from "./pages/projects/ProjectDashboard";
import CreateProject from "./pages/projects/CreateProject";
import ProjectDetails from "./pages/projects/ProjectDetails";
import PortfolioDashboard from "./pages/projects/PortfolioDashboard";
import Milestones from "./pages/projects/Milestones";
import ProjectAnalytics from "./pages/projects/ProjectAnalytics";

function HomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "PM") {
    return <Navigate to="/projects" replace />;
  }

  return <Navigate to="/organizations" replace />;
}

function App() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <WorkspaceUIProvider>
          <ProjectsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomeRedirect />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/organizations" element={<OrganizationDashboard />} />
                <Route path="/organizations/create" element={<CreateOrganization />} />
                <Route path="/organizations/details" element={<OrganizationDetails />} />
                <Route path="/organizations/details/:orgId" element={<OrganizationDetails />} />
                <Route path="/teams" element={<TeamManagement />} />
                <Route path="/teams/create" element={<CreateTeam />} />
                <Route path="/teams/details" element={<TeamDetails />} />
                <Route path="/teams/details/:teamId" element={<TeamDetails />} />
                <Route path="/members" element={<MembersList />} />
                <Route path="/members/invite" element={<InviteMembers />} />
                <Route path="/accept-invite" element={<AcceptInvite />} />

                <Route path="/projects" element={<ProjectDashboard />} />
                <Route path="/projects/new" element={<CreateProject />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/portfolio" element={<PortfolioDashboard />} />
                <Route path="/milestones" element={<Milestones />} />
                <Route path="/analytics" element={<ProjectAnalytics />} />

                <Route path="*" element={<HomeRedirect />} />
              </Routes>
            </BrowserRouter>
          </ProjectsProvider>
        </WorkspaceUIProvider>
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WorkspaceProvider } from "./context/WorkspaceContext";
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

function App() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/organizations" replace />} />

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
            <Route path="*" element={<Navigate to="/organizations" replace />} />
          </Routes>
        </BrowserRouter>
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default App;
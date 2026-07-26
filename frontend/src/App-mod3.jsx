import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout.jsx';
import ProjectDashboard from './pages/projects/ProjectDashboard.jsx';
import CreateProject from './pages/projects/CreateProject.jsx';
import ProjectDetails from './pages/projects/ProjectDetails.jsx';
import PortfolioDashboard from './pages/projects/PortfolioDashboard.jsx';
import Milestones from './pages/projects/Milestones.jsx';
import ProjectAnalytics from './pages/projects/ProjectAnalytics.jsx';

// Module 3 — Project & Portfolio Management (standalone)
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/projects" replace />} />

        <Route path="/projects" element={<ProjectDashboard />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/portfolio" element={<PortfolioDashboard />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/analytics" element={<ProjectAnalytics />} />

        <Route path="*" element={<Navigate to="/projects" replace />} />
      </Route>
    </Routes>
  );
}

import { Routes, Route, Navigate } from 'react-router-dom';
import { LayoutGrid, FolderKanban, Bug, GitBranch, BarChart3 } from 'lucide-react';
import AppLayout from './layout/AppLayout.jsx';
import SprintDashboard from './pages/agile/SprintDashboard.jsx';
import Backlog from './pages/agile/Backlog.jsx';
import SprintPlanning from './pages/agile/SprintPlanning.jsx';
import KanbanBoard from './pages/agile/KanbanBoard.jsx';
import SprintDetails from './pages/agile/SprintDetails.jsx';
import SprintHistory from './pages/agile/SprintHistory.jsx';
import ComingSoon from './pages/ComingSoon.jsx';

// Module 5 — Agile Planning (standalone)
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/sprint-dashboard" replace />} />

        <Route path="/sprint-dashboard" element={<SprintDashboard />} />
        <Route path="/backlog" element={<Backlog />} />
        <Route path="/sprint-planning" element={<SprintPlanning />} />
        <Route path="/kanban-board" element={<KanbanBoard />} />
        <Route path="/sprint-details" element={<SprintDetails />} />
        <Route path="/sprint-history" element={<SprintHistory />} />

        <Route
          path="/overview"
          element={
            <ComingSoon
              icon={LayoutGrid}
              title="Overview"
              description="A workspace-wide summary rolling up activity across every project and team into a single at-a-glance dashboard."
            />
          }
        />
        <Route
          path="/projects"
          element={
            <ComingSoon
              icon={FolderKanban}
              title="Projects"
              description="Manage and switch between every project in NeuroForge Labs from one place."
            />
          }
        />
        <Route
          path="/bug-tracker"
          element={
            <ComingSoon
              icon={Bug}
              title="Bug Tracker"
              description="Log, triage, and track defects with severity levels, linked sprints, and reproduction steps."
            />
          }
        />
        <Route
          path="/pipelines"
          element={
            <ComingSoon
              icon={GitBranch}
              title="Pipelines"
              description="Monitor build, test, and deployment pipelines with live status and rollback controls."
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <ComingSoon
              icon={BarChart3}
              title="Analytics"
              description="Deep-dive burndown, velocity trends, and team throughput reports across every sprint and project."
            />
          }
        />

        <Route path="*" element={<Navigate to="/sprint-dashboard" replace />} />
      </Route>
    </Routes>
  );
}

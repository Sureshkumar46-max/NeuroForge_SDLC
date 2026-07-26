import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { projects as seedProjects } from '../data/mockData.js';

const STORAGE_KEY = 'neuroforge_m3_projects';

const ProjectsContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fall through to seed data
  }
  return seedProjects;
}

export function initialsFromName(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // storage may be unavailable — fail silently, state still works in-memory
    }
  }, [projects]);

  const addProject = useCallback((data) => {
    const id = `prj-${Date.now().toString(36)}`;
    const managerInitials = initialsFromName(data.manager?.name || data.manager || '');
    const newProject = {
      id,
      name: data.name || 'Untitled Project',
      organization: data.organization,
      team: data.team,
      manager: { name: data.manager, initials: managerInitials },
      members: [{ initials: managerInitials }],
      sprint: 'Sprint 1',
      status: 'Active',
      progress: 0,
      health: 'On Track',
      budgetUsed: 0,
      risk: 'Low',
      methodology: data.methodology,
      priority: data.priority,
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      stats: { totalTasks: 0, completed: 0, pending: 0, bugs: 0, velocity: 0 },
      techStack: data.techStack || [],
      description: data.description || '',
    };
    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  }, []);

  const updateProject = useCallback((id, patch) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const archiveProject = useCallback((id) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'Archived' } : p)));
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProject = useCallback((id) => projects.find((p) => p.id === id), [projects]);

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, updateProject, archiveProject, deleteProject, getProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects must be used within a ProjectsProvider');
  return ctx;
}

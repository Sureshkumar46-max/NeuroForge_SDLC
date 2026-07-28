import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/projects";

const ProjectsContext = createContext(null);

function getAuthHeader() {
  const token = sessionStorage.getItem("nf_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function initialsFromName(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_BASE, { headers: getAuthHeader() });
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = useCallback(async (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      methodology: data.methodology,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      techStackTags: Array.isArray(data.techStack) ? data.techStack.join(",") : data.techStack,
      priority: data.priority,
      teamId: data.teamId || null,
      managerId: data.managerId || null,
    };
    const res = await axios.post(API_BASE, payload, { headers: getAuthHeader() });
    setProjects((prev) => [res.data, ...prev]);
    return res.data;
  }, []);

  const updateProject = useCallback(async (id, patch) => {
    const payload = {
      name: patch.name,
      description: patch.description,
      methodology: patch.methodology,
      startDate: patch.startDate || null,
      endDate: patch.endDate || null,
      techStackTags: Array.isArray(patch.techStack) ? patch.techStack.join(",") : patch.techStack,
      priority: patch.priority,
      teamId: patch.teamId || null,
      managerId: patch.managerId || null,
    };
    const res = await axios.put(`${API_BASE}/${id}`, payload, { headers: getAuthHeader() });
    setProjects((prev) => prev.map((p) => (p.id === id ? res.data : p)));
    return res.data;
  }, []);

  const archiveProject = useCallback(async (id) => {
    const res = await axios.put(
      `${API_BASE}/${id}`,
      { status: "Archived" },
      { headers: getAuthHeader() }
    );
    setProjects((prev) => prev.map((p) => (p.id === id ? res.data : p)));
  }, []);

  const deleteProject = useCallback(async (id) => {
    await axios.delete(`${API_BASE}/${id}`, { headers: getAuthHeader() });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProject = useCallback((id) => projects.find((p) => p.id === id), [projects]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        addProject,
        updateProject,
        archiveProject,
        deleteProject,
        getProject,
        refetch: fetchProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within a ProjectsProvider");
  return ctx;
}
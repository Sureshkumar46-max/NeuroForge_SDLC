import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const SPRINTS_BASE = "http://localhost:8080/api/sprints";
const TASKS_BASE = "http://localhost:8080/api/tasks";

const AgileContext = createContext(null);

function getAuthHeader() {
  const token = sessionStorage.getItem("nf_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function AgileProvider({ children }) {
  const [sprint, setSprint] = useState(null);
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSprintData = useCallback(async (projectId) => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const sprintsRes = await axios.get(`${SPRINTS_BASE}/project/${projectId}`, {
        headers: getAuthHeader(),
      });
      const sprints = sprintsRes.data || [];

      const activeSprint =
        sprints.find((s) => s.status === "ACTIVE") ||
        sprints[sprints.length - 1] ||
        null;

      // Always load the full task list for the project (used by Backlog page)
      const tasksRes = await axios.get(`${TASKS_BASE}/project/${projectId}`, {
        headers: getAuthHeader(),
      });
      setTasks(tasksRes.data || []);

      if (!activeSprint) {
        setSprint(null);
        setBoard(null);
        setLoading(false);
        return;
      }

      const boardRes = await axios.get(`${TASKS_BASE}/board/${activeSprint.id}`, {
        headers: getAuthHeader(),
      });

      setSprint(activeSprint);
      setBoard(boardRes.data);
    } catch (err) {
      console.error("Failed to load sprint data:", err);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const moveTask = useCallback(
    async (taskId, newStatus) => {
      try {
        await axios.patch(
          `${TASKS_BASE}/${taskId}/status`,
          { status: newStatus },
          { headers: getAuthHeader() }
        );
        if (sprint) await loadSprintData(sprint.projectId);
      } catch (err) {
        console.error("Failed to move task:", err);
        throw err;
      }
    },
    [sprint, loadSprintData]
  );

  const deleteTask = useCallback(
    async (taskId) => {
      try {
        await axios.delete(`${TASKS_BASE}/${taskId}`, { headers: getAuthHeader() });
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        if (sprint) await loadSprintData(sprint.projectId);
      } catch (err) {
        console.error("Failed to delete task:", err);
        throw err;
      }
    },
    [sprint, loadSprintData]
  );

  const addBacklogItem = useCallback(
    async (projectId, payload) => {
      try {
        const res = await axios.post(
          TASKS_BASE,
          { ...payload, projectId, status: "backlog" },
          { headers: getAuthHeader() }
        );
        setTasks((prev) => [...prev, res.data]);
        return res.data;
      } catch (err) {
        console.error("Failed to add backlog item:", err);
        throw err;
      }
    },
    []
  );

  const getTask = useCallback(
    (taskId) => tasks.find((t) => t.id === taskId) || null,
    [tasks]
  );

  const allTasks = board
    ? [
        ...(board.todo || []),
        ...(board.inProgress || []),
        ...(board.codeReview || []),
        ...(board.testing || []),
        ...(board.done || []),
      ]
    : [];

  return (
    <AgileContext.Provider
      value={{
        sprint,
        board,
        tasks,
        allTasks,
        loading,
        error,
        loadSprintData,
        moveTask,
        deleteTask,
        addBacklogItem,
        getTask,
      }}
    >
      {children}
    </AgileContext.Provider>
  );
}

export function useAgile() {
  const ctx = useContext(AgileContext);
  if (!ctx) throw new Error("useAgile must be used within an AgileProvider");
  return ctx;
}
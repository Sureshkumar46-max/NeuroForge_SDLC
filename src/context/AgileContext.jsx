import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { initialTasks, members } from '../data/mockData.js';

const STORAGE_KEY = 'neuroforge_m5_tasks';

const AgileContext = createContext(null);

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
  return initialTasks;
}

let taskSeq = 124;
function nextTaskId() {
  taskSeq += 1;
  return `ORI-${taskSeq}`;
}

export function AgileProvider({ children }) {
  const [tasks, setTasks] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // storage may be unavailable — fail silently, state still works in-memory
    }
  }, [tasks]);

  const moveTask = useCallback((id, status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);

  const updateTask = useCallback((id, patch) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addBacklogItem = useCallback((data) => {
    const newTask = {
      id: nextTaskId(),
      title: data.title || 'Untitled task',
      priority: data.priority || 'medium',
      points: Number(data.points) || 1,
      assignee: data.assignee || members[0].id,
      labels: data.labels || [],
      status: 'backlog',
      due: data.due || 'TBD',
      comments: 0,
      attachments: 0,
      subtasks: '0/0',
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const getTask = useCallback((id) => tasks.find((t) => t.id === id), [tasks]);

  return (
    <AgileContext.Provider value={{ tasks, moveTask, updateTask, deleteTask, addBacklogItem, getTask }}>
      {children}
    </AgileContext.Provider>
  );
}

export function useAgile() {
  const ctx = useContext(AgileContext);
  if (!ctx) throw new Error('useAgile must be used within an AgileProvider');
  return ctx;
}

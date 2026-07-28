import { createContext, useContext, useState, useCallback } from 'react';
import { initialNotifications } from '../data/mockData.js';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), []);

  const pushNotification = useCallback((text) => {
    setNotifications((prev) => [{ id: `n-${Date.now()}`, text, time: 'just now', read: false }, ...prev]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <WorkspaceContext.Provider
      value={{ collapsed, toggleCollapsed, notifications, unreadCount, pushNotification, markAllRead }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used within a WorkspaceProvider');
  return ctx;
}

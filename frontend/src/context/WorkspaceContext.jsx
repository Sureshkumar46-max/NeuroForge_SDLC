import { createContext, useContext, useState, useCallback } from 'react';

const WorkspaceContext = createContext(null);

const INITIAL_NOTIFICATIONS = [
  { id: 'n1', text: 'Project Created — "AI Code Review Copilot"', time: '10 min ago', read: false },
  { id: 'n2', text: 'Team Created — "Mobile Guild"', time: '1 hr ago', read: false },
  { id: 'n3', text: 'Member Added — Ishaan Jain joined Platform Engineering', time: '3 hr ago', read: false },
  { id: 'n4', text: 'Project Archived — "Requirement Traceability Engine"', time: '1 day ago', read: true },
];

export function WorkspaceProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [signedOut, setSignedOut] = useState(false);

  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), []);

  const pushNotification = useCallback((text) => {
    setNotifications((prev) => [
      { id: `n-${Date.now()}`, text, time: 'just now', read: false },
      ...prev,
    ]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const signOut = useCallback(() => setSignedOut(true), []);
  const signBackIn = useCallback(() => setSignedOut(false), []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <WorkspaceContext.Provider
      value={{
        collapsed,
        toggleCollapsed,
        notifications,
        unreadCount,
        pushNotification,
        markAllRead,
        signedOut,
        signOut,
        signBackIn,
      }}
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

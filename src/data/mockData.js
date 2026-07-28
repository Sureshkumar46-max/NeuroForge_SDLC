export const members = [
  { id: 'm1', name: 'Aditya Rao', role: 'Scrum Master', initials: 'AR', gradient: 'from-primary to-primary-hover' },
  { id: 'm2', name: 'Priya Nair', role: 'Backend Eng', initials: 'PN', gradient: 'from-accent3 to-purple-800' },
  { id: 'm3', name: 'Karan Mehta', role: 'Frontend Eng', initials: 'KM', gradient: 'from-warning to-amber-700' },
  { id: 'm4', name: 'Sara Iqbal', role: 'QA Engineer', initials: 'SI', gradient: 'from-success to-green-700' },
  { id: 'm5', name: 'Devon Cruz', role: 'Backend Eng', initials: 'DC', gradient: 'from-danger to-red-800' },
  { id: 'm6', name: 'Wei Zhang', role: 'DevOps', initials: 'WZ', gradient: 'from-accent2 to-sky-700' },
];

export function memberById(id) {
  return members.find((m) => m.id === id);
}

export const LABELS = ['Backend', 'Frontend', 'Payments', 'Bug', 'Infra', 'Design'];

export const PRIORITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

export const initialTasks = [
  { id: 'ORI-101', title: 'Fix duplicate charge on retried payment intents', priority: 'critical', points: 8, assignee: 'm2', labels: ['Payments', 'Bug'], status: 'progress', due: 'Jul 29', comments: 4, attachments: 2, subtasks: '2/3' },
  { id: 'ORI-102', title: 'Add exponential backoff to gateway retry queue', priority: 'high', points: 5, assignee: 'm5', labels: ['Backend', 'Infra'], status: 'progress', due: 'Jul 30', comments: 2, attachments: 0, subtasks: '1/2' },
  { id: 'ORI-103', title: 'Refund workflow — approval step UI', priority: 'high', points: 5, assignee: 'm3', labels: ['Frontend'], status: 'review', due: 'Jul 28', comments: 6, attachments: 1, subtasks: '3/3' },
  { id: 'ORI-104', title: 'Write integration tests for webhook signature check', priority: 'medium', points: 3, assignee: 'm4', labels: ['Backend'], status: 'testing', due: 'Aug 1', comments: 1, attachments: 0, subtasks: '1/1' },
  { id: 'ORI-105', title: 'Design refund confirmation email template', priority: 'low', points: 2, assignee: 'm3', labels: ['Design'], status: 'todo', due: 'Aug 2', comments: 0, attachments: 1, subtasks: '0/2' },
  { id: 'ORI-106', title: 'Audit trail schema for refund + dispute events', priority: 'high', points: 8, assignee: 'm2', labels: ['Backend', 'Infra'], status: 'todo', due: 'Aug 3', comments: 3, attachments: 0, subtasks: '0/4' },
  { id: 'ORI-107', title: 'Idempotency key enforcement on checkout API', priority: 'critical', points: 5, assignee: 'm5', labels: ['Backend', 'Payments'], status: 'done', due: 'Jul 24', comments: 5, attachments: 0, subtasks: '3/3' },
  { id: 'ORI-108', title: 'Load test checkout under 3x peak traffic', priority: 'medium', points: 5, assignee: 'm6', labels: ['Infra'], status: 'done', due: 'Jul 23', comments: 2, attachments: 2, subtasks: '2/2' },
  { id: 'ORI-109', title: 'Merchant dashboard — refund status badges', priority: 'low', points: 2, assignee: 'm3', labels: ['Frontend'], status: 'backlog', due: 'Aug 5', comments: 0, attachments: 0, subtasks: '0/1' },
  { id: 'ORI-110', title: 'Investigate flaky Stripe webhook delivery delays', priority: 'critical', points: 3, assignee: 'm5', labels: ['Bug', 'Payments'], status: 'progress', due: 'Jul 29', comments: 8, attachments: 1, subtasks: '1/2' },
  { id: 'ORI-111', title: 'Card tokenization vault migration — phase 2', priority: 'high', points: 13, assignee: 'm2', labels: ['Backend', 'Payments'], status: 'backlog', due: 'Aug 8', comments: 1, attachments: 0, subtasks: '0/5' },
  { id: 'ORI-112', title: 'Accessibility pass on checkout form fields', priority: 'medium', points: 3, assignee: 'm3', labels: ['Frontend'], status: 'todo', due: 'Aug 1', comments: 0, attachments: 0, subtasks: '0/2' },
  { id: 'ORI-113', title: 'Rate limit checkout submit endpoint', priority: 'medium', points: 2, assignee: 'm6', labels: ['Infra'], status: 'review', due: 'Jul 30', comments: 2, attachments: 0, subtasks: '1/1' },
  { id: 'ORI-114', title: 'Dispute evidence upload — S3 signed URLs', priority: 'high', points: 5, assignee: 'm5', labels: ['Backend'], status: 'backlog', due: 'Aug 6', comments: 0, attachments: 0, subtasks: '0/3' },
  { id: 'ORI-115', title: 'QA regression suite for refund edge cases', priority: 'high', points: 5, assignee: 'm4', labels: ['Bug'], status: 'testing', due: 'Jul 31', comments: 3, attachments: 0, subtasks: '2/4' },
  { id: 'ORI-116', title: 'Currency rounding fix for JPY refunds', priority: 'critical', points: 2, assignee: 'm2', labels: ['Bug', 'Payments'], status: 'done', due: 'Jul 22', comments: 4, attachments: 0, subtasks: '1/1' },
  { id: 'ORI-117', title: 'Sprint retro board — async template', priority: 'low', points: 1, assignee: 'm1', labels: ['Design'], status: 'done', due: 'Jul 21', comments: 0, attachments: 0, subtasks: '1/1' },
  { id: 'ORI-118', title: 'Feature flag rollout plan for refund UI', priority: 'medium', points: 2, assignee: 'm1', labels: ['Infra'], status: 'backlog', due: 'Aug 7', comments: 0, attachments: 0, subtasks: '0/2' },
  { id: 'ORI-119', title: 'Migrate payment logs to structured JSON', priority: 'low', points: 3, assignee: 'm6', labels: ['Backend', 'Infra'], status: 'backlog', due: 'Aug 9', comments: 1, attachments: 0, subtasks: '0/2' },
  { id: 'ORI-120', title: 'PCI compliance checklist review with security', priority: 'high', points: 3, assignee: 'm1', labels: ['Infra'], status: 'backlog', due: 'Aug 10', comments: 2, attachments: 1, subtasks: '0/3' },
  { id: 'ORI-121', title: 'Refactor checkout reducer for testability', priority: 'medium', points: 5, assignee: 'm3', labels: ['Frontend'], status: 'backlog', due: 'Aug 4', comments: 0, attachments: 0, subtasks: '0/3' },
  { id: 'ORI-122', title: 'Add Sentry breadcrumbs to payment retry path', priority: 'medium', points: 2, assignee: 'm5', labels: ['Backend', 'Bug'], status: 'backlog', due: 'Aug 5', comments: 0, attachments: 0, subtasks: '0/1' },
  { id: 'ORI-123', title: 'Design system — status badge audit', priority: 'low', points: 1, assignee: 'm3', labels: ['Design'], status: 'backlog', due: 'Aug 6', comments: 0, attachments: 0, subtasks: '0/1' },
  { id: 'ORI-124', title: 'Chargeback webhook handler + retries', priority: 'high', points: 8, assignee: 'm2', labels: ['Backend', 'Payments'], status: 'backlog', due: 'Aug 11', comments: 0, attachments: 0, subtasks: '0/4' },
];

export const sprintHistory = [
  { name: 'Sprint 13 — Checkout Perf Baseline', status: 'completed', duration: 'Jul 7–20, 2026', velocity: 38, points: 79, members: 6 },
  { name: 'Sprint 12 — Notification Reliability', status: 'completed', duration: 'Jun 23–Jul 6, 2026', velocity: 43, points: 88, members: 5 },
  { name: 'Sprint 11 — Onboarding Redesign', status: 'completed', duration: 'Jun 9–22, 2026', velocity: 35, points: 71, members: 6 },
  { name: 'Sprint 10 — API Gateway Migration', status: 'archived', duration: 'May 26–Jun 8, 2026', velocity: 41, points: 84, members: 6 },
  { name: 'Sprint 9 — Search Relevance Tuning', status: 'completed', duration: 'May 12–25, 2026', velocity: 39, points: 80, members: 5 },
  { name: 'Sprint 8 — Mobile Perf Sprint', status: 'archived', duration: 'Apr 28–May 11, 2026', velocity: 33, points: 68, members: 4 },
];

export const activity = [
  { id: 1, icon: 'check', tone: 'success', text: 'Devon Cruz moved ORI-116 to Done', time: '2 hours ago' },
  { id: 2, icon: 'msg', tone: 'primary', text: 'Sara Iqbal commented on ORI-115', time: '4 hours ago' },
  { id: 3, icon: 'plus', tone: 'accent3', text: 'Priya Nair added ORI-106 to Sprint 14', time: 'Yesterday, 6:40 PM' },
  { id: 4, icon: 'move', tone: 'warning', text: 'Karan Mehta moved ORI-103 to Code Review', time: 'Yesterday, 3:12 PM' },
  { id: 5, icon: 'flag', tone: 'danger', text: 'Aditya Rao flagged ORI-101 as Critical', time: '2 days ago' },
];

export const initialNotifications = [
  { id: 'n1', text: 'Ananya Sharma commented on NF-118', time: '8 min ago', read: false },
  { id: 'n2', text: 'Sprint "Orion Sprint 14" starts tomorrow', time: '1 hr ago', read: false },
  { id: 'n3', text: 'Karthik Rao moved NF-104 to Code Review', time: '3 hrs ago', read: false },
  { id: 'n4', text: 'Capacity for current sprint is at 92%', time: 'Yesterday', read: true },
  { id: 'n5', text: 'Vikram Iyer completed NF-097', time: '2 days ago', read: true },
];

export const BOARD_COLUMNS = [
  { key: 'backlog', label: 'Backlog', dot: 'bg-muted' },
  { key: 'todo', label: 'To Do', dot: 'bg-muted' },
  { key: 'progress', label: 'In Progress', dot: 'bg-primary' },
  { key: 'review', label: 'Code Review', dot: 'bg-accent3' },
  { key: 'testing', label: 'Testing', dot: 'bg-warning' },
  { key: 'done', label: 'Done', dot: 'bg-success' },
];

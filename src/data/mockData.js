/**
 * Mock data for Module 6 — AI Ticket Triage & Smart Assignment.
 *
 * This file stands in for the real endpoints until the backend exists:
 *   GET  /api/tickets/:id
 *   POST /api/tickets/:id/triage           -> AiSuggestion
 *   POST /api/tickets/:id/triage/accept
 *   GET  /api/tickets/triage-queue
 *
 * Keep the shapes below stable — swapping mock functions for real fetch()
 * calls should not require touching the components that consume them.
 */

export const currentUser = {
  name: 'Marcus Aurelius',
  role: 'Project Manager',
  initials: 'M',
};

export const teamMembers = [
  { id: 'u1', name: 'Linus Torvalds', role: 'Developer', initials: 'LT' },
  { id: 'u2', name: 'Ada Lovelace', role: 'QA Tester', initials: 'AL' },
  { id: 'u3', name: 'Sarah Connor', role: 'Org Admin', initials: 'SC' },
  { id: 'u4', name: 'Marcus Aurelius', role: 'Project Manager', initials: 'MA' },
];

export const activeTicket = {
  id: 'NF-204',
  status: 'Open',
  title: 'Users are unable to reset their password',
  description:
    "Several users are receiving a 500 error when trying to reset their password from the login page. " +
    "Issue started appearing after last night's auth-service deployment and seems isolated to accounts " +
    "created before March 2025.",
  createdBy: 'Ada Lovelace',
  createdAt: 'Aug 10, 2026 · 08:41 AM',
  project: 'HexaCorp Auth Platform',
  reporter: 'Ada Lovelace',
  labels: ['auth-service', 'production', 'regression'],
  category: 'Backend',
  priority: 'High',
  storyPoints: 5,
  assignee: 'Linus Torvalds — Developer',
};

/** What the AI would return from POST /api/tickets/:id/triage */
export const aiSuggestion = {
  category: { value: 'Backend', confidence: 92 },
  priority: { value: 'High', confidence: 88 },
  storyPoints: { value: 5, confidence: 79 },
  assignee: { value: 'Linus Torvalds', confidence: 84 },
  reasoning:
    'Based on the ticket description, this issue appears to originate from the authentication service — ' +
    'specifically the password-reset token flow. The 500 error pattern and the accounts-created-before-' +
    'March-2025 detail closely match a legacy token migration bug. Similar password-reset issues were ' +
    'previously handled by the backend team, and Linus Torvalds resolved 8 related authentication ' +
    'incidents in the past two quarters, making him the strongest assignment match.',
  similarTickets: [
    { id: 'NF-182', title: 'Password reset API returns 500', match: 94 },
    { id: 'NF-164', title: 'Authentication service timeout', match: 87 },
    { id: 'NF-151', title: 'Reset token validation failure', match: 81 },
  ],
};

export const analysisSteps = [
  'Understanding description',
  'Checking historical tickets',
  'Matching team expertise',
  'Generating recommendations',
];

export const triageQueue = [
  {
    id: 'NF-204',
    title: 'Password reset failure',
    category: 'backend',
    priority: 'high',
    confidence: 92,
    assignee: 'Linus Torvalds',
    assigneeInitials: 'LT',
    status: 'pending',
  },
  {
    id: 'NF-203',
    title: 'Button alignment issue',
    category: 'frontend',
    priority: 'low',
    confidence: 96,
    assignee: 'Ada Lovelace',
    assigneeInitials: 'AL',
    status: 'accepted',
  },
  {
    id: 'NF-202',
    title: 'Database connection timeout',
    category: 'database',
    priority: 'critical',
    confidence: 89,
    assignee: 'Sarah Connor',
    assigneeInitials: 'SC',
    status: 'pending',
  },
  {
    id: 'NF-201',
    title: 'Pipeline deployment stuck at build stage',
    category: 'devops',
    priority: 'medium',
    confidence: 76,
    assignee: 'Marcus Aurelius',
    assigneeInitials: 'MA',
    status: 'overridden',
  },
];

export const CATEGORY_OPTIONS = ['Frontend', 'Backend', 'Database', 'DevOps'];
export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical'];
export const STORY_POINT_OPTIONS = [1, 2, 3, 5, 8, 13];
export const ASSIGNEE_OPTIONS = teamMembers.map((m) => `${m.name} — ${m.role}`);

const STATUS_LABEL = { pending: 'Pending Review', accepted: 'Accepted', overridden: 'Overridden', suggested: 'AI Suggested' };
export function statusLabel(status) {
  return STATUS_LABEL[status] || status;
}

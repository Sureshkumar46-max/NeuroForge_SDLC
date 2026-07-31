export const projects = [
  {
    id: 'prj-001',
    name: 'NeuroBot AI Assistant',
    organization: 'NeuroForge Labs',
    team: 'Platform Engineering',
    manager: { name: 'Aditi Kapoor', initials: 'AK' },
    members: [
      { initials: 'AK' }, { initials: 'RS' }, { initials: 'PV' }, { initials: 'MJ' }, { initials: 'TN' },
    ],
    sprint: 'Sprint 8',
    status: 'Active',
    progress: 68,
    health: 'On Track',
    budgetUsed: 62,
    risk: 'Low',
    methodology: 'Scrum',
    priority: 'High',
    startDate: '2026-02-10',
    endDate: '2026-09-30',
    stats: { totalTasks: 184, completed: 124, pending: 48, bugs: 12, velocity: 38 },
    techStack: ['React', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'OpenAI API'],
    description:
      'Conversational assistant that answers questions about live project data using a safe, permission-aware query layer, plus a real-time notification hub for the whole platform.',
  },
  {
    id: 'prj-002',
    name: 'Portfolio Analytics Suite',
    organization: 'NeuroForge Labs',
    team: 'Data & Insights',
    manager: { name: 'Rohan Shetty', initials: 'RS' },
    members: [{ initials: 'RS' }, { initials: 'KN' }, { initials: 'IJ' }],
    sprint: 'Sprint 5',
    status: 'Active',
    progress: 41,
    health: 'At Risk',
    budgetUsed: 55,
    risk: 'Medium',
    methodology: 'Kanban',
    priority: 'High',
    startDate: '2026-03-01',
    endDate: '2026-10-15',
    stats: { totalTasks: 96, completed: 39, pending: 47, bugs: 9, velocity: 21 },
    techStack: ['React', 'Recharts', 'PostgreSQL'],
    description:
      'Cross-project executive dashboards with DORA-style delivery metrics, AI-generated sprint health summaries and PDF export for stakeholders.',
  },
  {
    id: 'prj-003',
    name: 'Secure Pipeline Tracker',
    organization: 'Orion Retail Pvt Ltd',
    team: 'DevSecOps',
    manager: { name: 'Priya Verma', initials: 'PV' },
    members: [{ initials: 'PV' }, { initials: 'TN' }, { initials: 'MJ' }, { initials: 'AK' }],
    sprint: 'Sprint 12',
    status: 'On Hold',
    progress: 22,
    health: 'Delayed',
    budgetUsed: 30,
    risk: 'High',
    methodology: 'Waterfall',
    priority: 'Medium',
    startDate: '2026-01-05',
    endDate: '2026-11-20',
    stats: { totalTasks: 140, completed: 31, pending: 96, bugs: 21, velocity: 14 },
    techStack: ['GitHub Actions', 'Spring Boot', 'OSV.dev'],
    description:
      'Animated CI/CD pipeline visualisation with live WebSocket status, integrated security scanning against known vulnerability databases.',
  },
  {
    id: 'prj-004',
    name: 'Requirement Traceability Engine',
    organization: 'Vantage Health Systems',
    team: 'Compliance Systems',
    manager: { name: 'Meera Joshi', initials: 'MJ' },
    members: [{ initials: 'MJ' }, { initials: 'IJ' }, { initials: 'KN' }],
    sprint: 'Sprint 3',
    status: 'Completed',
    progress: 100,
    health: 'On Track',
    budgetUsed: 88,
    risk: 'Low',
    methodology: 'Agile',
    priority: 'Critical',
    startDate: '2025-10-01',
    endDate: '2026-04-30',
    stats: { totalTasks: 210, completed: 210, pending: 0, bugs: 3, velocity: 44 },
    techStack: ['React', 'MongoDB', 'PostgreSQL'],
    description:
      'One-click traceability chain from requirement to code, test and deployment, built on audit events collected across every other module.',
  },
  {
    id: 'prj-005',
    name: 'Mobile Field App',
    organization: 'Orion Retail Pvt Ltd',
    team: 'Mobile Guild',
    manager: { name: 'Tanmay Nair', initials: 'TN' },
    members: [{ initials: 'TN' }, { initials: 'RS' }, { initials: 'PV' }],
    sprint: 'Sprint 2',
    status: 'Active',
    progress: 15,
    health: 'On Track',
    budgetUsed: 12,
    risk: 'Low',
    methodology: 'Scrum',
    priority: 'Medium',
    startDate: '2026-06-01',
    endDate: '2027-01-15',
    stats: { totalTasks: 58, completed: 9, pending: 49, bugs: 2, velocity: 9 },
    techStack: ['React Native', 'Spring Boot'],
    description:
      'Offline-first field inspection app for on-site retail audits, syncing back to the core platform once connectivity is restored.',
  },
  {
    id: 'prj-006',
    name: 'AI Code Review Copilot',
    organization: 'NeuroForge Labs',
    team: 'Platform Engineering',
    manager: { name: 'Ishaan Jain', initials: 'IJ' },
    members: [{ initials: 'IJ' }, { initials: 'AK' }, { initials: 'KN' }, { initials: 'RS' }],
    sprint: 'Sprint 6',
    status: 'Active',
    progress: 53,
    health: 'On Track',
    budgetUsed: 47,
    risk: 'Low',
    methodology: 'Scrum',
    priority: 'High',
    startDate: '2026-02-20',
    endDate: '2026-08-31',
    stats: { totalTasks: 122, completed: 65, pending: 51, bugs: 6, velocity: 27 },
    techStack: ['React', 'GitHub REST API', 'OpenAI API'],
    description:
      'Reviews pull requests against team conventions and flags risky diffs, with visible reasoning surfaced back into the merge request.',
  },
];

export const organizations = ['NeuroForge Labs', 'Orion Retail Pvt Ltd', 'Vantage Health Systems'];
export const teams = ['Platform Engineering', 'Data & Insights', 'DevSecOps', 'Compliance Systems', 'Mobile Guild'];
export const managers = ['Aditi Kapoor', 'Rohan Shetty', 'Priya Verma', 'Meera Joshi', 'Tanmay Nair', 'Ishaan Jain'];

export const milestones = [
  { id: 'ms-1', title: 'Foundation Platform Live', project: 'NeuroBot AI Assistant', owner: 'Aditi Kapoor', deadline: '2026-08-01', completion: 80, status: 'On Track' },
  { id: 'ms-2', title: 'Analytics Beta Release', project: 'Portfolio Analytics Suite', owner: 'Rohan Shetty', deadline: '2026-07-28', completion: 45, status: 'At Risk' },
  { id: 'ms-3', title: 'Security Scan Rollout', project: 'Secure Pipeline Tracker', owner: 'Priya Verma', deadline: '2026-09-10', completion: 20, status: 'Delayed' },
  { id: 'ms-4', title: 'Compliance Audit Signoff', project: 'Requirement Traceability Engine', owner: 'Meera Joshi', deadline: '2026-05-01', completion: 100, status: 'Completed' },
  { id: 'ms-5', title: 'Field App Pilot Launch', project: 'Mobile Field App', owner: 'Tanmay Nair', deadline: '2026-10-05', completion: 10, status: 'On Track' },
  { id: 'ms-6', title: 'Copilot GA Release', project: 'AI Code Review Copilot', owner: 'Ishaan Jain', deadline: '2026-08-20', completion: 60, status: 'On Track' },
];

export const activity = [
  { id: 1, text: 'Aditi Kapoor moved "Auth flow redesign" to Done', time: '12 min ago' },
  { id: 2, text: 'Priya Verma flagged a critical bug in Secure Pipeline Tracker', time: '48 min ago' },
  { id: 3, text: 'Rohan Shetty updated the Portfolio Analytics Suite roadmap', time: '2 hr ago' },
  { id: 4, text: 'Meera Joshi archived Requirement Traceability Engine', time: '5 hr ago' },
  { id: 5, text: 'Tanmay Nair created Mobile Field App sprint 3', time: '1 day ago' },
];

export const progressTrend = [
  { month: 'Feb', completed: 8, planned: 10 },
  { month: 'Mar', completed: 22, planned: 24 },
  { month: 'Apr', completed: 39, planned: 40 },
  { month: 'May', completed: 58, planned: 62 },
  { month: 'Jun', completed: 81, planned: 88 },
  { month: 'Jul', completed: 104, planned: 118 },
];

export const taskDistribution = [
  { name: 'Completed', value: 478, color: '#3B82F6' },
  { name: 'In Progress', value: 212, color: '#22C55E' },
  { name: 'Pending', value: 187, color: '#F59E0B' },
  { name: 'Bugs', value: 53, color: '#EF4444' },
];

export const healthByProject = projects.map((p) => ({ name: p.name.split(' ').slice(0, 2).join(' '), health: p.progress }));

export const members = [
  { id: 'AK', name: 'Aditi Kapoor', initials: 'AK', gradient: 'from-blue-500 to-purple-500' },
  { id: 'RS', name: 'Rohan Shetty', initials: 'RS', gradient: 'from-green-500 to-teal-500' },
  { id: 'PV', name: 'Priya Verma', initials: 'PV', gradient: 'from-pink-500 to-rose-500' },
  { id: 'MJ', name: 'Meera Joshi', initials: 'MJ', gradient: 'from-yellow-500 to-orange-500' },
  { id: 'TN', name: 'Tanmay Nair', initials: 'TN', gradient: 'from-indigo-500 to-blue-500' },
  { id: 'IJ', name: 'Ishaan Jain', initials: 'IJ', gradient: 'from-red-500 to-pink-500' },
  { id: 'KN', name: 'Kavya Nambiar', initials: 'KN', gradient: 'from-purple-500 to-indigo-500' },
];

export function memberById(id) {
  return members.find((m) => m.id === id);
}

export const initialTasks = [
  {
    id: 'ORI-101',
    title: 'Design login screen',
    priority: 'high',
    points: 3,
    assignee: 'AK',
    labels: ['UI'],
    status: 'backlog',
    due: '2026-08-05',
    comments: 2,
    attachments: 1,
    subtasks: '1/3',
  },
  {
    id: 'ORI-102',
    title: 'Setup CI/CD pipeline',
    priority: 'medium',
    points: 5,
    assignee: 'TN',
    labels: ['DevOps'],
    status: 'in-progress',
    due: '2026-08-10',
    comments: 0,
    attachments: 0,
    subtasks: '0/2',
  },
  {
    id: 'ORI-103',
    title: 'Fix checkout bug',
    priority: 'critical',
    points: 2,
    assignee: 'PV',
    labels: ['Bug'],
    status: 'done',
    due: '2026-07-30',
    comments: 4,
    attachments: 2,
    subtasks: '2/2',
  },
];
export const LABELS = ['UI', 'Backend', 'API', 'Bug', 'DevOps', 'Docs', 'Security', 'Performance'];
export const PRIORITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };
export const BOARD_COLUMNS = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'In Review' },
  { id: 'done', title: 'Done' },
];
export const initialNotifications = [
  { id: 1, text: 'You were assigned a new task', time: '10 min ago', read: false },
  { id: 2, text: 'Sprint planning meeting tomorrow at 10 AM', time: '1 hr ago', read: false },
  { id: 3, text: 'Your PR was approved', time: '3 hr ago', read: true },
];
export const sprintHistory = [
  {
    id: 'sprint-1',
    name: 'Sprint 6',
    startDate: '2026-06-01',
    endDate: '2026-06-14',
    status: 'Completed',
    plannedPoints: 40,
    completedPoints: 38,
    velocity: 38,
  },
  {
    id: 'sprint-2',
    name: 'Sprint 7',
    startDate: '2026-06-15',
    endDate: '2026-06-28',
    status: 'Completed',
    plannedPoints: 42,
    completedPoints: 40,
    velocity: 40,
  },
  {
    id: 'sprint-3',
    name: 'Sprint 8',
    startDate: '2026-06-29',
    endDate: '2026-07-12',
    status: 'Active',
    plannedPoints: 45,
    completedPoints: 27,
    velocity: null,
  },
];
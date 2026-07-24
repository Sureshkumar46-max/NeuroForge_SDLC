// Frontend-only testing: since there's no backend yet, use these to log in
// and test how the UI looks/behaves for each of the 6 roles.
// Password for all of them can be anything — only email is checked.

export const mockUsers = [
  { name: "Ava Sharma",  email: "admin@test.com",  role: "Super Admin" },
  { name: "Rohit Verma", email: "org@test.com",    role: "Org Admin", orgId: "aurora-labs" },
  { name: "Priya Nair",  email: "pm@test.com",     role: "PM", orgId: "aurora-labs" },
  { name: "Karan Mehta", email: "dev@test.com",    role: "Developer", orgId: "aurora-labs" },
  { name: "Sneha Iyer",  email: "qa@test.com",     role: "QA", orgId: "aurora-labs" },
  { name: "Client Corp", email: "client@test.com", role: "Client", orgId: "northstar-fintech" },
];

export function findMockUser(email) {
  return mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

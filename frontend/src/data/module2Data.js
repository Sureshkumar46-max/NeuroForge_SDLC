export const organizations = [
  {
    id: "aurora-labs",
    name: "Aurora Labs",
    description: "AI-powered health diagnostics platform for connected clinics.",
    industry: "Healthcare",
    companySize: "201-500",
    location: "Singapore",
    logo: "AL",
    status: "Active",
    teams: 6,
    members: 48,
    projects: 12,
  },
  {
    id: "northstar-fintech",
    name: "Northstar Fintech",
    description: "Enterprise payments and treasury orchestration suite.",
    industry: "Fintech",
    companySize: "1001+",
    location: "London",
    logo: "NF",
    status: "Growing",
    teams: 9,
    members: 96,
    projects: 21,
  },
  {
    id: "lumen-analytics",
    name: "Lumen Analytics",
    description: "Business intelligence and operations insight for retail teams.",
    industry: "Retail",
    companySize: "51-200",
    location: "Toronto",
    logo: "LA",
    status: "Active",
    teams: 4,
    members: 31,
    projects: 8,
  },
];

export const teams = [
  {
    id: "platform",
    orgId: "aurora-labs",
    name: "Platform Engineering",
    description: "Core platform services, CI/CD, and infrastructure automation.",
    lead: "Mina Patel",
    members: 12,
    projects: 5,
    status: "Active",
  },
  {
    id: "product",
    orgId: "aurora-labs",
    name: "Product Delivery",
    description: "Coordinates product planning, releases, and customer delivery.",
    lead: "Aarav Singh",
    members: 9,
    projects: 4,
    status: "Planning",
  },
  {
    id: "quality",
    orgId: "northstar-fintech",
    name: "Quality & Security",
    description: "Responsible for release validation, testing and policies.",
    lead: "Diana Brooks",
    members: 7,
    projects: 3,
    status: "Active",
  },
];

export const members = [
  {
    id: 1,
    orgId: "aurora-labs",
    name: "Mina Patel",
    email: "mina@aurora.ai",
    role: "Org Admin",
    team: "Platform Engineering",
    status: "Active",
    avatar: "MP",
  },
  {
    id: 2,
    orgId: "aurora-labs",
    name: "Aarav Singh",
    email: "aarav@aurora.ai",
    role: "Project Manager",
    team: "Product Delivery",
    status: "Active",
    avatar: "AS",
  },
  {
    id: 3,
    orgId: "aurora-labs",
    name: "Diana Brooks",
    email: "diana@aurora.ai",
    role: "QA Lead",
    team: "Quality & Security",
    status: "Pending",
    avatar: "DB",
  },
  {
    id: 4,
    orgId: "northstar-fintech",
    name: "Kian Flores",
    email: "kian@northstar.io",
    role: "Developer",
    team: "Quality & Security",
    status: "Active",
    avatar: "KF",
  },
];

export const industryOptions = ["Healthcare", "Fintech", "Retail", "Manufacturing", "Education"];
export const companySizeOptions = ["1-50", "51-200", "201-500", "501-1000", "1001+"];
export const roleOptions = ["Developer", "Project Manager", "QA Lead", "Org Admin"];
export const teamLeadOptions = ["Mina Patel", "Aarav Singh", "Diana Brooks", "Liam Chen"];
export const teamStatusOptions = ["Active", "Planning", "Paused"];

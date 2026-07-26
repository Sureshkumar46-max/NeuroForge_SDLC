export type Role =
  | 'Super Admin'
  | 'Org Admin'
  | 'Project Manager'
  | 'Developer'
  | 'QA/Tester'
  | 'Client/Stakeholder';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  organization?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

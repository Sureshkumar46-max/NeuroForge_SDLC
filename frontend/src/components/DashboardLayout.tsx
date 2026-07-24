import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types/auth';
import {
  LayoutDashboard,
  FolderKanban,
  Terminal,
  ShieldCheck,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ElementType;
  allowedRoles?: Role[];
}

export const DashboardLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  if (!currentUser) return null;

  const navigationItems: SidebarItem[] = [
    {
      name: 'Overview Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Projects Board',
      path: '/projects',
      icon: FolderKanban,
    },
    {
      name: 'Developer Tasks',
      path: '/dev-tasks',
      icon: Terminal,
      allowedRoles: ['Super Admin', 'Org Admin', 'Project Manager', 'Developer', 'QA/Tester'],
    },
    {
      name: 'QA Portal',
      path: '/qa-portal',
      icon: ShieldCheck,
      allowedRoles: ['Super Admin', 'Org Admin', 'Project Manager', 'QA/Tester'],
    },
    {
      name: 'Client Portal',
      path: '/client-portal',
      icon: Briefcase,
      allowedRoles: ['Super Admin', 'Org Admin', 'Client/Stakeholder'],
    },
    {
      name: 'Admin Settings',
      path: '/admin-settings',
      icon: Settings,
      allowedRoles: ['Super Admin', 'Org Admin'],
    },
  ];

  // Filter items based on user role
  const filteredNavigation = navigationItems.filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(currentUser.role)
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Badge configuration based on role for premium aesthetics
  const getRoleBadgeClasses = (role: Role) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-red-500/10 text-red-400 border border-red-500/30';
      case 'Org Admin':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/30';
      case 'Project Manager':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      case 'Developer':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      case 'QA/Tester':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'Client/Stakeholder':
        return 'bg-teal-500/10 text-teal-400 border border-teal-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/30';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-100">
      {/* SIDEBAR FOR DESKTOP */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-slate-800/80 bg-slate-900/90 backdrop-blur-md">
        <div className="flex h-16 items-center px-6 border-b border-slate-800/80">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/20">
              N
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              NeuroForge
            </span>
            <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
              SDLC Platform
            </span>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Workspace
          </div>
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400 border-l-2 border-blue-500 shadow-sm shadow-blue-500/5'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border-l-2 border-transparent'
                }`
              }
            >
              <item.icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-105" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer / User Profile */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-800"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-semibold ring-2 ring-slate-700">
                  {currentUser.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate text-slate-200">{currentUser.name}</p>
                <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 ${getRoleBadgeClasses(currentUser.role)}`}>
                  {currentUser.role}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER & MENU */}
      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md px-4 md:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
              <span>{currentUser.organization}</span>
              <span>/</span>
              <span className="text-slate-200 font-medium">
                {location.pathname.substring(1).replace('-', ' ') || 'Dashboard'}
              </span>
            </div>
            <div className="flex md:hidden items-center gap-2">
              <span className="text-base font-bold text-white">NeuroForge</span>
            </div>
          </div>

          {/* Top-right menu actions */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors text-left"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-300 text-xs font-semibold ring-1 ring-slate-700">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline text-xs font-medium text-slate-300">{currentUser.name}</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {isUserDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsUserDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-slate-800 bg-slate-900 p-2 shadow-xl ring-1 ring-black ring-opacity-5 z-20">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="text-sm font-semibold text-slate-200">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    </div>
                    <div className="mt-1">
                      <div className="px-3 py-1.5 text-xs text-slate-500">
                        Role: <span className="font-semibold text-slate-300">{currentUser.role}</span>
                      </div>
                      <div className="px-3 py-1.5 text-xs text-slate-500">
                        Org: <span className="font-semibold text-slate-300">{currentUser.organization}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors mt-2 text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="flex-1 p-4 md:p-8 bg-slate-950 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="relative z-50 md:hidden">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white">N</div>
                  <span className="text-lg font-bold text-white">NeuroForge</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="space-y-1">
                {filteredNavigation.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600/10 text-blue-400 border-l-2 border-blue-500'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <div className="flex items-center gap-3 mb-4">
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-200">{currentUser.name}</p>
                  <p className="text-xs text-slate-500 truncate">{currentUser.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg transition-colors text-sm"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

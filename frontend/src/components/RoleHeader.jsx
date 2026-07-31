/**
 * RoleHeader.jsx
 * 
 * Sub-component for role selection and context status in the AI Requirements Studio.
 * Displays:
 * - Application title and branding.
 * - Role selection buttons (PM, DEV, QA, CLIENT).
 * - Dynamic capabilities descriptor based on active role permissions.
 * - Active user profile badge.
 * - "+ New Spec" trigger button (restricted to PM).
 */

import React from 'react';
import { 
  Shield, FileCode, CheckSquare, Users, 
  Plus, Sparkles, ShieldAlert, User
} from 'lucide-react';

export default function RoleHeader({
  activeRole,
  changeRole,
  isPM,
  createNewSpec
}) {
  
  // Define metadata and descriptions for each workspace perspective
  const rolesInfo = [
    { 
      id: 'PM', 
      label: 'PM Workspace', 
      icon: Shield, 
      desc: 'Write, edit, and approve specifications.',
      badgeName: 'Sarah Chen (Lead PM)',
      colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    },
    { 
      id: 'DEV', 
      label: 'Developer', 
      icon: FileCode, 
      desc: 'Read-only access to Approved specifications.',
      badgeName: 'Dev Team Alpha',
      colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    { 
      id: 'QA', 
      label: 'QA Assurance', 
      icon: CheckSquare, 
      desc: 'Read Approved specs + Generate BDD test cases.',
      badgeName: 'QA Automation Suite',
      colorClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
    },
    { 
      id: 'CLIENT', 
      label: 'Client Portal', 
      icon: Users, 
      desc: 'Read-only access to Approved specifications.',
      badgeName: 'Client Review Board',
      colorClass: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    }
  ];

  const currentRoleInfo = rolesInfo.find(r => r.id === activeRole) || rolesInfo[0];

  return (
    <header className="flex flex-col xl:flex-row items-center justify-between border-b border-cyber-border px-6 py-4 bg-cyber-card/60 backdrop-blur-md z-10 shrink-0 gap-4">
      
      {/* Branding Logo */}
      <div className="flex items-center gap-3 self-start xl:self-auto">
        <div className="p-2 bg-cyber-primary/10 rounded-lg border border-cyber-primary/30 shadow-cyber-neon">
          <Sparkles className="h-5 w-5 text-cyber-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            AI Requirements &amp; Spec Studio
          </h1>
          <p className="text-[10px] text-cyber-textMuted">Enterprise requirements drafting and compliance verification</p>
        </div>
      </div>

      {/* Role Pill Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-cyber-border shadow-inner">
          {rolesInfo.map((role) => {
            const Icon = role.icon;
            const isActive = activeRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => changeRole(role.id)}
                title={role.desc}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyber-primary text-white shadow-cyber-neon' 
                    : 'text-cyber-textMuted hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User Badge, Capability Info & PM Action */}
      <div className="flex flex-col sm:flex-row items-center gap-4 self-end xl:self-auto w-full xl:w-auto justify-end">
        
        {/* Profile Card & Capability String */}
        <div className="flex items-center gap-3 bg-slate-900/40 p-2.5 rounded-xl border border-cyber-border">
          <div className="p-1.5 bg-slate-800 rounded-lg text-slate-400">
            <User className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200 leading-none">
                {currentRoleInfo.badgeName}
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${currentRoleInfo.colorClass}`}>
                {activeRole}
              </span>
            </div>
            
            <div className="flex items-center gap-1 mt-1 text-[10px] text-cyber-textMuted">
              <ShieldAlert className="h-3 w-3 text-indigo-400" />
              <span>{currentRoleInfo.desc}</span>
            </div>
          </div>
        </div>

        {/* Action Button: restricted to PM */}
        {isPM && (
          <button
            onClick={createNewSpec}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold bg-cyber-primary hover:bg-cyber-primaryHover text-white rounded-xl transition-all shadow-cyber-neon whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            New Spec
          </button>
        )}
      </div>

    </header>
  );
}

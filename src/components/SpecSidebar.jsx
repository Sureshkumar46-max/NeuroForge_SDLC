/**
 * SpecSidebar.jsx
 * 
 * Spec navigation sidebar for the AI Requirements Studio.
 * Features:
 * - Search bar: Dynamic local filtering by spec title.
 * - Grouped by status: Collapsible groups for Drafts, In Reviews, and Approved.
 * - Role Visibility: Non-PM roles can only see the "Approved" group.
 * - Sub-menu version logs: Shows tree list of version history logs under the active spec.
 *   Clicking a version lets users load a read-only historical snapshot.
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, ChevronDown, ChevronRight, FileText, 
  GitBranch, Clock, User, Calendar
} from 'lucide-react';

export default function SpecSidebar({
  specs,
  activeRole,
  selectedSpec,
  selectSpec,
  versionHistory,
  isPM
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState({
    Approved: false,
    "In Review": false,
    Draft: false
  });

  // Toggle group visibility
  const toggleGroup = (group) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Filter specs based on role permissions (Non-PMs see Approved only)
  const roleFilteredSpecs = useMemo(() => {
    if (activeRole === 'PM') {
      return specs;
    }
    return specs.filter(s => s.status === 'Approved');
  }, [specs, activeRole]);

  // Apply local text search filter
  const searchedSpecs = useMemo(() => {
    return roleFilteredSpecs.filter(s => 
      s.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roleFilteredSpecs, searchTerm]);

  // Group specs by status
  const groupedSpecs = useMemo(() => {
    const groups = {
      Approved: [],
      "In Review": [],
      Draft: []
    };
    searchedSpecs.forEach(spec => {
      if (groups[spec.status] !== undefined) {
        groups[spec.status].push(spec);
      } else {
        // Fallback for custom statuses
        groups.Draft.push(spec);
      }
    });
    return groups;
  }, [searchedSpecs]);

  // Styling helpers
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'In Review':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      case 'Draft':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border border-gray-500/30';
    }
  };

  const getGroupHeaderStyle = (status) => {
    switch (status) {
      case 'Approved': return 'text-emerald-400 hover:bg-emerald-500/5';
      case 'In Review': return 'text-blue-400 hover:bg-blue-500/5';
      case 'Draft': return 'text-amber-400 hover:bg-amber-500/5';
      default: return 'text-slate-400 hover:bg-slate-800/5';
    }
  };

  // Render collapsible spec items grouped by status
  const renderStatusGroup = (status, items) => {
    if (activeRole !== 'PM' && status !== 'Approved') return null; // Role guard
    
    const isCollapsed = collapsedGroups[status];
    const HeaderIcon = isCollapsed ? ChevronRight : ChevronDown;
    
    return (
      <div key={status} className="space-y-1.5">
        {/* Accordion Header */}
        <button
          onClick={() => toggleGroup(status)}
          className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-bold transition-colors ${getGroupHeaderStyle(status)}`}
        >
          <div className="flex items-center gap-1.5">
            <HeaderIcon className="h-3.5 w-3.5" />
            <span>{status} Specifications</span>
          </div>
          <span className="font-mono bg-slate-900/60 border border-cyber-border px-1.5 py-0.2 rounded text-[10px]">
            {items.length}
          </span>
        </button>

        {/* Group Items */}
        {!isCollapsed && (
          <div className="space-y-2 pl-2 border-l border-slate-800/60 ml-2 py-1">
            {items.length === 0 ? (
              <p className="text-[10px] text-cyber-textMuted italic pl-3 py-1">No specs in this group.</p>
            ) : (
              items.map((spec) => {
                const isSelected = selectedSpec && selectedSpec.specId === spec.specId;
                return (
                  <div key={spec.specId} className="space-y-1.5">
                    
                    {/* Spec Item Main Card */}
                    <button
                      onClick={() => selectSpec(spec)}
                      className={`w-full text-left p-3 rounded-xl border transition-all duration-150 ${
                        isSelected
                          ? 'bg-cyber-card border-cyber-primary shadow-cyber-neon text-white font-medium'
                          : 'bg-slate-950/20 border-cyber-border/60 hover:bg-slate-900/40 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <h4 className="text-xs font-semibold leading-snug line-clamp-2">
                        {spec.title || <span className="italic text-slate-600">Untitled Specification</span>}
                      </h4>
                      
                      <div className="flex items-center justify-between text-[9px] mt-2 font-mono">
                        <span className={`px-1.5 py-0.5 rounded-full font-semibold ${getStatusBadgeStyle(spec.status)}`}>
                          {spec.status}
                        </span>
                        <span className="text-cyber-textMuted bg-slate-900 px-1 py-0.2 border border-slate-800 rounded">
                          {spec.version}
                        </span>
                      </div>
                    </button>

                    {/* Nested Version History Sub-menu: Visible ONLY under the active selected spec */}
                    {isSelected && versionHistory && versionHistory.length > 0 && (
                      <div className="pl-3.5 pr-1 py-1 space-y-1 bg-slate-950/40 rounded-xl border border-slate-900/80 mt-1">
                        <div className="text-[9px] font-bold text-cyber-textMuted uppercase flex items-center gap-1 py-1">
                          <GitBranch className="h-2.5 w-2.5 text-cyber-purple" />
                          <span>Versions timeline</span>
                        </div>
                        
                        <div className="space-y-1 border-l border-slate-800 ml-1.5 pl-2">
                          {versionHistory.map((history) => {
                            const isHistoryActive = selectedSpec.version === history.version;
                            return (
                              <button
                                key={history.version}
                                onClick={() => {
                                  // Construct historical snapshot spec
                                  const snapshotSpec = {
                                    ...spec,
                                    version: history.version,
                                    status: history.status,
                                    content: JSON.parse(JSON.stringify(history.content)),
                                    isHistoricalSnapshot: true // Flag to render banner
                                  };
                                  selectSpec(snapshotSpec);
                                }}
                                className={`w-full text-left py-1 px-1.5 rounded text-[10px] flex items-center justify-between transition-all ${
                                  isHistoryActive
                                    ? 'bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/25 font-bold shadow-inner'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <Clock className="h-2.5 w-2.5 opacity-60" />
                                  Version {history.version}
                                </span>
                                <span className={`text-[8px] px-1 rounded-sm scale-90 ${getStatusBadgeStyle(history.status)}`}>
                                  {history.status}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-80 border-r border-cyber-border bg-slate-900/30 flex flex-col shrink-0">
      
      {/* Search Input bar */}
      <div className="p-4 border-b border-cyber-border bg-slate-900/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyber-textMuted flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-cyber-primary" />
            Requirement Specs
          </span>
          <span className="text-[10px] font-mono text-cyber-textMuted bg-slate-900/80 border border-slate-800 px-1.5 py-0.2 rounded">
            total: {searchedSpecs.length}
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-cyber-textMuted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search specs by title..."
            className="w-full bg-slate-950 border border-cyber-border focus:border-cyber-primary rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none transition-all placeholder:text-slate-600 shadow-inner"
          />
        </div>
      </div>

      {/* Accordion Specs Group Lists */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5 custom-scrollbar">
        {searchedSpecs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <FileText className="h-10 w-10 text-slate-800 mb-2" />
            <p className="text-xs text-cyber-textMuted font-medium">No specs matching search</p>
            <p className="text-[10px] text-slate-600 mt-1">Try another keyword or filter criteria.</p>
          </div>
        ) : (
          Object.keys(groupedSpecs).map(status => 
            renderStatusGroup(status, groupedSpecs[status])
          )
        )}
      </div>

    </aside>
  );
}

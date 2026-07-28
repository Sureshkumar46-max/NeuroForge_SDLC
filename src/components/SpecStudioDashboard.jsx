/**
 * SpecStudioDashboard.jsx
 * 
 * Main Dashboard component for the AI Requirements & Spec Studio.
 * Ties together the workspace lifecycle:
 * - imports the `useSpecStudio` hook for state and permissions.
 * - renders `RoleHeader` for role/capability toggle bar.
 * - renders `SpecSidebar` for spec categories and nested history timeline selection.
 * - renders `SpecEditor` for prompt-based AI spec generation and card form drafting/views.
 * - renders the QA automation test suite pop-up modal.
 */

import React, { useState, useEffect } from 'react';
import useSpecStudio from '../hooks/useSpecStudio';
import RoleHeader from './RoleHeader';
import SpecSidebar from './SpecSidebar';
import SpecEditor from './SpecEditor';
import { 
  Terminal, Copy, Check, X, FileCode
} from 'lucide-react';

export default function SpecStudioDashboard() {
  const {
    activeRole,
    selectedSpec,
    specs,
    versionHistory,
    isPM,
    isDev,
    isQA,
    isClient,
    changeRole,
    selectSpec,
    saveSpec,
    approveSpec,
    submitForReview,
    createNewSpec,
    createNewVersion,
    generateTestCases
  } = useSpecStudio();

  // Local draft state for modifying specs (PM-only) before hitting "Save"
  const [editedSpec, setEditedSpec] = useState(null);
  
  // UI States
  const [showTestCasesModal, setShowTestCasesModal] = useState(false);
  const [generatedTests, setGeneratedTests] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync draft state when selectedSpec changes
  useEffect(() => {
    if (selectedSpec) {
      setEditedSpec(JSON.parse(JSON.stringify(selectedSpec)));
    } else {
      setEditedSpec(null);
    }
  }, [selectedSpec]);

  // Check if active workspace is in PM-edit mode
  // Locked if Approved or viewing historical snapshot
  const canEdit = isPM() && editedSpec && editedSpec.status !== "Approved" && !editedSpec.isHistoricalSnapshot;

  // --- Handlers for Actions ---
  const handleSave = (e) => {
    if (e) e.preventDefault();
    const result = saveSpec(editedSpec);
    if (result) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleQAAction = () => {
    if (selectedSpec) {
      const tests = generateTestCases(selectedSpec.specId);
      setGeneratedTests(tests);
      setShowTestCasesModal(true);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-cyber-bg text-slate-100 overflow-hidden font-sans">
      
      {/* --- TOP HEADER --- */}
      <RoleHeader 
        activeRole={activeRole} 
        changeRole={changeRole} 
        isPM={isPM()} 
        createNewSpec={createNewSpec} 
      />

      {/* --- DASHBOARD GRID LAYOUT --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* --- LEFT SIDEBAR (SPECS + SEARCH + NESTED HISTORY) --- */}
        <SpecSidebar 
          specs={specs}
          activeRole={activeRole}
          selectedSpec={selectedSpec}
          selectSpec={selectSpec}
          versionHistory={versionHistory}
          isPM={isPM()}
        />

        {/* --- MAIN PANEL: SPEC EDITOR OR VIEW --- */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950/40 flex flex-col custom-scrollbar">
          {editedSpec ? (
            <SpecEditor
              editedSpec={editedSpec}
              setEditedSpec={setEditedSpec}
              canEdit={canEdit}
              isPM={isPM}
              isDev={isDev}
              isQA={isQA}
              isClient={isClient}
              handleSave={handleSave}
              saveSuccess={saveSuccess}
              submitForReview={submitForReview}
              approveSpec={approveSpec}
              createNewVersion={createNewVersion}
              handleQAAction={handleQAAction}
              specs={specs}
              selectSpec={selectSpec}
            />
          ) : (
            /* --- EMPTY STATE PANEL --- */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-cyber-border/40 rounded-3xl bg-slate-900/10 max-w-2xl mx-auto w-full my-auto">
              <div className="p-4 bg-cyber-primary/5 rounded-full border border-cyber-primary/20 mb-4 animate-bounce">
                <FileCode className="h-12 w-12 text-cyber-primary" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">No Specification Active</h2>
              <p className="text-xs text-cyber-textMuted max-w-sm mb-6 leading-relaxed">
                Select an approved requirements specification from the navigation list, or filter specifications by search keyword.
              </p>
              {isPM() ? (
                <button
                  onClick={createNewSpec}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-cyber-primary hover:bg-cyber-primaryHover text-white rounded-xl transition-all shadow-cyber-neon"
                >
                  Create Your First Spec
                </button>
              ) : (
                <div className="p-3.5 bg-slate-900/60 border border-cyber-border rounded-2xl max-w-xs">
                  <p className="text-[10px] text-indigo-400 font-semibold mb-1 flex items-center justify-center gap-1.5 font-mono">
                    Viewer Mode ({activeRole})
                  </p>
                  <p className="text-[10px] text-cyber-textMuted leading-relaxed">
                    You can only read requirements specs once they have been authored and approved by the Product Manager.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>

      </div>

      {/* --- QA TEST CASES MODAL --- */}
      {showTestCasesModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-cyber-card border border-cyber-border rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4.5 border-b border-cyber-border bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-indigo-400" />
                <h3 className="font-bold text-sm text-white">QA Automation Suite: BDD Test Cases</h3>
              </div>
              <button 
                onClick={() => setShowTestCasesModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar bg-slate-950/50">
              <div className="p-3.5 bg-indigo-500/5 border border-indigo-500/20 rounded-xl text-xs text-indigo-300 leading-relaxed">
                BDD Test Cases generated programmatically using active User Stories & Acceptance Criteria. These steps are compliant with Gherkin standard testing runners (e.g., Cucumber).
              </div>

              <div className="space-y-5">
                {generatedTests.length === 0 ? (
                  <p className="text-xs text-center text-cyber-textMuted italic py-6">No test scenarios generated.</p>
                ) : (
                  generatedTests.map((tc) => (
                    <div key={tc.id} className="border border-slate-800 rounded-xl overflow-hidden">
                      <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/15">
                          {tc.id}
                        </span>
                        <button
                          onClick={() => copyToClipboard(tc.gherkin, tc.id)}
                          className="flex items-center gap-1 text-[10px] font-semibold text-cyber-textMuted hover:text-white transition-colors"
                        >
                          {copiedId === tc.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy Scenario</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="p-4 bg-slate-950 overflow-x-auto">
                        <pre className="text-xs font-mono text-emerald-400/90 leading-relaxed whitespace-pre">
                          {tc.gherkin}
                        </pre>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-cyber-border bg-slate-900/40 flex justify-end">
              <button
                onClick={() => setShowTestCasesModal(false)}
                className="px-4.5 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl transition-all"
              >
                Close Portal
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

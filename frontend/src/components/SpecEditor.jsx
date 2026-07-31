/**
 * SpecEditor.jsx
 * 
 * Spec Workspace Editor & AI Generator component for the AI Requirements Studio.
 * 
 * Responsibilities:
 * 1. AI Prompt Input Bar (Visible only when creating/editing as PM):
 *    - Textarea for typing requirements description.
 *    - "Generate Spec with AI" button with a 2-second loading spinner state.
 *    - Custom prompt parsing logic that generates adapted User Stories, Acceptance Criteria,
 *      Functional, and Non-Functional specs based on input keywords (e.g. booking, payment, slot, notifications).
 * 2. Editable Form Fields (PM-Only, Locked in history mode):
 *    - Fields for title, prompt context, and lists for User Stories, ACs, FRs, and NFRs.
 *    - Inline add/delete actions for all list sections.
 * 3. Read-Only Guard:
 *    - Restricts inputs and hides AI tools if status === 'Approved', viewing a historical snapshot,
 *      or the active role is not PM. Displays clean, formatted detail cards instead.
 */

import React, { useState } from 'react';
import { 
  Terminal, Sparkles, Plus, Trash2, Save, Send, 
  CheckCircle, Clock, Users, Shield, FileText, 
  Loader2, AlertCircle, Undo, Copy, Check, Lock
} from 'lucide-react';

export default function SpecEditor({
  editedSpec,
  setEditedSpec,
  canEdit,
  isPM,
  isDev,
  isQA,
  isClient,
  handleSave,
  saveSuccess,
  submitForReview,
  approveSpec,
  createNewVersion,
  handleQAAction,
  specs,
  selectSpec
}) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);

  // --- 1. Keyword-Aware Mock AI Generation Logic ---
  const handleAIGeneration = () => {
    if (!aiPrompt.trim()) {
      alert("Please type a feature prompt first.");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const promptLower = aiPrompt.toLowerCase();
      let generatedContent = {
        title: "",
        userStories: [],
        acceptanceCriteria: [],
        functionalRequirements: [],
        nonFunctionalRequirements: []
      };

      if (promptLower.includes("cng") || promptLower.includes("slot") || promptLower.includes("book") || promptLower.includes("pay")) {
        // CNG slot booking template
        generatedContent = {
          title: "CNG Slot Booking & Online Payment System",
          userStories: [
            {
              id: "US-101",
              title: "CNG Station Slot Selection",
              description: "As a Vehicle Owner, I want to search for nearby CNG stations and select an available time slot, so that I can schedule a refueling trip and avoid long queues."
            },
            {
              id: "US-102",
              title: "Pre-payment & Booking Lock",
              description: "As a Driver, I want to pay for my selected slot online via UPI or card, so that my reservation is secured before arrival."
            }
          ],
          acceptanceCriteria: [
            "Selectable slots must update in real-time and display a 'Locked' status for 10 minutes during customer checkout.",
            "Successful transaction must trigger a booking confirmation SMS containing a QR receipt code.",
            "Users must be allowed to cancel bookings up to 1 hour before the slot starts for a 90% refund."
          ],
          functionalRequirements: [
            "FR-1.1: System must check slot availability in the database to prevent double-booking before proceeding to checkout.",
            "FR-1.2: Integrate Razorpay and Stripe API gateways to process Credit Cards and UPI payments.",
            "FR-1.3: Generate a secure, tamper-proof QR code detailing Station ID, Time Slot, and Payment reference."
          ],
          nonFunctionalRequirements: [
            "NFR-1.1: Database booking transaction commits must complete in under 500ms under 1000 concurrent requests.",
            "NFR-1.2: Station GPS lookup query response time must be under 300ms.",
            "NFR-1.3: Customer payment credentials must never be cached or logged in server-side application logs."
          ]
        };
      } else if (promptLower.includes("sms") || promptLower.includes("notification") || promptLower.includes("alert")) {
        // Notifications template
        generatedContent = {
          title: "Real-time Notification Delivery Core",
          userStories: [
            {
              id: "US-201",
              title: "SMS Order Updates Trigger",
              description: "As a Customer, I want to opt-in for automated SMS updates for my order shipment milestones, so that I can track delivery progress without checking the app."
            },
            {
              id: "US-202",
              title: "Admin Broadcast Console",
              description: "As a Store Owner, I want to send transactional SMS alerts to specific user segments, so that I can alert them of system maintenance."
            }
          ],
          acceptanceCriteria: [
            "Notifications must fire within 5 seconds of order status transitions in the backend database.",
            "SMS logs must write delivery receipts (delivered, failed, pending) to the auditor dashboard.",
            "Users must be able to toggle SMS, Email, and Push channels individually via a preferences settings card."
          ],
          functionalRequirements: [
            "FR-2.1: Establish connection integrations with Twilio REST SMS API and Firebase Cloud Messaging.",
            "FR-2.2: Implement queue management using Redis to handle bursts of concurrent outgoing notifications.",
            "FR-2.3: Automatically retry failed notification dispatches twice before marking status as failed."
          ],
          nonFunctionalRequirements: [
            "NFR-2.1: The push notification pipeline must support a throughput of 5000 messages per second.",
            "NFR-2.2: Outgoing transactional SMS text must utilize TLS 1.2 encryption protocols in transit."
          ]
        };
      } else {
        // Default adapted fallback template
        const titleWords = aiPrompt.split(" ").slice(0, 4).join(" ");
        const formattedTitle = titleWords.charAt(0).toUpperCase() + titleWords.slice(1) + " Specification";

        generatedContent = {
          title: formattedTitle || "AI Autogenerated Specification",
          userStories: [
            {
              id: "US-301",
              title: `Core Operation: ${aiPrompt.slice(0, 30)}...`,
              description: `As a primary Actor, I want to perform actions relating to "${aiPrompt}", so that I can achieve my functional goal.`
            },
            {
              id: "US-302",
              title: "Usage Auditing and Reporting",
              description: "As a System Auditor, I want to review activity logs, so that I can verify compliance with operational procedures."
            }
          ],
          acceptanceCriteria: [
            "Verify inputs are parsed and validated against injection attacks.",
            "Confirm success codes are returned with proper payload structures.",
            "Ensure users can view, search, and download their data logs as CSV."
          ],
          functionalRequirements: [
            "FR-3.1: Expose API endpoints for CRUD actions supporting the new capability.",
            "FR-3.2: Implement audit trails logging user ID, timestamp, and modification type."
          ],
          nonFunctionalRequirements: [
            "NFR-3.1: Application queries must complete inside a 200ms latency ceiling.",
            "NFR-3.2: Ensure compatibility with modern browser builds (Chrome, Safari, Firefox)."
          ]
        };
      }

      // Populate draft editor state with AI generated contents
      setEditedSpec(prev => ({
        ...prev,
        title: generatedContent.title,
        originalPrompt: aiPrompt,
        content: {
          userStories: generatedContent.userStories,
          acceptanceCriteria: generatedContent.acceptanceCriteria,
          functionalRequirements: generatedContent.functionalRequirements,
          nonFunctionalRequirements: generatedContent.nonFunctionalRequirements
        }
      }));

      setIsGenerating(false);
      setAiPrompt(""); // clear prompt input
    }, 2000);
  };

  // --- Handlers for Clipboard Export ---
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(editedSpec, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2000);
  };

  // --- 2. Handlers for Editing List Items ---
  const handleMetaChange = (field, value) => {
    setEditedSpec(prev => ({ ...prev, [field]: value }));
  };

  const updateStory = (index, field, value) => {
    setEditedSpec(prev => {
      const stories = [...prev.content.userStories];
      stories[index] = { ...stories[index], [field]: value };
      return { ...prev, content: { ...prev.content, userStories: stories } };
    });
  };

  const addStory = () => {
    setEditedSpec(prev => {
      const stories = [...prev.content.userStories, { 
        id: `US-${Date.now().toString().slice(-3)}`, 
        title: "", 
        description: "" 
      }];
      return { ...prev, content: { ...prev.content, userStories: stories } };
    });
  };

  const deleteStory = (index) => {
    setEditedSpec(prev => {
      const stories = prev.content.userStories.filter((_, i) => i !== index);
      return { ...prev, content: { ...prev.content, userStories: stories } };
    });
  };

  const updateArrayField = (fieldType, index, value) => {
    setEditedSpec(prev => {
      const list = [...prev.content[fieldType]];
      list[index] = value;
      return { ...prev, content: { ...prev.content, [fieldType]: list } };
    });
  };

  const addArrayFieldItem = (fieldType) => {
    setEditedSpec(prev => {
      const list = [...prev.content[fieldType], ""];
      return { ...prev, content: { ...prev.content, [fieldType]: list } };
    });
  };

  const deleteArrayFieldItem = (fieldType, index) => {
    setEditedSpec(prev => {
      const list = prev.content[fieldType].filter((_, i) => i !== index);
      return { ...prev, content: { ...prev.content, [fieldType]: list } };
    });
  };

  const getStatusStyle = (status) => {
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

  const isImmutable = editedSpec.status === "Approved" || editedSpec.isHistoricalSnapshot;

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col flex-1 gap-6 pb-12">
      
      {/* 1. Immutable Revision / Approved Notice Banner */}
      {isImmutable && (
        <div className="p-4 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-2xl text-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 shrink-0 text-purple-400" />
            <span>
              🔒 You are viewing an immutable version. Click <strong>"Edit / Create New Version"</strong> to edit.
            </span>
          </div>
          {isPM() && (
            <button 
              onClick={() => createNewVersion(editedSpec.specId)}
              className="text-[10px] font-bold text-white bg-purple-600 hover:bg-purple-700 px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-md"
            >
              <Plus className="h-3 w-3" />
              Create New Version
            </button>
          )}
        </div>
      )}

      {/* 2. Top Meta Details Card */}
      <div className="bg-cyber-card/45 border border-cyber-border p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-cyber-primary/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getStatusStyle(editedSpec.status)}`}>
                {editedSpec.status}
              </span>
              <span className="text-[10px] text-cyber-textMuted font-mono flex items-center gap-1">
                <Clock className="h-3 w-3" /> Version {editedSpec.version}
              </span>
              {editedSpec.specId === "" && (
                <span className="text-[10px] text-cyber-primary bg-cyber-primary/10 px-2 py-0.5 rounded font-semibold border border-cyber-primary/20">
                  NEW SPEC TEMPLATE
                </span>
              )}
              {editedSpec.isHistoricalSnapshot && (
                <span className="text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded">
                  IMMUTABLE SNAPSHOT
                </span>
              )}
            </div>
            
            {canEdit ? (
              <input
                type="text"
                value={editedSpec.title}
                onChange={(e) => handleMetaChange("title", e.target.value)}
                placeholder="Enter Specification Title..."
                className="w-full bg-slate-900 border border-cyber-border focus:border-cyber-primary rounded-xl px-4 py-2 text-md md:text-lg font-bold text-white outline-none transition-all placeholder:text-slate-600 shadow-inner"
              />
            ) : (
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                {editedSpec.title || <span className="italic text-slate-500">Untitled Specification</span>}
              </h2>
            )}
            
            <div className="flex items-center gap-4 text-xs text-cyber-textMuted pt-1.5">
              <span>Created By: <strong className="text-slate-300 font-medium">{editedSpec.createdBy}</strong></span>
              <span>•</span>
              <span>Created At: <strong className="text-slate-300 font-medium">{new Date(editedSpec.createdAt).toLocaleString()}</strong></span>
            </div>
          </div>

          {/* Workflow Action Buttons */}
          <div className="flex flex-wrap gap-2.5 md:self-center shrink-0">
            {/* PM Operations */}
            {isPM() && (
              <>
                {!isImmutable ? (
                  <>
                    {editedSpec.specId && editedSpec.status === "Draft" && (
                      <button
                        onClick={() => submitForReview(editedSpec.specId)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/40 rounded-xl hover:bg-indigo-50 hover:text-white transition-all shadow-md"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Submit for Review
                      </button>
                    )}
                    {editedSpec.specId && (editedSpec.status === "Draft" || editedSpec.status === "In Review") && (
                      <button
                        onClick={() => approveSpec(editedSpec.specId)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-md"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Approve Spec
                      </button>
                    )}
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-cyber-primary hover:bg-cyber-primaryHover text-white rounded-xl transition-all shadow-cyber-neon"
                    >
                      <Save className="h-3.5 w-3.5" />
                      Save Draft
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => createNewVersion(editedSpec.specId)}
                    className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-purple-500/25 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/45 rounded-xl transition-all shadow-md"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Edit / Create New Version
                  </button>
                )}
              </>
            )}

            {/* QA Test Generation Tool */}
            {isQA() && editedSpec.status === "Approved" && (
              <button
                onClick={handleQAAction}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20"
              >
                <Terminal className="h-4 w-4" />
                Generate Test Cases
              </button>
            )}

            {/* DEV & CLIENT Copy JSON Tools */}
            {(isDev() || isClient()) && (
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-all shadow-md"
              >
                {jsonCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied JSON!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Export JSON</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {saveSuccess && (
          <div className="mt-4 p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Specification saved successfully! Incremented to version <strong>{editedSpec.version}</strong>.</span>
          </div>
        )}
      </div>

      {/* 3. Prominent AI Prompt Input Bar (Visible only when PM can edit) */}
      {canEdit && (
        <div className="bg-gradient-to-r from-blue-900/35 via-purple-900/35 to-indigo-900/35 border border-cyber-primary/45 p-5 rounded-2xl shadow-cyber-neon relative overflow-hidden flex flex-col gap-3.5 animate-fadeIn">
          <div className="absolute right-3 top-3 opacity-15 pointer-events-none">
            <Sparkles className="h-16 w-16 text-cyber-primary" />
          </div>
          
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyber-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              AI Requirements Autocomplete Engine
            </span>
          </div>
          
          <p className="text-[11px] text-cyber-textMuted leading-relaxed">
            Enter a prompt describing your feature (e.g. <em>"CNG booking with card payments"</em> or <em>"SMS notification broadcasts for order changes"</em>). AI will automatically generate structured User Stories, Acceptance Criteria, Functional, and Non-Functional details.
          </p>

          <div className="flex flex-col md:flex-row gap-3">
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={isGenerating}
              placeholder="Describe your feature/requirements in plain English..."
              className="flex-1 bg-slate-950 border border-cyber-border focus:border-cyber-primary disabled:opacity-60 rounded-xl p-3.5 text-xs text-slate-100 outline-none transition-all min-h-[75px] resize-none placeholder:text-slate-600 shadow-inner font-mono"
            />
            <button
              onClick={handleAIGeneration}
              disabled={isGenerating || !aiPrompt.trim()}
              className="px-5 py-3 md:self-end shrink-0 bg-cyber-primary hover:bg-cyber-primaryHover disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none text-white text-xs font-bold rounded-xl transition-all shadow-cyber-neon flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Spec</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 4. Original Prompt Context Display */}
      <div className="bg-slate-900/60 border border-cyber-border p-4.5 rounded-2xl flex flex-col gap-2">
        <span className="text-[10px] font-bold text-cyber-textMuted uppercase tracking-wider flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-cyber-primary" />
          AI Context / Original System Prompt
        </span>
        {canEdit ? (
          <textarea
            value={editedSpec.originalPrompt}
            onChange={(e) => handleMetaChange("originalPrompt", e.target.value)}
            placeholder="Type original prompt detail or click generate above..."
            className="w-full bg-slate-950/60 border border-cyber-border focus:border-cyber-primary rounded-xl p-3 text-xs text-slate-300 outline-none transition-all min-h-[60px] resize-y placeholder:text-slate-700 font-mono shadow-inner"
          />
        ) : (
          <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/40 p-3 rounded-xl border border-slate-900/60">
            "{editedSpec.originalPrompt || "No original system prompt metadata configured."}"
          </p>
        )}
      </div>

      {/* 5. Core Requirements Content Grid */}
      <div className="space-y-6">
        
        {/* 5.1 USER STORIES */}
        <div className="bg-cyber-card/30 border border-cyber-border rounded-2xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3.5">
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2 text-white">
              <Users className="h-4 w-4 text-cyber-primary" />
              1. User Stories
            </h3>
            {canEdit && (
              <button
                type="button"
                onClick={addStory}
                className="flex items-center gap-1 text-[11px] font-semibold text-cyber-primary hover:text-blue-300 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add Story
              </button>
            )}
          </div>

          <div className="space-y-4">
            {editedSpec.content.userStories.length === 0 ? (
              <p className="text-xs text-cyber-textMuted italic py-2">No user stories defined.</p>
            ) : (
              editedSpec.content.userStories.map((story, index) => (
                <div key={story.id || index} className="p-4 bg-slate-900/50 border border-cyber-border/70 rounded-xl relative group">
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => deleteStory(index)}
                      className="absolute top-3 right-3 text-slate-600 hover:text-rose-400 p-1 rounded-md transition-colors"
                      title="Delete Story"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <div className="grid gap-3 pr-6">
                    <div className="flex flex-col md:flex-row gap-2.5">
                      <span className="text-[10px] font-mono bg-slate-950 text-indigo-400 px-2 py-0.5 rounded border border-indigo-900/40 w-fit self-start shrink-0">
                        {story.id || `US-${index + 1}`}
                      </span>
                      {canEdit ? (
                        <input
                          type="text"
                          value={story.title}
                          onChange={(e) => updateStory(index, "title", e.target.value)}
                          placeholder="As a [User], I want to [Goal]..."
                          className="w-full bg-slate-950/60 border border-cyber-border focus:border-cyber-primary rounded-lg px-2.5 py-1 text-xs text-white outline-none font-semibold transition-all"
                        />
                      ) : (
                        <h4 className="font-bold text-xs text-white">
                          {story.title || <span className="italic text-slate-600">Untitled Story</span>}
                        </h4>
                      )}
                    </div>
                    
                    {canEdit ? (
                      <textarea
                        value={story.description}
                        onChange={(e) => updateStory(index, "description", e.target.value)}
                        placeholder="Details and narrative description..."
                        className="w-full bg-slate-950/60 border border-cyber-border focus:border-cyber-primary rounded-lg p-2.5 text-xs text-slate-300 outline-none transition-all min-h-[50px] resize-y"
                      />
                    ) : (
                      <p className="text-xs text-slate-300 leading-relaxed pl-1">
                        {story.description || <span className="italic text-slate-600">No description provided.</span>}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 5.2 ACCEPTANCE CRITERIA */}
        <div className="bg-cyber-card/30 border border-cyber-border rounded-2xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3.5">
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2 text-white">
              <CheckCircle className="h-4 w-4 text-cyber-accent" />
              2. Acceptance Criteria
            </h3>
            {canEdit && (
              <button
                type="button"
                onClick={() => addArrayFieldItem("acceptanceCriteria")}
                className="flex items-center gap-1 text-[11px] font-semibold text-cyber-accent hover:text-emerald-300 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add Criteria
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {editedSpec.content.acceptanceCriteria.length === 0 ? (
              <p className="text-xs text-cyber-textMuted italic py-2">No acceptance criteria defined.</p>
            ) : (
              editedSpec.content.acceptanceCriteria.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="mt-1 text-[10px] font-bold text-cyber-accent bg-cyber-accent/10 px-1.5 py-0.5 rounded border border-cyber-accent/20">
                    AC-{index + 1}
                  </span>
                  {canEdit ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayField("acceptanceCriteria", index, e.target.value)}
                        placeholder="Verify system behavior matches..."
                        className="flex-1 bg-slate-900 border border-cyber-border focus:border-cyber-primary rounded-lg px-2.5 py-1 text-xs text-white outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => deleteArrayFieldItem("acceptanceCriteria", index)}
                        className="text-slate-600 hover:text-rose-400 p-1.5 rounded"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed py-0.5 flex-1">
                      {item}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 5.3 FUNCTIONAL REQUIREMENTS */}
        <div className="bg-cyber-card/30 border border-cyber-border rounded-2xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3.5">
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2 text-white">
              <FileText className="h-4 w-4 text-amber-400" />
              3. Functional Requirements
            </h3>
            {canEdit && (
              <button
                type="button"
                onClick={() => addArrayFieldItem("functionalRequirements")}
                className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add Requirement
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {editedSpec.content.functionalRequirements.length === 0 ? (
              <p className="text-xs text-cyber-textMuted italic py-2">No functional requirements defined.</p>
            ) : (
              editedSpec.content.functionalRequirements.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="mt-1 text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 whitespace-nowrap">
                    FR-{index + 1}
                  </span>
                  {canEdit ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayField("functionalRequirements", index, e.target.value)}
                        placeholder="System shall perform..."
                        className="flex-1 bg-slate-900 border border-cyber-border focus:border-cyber-primary rounded-lg px-2.5 py-1 text-xs text-white outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => deleteArrayFieldItem("functionalRequirements", index)}
                        className="text-slate-600 hover:text-rose-400 p-1.5 rounded"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed py-0.5 flex-1">
                      {item}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 5.4 NON-FUNCTIONAL REQUIREMENTS */}
        <div className="bg-cyber-card/30 border border-cyber-border rounded-2xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3.5">
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2 text-white">
              <Shield className="h-4 w-4 text-purple-400" />
              4. Non-Functional Requirements
            </h3>
            {canEdit && (
              <button
                type="button"
                onClick={() => addArrayFieldItem("nonFunctionalRequirements")}
                className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add NFR
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {editedSpec.content.nonFunctionalRequirements.length === 0 ? (
              <p className="text-xs text-cyber-textMuted italic py-2">No non-functional requirements defined.</p>
            ) : (
              editedSpec.content.nonFunctionalRequirements.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="mt-1 text-[10px] font-bold text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded border border-purple-400/20 whitespace-nowrap">
                    NFR-{index + 1}
                  </span>
                  {canEdit ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayField("nonFunctionalRequirements", index, e.target.value)}
                        placeholder="Response time / Security parameters..."
                        className="flex-1 bg-slate-900 border border-cyber-border focus:border-cyber-primary rounded-lg px-2.5 py-1 text-xs text-white outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => deleteArrayFieldItem("nonFunctionalRequirements", index)}
                        className="text-slate-600 hover:text-rose-400 p-1.5 rounded"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed py-0.5 flex-1">
                      {item}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

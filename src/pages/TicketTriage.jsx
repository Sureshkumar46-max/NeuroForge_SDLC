import React, { useEffect, useRef, useState } from 'react';
import Topbar from '../components/layout/Topbar.jsx';
import Button from '../components/ui/Button.jsx';
import { ToastProvider, useToast } from '../components/ui/Toast.jsx';
import TicketDetails from '../components/ticket-triage/TicketDetails.jsx';
import AISuggestionPanel from '../components/ticket-triage/AISuggestionPanel.jsx';
import AIReasoning from '../components/ticket-triage/AIReasoning.jsx';
import TriageQueue from '../components/ticket-triage/TriageQueue.jsx';
import CreateTicketModal from '../components/ticket-triage/CreateTicketModal.jsx';
import { analysisSteps } from '../data/mockData.js';
import {
  fetchTicket,
  runAiTriage,
  fetchTriageQueue,
  createTicket,
} from '../api/ticketTriageApi.js';

const REFRESH_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 15-4L23 10M1 14l4.5 5a9 9 0 0 0 15-4"/>
  </svg>
);
const PLUS_ICON = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>;
const SPARKLE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>
    <circle cx="12" cy="12" r="3.2"/>
  </svg>
);

export default function TicketTriage() {
  return (
    <ToastProvider>
      <TicketTriageInner />
    </ToastProvider>
  );
}

function TicketTriageInner() {
  const showToast = useToast();

  const [ticket, setTicket] = useState(null);
  const [fields, setFields] = useState(null);         // controlled field values (category/priority/storyPoints/assignee)
  const [aiValues, setAiValues] = useState(null);      // last-known AI suggested values, for override detection
  const [suggestion, setSuggestion] = useState(null);  // full AI suggestion payload (confidence + reasoning)
  const [analyzing, setAnalyzing] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [analyzedLabel, setAnalyzedLabel] = useState('Not yet analyzed');
  const [queue, setQueue] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const stepTimer = useRef(null);

  // ---- initial load ----
  useEffect(() => {
    fetchTicket().then((t) => {
      setTicket(t);
      setFields({ category: t.category, priority: t.priority, storyPoints: t.storyPoints, assignee: t.assignee });
    });
    fetchTriageQueue().then(setQueue);
    triggerAnalysis();
    return () => clearTimeout(stepTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function triggerAnalysis() {
    setAnalyzing(true);
    setActiveStepIndex(0);

    // Step the "Understanding description / Checking historical tickets / ..." UI forward
    // while the real request is in flight (runAiTriage below).
    let i = 0;
    const stepMs = 650;
    const tick = () => {
      i += 1;
      setActiveStepIndex(i);
      if (i < analysisSteps.length) {
        stepTimer.current = setTimeout(tick, stepMs);
      }
    };
    stepTimer.current = setTimeout(tick, stepMs);

    runAiTriage().then((result) => {
      clearTimeout(stepTimer.current);
      setActiveStepIndex(analysisSteps.length);
      setTimeout(() => {
        setSuggestion(result);
        setAiValues({
          category: result.category.value,
          priority: result.priority.value,
          storyPoints: result.storyPoints.value,
          assignee: result.assignee.value + (result.assignee.value === 'Linus Torvalds' ? ' — Developer' : ''),
        });
        setAnalyzing(false);
        setAnalyzedLabel('Analyzed just now');
        showToast('AI Analysis Complete');
      }, 350);
    });
  }

  function handleReanalyze() {
    if (analyzing) return;
    triggerAnalysis();
  }

  function handleFieldChange(key, value) {
    setFields((f) => ({ ...f, [key]: value }));
    if (aiValues && value !== aiValues[key]) {
      showToast('Field manually overridden — AI suggestion replaced');
    }
  }

  function handleAccept() {
    if (!aiValues) return;
    setFields({ ...aiValues });
    showToast('AI suggestions applied successfully.');
  }

  function handleOverride() {
    showToast('Edit any field on the left to override AI suggestions');
  }

  function handleQueueSelect(row) {
    setTicket((t) => ({ ...t, id: row.id, title: row.title }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded ${row.id} into triage view`);
  }

  async function handleCreateTicket({ title, description }) {
    setModalOpen(false);
    const created = await createTicket({ title, description });
    showToast(`Ticket ${created.id} created — running AI triage...`);
    setTicket((t) => ({ ...t, id: created.id, title: created.title, description: created.description || t.description }));
    setTimeout(triggerAnalysis, 400);
  }

  if (!ticket || !fields) {
    return (
      <>
        <Topbar />
        <div className="content"><p style={{ color: 'var(--text-dim)' }}>Loading ticket...</p></div>
      </>
    );
  }

  return (
    <>
      <Topbar crumbs={['HexaCorp Global', 'Projects', 'AI Ticket Triage']} />

      <div className="content">
        <div className="page-head">
          <div>
            <h1><span className="beam">{SPARKLE_ICON}</span>AI Ticket Triage</h1>
            <p>AI-powered ticket classification &amp; smart assignment</p>
          </div>
          <div className="head-actions">
            <Button icon={REFRESH_ICON} spinning={analyzing} disabled={analyzing} onClick={handleReanalyze}>
              Re-analyze
            </Button>
            <Button variant="primary" icon={PLUS_ICON} onClick={() => setModalOpen(true)}>
              Create Ticket
            </Button>
          </div>
        </div>

        <div className="triage-grid">
          <div>
            <TicketDetails
              ticket={ticket}
              fields={fields}
              aiValues={aiValues || fields}
              onFieldChange={handleFieldChange}
            />
          </div>

          <div>
            <AISuggestionPanel
              analyzing={analyzing}
              activeStepIndex={activeStepIndex}
              suggestion={suggestion}
              analyzedLabel={analyzedLabel}
              onAccept={handleAccept}
              onOverride={handleOverride}
            />
            <AIReasoning analyzing={analyzing || !suggestion} suggestion={suggestion} />
          </div>
        </div>

        <TriageQueue tickets={queue} onSelect={handleQueueSelect} />
      </div>

      <CreateTicketModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateTicket}
      />
    </>
  );
}

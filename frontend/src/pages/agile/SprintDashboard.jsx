import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ListChecks, Flame, Timer, TrendingUp, Plus, X } from 'lucide-react';
import axios from 'axios';
import WorkspaceLayout from '../../components/WorkspaceLayout.jsx';
import StatCard from '../../components/common/StatCard.jsx';
import ProgressBar from '../../components/common/ProgressBar.jsx';
import MemberAvatar from '../../components/agile/MemberAvatar.jsx';
import { useAgile } from '../../context/AgileContext.jsx';
import { useProjects } from '../../context/ProjectsContext.jsx';

const SPRINTS_BASE = 'http://localhost:8080/api/sprints';

function getAuthHeader() {
  const token = sessionStorage.getItem('nf_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function CreateSprintModal({ projectId, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await axios.post(
        SPRINTS_BASE,
        { projectId, name, goal, startDate, endDate },
        { headers: getAuthHeader() }
      );
      await axios.patch(`${SPRINTS_BASE}/${res.data.id}/start`, {}, { headers: getAuthHeader() });
      onCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create sprint');
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)',
        padding: '40px 16px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#12141c',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '28px',
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>Create Sprint</h3>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#9aa0ac', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9aa0ac', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Sprint name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sprint 1"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '13px',
                color: '#fff',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9aa0ac', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Goal
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Set up core backlog and board"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '13px',
                color: '#fff',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9aa0ac', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Start date
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: '#fff',
                  outline: 'none',
                  colorScheme: 'dark',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9aa0ac', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                End date
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: '#fff',
                  outline: 'none',
                  colorScheme: 'dark',
                }}
              />
            </div>
          </div>

          {error && <p style={{ fontSize: '12px', color: '#f87171', margin: 0 }}>{error}</p>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#e5e7eb',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                background: submitting ? '#3b82f680' : '#3b82f6',
                border: 'none',
                color: '#fff',
                cursor: submitting ? 'default' : 'pointer',
              }}
            >
              {submitting ? 'Creating...' : 'Create & Start Sprint'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default function SprintDashboard() {
  const { projects } = useProjects();
  const { sprint, board, allTasks, loading, error, loadSprintData } = useAgile();
  const [showModal, setShowModal] = useState(false);

  const activeProjectId = projects?.[0]?.id;

  useEffect(() => {
    if (activeProjectId) loadSprintData(activeProjectId);
  }, [activeProjectId, loadSprintData]);

  if (loading) {
    return (
      <WorkspaceLayout title="Sprint Dashboard" subtitle="Loading sprint data...">
        <p className="text-sm text-muted">Loading...</p>
      </WorkspaceLayout>
    );
  }

  if (error) {
    return (
      <WorkspaceLayout title="Sprint Dashboard" subtitle="Something went wrong">
        <p className="text-sm text-danger">Failed to load sprint data: {String(error)}</p>
      </WorkspaceLayout>
    );
  }

  if (!sprint) {
    return (
      <WorkspaceLayout title="Sprint Dashboard" subtitle="No active sprint">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-sm text-muted">No sprint found for this project yet.</p>
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              background: '#3b82f6',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <Plus size={16} /> Create Sprint
          </button>
        </div>
        {showModal && (
          <CreateSprintModal
            projectId={activeProjectId}
            onClose={() => setShowModal(false)}
            onCreated={() => {
              setShowModal(false);
              loadSprintData(activeProjectId);
            }}
          />
        )}
      </WorkspaceLayout>
    );
  }

  const inProgressCount = board?.inProgress?.length || 0;
  const criticalOpen = allTasks.filter(
    (t) => t.priority === 'CRITICAL' && t.status !== 'DONE'
  ).length;
  const progressPct = sprint.totalStoryPoints
    ? Math.round((sprint.completedStoryPoints / sprint.totalStoryPoints) * 100)
    : 0;

  const assigneeMap = {};
  allTasks.forEach((t) => {
    if (!t.assigneeId) return;
    if (!assigneeMap[t.assigneeId]) {
      assigneeMap[t.assigneeId] = { id: t.assigneeId, name: t.assigneeName, load: 0 };
    }
    if (t.status !== 'DONE') assigneeMap[t.assigneeId].load += 1;
  });
  const teamCapacity = Object.values(assigneeMap);

  return (
    <WorkspaceLayout
      title="Sprint Dashboard"
      subtitle={`${sprint.name}${sprint.startDate ? ` · ${sprint.startDate} – ${sprint.endDate}` : ''}`}
      actions={
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            background: '#3b82f6',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} /> New Sprint
        </button>
      }
    >
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={ListChecks}
            label="Tasks Done"
            value={`${sprint.completedTasks}/${sprint.totalTasks}`}
            tone="success"
          />
          <StatCard icon={Timer} label="In Progress" value={inProgressCount} tone="primary" />
          <StatCard icon={Flame} label="Critical Open" value={criticalOpen} tone="danger" />
          <StatCard
            icon={TrendingUp}
            label="Story Points"
            value={`${sprint.completedStoryPoints}/${sprint.totalStoryPoints}`}
            tone="warning"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="surface-card p-6 lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold text-white">Sprint burndown</h3>
            <ProgressBar value={progressPct} />
            <p className="mt-3 text-xs text-muted">
              {sprint.completedStoryPoints} of {sprint.totalStoryPoints} story points completed.
            </p>

            <h3 className="mb-4 mt-8 text-sm font-bold text-white">Team capacity</h3>
            <div className="space-y-4">
              {teamCapacity.length === 0 && (
                <p className="text-xs text-muted">No tasks assigned yet.</p>
              )}
              {teamCapacity.map((m) => {
                const pct = Math.min(100, m.load * 18);
                return (
                  <div key={m.id} className="flex items-center gap-3">
                    <MemberAvatar id={m.id} size={28} />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="truncate text-white">{m.name}</span>
                        <span className="text-muted">{m.load} active</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent2"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="surface-card p-6">
            <h3 className="mb-5 text-sm font-bold text-white">Recent activity</h3>
            <p className="text-xs text-muted">Activity feed coming soon.</p>
          </div>
        </div>
      </div>

      {showModal && (
        <CreateSprintModal
          projectId={activeProjectId}
          onClose={() => setShowModal(false)}
          onCreated={() => {
            setShowModal(false);
            loadSprintData(activeProjectId);
          }}
        />
      )}
    </WorkspaceLayout>
  );
}
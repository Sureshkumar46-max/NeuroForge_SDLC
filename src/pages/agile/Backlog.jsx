import { useMemo, useState } from 'react';
import { ListTodo, Plus, Search } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader.jsx';
import BacklogRow from '../../components/agile/BacklogRow.jsx';
import TaskDetailModal from '../../components/agile/TaskDetailModal.jsx';
import AddBacklogModal from '../../components/agile/AddBacklogModal.jsx';
import { useAgile } from '../../context/AgileContext.jsx';
import { PRIORITY_ORDER } from '../../data/mockData.js';

const PAGE_SIZE = 8;
const FILTERS = ['All', 'Critical', 'High', 'Medium', 'Low'];

export default function Backlog() {
  const { tasks, deleteTask, addBacklogItem, getTask } = useAgile();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const backlogTasks = useMemo(() => {
    return tasks
      .filter((t) => t.status === 'backlog')
      .filter((t) => filter === 'All' || t.priority === filter.toLowerCase())
      .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()) || t.id.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
  }, [tasks, filter, query]);

  const totalPages = Math.max(1, Math.ceil(backlogTasks.length / PAGE_SIZE));
  const pageTasks = backlogTasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const openTask = openTaskId ? getTask(openTaskId) : null;

  return (
    <div>
      <PageHeader
        icon={ListTodo}
        title="Backlog"
        description={`${backlogTasks.length} item${backlogTasks.length === 1 ? '' : 's'} awaiting sprint planning`}
        actions={
          <button className="btn-primary" onClick={() => setAddOpen(true)}>
            <Plus size={16} /> Add Backlog Item
          </button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-150 ${
                filter === f
                  ? 'bg-primary text-white shadow-glow'
                  : 'border border-border bg-white/[0.03] text-muted hover:border-border-strong hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-white/[0.03] px-3.5 py-2 sm:w-72">
          <Search size={14} className="text-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search backlog…"
            className="w-full bg-transparent text-sm text-white placeholder:text-muted/60 outline-none"
          />
        </div>
      </div>

      <div className="surface-card p-2">
        <div className="grid grid-cols-[90px_1fr_100px_90px_140px_90px] gap-3 px-3 py-2 text-[10.5px] font-semibold uppercase tracking-wide text-muted/70">
          <span>ID</span>
          <span>Title</span>
          <span>Priority</span>
          <span>Points</span>
          <span>Labels</span>
          <span>Assignee</span>
        </div>
        <div className="divide-y divide-border/60">
          {pageTasks.length === 0 ? (
            <p className="px-3 py-10 text-center text-sm text-muted">No backlog items match this view.</p>
          ) : (
            pageTasks.map((t) => <BacklogRow key={t.id} task={t} onOpen={setOpenTaskId} />)
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors ${
                page === i + 1 ? 'bg-primary text-white' : 'border border-border text-muted hover:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <TaskDetailModal
        task={openTask}
        open={!!openTask}
        onClose={() => setOpenTaskId(null)}
        onDelete={(id) => {
          deleteTask(id);
          setOpenTaskId(null);
        }}
        onSave={() => {}}
      />

      <AddBacklogModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={addBacklogItem} />
    </div>
  );
}

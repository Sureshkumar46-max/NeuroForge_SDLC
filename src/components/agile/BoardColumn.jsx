import TaskCard from './TaskCard.jsx';

export default function BoardColumn({ column, tasks, onOpen, onDragStart, onDragEnd, onDrop, draggingId, dragOver, onDragOver, onDragLeave }) {
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(column.key);
      }}
      onDragLeave={() => onDragLeave(column.key)}
      onDrop={(e) => onDrop(e, column.key)}
      className={`flex w-72 shrink-0 flex-col rounded-xl border transition-colors ${
        dragOver === column.key ? 'border-primary/50 bg-primary/[0.04]' : 'border-border bg-white/[0.015]'
      }`}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-border px-3.5 py-3">
        <span className={`h-2 w-2 rounded-full ${column.dot}`} />
        <span className="text-sm font-semibold text-white">{column.label}</span>
        <span className="ml-auto rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[10.5px] text-muted">
          {tasks.length}
        </span>
      </div>
      <div className="flex-1 space-y-2.5 overflow-y-auto p-2.5" style={{ minHeight: 120, maxHeight: 'calc(100vh - 320px)' }}>
        {tasks.length === 0 ? (
          <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted/60">
            No tasks
          </div>
        ) : (
          tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onOpen={onOpen}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              dragging={draggingId === t.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Kanban } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader.jsx';
import BoardColumn from '../../components/agile/BoardColumn.jsx';
import TaskDetailModal from '../../components/agile/TaskDetailModal.jsx';
import { useAgile } from '../../context/AgileContext.jsx';
import { BOARD_COLUMNS } from '../../data/mockData.js';

export default function KanbanBoard() {
  const { tasks, moveTask, deleteTask, getTask } = useAgile();
  const [draggingId, setDraggingId] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [openTaskId, setOpenTaskId] = useState(null);

  const openTask = openTaskId ? getTask(openTaskId) : null;

  const handleDragStart = (e, id) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOver(null);
  };
  const handleDrop = (e, columnKey) => {
    e.preventDefault();
    if (draggingId) moveTask(draggingId, columnKey);
    setDraggingId(null);
    setDragOver(null);
  };

  return (
    <div>
      <PageHeader icon={Kanban} title="Kanban Board" description="Sprint 14 — drag tasks between columns to update status" />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {BOARD_COLUMNS.map((col) => (
          <BoardColumn
            key={col.key}
            column={col}
            tasks={tasks.filter((t) => t.status === col.key)}
            onOpen={setOpenTaskId}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            draggingId={draggingId}
            dragOver={dragOver}
            onDragOver={setDragOver}
            onDragLeave={() => setDragOver(null)}
          />
        ))}
      </div>

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
    </div>
  );
}

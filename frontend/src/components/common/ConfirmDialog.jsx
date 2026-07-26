import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-sm surface-card p-6">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              tone === 'danger' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'
            }`}
          >
            <AlertTriangle size={19} />
          </div>
          <div>
            <h3 id="confirm-dialog-title" className="text-sm font-semibold text-white">
              {title}
            </h3>
            {description && <p className="mt-1.5 text-xs leading-relaxed text-muted">{description}</p>}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button type="button" onClick={onCancel} className="btn-secondary">
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={
              tone === 'danger'
                ? 'inline-flex items-center gap-2 rounded-xl bg-danger px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:brightness-95'
                : 'btn-primary'
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

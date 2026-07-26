export default function InfoModal({ open, icon: Icon, title, description, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-sm surface-card p-6 text-center">
        {Icon && (
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon size={20} />
          </div>
        )}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {description && <p className="mt-2 text-xs leading-relaxed text-muted">{description}</p>}
        <button type="button" onClick={onClose} className="btn-primary mt-6 w-full justify-center">
          Got it
        </button>
      </div>
    </div>
  );
}

import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import useDismiss from '../../hooks/useDismiss.js';

/**
 * Themed dropdown replacing native <select>.
 * Native selects render their option list with the OS/browser's own
 * (usually white) popup, which breaks the dark theme and can make
 * light-on-light text unreadable. This renders entirely in-app so
 * colors, z-index, and open/close behavior all match the rest of the UI.
 */
export default function Select({ value, onChange, options, placeholder = 'Select…', className = '' }) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss(open, close);

  const normalized = options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o));
  const selectedIndex = Math.max(
    0,
    normalized.findIndex((o) => o.value === value)
  );

  useEffect(() => {
    if (open) setHighlight(selectedIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.querySelector(`[data-idx="${highlight}"]`);
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlight, open]);

  const handleKeyDown = (e) => {
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, normalized.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = normalized[highlight];
      if (opt) {
        onChange(opt.value);
        setOpen(false);
        buttonRef.current?.focus();
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  const selected = normalized.find((o) => o.value === value);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="input-field flex w-full items-center justify-between text-left"
      >
        <span className={selected ? 'text-white' : 'text-muted/60'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={14} className={`shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-56 overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-glow-lg animate-fade-in"
        >
          {normalized.map((o, idx) => (
            <li
              key={o.value}
              data-idx={idx}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setHighlight(idx)}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                idx === highlight ? 'bg-primary/15 text-white' : 'text-muted hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {o.label}
              {o.value === value && <Check size={14} className="text-primary" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

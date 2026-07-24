import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Accessible dropdown with checkboxes for selecting multiple items.
 * Purely a UI/presentation component — the selection logic (which values
 * are selected, how they're persisted) is fully controlled by the parent
 * via `selected` + `onChange`, so existing state/handlers are unaffected.
 */
function MultiSelectDropdown({
  id,
  label,
  options,
  selected = [],
  onChange,
  placeholder = "Select members",
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleOption = (option) => {
    const isSelected = selected.includes(option);
    const next = isSelected ? selected.filter((item) => item !== option) : [...selected, option];
    onChange(next);
  };

  const summary = () => {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) return selected[0];
    if (selected.length === 2) return selected.join(", ");
    return `${selected.length} Members Selected`;
  };

  return (
    <div className="multiselect-dropdown" ref={wrapRef}>
      {label && <label htmlFor={id}>{label}</label>}
      <button
        type="button"
        id={id}
        className={`multiselect-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`multiselect-summary ${selected.length === 0 ? "placeholder" : ""}`}>
          {summary()}
        </span>
        <ChevronDown className="multiselect-chevron" size={16} />
      </button>

      {open && (
        <div className="multiselect-panel" role="listbox" aria-multiselectable="true">
          <div className="multiselect-options">
            {options.map((option) => {
              const checked = selected.includes(option);
              return (
                <label className="multiselect-option" key={option}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleOption(option)}
                  />
                  <span className="multiselect-checkbox" aria-hidden="true" />
                  <span className="multiselect-option-label">{option}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;

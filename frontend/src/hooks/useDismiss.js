import { useEffect, useRef } from 'react';

/**
 * Attaches outside-click and Escape-key handling to close a dropdown/menu.
 * Returns a ref to attach to the dropdown's container element.
 */
export default function useDismiss(isOpen, onClose) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return ref;
}

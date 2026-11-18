import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

// Accessible dialog shell reused by the booking, sign-up and search modals.
// - Closes on Escape or backdrop click
// - Locks page scrolling while open
// - Moves keyboard focus into the dialog
function Modal({ isOpen, onClose, title, labelledBy, size = 'md', children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    document.body.classList.add('no-scroll');

    // Focus the first form control (or the dialog itself) for keyboard users.
    const firstField = dialogRef.current?.querySelector('input, select, textarea');
    (firstField || dialogRef.current)?.focus();

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : title}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="icon-btn modal__close" onClick={onClose} aria-label="Close dialog">
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

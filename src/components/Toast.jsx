import { CheckCircle2, Info, Trash2 } from 'lucide-react';
import './Toast.css';

const icons = { success: CheckCircle2, info: Info, remove: Trash2 };

// Renders the stack of small feedback messages ("Added to cart", etc.).
// The list of toasts and their timers live in App.jsx.
function Toast({ toasts }) {
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || Info;
        return (
          <div key={toast.id} className={`toast toast--${toast.type}`}>
            <Icon aria-hidden="true" />
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Toast;

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoWarning,
  IoInformationCircle,
  IoClose,
} from "react-icons/io5";

const ToastContext = createContext(null);

const icons = {
  success: IoCheckmarkCircle,
  error: IoCloseCircle,
  warning: IoWarning,
  info: IoInformationCircle,
};

const colors = {
  success:
    "bg-success-50 dark:bg-success-900/30 border-success-200 dark:border-success-800 text-success-800 dark:text-success-200",
  error:
    "bg-error-50 dark:bg-error-900/30 border-error-200 dark:border-error-800 text-error-800 dark:text-error-200",
  warning:
    "bg-warning-50 dark:bg-warning-900/30 border-warning-200 dark:border-warning-800 text-warning-800 dark:text-warning-200",
  info: "bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 text-primary-800 dark:text-primary-200",
};

const iconColors = {
  success: "text-success-500 dark:text-success-400",
  error: "text-error-500 dark:text-error-400",
  warning: "text-warning-500 dark:text-warning-400",
  info: "text-primary-500 dark:text-primary-400",
};

const Toast = ({ id, type, message, onClose }) => {
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg dark:shadow-black/30
        animate-slide-down ${colors[type]}
        min-w-[300px] max-w-md
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColors[type]}`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:opacity-70 transition-opacity"
      >
        <IoClose className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (message) => addToast("success", message),
    error: (message) => addToast("error", message),
    warning: (message) => addToast("warning", message),
    info: (message) => addToast("info", message),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map((t) => (
            <Toast key={t.id} {...t} onClose={removeToast} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default Toast;

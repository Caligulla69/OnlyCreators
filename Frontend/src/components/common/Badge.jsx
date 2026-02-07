const variants = {
  success:
    "bg-success-100 text-success-700 border-success-200 dark:bg-success-900/30 dark:text-success-400 dark:border-success-800",
  warning:
    "bg-warning-100 text-warning-700 border-warning-200 dark:bg-warning-900/30 dark:text-warning-400 dark:border-warning-800",
  error:
    "bg-error-100 text-error-700 border-error-200 dark:bg-error-900/30 dark:text-error-400 dark:border-error-800",
  info: "bg-primary-100 text-primary-700 border-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-800",
  secondary:
    "bg-secondary-100 text-secondary-700 border-secondary-200 dark:bg-secondary-900/30 dark:text-secondary-400 dark:border-secondary-800",
  neutral:
    "bg-surface-200 text-text-secondary border-surface-300 dark:bg-dark-surface-light dark:text-dark-text-muted dark:border-dark-border",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

const dotColors = {
  success: "bg-success-500 dark:bg-success-400",
  warning: "bg-warning-500 dark:bg-warning-400",
  error: "bg-error-500 dark:bg-error-400",
  info: "bg-primary-500 dark:bg-primary-400",
  secondary: "bg-secondary-500 dark:bg-secondary-400",
  neutral: "bg-text-muted dark:bg-dark-text-muted",
};

const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  dot = false,
  removable = false,
  onRemove,
  className = "",
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColors[variant] || dotColors.neutral}`}
        />
      )}

      {children}

      {removable && (
        <button
          onClick={onRemove}
          className="ml-1.5 hover:opacity-70 transition-opacity"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;

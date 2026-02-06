const variants = {
  success: "bg-success-100 text-success-700 border-success-200",
  warning: "bg-warning-100 text-warning-700 border-warning-200",
  error: "bg-error-100 text-error-700 border-error-200",
  info: "bg-primary-100 text-primary-700 border-primary-200",
  secondary: "bg-secondary-100 text-secondary-700 border-secondary-200",
  neutral: "bg-gray-100 text-gray-700 border-gray-200",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
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
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            variant === "success"
              ? "bg-success-500"
              : variant === "warning"
                ? "bg-warning-500"
                : variant === "error"
                  ? "bg-error-500"
                  : variant === "info"
                    ? "bg-primary-500"
                    : variant === "secondary"
                      ? "bg-secondary-500"
                      : "bg-gray-500"
          }`}
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

import { forwardRef } from "react";

const variants = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600 dark:active:bg-primary-700 dark:focus:ring-primary-400",
  secondary:
    "bg-surface-50 text-primary-600 border-2 border-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500 dark:bg-dark-surface dark:text-primary-400 dark:border-primary-500 dark:hover:bg-dark-surface-light dark:active:bg-dark-border",
  success:
    "bg-success-600 text-white hover:bg-success-700 active:bg-success-800 focus:ring-success-500 dark:bg-success-500 dark:hover:bg-success-600",
  danger:
    "bg-error-600 text-white hover:bg-error-700 active:bg-error-800 focus:ring-error-500 dark:bg-error-500 dark:hover:bg-error-600",
  warning:
    "bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700 focus:ring-warning-400 dark:bg-warning-400 dark:hover:bg-warning-500 dark:text-dark-bg",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface-200 active:bg-surface-300 focus:ring-primary-500 dark:text-dark-text-muted dark:hover:bg-dark-surface-light dark:active:bg-dark-border",
  link: "bg-transparent text-primary-600 hover:text-primary-700 hover:underline p-0 focus:ring-0 dark:text-primary-400 dark:hover:text-primary-300",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      type = "button",
      ...props
    },
    ref,
  ) => {
    const baseStyles = `
    inline-flex items-center justify-center font-semibold rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    dark:focus:ring-offset-dark-bg
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled || isLoading}
        className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
        {...props}
      >
        {isLoading ? (
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            style={{
              animation: "oc-btn-spin 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
            }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2.5"
              className="opacity-20"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="17.6 44.8"
              className="opacity-90"
            />
            <style>{`
              @keyframes oc-btn-spin {
                0%   { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </svg>
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}

        {children}

        {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;

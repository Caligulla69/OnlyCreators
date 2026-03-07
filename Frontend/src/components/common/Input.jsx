import { useState, forwardRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      className = "",
      containerClassName = "",
      required = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const getInputStyles = () => {
      let styles = `
      w-full px-4 py-3 rounded-lg border transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-0
      placeholder-gray-400 dark:placeholder-dark-text-muted
      disabled:bg-gray-100 dark:disabled:bg-dark-surface-light disabled:cursor-not-allowed
      bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text
    `;

      if (error) {
        styles +=
          " border-error-500 focus:ring-error-500 focus:border-error-500";
      } else if (success) {
        styles +=
          " border-success-500 focus:ring-success-500 focus:border-success-500";
      } else {
        styles +=
          " border-gray-300 dark:border-dark-border focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400";
      }

      if (leftIcon) styles += " pl-11";
      if (rightIcon || isPassword) styles += " pr-11";

      return styles;
    };

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-dark-text-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={`${getInputStyles()} ${className}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-dark-text-muted hover:text-gray-600 dark:hover:text-dark-text transition-colors"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="w-5 h-5" />
              ) : (
                <AiOutlineEye className="w-5 h-5" />
              )}
            </button>
          )}

          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-dark-text-muted">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText || success) && (
          <p
            className={`mt-1.5 text-sm ${
              error
                ? "text-error-500"
                : success
                  ? "text-success-500"
                  : "text-gray-500 dark:text-dark-text-muted"
            }`}
          >
            {error || success || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;

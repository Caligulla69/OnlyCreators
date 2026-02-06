import { forwardRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const variants = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500",
  secondary:
    "bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500",
  success:
    "bg-success-600 text-white hover:bg-success-700 active:bg-success-800 focus:ring-success-500",
  danger:
    "bg-error-600 text-white hover:bg-error-700 active:bg-error-800 focus:ring-error-500",
  warning:
    "bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700 focus:ring-warning-400",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500",
  link: "bg-transparent text-primary-600 hover:text-primary-700 hover:underline p-0 focus:ring-0",
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
          <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin mr-2" />
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

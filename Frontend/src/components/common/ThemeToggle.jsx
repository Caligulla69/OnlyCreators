// src/components/common/ThemeToggle.jsx
// Smooth, calming theme toggle - no flash, just seamless color morphing

import { useState, useCallback, useRef, memo } from "react";

// Main Theme Toggle Button
const ThemeToggle = memo(({ isDark, toggleTheme, size = "default" }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef(null);

  const handleToggle = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Add smooth transition class to root
    document.documentElement.classList.add("theme-transition");

    // Toggle theme immediately
    toggleTheme();

    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
      setIsAnimating(false);
    }, 500);
  }, [toggleTheme, isAnimating]);

  const sizeClasses = {
    small: "w-9 h-9",
    default: "w-10 h-10",
    large: "w-12 h-12",
  };

  const iconSizes = {
    small: 18,
    default: 20,
    large: 24,
  };

  const buttonSize = sizeClasses[size] || sizeClasses.default;
  const iconSize = iconSizes[size] || iconSizes.default;

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      disabled={isAnimating}
      className={`
        relative ${buttonSize} rounded-xl flex items-center justify-center
        transition-colors duration-200
        hover:bg-secondary-100 dark:hover:bg-dark-surface-light
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-dark-surface
        active:scale-95 transition-transform
      `}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Icon Container with smooth morph */}
      <div className="relative" style={{ width: iconSize, height: iconSize }}>
        {/* Sun Icon */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          className={`
            absolute inset-0
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}
          `}
        >
          {/* Sun body */}
          <circle
            cx="12"
            cy="12"
            r="4"
            className="fill-amber-500 transition-colors duration-500"
          />
          {/* Sun rays */}
          <g
            className="stroke-amber-500 transition-colors duration-500"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="6.76" y2="6.76" />
            <line x1="17.24" y1="17.24" x2="19.07" y2="19.07" />
            <line x1="4.93" y1="19.07" x2="6.76" y2="17.24" />
            <line x1="17.24" y1="6.76" x2="19.07" y2="4.93" />
          </g>
        </svg>

        {/* Moon Icon */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          className={`
            absolute inset-0
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}
          `}
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            className="fill-indigo-400 stroke-indigo-400 transition-colors duration-500"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
});

ThemeToggle.displayName = "ThemeToggle";

// Switch-style Theme Toggle for mobile menus
export const ThemeToggleSwitch = memo(({ isDark, toggleTheme }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const switchRef = useRef(null);

  const handleToggle = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    document.documentElement.classList.add("theme-transition");
    toggleTheme();

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
      setIsAnimating(false);
    }, 500);
  }, [toggleTheme, isAnimating]);

  return (
    <button
      ref={switchRef}
      onClick={handleToggle}
      disabled={isAnimating}
      className="w-full flex items-center justify-between py-3 text-text-secondary dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-300 focus:outline-none"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="flex items-center gap-3">
        {/* Icon */}
        <div className="relative w-5 h-5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className={`
              absolute inset-0
              transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}
            `}
          >
            <circle cx="12" cy="12" r="4" className="fill-amber-500" />
            <g
              className="stroke-amber-500"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="12" y1="2" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="2" y1="12" x2="5" y2="12" />
              <line x1="19" y1="12" x2="22" y2="12" />
            </g>
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className={`
              absolute inset-0
              transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}
            `}
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              className="fill-indigo-400 stroke-indigo-400"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <span className="transition-colors duration-300">
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
      </span>

      {/* Toggle Switch */}
      <div
        className={`
          w-11 h-6 rounded-full p-0.5
          transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isDark ? "bg-indigo-500" : "bg-amber-400"}
        `}
      >
        <div
          className={`
            w-5 h-5 rounded-full bg-white shadow-md
            transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isDark ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </div>
    </button>
  );
});

ThemeToggleSwitch.displayName = "ThemeToggleSwitch";

export default ThemeToggle;

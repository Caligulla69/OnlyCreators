import { useState, useRef, useEffect } from "react";
import { IoChevronDown, IoCheckmark } from "react-icons/io5";

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  label,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-4 py-3
          bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg
          text-left transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:bg-gray-100 dark:disabled:bg-dark-surface-light disabled:cursor-not-allowed
          ${isOpen ? "ring-2 ring-primary-500 border-primary-500" : ""}
        `}
      >
        <span
          className={
            selectedOption
              ? "text-gray-900 dark:text-dark-text"
              : "text-gray-400 dark:text-dark-text-muted"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IoChevronDown
          className={`w-5 h-5 text-gray-400 dark:text-dark-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg shadow-lg dark:shadow-black/30 animate-slide-down">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-2.5
                    text-left text-sm transition-colors
                    ${
                      value === option.value
                        ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                        : "text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-surface-light"
                    }
                  `}
                >
                  {option.label}
                  {value === option.value && (
                    <IoCheckmark className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

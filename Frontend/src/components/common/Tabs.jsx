import { useState } from "react";

const Tabs = ({
  tabs,
  defaultTab = 0,
  onChange,
  className = "",
  variant = "underline",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  const getTabStyles = (isActive) => {
    if (variant === "underline") {
      return `
        px-4 py-2.5 text-sm font-medium transition-all duration-200
        border-b-2 -mb-px
        ${
          isActive
            ? "border-primary-600 text-primary-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }
      `;
    }

    if (variant === "pills") {
      return `
        px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
        ${
          isActive
            ? "bg-primary-600 text-white"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        }
      `;
    }

    return "";
  };

  return (
    <div className={className}>
      <div
        className={`flex ${variant === "underline" ? "border-b border-gray-200" : "gap-2"}`}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={getTabStyles(activeTab === index)}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;

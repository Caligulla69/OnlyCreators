import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Tooltip = ({
  children,
  content,
  position = "top",
  delay = 200,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const positions = {
          top: {
            top: rect.top - 8,
            left: rect.left + rect.width / 2,
          },
          bottom: {
            top: rect.bottom + 8,
            left: rect.left + rect.width / 2,
          },
          left: {
            top: rect.top + rect.height / 2,
            left: rect.left - 8,
          },
          right: {
            top: rect.top + rect.height / 2,
            left: rect.right + 8,
          },
        };
        setCoords(positions[position]);
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const getTooltipStyles = () => {
    let transform = "";
    switch (position) {
      case "top":
        transform = "translate(-50%, -100%)";
        break;
      case "bottom":
        transform = "translate(-50%, 0)";
        break;
      case "left":
        transform = "translate(-100%, -50%)";
        break;
      case "right":
        transform = "translate(0, -50%)";
        break;
    }
    return {
      top: coords.top,
      left: coords.left,
      transform,
    };
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </span>

      {isVisible &&
        createPortal(
          <div
            style={getTooltipStyles()}
            className={`
            fixed z-50 px-3 py-1.5 text-sm font-medium
            text-white bg-gray-900 rounded-lg shadow-lg
            animate-fade-in whitespace-nowrap
            ${className}
          `}
          >
            {content}
            <div
              className={`
              absolute w-2 h-2 bg-gray-900 rotate-45
              ${position === "top" ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" : ""}
              ${position === "bottom" ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""}
              ${position === "left" ? "right-0 top-1/2 translate-x-1/2 -translate-y-1/2" : ""}
              ${position === "right" ? "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""}
            `}
            />
          </div>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;

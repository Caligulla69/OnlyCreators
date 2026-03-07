import React, {
  useState,
  useEffect,
  useRef,
  memo,
  useCallback,
  useMemo,
} from "react";

// ============================================
// JOURNEY SECTION — Chapter Four
// 30-Day Interactive Timeline
// Warm Accent Palette | Theme-Integrated
// ============================================

// ── Hooks ──────────────────────────────────────────────

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "40px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, visible]);
  return [ref, visible];
};

// ── Icons ──────────────────────────────────────────────

const PlugIcon = memo(() => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v5a6 6 0 0 1-6 6v0a6 6 0 0 1-6-6V8h12Z" />
  </svg>
));
PlugIcon.displayName = "PlugIcon";

const SparklesIcon = memo(() => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
));
SparklesIcon.displayName = "SparklesIcon";

const LightbulbIcon = memo(() => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
  </svg>
));
LightbulbIcon.displayName = "LightbulbIcon";

const RocketIcon = memo(() => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
));
RocketIcon.displayName = "RocketIcon";

const CheckIcon = memo(() => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
));
CheckIcon.displayName = "CheckIcon";

const CalendarIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
));
CalendarIcon.displayName = "CalendarIcon";

const ClockIcon = memo(() => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
));
ClockIcon.displayName = "ClockIcon";

const ArrowRightIcon = memo(() => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
));
ArrowRightIcon.displayName = "ArrowRightIcon";

const ChevronLeftIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
));
ChevronLeftIcon.displayName = "ChevronLeftIcon";

const ChevronRightIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
));
ChevronRightIcon.displayName = "ChevronRightIcon";

// ── Milestone Data ─────────────────────────────────────

const MILESTONES = Object.freeze({
  1: {
    title: "Connect & Discover",
    description:
      "Link your platforms in under a minute. We securely connect to YouTube, Instagram, and TikTok to start gathering your data.",
    Icon: PlugIcon,
    accent: "var(--color-primary-500)",
    accentLight: "var(--color-primary-50)",
    accentBorder: "var(--color-primary-200)",
    accentDark: "var(--color-primary-600)",
    gradient:
      "linear-gradient(135deg, var(--color-primary-500), var(--color-primary-400))",
    events: [
      { text: "Platform connected", time: "Instant" },
      { text: "Initial sync complete", time: "~30 sec" },
      { text: "Account verified", time: "~1 min" },
    ],
  },
  2: {
    title: "AI Works Its Magic",
    description:
      "Our AI analyzes your content history, audience patterns, and engagement metrics to build your creator profile.",
    Icon: SparklesIcon,
    accent: "var(--color-accent-500)",
    accentLight: "var(--color-accent-50)",
    accentBorder: "var(--color-accent-200)",
    accentDark: "var(--color-accent-600)",
    gradient:
      "linear-gradient(135deg, var(--color-accent-500), var(--color-accent-400))",
    events: [
      { text: "AI analysis started", time: "Automatic" },
      { text: "Content indexed", time: "~2 hours" },
      { text: "Patterns detected", time: "~4 hours" },
    ],
  },
  7: {
    title: "Your First Insights",
    description:
      "Receive personalized recommendations based on your unique data. Actionable insights delivered to your dashboard.",
    Icon: LightbulbIcon,
    accent: "var(--color-warning-500)",
    accentLight: "var(--color-warning-50)",
    accentBorder: "var(--color-warning-200)",
    accentDark: "var(--color-warning-600)",
    gradient:
      "linear-gradient(135deg, var(--color-warning-500), var(--color-warning-400))",
    events: [
      { text: "First report ready", time: "Day 7" },
      { text: "Recommendations sent", time: "Email + Dashboard" },
      { text: "Action items created", time: "Prioritized" },
    ],
  },
  30: {
    title: "Watch Your Growth",
    description:
      "Track improvements and celebrate your wins. See the transformation with before/after comparisons.",
    Icon: RocketIcon,
    accent: "var(--color-success-500)",
    accentLight: "var(--color-success-50)",
    accentBorder: "var(--color-success-200)",
    accentDark: "var(--color-success-600)",
    gradient:
      "linear-gradient(135deg, var(--color-success-500), var(--color-success-400))",
    events: [
      { text: "Growth report generated", time: "Monthly" },
      { text: "Milestones achieved", time: "Tracked" },
      { text: "Next goals set", time: "AI-suggested" },
    ],
  },
});

const HIGHLIGHTED_DAYS = Object.freeze([1, 2, 7, 30]);
const DAYS = Object.freeze(Array.from({ length: 30 }, (_, i) => i + 1));
const WEEKDAYS = Object.freeze(["S", "M", "T", "W", "T", "F", "S"]);

// ── Background ─────────────────────────────────────────

const SectionBackground = memo(() => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(300px, 40vw, 550px)",
        height: "clamp(300px, 40vw, 550px)",
        top: "-5%",
        left: "5%",
        background: "var(--color-accent-100)",
        filter: "blur(130px)",
        opacity: 0.12,
      }}
    />
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(250px, 35vw, 450px)",
        height: "clamp(250px, 35vw, 450px)",
        bottom: "0%",
        right: "5%",
        background: "var(--color-warning-100)",
        filter: "blur(130px)",
        opacity: 0.08,
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-secondary-400) 0.5px, transparent 0.5px)",
        backgroundSize: "40px 40px",
        opacity: 0.06,
      }}
    />
  </div>
));
SectionBackground.displayName = "SectionBackground";

// ── Section Header ─────────────────────────────────────

const SectionHeader = memo(({ isVisible }) => (
  <div className="text-center mb-12 sm:mb-16 md:mb-20">
    <div
      className="transition-all duration-600"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
      }}
    >
      <span
        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-semibold"
        style={{
          background: "var(--color-accent-50)",
          color: "var(--color-accent-700)",
          border: "1px solid var(--color-accent-200)",
        }}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{
              background: "var(--color-accent-400)",
              animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: "var(--color-accent-500)" }}
          />
        </span>
        Chapter Four
      </span>
    </div>

    <h2
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5 transition-all duration-700"
      style={{
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-sans)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(14px)",
        transitionDelay: "100ms",
      }}
    >
      Your 30-Day{" "}
      <span
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Transformation
      </span>
    </h2>

    <p
      className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-all duration-700"
      style={{
        color: "var(--color-text-muted)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transitionDelay: "200ms",
      }}
    >
      From setup to success — see exactly what happens at each milestone
    </p>
  </div>
));
SectionHeader.displayName = "SectionHeader";

// ── Calendar Day ───────────────────────────────────────

const CalendarDay = memo(
  ({ day, isMilestone, isSelected, milestone, onClick, isVisible, delay }) => {
    const accent = milestone?.accent || "var(--color-primary-500)";
    const accentLight = milestone?.accentLight || "var(--color-primary-50)";

    return (
      <button
        onClick={onClick}
        disabled={!isMilestone}
        aria-label={
          isMilestone ? `Day ${day} — ${milestone?.title}` : `Day ${day}`
        }
        className="relative aspect-square rounded-xl flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        style={{
          background: isSelected
            ? milestone?.gradient ||
              "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400))"
            : isMilestone
              ? accentLight
              : "var(--color-surface-50)",
          color: isSelected
            ? "#fff"
            : isMilestone
              ? accent
              : "var(--color-text-light)",
          cursor: isMilestone ? "pointer" : "default",
          transform: isVisible
            ? isSelected
              ? "scale(1.12)"
              : "scale(1)"
            : "scale(0.85) translateY(4px)",
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${delay}ms`,
          boxShadow: isSelected
            ? `0 8px 24px -4px color-mix(in srgb, ${accent} 40%, transparent)`
            : "none",
          border:
            isMilestone && !isSelected
              ? `1px solid ${milestone?.accentBorder || "var(--color-primary-200)"}`
              : "none",
          zIndex: isSelected ? 10 : 1,
          outlineColor: accent,
        }}
      >
        {day}

        {isMilestone && !isSelected && (
          <span
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
            style={{ background: milestone?.gradient || accent }}
          >
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
          </span>
        )}

        {isSelected && (
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2">
            <span
              className="flex items-center justify-center w-4 h-4 rounded-full"
              style={{
                background: "var(--color-surface-50)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: accent }}
              />
            </span>
          </span>
        )}
      </button>
    );
  },
);
CalendarDay.displayName = "CalendarDay";

// ── Calendar Grid ──────────────────────────────────────

const CalendarGrid = memo(({ selectedDay, setSelectedDay, isVisible }) => {
  const [hoveredCard, setHoveredCard] = useState(false);

  return (
    <div
      className="relative rounded-[1.5rem] overflow-hidden transition-all duration-500"
      style={{
        background: "var(--color-surface-50)",
        border: `1px solid ${hoveredCard ? "var(--color-accent-200)" : "var(--color-secondary-200)"}`,
        boxShadow: hoveredCard
          ? "0 25px 60px -12px rgba(0,0,0,0.08), 0 12px 28px -8px rgba(0,0,0,0.04)"
          : "0 4px 16px -4px rgba(0,0,0,0.04), 0 2px 8px -2px rgba(0,0,0,0.02)",
      }}
      onMouseEnter={() => setHoveredCard(true)}
      onMouseLeave={() => setHoveredCard(false)}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full transition-all duration-500"
        style={{
          background: hoveredCard
            ? "linear-gradient(90deg, var(--color-accent-400), var(--color-warning-400), var(--color-error-400))"
            : "linear-gradient(90deg, transparent, var(--color-secondary-300), transparent)",
          opacity: hoveredCard ? 1 : 0.4,
        }}
      />

      <div className="p-5 sm:p-6 md:p-8">
        {/* Calendar header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3
              className="text-lg sm:text-xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Your First Month
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              30 Days to Clarity
            </p>
          </div>
          <div
            className="flex items-center gap-3 text-xs sm:text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded"
                style={{
                  background: "var(--color-accent-50)",
                  border: "1px solid var(--color-accent-200)",
                }}
              />
              Milestone
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400))",
                }}
              />
              Selected
            </span>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3">
          {WEEKDAYS.map((day, i) => (
            <div
              key={i}
              className="text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider py-1 sm:py-2"
              style={{ color: "var(--color-text-light)" }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          <div aria-hidden="true" />
          {DAYS.map((day, index) => {
            const isMilestone = HIGHLIGHTED_DAYS.includes(day);
            const milestone = MILESTONES[day] || null;

            return (
              <CalendarDay
                key={day}
                day={day}
                isMilestone={isMilestone}
                isSelected={selectedDay === day}
                milestone={milestone}
                onClick={() => isMilestone && setSelectedDay(day)}
                isVisible={isVisible}
                delay={300 + index * 12}
              />
            );
          })}
        </div>

        {/* Bottom navigation */}
        <div
          className="mt-6 pt-6"
          style={{
            borderTop: "1px solid",
            borderColor: "var(--color-secondary-200)",
          }}
        >
          {/* Mobile: arrow nav */}
          <div className="flex lg:hidden items-center justify-center gap-4">
            <NavButton
              direction="left"
              day={selectedDay}
              setSelectedDay={setSelectedDay}
            />
            <div className="flex items-center gap-2">
              {HIGHLIGHTED_DAYS.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: d === selectedDay ? 24 : 8,
                    height: 8,
                    background:
                      d === selectedDay
                        ? "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400))"
                        : "var(--color-secondary-300)",
                  }}
                  aria-label={`Go to day ${d}`}
                />
              ))}
            </div>
            <NavButton
              direction="right"
              day={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </div>

          {/* Desktop: keyboard hint */}
          <div className="hidden lg:flex justify-center">
            <span
              className="text-xs flex items-center gap-2"
              style={{ color: "var(--color-text-light)" }}
            >
              <kbd
                className="px-2 py-1 rounded text-[10px] font-mono"
                style={{
                  background: "var(--color-secondary-100)",
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-secondary-300)",
                }}
              >
                ←
              </kbd>
              <kbd
                className="px-2 py-1 rounded text-[10px] font-mono"
                style={{
                  background: "var(--color-secondary-100)",
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-secondary-300)",
                }}
              >
                →
              </kbd>
              to navigate milestones
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
CalendarGrid.displayName = "CalendarGrid";

// ── Nav Button ─────────────────────────────────────────

const NavButton = memo(({ direction, day, setSelectedDay }) => {
  const idx = HIGHLIGHTED_DAYS.indexOf(day);
  const isLeft = direction === "left";
  const disabled = isLeft ? idx <= 0 : idx >= HIGHLIGHTED_DAYS.length - 1;

  const handleClick = useCallback(() => {
    if (disabled) return;
    const next = isLeft ? HIGHLIGHTED_DAYS[idx - 1] : HIGHLIGHTED_DAYS[idx + 1];
    setSelectedDay(next);
  }, [idx, disabled, isLeft, setSelectedDay]);

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2"
      style={{
        background: "var(--color-surface-50)",
        border: "1px solid var(--color-secondary-200)",
        color: "var(--color-text-secondary)",
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: "0 2px 8px -2px rgba(0,0,0,0.06)",
        outlineColor: "var(--color-accent-500)",
      }}
      aria-label={isLeft ? "Previous milestone" : "Next milestone"}
    >
      {isLeft ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
});
NavButton.displayName = "NavButton";

// ── Milestone Card ─────────────────────────────────────

const MilestoneCard = memo(({ milestone, day, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!milestone) {
    return (
      <div
        className="rounded-[1.5rem] p-8 sm:p-10 text-center transition-all duration-500"
        style={{
          background: "var(--color-surface-50)",
          border: "1px solid var(--color-secondary-200)",
          boxShadow: "0 4px 16px -4px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
          style={{
            background: "var(--color-secondary-100)",
            color: "var(--color-text-light)",
          }}
        >
          <CalendarIcon />
        </div>
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: "var(--color-text-light)" }}
        >
          Select a Milestone
        </h3>
        <p style={{ color: "var(--color-text-muted)" }}>
          Click on a highlighted day to see what happens
        </p>
      </div>
    );
  }

  const {
    Icon,
    title,
    description,
    events,
    accent,
    accentLight,
    accentBorder,
    accentDark,
    gradient,
  } = milestone;
  const progress = Math.round((day / 30) * 100);

  return (
    <div
      className="relative rounded-[1.5rem] overflow-hidden transition-all duration-500"
      style={{
        background: "var(--color-surface-50)",
        border: `1px solid ${isHovered ? accentBorder : "var(--color-secondary-200)"}`,
        boxShadow: isHovered
          ? `0 25px 60px -12px rgba(0,0,0,0.08), 0 12px 28px -8px rgba(0,0,0,0.04), 0 0 0 1px ${accentBorder}`
          : "0 4px 16px -4px rgba(0,0,0,0.04), 0 2px 8px -2px rgba(0,0,0,0.02)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Accent top bar */}
      <div
        className="h-1 w-full transition-all duration-500"
        style={{
          background: isHovered ? gradient : "transparent",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute -inset-1 rounded-[2rem] pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${accent}, transparent 70%)`,
          filter: "blur(40px)",
          opacity: isHovered ? 0.08 : 0,
        }}
        aria-hidden="true"
      />

      <div className="relative p-6 sm:p-8">
        {/* Icon */}
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
          style={{
            background: gradient,
            color: "#fff",
            boxShadow: `0 8px 24px -4px color-mix(in srgb, ${accent} 35%, transparent)`,
            transform: isHovered
              ? "scale(1.05) rotate(-3deg)"
              : "scale(1) rotate(0)",
          }}
        >
          <Icon />
        </div>

        {/* Day badge */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
            style={{
              background: accentLight,
              color: accent,
              border: `1px solid ${accentBorder}`,
            }}
          >
            <ClockIcon />
            Day {day}
          </span>
          {day === 1 && (
            <span
              className="px-2.5 py-1 text-xs font-semibold rounded-full"
              style={{
                background: "var(--color-success-50)",
                color: "var(--color-success-600)",
                border: "1px solid var(--color-success-200)",
              }}
            >
              Start Here
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-xl sm:text-2xl font-bold mb-3"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm sm:text-base leading-relaxed mb-6"
          style={{ color: "var(--color-text-muted)" }}
        >
          {description}
        </p>

        {/* Divider */}
        <div
          className="h-px w-full mb-5"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentBorder}, transparent)`,
          }}
        />

        {/* Events */}
        <div className="space-y-2.5">
          <p
            className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-text-light)" }}
          >
            What Happens
          </p>
          {events.map((event, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl transition-all duration-500"
              style={{
                background: "var(--color-secondary-50)",
                border: "1px solid var(--color-secondary-200)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-8px)",
                transitionDelay: `${400 + i * 80}ms`,
              }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: "var(--color-success-50)",
                  color: "var(--color-success-500)",
                  border: "1px solid var(--color-success-200)",
                }}
              >
                <CheckIcon />
              </div>
              <span
                className="flex-1 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {event.text}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-text-light)" }}
              >
                {event.time}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="mt-6 pt-5"
          style={{
            borderTop: "1px solid var(--color-secondary-200)",
          }}
        >
          <div className="flex items-center justify-between text-sm mb-2.5">
            <span style={{ color: "var(--color-text-muted)" }}>
              Journey Progress
            </span>
            <span className="font-bold tabular-nums" style={{ color: accent }}>
              {progress}%
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "var(--color-secondary-100)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progress}%`,
                background: gradient,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
MilestoneCard.displayName = "MilestoneCard";

// ── Quick Jump Buttons ─────────────────────────────────

const QuickJumpButtons = memo(({ selectedDay, setSelectedDay, isVisible }) => (
  <div
    className="hidden lg:flex flex-wrap gap-2 mt-6 transition-all duration-700"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(8px)",
      transitionDelay: "500ms",
    }}
  >
    {HIGHLIGHTED_DAYS.map((day) => {
      const m = MILESTONES[day];
      const isActive = selectedDay === day;

      return (
        <button
          key={day}
          onClick={() => setSelectedDay(day)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2"
          style={{
            background: isActive ? m.accentLight : "var(--color-surface-50)",
            color: isActive ? m.accent : "var(--color-text-secondary)",
            border: `1px solid ${isActive ? m.accentBorder : "var(--color-secondary-200)"}`,
            outlineColor: m.accent,
          }}
        >
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: m.gradient }}
          >
            <span className="w-2 h-2 bg-white rounded-full" />
          </span>
          Day {day}
        </button>
      );
    })}
  </div>
));
QuickJumpButtons.displayName = "QuickJumpButtons";

// ── MAIN COMPONENT ─────────────────────────────────────

const Journey = () => {
  const [headerRef, headerVisible] = useInView(0.15);
  const [calendarRef, calendarVisible] = useInView(0.08);
  const [cardRef, cardVisible] = useInView(0.08);
  const [selectedDay, setSelectedDay] = useState(1);

  const currentMilestone = MILESTONES[selectedDay] || null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const idx = HIGHLIGHTED_DAYS.indexOf(selectedDay);
      if (e.key === "ArrowLeft" && idx > 0) {
        setSelectedDay(HIGHLIGHTED_DAYS[idx - 1]);
      } else if (e.key === "ArrowRight" && idx < HIGHLIGHTED_DAYS.length - 1) {
        setSelectedDay(HIGHLIGHTED_DAYS[idx + 1]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDay]);

  return (
    <section
      id="journey"
      className="relative py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-6 overflow-hidden"
      style={{ background: "var(--color-secondary-100)" }}
      aria-labelledby="journey-heading"
    >
      <SectionBackground />

      <div className="relative max-w-6xl mx-auto">
        <h2 className="sr-only" id="journey-heading">
          Your 30-day transformation journey
        </h2>

        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader isVisible={headerVisible} />
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Calendar */}
          <div
            ref={calendarRef}
            className="transition-all duration-700"
            style={{
              opacity: calendarVisible ? 1 : 0,
              transform: calendarVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms",
            }}
          >
            <CalendarGrid
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              isVisible={calendarVisible}
            />
          </div>

          {/* Milestone card */}
          <div
            ref={cardRef}
            className="lg:sticky lg:top-24 transition-all duration-700"
            style={{
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "350ms",
            }}
          >
            <MilestoneCard
              key={selectedDay}
              milestone={currentMilestone}
              day={selectedDay}
              isVisible={cardVisible}
            />

            <QuickJumpButtons
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              isVisible={cardVisible}
            />
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default memo(Journey);

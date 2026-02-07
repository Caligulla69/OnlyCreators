import React, { useState, useEffect, useRef, memo } from "react";

// ============================================
// ONLY CREATORS — PROBLEMS SECTION
// "Feel the Pain" — Interactive Problem Scenarios
// Theme-integrated with primary/secondary/accent
// ============================================

// ── Intersection Observer Hook ─────────────────────────

const useInView = (threshold = 0.15) => {
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
      { threshold, rootMargin: "30px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, visible]);
  return [ref, visible];
};

// ── Animated Counter ────────────────────────────────────

const useCounter = (target, active, duration = 1400) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf,
      start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
};

// ── Problem Data ────────────────────────────────────────

const PROBLEMS = Object.freeze([
  {
    id: "scattered",
    number: "01",
    title: "Your data lives in 5 different tabs",
    subtitle: "The Scattered Dashboard Problem",
    description:
      "Every morning you open YouTube Studio, Instagram Insights, TikTok Analytics, Twitter, and LinkedIn — copy-pasting numbers into spreadsheets like it's 2012.",
    tabs: [
      { name: "YouTube Studio", status: "Views: 12.4K ↑", mood: "okay" },
      { name: "IG Insights", status: "Reach: -23% ↓", mood: "bad" },
      { name: "TikTok Analytics", status: "FYP: 0 reach", mood: "bad" },
      { name: "Twitter/X", status: "Impr: 5.2K →", mood: "meh" },
      { name: "LinkedIn", status: "Clicks: 89 ↑", mood: "okay" },
    ],
    painStat: { value: 47, suffix: "min", label: "wasted every morning" },
    accent: "warning",
  },
  {
    id: "blind",
    number: "02",
    title: "You know what happened — never why",
    subtitle: "The Surface Metrics Trap",
    description:
      "Views went up but revenue went down. Engagement dropped but saves increased. Every metric tells a different story and none explain the reason.",
    contradictions: [
      {
        metric: "Views",
        value: "+31%",
        direction: "up",
        but: "Revenue",
        butValue: "-12%",
        butDirection: "down",
      },
      {
        metric: "Saves",
        value: "+45%",
        direction: "up",
        but: "Reach",
        butValue: "-23%",
        butDirection: "down",
      },
      {
        metric: "Followers",
        value: "+120",
        direction: "up",
        but: "Eng. Rate",
        butValue: "-0.8%",
        butDirection: "down",
      },
    ],
    painStat: { value: 94, suffix: "%", label: "of signals you're missing" },
    accent: "error",
  },
  {
    id: "timing",
    number: "03",
    title: "By the time you spot a trend, it's over",
    subtitle: "The Always-Late Problem",
    description:
      "That audio went viral 3 days ago. That format peaked last week. You're always reacting, never leading — because no one warned you in time.",
    timeline: [
      { day: "Mon", event: "Trend emerges", you: false, competitors: true },
      {
        day: "Tue",
        event: "Early adopters jump in",
        you: false,
        competitors: true,
      },
      { day: "Wed", event: "Trend peaks", you: false, competitors: true },
      { day: "Thu", event: "You finally notice", you: true, competitors: true },
      { day: "Fri", event: "Trend is dead", you: true, competitors: false },
    ],
    painStat: { value: 72, suffix: "h", label: "behind every trend" },
    accent: "accent",
  },
]);

// ── Tab Switching Simulation ────────────────────────────

const TabSimulation = memo(({ data, isVisible }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!isVisible || !data || data.length === 0) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % data.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isVisible, data]);

  if (!data || data.length === 0) return null;

  return (
    <div
      className="rounded-xl overflow-hidden border border-secondary-200 dark:border-dark-border"
      style={{
        background: "var(--color-surface-50)",
        boxShadow: "0 4px 24px -4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 border-b border-secondary-200 dark:border-dark-border"
        style={{ background: "var(--color-surface-200)" }}
      >
        <div className="flex gap-1.5 mr-3">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--color-error-400)" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--color-warning-400)" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--color-success-400)" }}
          />
        </div>

        {/* Tab bar */}
        <div className="flex gap-0.5 overflow-hidden flex-1">
          {data.map((tab, i) => (
            <div
              key={tab.name}
              className="px-2.5 py-1 rounded-t-md text-[9px] sm:text-[10px] font-medium truncate transition-all duration-300 cursor-default shrink-0"
              style={{
                background:
                  i === activeTab ? "var(--color-surface-50)" : "transparent",
                color:
                  i === activeTab
                    ? "var(--color-text-primary)"
                    : "var(--color-text-light)",
                maxWidth: i === activeTab ? "120px" : "60px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(4px)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>

      {/* Active tab content */}
      <div className="p-3 sm:p-4 min-h-[80px] relative">
        {data.map((tab, i) => (
          <div
            key={tab.name}
            className="transition-all duration-300 absolute inset-0 p-3 sm:p-4 flex items-center justify-between"
            style={{
              opacity: i === activeTab ? 1 : 0,
              transform: i === activeTab ? "translateX(0)" : "translateX(8px)",
              pointerEvents: i === activeTab ? "auto" : "none",
            }}
          >
            <div>
              <div
                className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                style={{ color: "var(--color-text-light)" }}
              >
                {tab.name}
              </div>
              <div
                className="text-sm sm:text-base font-bold"
                style={{
                  color:
                    tab.mood === "bad"
                      ? "var(--color-error-500)"
                      : tab.mood === "okay"
                        ? "var(--color-success-600)"
                        : "var(--color-text-muted)",
                }}
              >
                {tab.status}
              </div>
            </div>

            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{
                background:
                  tab.mood === "bad"
                    ? "var(--color-error-50)"
                    : tab.mood === "okay"
                      ? "var(--color-success-50)"
                      : "var(--color-surface-200)",
              }}
            >
              {tab.mood === "bad" ? "😰" : tab.mood === "okay" ? "🤔" : "😐"}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="h-0.5 w-full"
        style={{ background: "var(--color-surface-200)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            background: "var(--color-warning-400)",
            width: `${((activeTab + 1) / data.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
});
TabSimulation.displayName = "TabSimulation";

// ── Contradiction Simulation ────────────────────────────

const ContradictionSimulation = memo(({ data, isVisible }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {data.map((item, i) => (
        <div
          key={item.metric}
          className="flex items-center gap-2 sm:gap-3 transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-12px)",
            transitionDelay: `${i * 150}ms`,
          }}
        >
          {/* Good metric */}
          <div
            className="flex-1 flex items-center justify-between p-2.5 sm:p-3 rounded-lg border border-success-200 dark:border-success-800"
            style={{ background: "var(--color-success-50)" }}
          >
            <span
              className="text-[10px] sm:text-xs font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              {item.metric}
            </span>
            <span
              className="text-xs sm:text-sm font-bold"
              style={{ color: "var(--color-success-600)" }}
            >
              {item.value}
            </span>
          </div>

          {/* BUT connector */}
          <div
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-black uppercase border border-secondary-300 dark:border-dark-border"
            style={{
              background: "var(--color-surface-200)",
              color: "var(--color-text-light)",
            }}
          >
            but
          </div>

          {/* Bad metric */}
          <div
            className="flex-1 flex items-center justify-between p-2.5 sm:p-3 rounded-lg border border-error-200 dark:border-error-800"
            style={{ background: "var(--color-error-50)" }}
          >
            <span
              className="text-[10px] sm:text-xs font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              {item.but}
            </span>
            <span
              className="text-xs sm:text-sm font-bold"
              style={{ color: "var(--color-error-500)" }}
            >
              {item.butValue}
            </span>
          </div>
        </div>
      ))}

      {/* Confusion message */}
      <div
        className="text-center pt-2 transition-all duration-500"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: "500ms",
        }}
      >
        <span
          className="text-xs italic"
          style={{ color: "var(--color-text-light)" }}
        >
          …so is it working or not? 🤷
        </span>
      </div>
    </div>
  );
});
ContradictionSimulation.displayName = "ContradictionSimulation";

// ── Timeline Simulation ─────────────────────────────────

const TimelineSimulation = memo(({ data, isVisible }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex items-stretch gap-1">
        {data.map((point, i) => {
          const isLate = point.you && !point.competitors;
          const isMissed = !point.you && point.competitors;
          const isTooLate = point.you && point.competitors && i >= 3;

          return (
            <div
              key={point.day}
              className="flex-1 flex flex-col items-center transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(8px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* Day label */}
              <div
                className="text-[10px] sm:text-xs font-bold mb-2 tabular-nums"
                style={{ color: "var(--color-text-muted)" }}
              >
                {point.day}
              </div>

              {/* Bar */}
              <div
                className="w-full h-16 sm:h-20 rounded-lg relative flex flex-col items-center justify-center gap-1 transition-all duration-700"
                style={{
                  background: isMissed
                    ? "var(--color-accent-100)"
                    : isTooLate || isLate
                      ? "var(--color-error-50)"
                      : "var(--color-surface-200)",
                  border: `1px solid ${
                    isMissed
                      ? "var(--color-accent-200)"
                      : isTooLate || isLate
                        ? "var(--color-error-200)"
                        : "var(--color-surface-300)"
                  }`,
                  transitionDelay: `${i * 120 + 200}ms`,
                }}
              >
                {/* Competitor marker */}
                {point.competitors && (
                  <div
                    className="text-[7px] sm:text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isMissed
                        ? "var(--color-accent-500)"
                        : "var(--color-secondary-400)",
                      color: isMissed ? "#fff" : "var(--color-surface-50)",
                    }}
                  >
                    Others
                  </div>
                )}

                {/* You marker */}
                {point.you && (
                  <div
                    className="text-[7px] sm:text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isLate
                        ? "var(--color-error-500)"
                        : "var(--color-primary-500)",
                      color: "#fff",
                    }}
                  >
                    You
                  </div>
                )}
              </div>

              {/* Event label */}
              <div
                className="text-[7px] sm:text-[9px] mt-1.5 text-center font-medium leading-tight px-0.5"
                style={{
                  color:
                    isTooLate || isLate
                      ? "var(--color-error-500)"
                      : "var(--color-text-light)",
                }}
              >
                {point.event}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
TimelineSimulation.displayName = "TimelineSimulation";

// ── Visual Component Map ────────────────────────────────

const VISUAL_MAP = {
  scattered: TabSimulation,
  blind: ContradictionSimulation,
  timing: TimelineSimulation,
};

// ── Accent Color Helper ─────────────────────────────────

const getAccentStyles = (accent) => {
  const map = {
    warning: {
      tagBg: "var(--color-warning-50)",
      tagColor: "var(--color-warning-600)",
      tagBorder: "var(--color-warning-200)",
      dotBg: "var(--color-warning-500)",
      statColor: "var(--color-warning-500)",
      glowBg: "var(--color-warning-100)",
      darkTagBg: "var(--color-warning-900)",
      darkTagBorder: "var(--color-warning-700)",
      darkTagColor: "var(--color-warning-400)",
    },
    error: {
      tagBg: "var(--color-error-50)",
      tagColor: "var(--color-error-600)",
      tagBorder: "var(--color-error-200)",
      dotBg: "var(--color-error-500)",
      statColor: "var(--color-error-500)",
      glowBg: "var(--color-error-100)",
      darkTagBg: "var(--color-error-900)",
      darkTagBorder: "var(--color-error-700)",
      darkTagColor: "var(--color-error-400)",
    },
    accent: {
      tagBg: "var(--color-accent-50)",
      tagColor: "var(--color-accent-600)",
      tagBorder: "var(--color-accent-200)",
      dotBg: "var(--color-accent-500)",
      statColor: "var(--color-accent-500)",
      glowBg: "var(--color-accent-100)",
      darkTagBg: "var(--color-accent-900)",
      darkTagBorder: "var(--color-accent-700)",
      darkTagColor: "var(--color-accent-400)",
    },
    primary: {
      tagBg: "var(--color-primary-50)",
      tagColor: "var(--color-primary-600)",
      tagBorder: "var(--color-primary-200)",
      dotBg: "var(--color-primary-500)",
      statColor: "var(--color-primary-500)",
      glowBg: "var(--color-primary-100)",
      darkTagBg: "var(--color-primary-900)",
      darkTagBorder: "var(--color-primary-700)",
      darkTagColor: "var(--color-primary-400)",
    },
  };
  return map[accent] || map.primary;
};

// ── Get Visual Data ─────────────────────────────────────

const getVisualData = (problem) => {
  switch (problem.id) {
    case "scattered":
      return problem.tabs;
    case "blind":
      return problem.contradictions;
    case "timing":
      return problem.timeline;
    default:
      return null;
  }
};

// ── Single Problem Block ────────────────────────────────

const ProblemBlock = memo(({ problem, index, isLast }) => {
  const [ref, isVisible] = useInView(0.1);
  const [statRef, statVisible] = useInView(0.3);

  const statCount = useCounter(
    problem.painStat.value,
    statVisible,
    1200 + index * 200,
  );

  const isReversed = index % 2 !== 0;
  const accentStyles = getAccentStyles(problem.accent);
  const VisualComponent = VISUAL_MAP[problem.id];
  const visualData = getVisualData(problem);

  return (
    <div
      ref={ref}
      className={`relative ${!isLast ? "mb-20 sm:mb-24 md:mb-32 lg:mb-40" : ""}`}
    >
      {/* Large background number */}
      <div
        className="absolute -top-4 sm:-top-8 select-none pointer-events-none transition-all duration-700"
        style={{
          opacity: isVisible ? 0.035 : 0,
          ...(isReversed ? { right: "-8px" } : { left: "-8px" }),
          fontSize: "clamp(6rem, 15vw, 14rem)",
          fontWeight: 900,
          lineHeight: 1,
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-sans)",
        }}
        aria-hidden="true"
      >
        {problem.number}
      </div>

      {/* Content grid */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center`}
      >
        {/* ── Text Side ── */}
        <div className={isReversed ? "lg:order-2" : "lg:order-1"}>
          {/* Subtitle tag */}
          <div
            className="transition-all duration-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5"
              style={{
                background: accentStyles.tagBg,
                color: accentStyles.tagColor,
                border: `1px solid ${accentStyles.tagBorder}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: accentStyles.dotBg,
                  animation: "oc-pulse-sm 2s ease-in-out infinite",
                }}
              />
              {problem.subtitle}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-5 transition-all duration-600"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-sans)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "100ms",
            }}
          >
            {problem.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 transition-all duration-600"
            style={{
              color: "var(--color-text-muted)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "200ms",
            }}
          >
            {problem.description}
          </p>

          {/* Pain stat */}
          <div
            ref={statRef}
            className="inline-flex items-baseline gap-2 sm:gap-3 transition-all duration-600"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "300ms",
            }}
          >
            <span
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tabular-nums leading-none"
              style={{ color: accentStyles.statColor }}
            >
              {statCount}
              <span className="text-2xl sm:text-3xl">
                {problem.painStat.suffix}
              </span>
            </span>
            <span
              className="text-xs sm:text-sm font-medium max-w-[140px] leading-tight"
              style={{ color: "var(--color-text-light)" }}
            >
              {problem.painStat.label}
            </span>
          </div>
        </div>

        {/* ── Visual Side ── */}
        <div
          className={`${isReversed ? "lg:order-1" : "lg:order-2"} transition-all duration-700`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0) scale(1)"
              : "translateY(16px) scale(0.97)",
            transitionDelay: "250ms",
          }}
        >
          <div
            className="relative p-4 sm:p-5 md:p-6 rounded-2xl overflow-hidden border border-secondary-200 dark:border-dark-border"
            style={{
              background: "var(--color-surface-50)",
              boxShadow:
                "0 12px 40px -8px rgba(0,0,0,0.06), 0 4px 16px -4px rgba(0,0,0,0.03)",
            }}
          >
            {/* Subtle accent glow in corner */}
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none blur-3xl"
              style={{
                background: accentStyles.glowBg,
                opacity: 0.4,
              }}
              aria-hidden="true"
            />

            <div className="relative">
              {VisualComponent && (
                <VisualComponent data={visualData} isVisible={isVisible} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Connector line to next problem */}
      {!isLast && (
        <div className="hidden lg:flex justify-center" aria-hidden="true">
          <div
            className="w-px transition-all duration-700"
            style={{
              height: "80px",
              marginTop: "40px",
              background:
                "linear-gradient(to bottom, var(--color-secondary-300), transparent)",
              opacity: isVisible ? 0.4 : 0,
              transitionDelay: "600ms",
            }}
          />
        </div>
      )}
    </div>
  );
});
ProblemBlock.displayName = "ProblemBlock";

// ── Section Header ──────────────────────────────────────

const SectionHeader = memo(({ isVisible }) => (
  <div className="text-center mb-16 sm:mb-20 md:mb-28">
    {/* Badge */}
    <div
      className="transition-all duration-600"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <span
        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-semibold"
        style={{
          background: "var(--color-error-50)",
          color: "var(--color-error-600)",
          border: "1px solid var(--color-error-200)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        The Real Problem
      </span>
    </div>

    {/* Title */}
    <h2
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6 transition-all duration-700"
      style={{
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-sans)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: "100ms",
      }}
    >
      Creating is the easy part.
      <br />
      <span
        className="text-gradient-primary"
        style={{
          background:
            "linear-gradient(135deg, var(--color-error-500), var(--color-accent-500))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Understanding what works isn't.
      </span>
    </h2>

    {/* Subtitle */}
    <p
      className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-all duration-700"
      style={{
        color: "var(--color-text-muted)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transitionDelay: "200ms",
      }}
    >
      Every creator faces the same three problems. The ones that steal your
      time, kill your confidence, and keep you guessing.
    </p>
  </div>
));
SectionHeader.displayName = "SectionHeader";

// ── Bottom Transition ───────────────────────────────────

const BottomTransition = memo(({ isVisible }) => (
  <div
    className="text-center mt-16 sm:mt-20 md:mt-28 transition-all duration-800"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(16px)",
    }}
  >
    {/* Divider */}
    <div
      className="mx-auto w-20 h-px mb-8 sm:mb-10"
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--color-secondary-300), transparent)",
      }}
    />

    {/* Hook text */}
    <p
      className="text-lg sm:text-xl md:text-2xl font-bold mb-3"
      style={{ color: "var(--color-text-primary)" }}
    >
      What if you could solve all three?
    </p>

    <p
      className="text-sm sm:text-base mb-8"
      style={{ color: "var(--color-text-muted)" }}
    >
      Not with more dashboards. With one AI that actually gets it.
    </p>

    {/* Scroll prompt */}
    <div
      className="inline-flex flex-col items-center gap-2"
      style={{ animation: "oc-float 3s ease-in-out infinite" }}
    >
      <span
        className="text-[10px] sm:text-xs font-semibold uppercase"
        style={{
          letterSpacing: "0.2em",
          color: "var(--color-text-light)",
        }}
      >
        See how
      </span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "var(--color-primary-400)" }}
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  </div>
));
BottomTransition.displayName = "BottomTransition";

// ── Background ──────────────────────────────────────────

const SectionBackground = memo(() => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    {/* Primary gradient orb */}
    <div
      className="absolute rounded-full"
      style={{
        width: "500px",
        height: "500px",
        background: "var(--color-primary-100)",
        opacity: 0.05,
        top: "-5%",
        right: "-10%",
        filter: "blur(140px)",
      }}
    />

    {/* Accent gradient orb */}
    <div
      className="absolute rounded-full"
      style={{
        width: "400px",
        height: "400px",
        background: "var(--color-accent-100)",
        opacity: 0.04,
        bottom: "10%",
        left: "-8%",
        filter: "blur(140px)",
      }}
    />

    {/* Dot grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-secondary-400) 0.5px, transparent 0.5px)",
        backgroundSize: "40px 40px",
        opacity: 0.08,
      }}
    />
  </div>
));
SectionBackground.displayName = "SectionBackground";

// ── MAIN COMPONENT ──────────────────────────────────────

const Problems = () => {
  const [headerRef, headerVisible] = useInView(0.15);
  const [bottomRef, bottomVisible] = useInView(0.2);

  return (
    <section
      id="problems"
      className="relative py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-6 overflow-hidden"
      style={{ background: "var(--color-secondary-100)" }}
      aria-labelledby="problems-heading"
    >
      <SectionBackground />

      <div className="relative max-w-6xl mx-auto">
        {/* Screen reader heading */}
        <h2 className="sr-only" id="problems-heading">
          The problems every creator faces
        </h2>

        {/* Section header */}
        <div ref={headerRef}>
          <SectionHeader isVisible={headerVisible} />
        </div>

        {/* Problem blocks */}
        <div>
          {PROBLEMS.map((problem, i) => (
            <ProblemBlock
              key={problem.id}
              problem={problem}
              index={i}
              isLast={i === PROBLEMS.length - 1}
            />
          ))}
        </div>

        {/* Bottom transition */}
        <div ref={bottomRef}>
          <BottomTransition isVisible={bottomVisible} />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes oc-pulse-sm {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        @keyframes oc-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
};

export default memo(Problems);

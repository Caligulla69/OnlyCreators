import React, { useState, useEffect, useRef, useMemo, memo } from "react";

// ============================================
// ONLY CREATORS — TURNING POINT SECTION
// Curtain Reveal Dashboard | Warm Accent Palette
// Fully Responsive | Theme-Integrated
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

const useCurtainReveal = (isInView, delay = 600) => {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!isInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [isInView, delay]);
  return revealed;
};

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

// ── Icons ──────────────────────────────────────────────

const YoutubeIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
    <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white" />
  </svg>
));
YoutubeIcon.displayName = "YoutubeIcon";

const InstagramIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
));
InstagramIcon.displayName = "InstagramIcon";

const TikTokIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
));
TikTokIcon.displayName = "TikTokIcon";

const TrendingUpIcon = memo(() => (
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
    <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />
  </svg>
));
TrendingUpIcon.displayName = "TrendingUpIcon";

const UsersIcon = memo(() => (
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
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
));
UsersIcon.displayName = "UsersIcon";

const MessageIcon = memo(() => (
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
));
MessageIcon.displayName = "MessageIcon";

const DollarIcon = memo(() => (
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
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
));
DollarIcon.displayName = "DollarIcon";

const CheckIcon = memo(() => (
  <svg
    width="10"
    height="10"
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

const ZapIcon = memo(() => (
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
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
));
ZapIcon.displayName = "ZapIcon";

const EyeIcon = memo(() => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
));
EyeIcon.displayName = "EyeIcon";

// ── Static Data ────────────────────────────────────────

const STATS_DATA = Object.freeze([
  {
    label: "Total Reach",
    numericTarget: 124,
    icon: TrendingUpIcon,
    accentColor: "var(--color-accent-500)",
    accentBg: "var(--color-accent-50)",
    accentBorder: "var(--color-accent-200)",
  },
  {
    label: "Engagement",
    numericTarget: 847,
    icon: MessageIcon,
    accentColor: "var(--color-warning-500)",
    accentBg: "var(--color-warning-50)",
    accentBorder: "var(--color-warning-200)",
  },
  {
    label: "Followers",
    numericTarget: 152,
    icon: UsersIcon,
    accentColor: "var(--color-primary-500)",
    accentBg: "var(--color-primary-50)",
    accentBorder: "var(--color-primary-200)",
  },
  {
    label: "Revenue",
    numericTarget: 84,
    icon: DollarIcon,
    accentColor: "var(--color-success-500)",
    accentBg: "var(--color-success-50)",
    accentBorder: "var(--color-success-200)",
  },
]);

const CHART_BARS = Object.freeze([
  35, 55, 42, 78, 52, 88, 65, 95, 72, 85, 68, 100,
]);

const MONTHS = Object.freeze([
  "J",
  "F",
  "M",
  "A",
  "M",
  "J",
  "J",
  "A",
  "S",
  "O",
  "N",
  "D",
]);
const MONTHS_FULL = Object.freeze([
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]);

const INSIGHTS = Object.freeze([
  { Icon: ZapIcon, text: "Best: 7 PM", accent: "accent" },
  { Icon: EyeIcon, text: "Peak: Tuesday", accent: "warning" },
  { Icon: TrendingUpIcon, text: "Trending: Tutorials", accent: "primary" },
]);

const FEATURE_TAGS = Object.freeze([
  { text: "Real-time Sync", delay: 800 },
  { text: "AI Insights", delay: 900 },
  { text: "Cross-platform", delay: 1000 },
]);

const PLATFORMS = Object.freeze([
  { Icon: YoutubeIcon, isActive: true, bg: "#dc2626", delay: 150 },
  { Icon: InstagramIcon, isActive: false, bg: "#e1306c", delay: 200 },
  { Icon: TikTokIcon, isActive: false, bg: null, delay: 250 },
]);

// ── Background ─────────────────────────────────────────

const BackgroundEffects = memo(() => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(250px, 40vw, 500px)",
        height: "clamp(250px, 40vw, 500px)",
        background: "var(--color-accent-100)",
        opacity: 0.12,
        top: "10%",
        left: "10%",
        filter: "blur(120px)",
        animation: "oc-tp-float 12s ease-in-out infinite",
      }}
    />
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(200px, 35vw, 400px)",
        height: "clamp(200px, 35vw, 400px)",
        background: "var(--color-warning-100)",
        opacity: 0.08,
        bottom: "15%",
        right: "15%",
        filter: "blur(120px)",
        animation: "oc-tp-float 14s ease-in-out infinite reverse",
      }}
    />
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: "clamp(400px, 60vw, 800px)",
        height: "clamp(400px, 60vw, 800px)",
        background:
          "radial-gradient(circle, var(--color-accent-50), transparent 70%)",
        opacity: 0.3,
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
BackgroundEffects.displayName = "BackgroundEffects";

// ── Section Header ─────────────────────────────────────

const SectionHeader = memo(({ isVisible }) => (
  <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
    {/* Badge */}
    <div className="overflow-hidden mb-4 sm:mb-6">
      <div
        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-500"
        style={{
          background: "var(--color-accent-50)",
          border: "1px solid var(--color-accent-200)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
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
        <span
          className="text-xs sm:text-sm font-semibold tracking-wide"
          style={{ color: "var(--color-accent-700)" }}
        >
          The Turning Point
        </span>
      </div>
    </div>

    {/* Title line 1 */}
    <div className="overflow-hidden">
      <h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] mb-1 sm:mb-2 md:mb-3 transition-transform duration-700"
        style={{
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-sans)",
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          transitionDelay: "100ms",
        }}
      >
        See
      </h2>
    </div>

    {/* Title line 2 — gradient */}
    <div className="overflow-hidden">
      <p
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold italic leading-[0.95] transition-transform duration-700"
        style={{
          fontFamily: "var(--font-serif, Georgia, serif)",
          background:
            "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          transitionDelay: "200ms",
        }}
        aria-hidden="true"
      >
        Everything
      </p>
    </div>

    {/* Decorative underline */}
    <div className="flex justify-center mt-3 sm:mt-4 md:mt-5">
      <svg
        className="w-28 sm:w-36 md:w-48 lg:w-56 h-2 sm:h-3 transition-all duration-700 origin-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transitionDelay: "400ms",
        }}
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 6 Q 50 0, 100 6 T 200 6"
          fill="none"
          stroke="url(#tp-underline-grad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="tp-underline-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="var(--color-accent-500)" />
            <stop offset="50%" stopColor="var(--color-warning-400)" />
            <stop offset="100%" stopColor="var(--color-error-400)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
));
SectionHeader.displayName = "SectionHeader";

// ── Platform Button ────────────────────────────────────

const PlatformButton = memo(({ Icon, isActive, bg, delay, isVisible }) => (
  <button
    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-400 ease-out outline-none focus-visible:ring-2"
    style={{
      background: isActive
        ? bg || "var(--color-text-primary)"
        : "var(--color-surface-50)",
      color: isActive ? "#fff" : "var(--color-text-muted)",
      border: isActive ? "none" : "1px solid var(--color-secondary-200)",
      boxShadow: isActive
        ? `0 4px 12px -2px ${bg || "rgba(0,0,0,0.2)"}40`
        : "none",
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? "translateY(0) scale(1)"
        : "translateY(6px) scale(0.9)",
      transitionDelay: `${delay}ms`,
      outlineColor: "var(--color-accent-500)",
    }}
    aria-label={isActive ? "Active platform" : "Switch platform"}
    aria-pressed={isActive}
  >
    <Icon />
  </button>
));
PlatformButton.displayName = "PlatformButton";

// ── Sync Badge ─────────────────────────────────────────

const SyncBadge = memo(({ isVisible }) => (
  <div
    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full transition-all duration-400"
    style={{
      background: "var(--color-success-50)",
      border: "1px solid var(--color-success-200)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : "translateX(12px)",
      transitionDelay: "300ms",
    }}
    role="status"
    aria-live="polite"
  >
    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{
          background: "var(--color-success-400)",
          animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
        }}
      />
      <span
        className="relative inline-flex rounded-full h-full w-full"
        style={{ background: "var(--color-success-500)" }}
      />
    </span>
    <span
      className="text-[10px] sm:text-xs md:text-sm font-semibold"
      style={{ color: "var(--color-success-700)" }}
    >
      All Synced
    </span>
  </div>
));
SyncBadge.displayName = "SyncBadge";

// ── Stat Card ──────────────────────────────────────────

const StatCard = memo(({ stat, index, isVisible }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = stat.icon;
  const count = useCounter(stat.numericTarget, isVisible, 1200 + index * 200);

  const displayValue = useMemo(() => {
    if (stat.label === "Total Reach") return `${(count / 10).toFixed(1)}M`;
    if (stat.label === "Revenue") return `$${(count / 10).toFixed(1)}K`;
    return `${count}K`;
  }, [count, stat.label]);

  return (
    <div
      className="group relative rounded-xl p-2.5 sm:p-3 md:p-4 transition-all duration-500 cursor-default select-none"
      style={{
        background: "var(--color-surface-50)",
        border: `1px solid ${hovered ? stat.accentBorder : "var(--color-secondary-200)"}`,
        boxShadow: hovered
          ? `0 8px 24px -4px color-mix(in srgb, ${stat.accentColor} 15%, transparent)`
          : "0 2px 8px -2px rgba(0,0,0,0.03)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? hovered
            ? "translateY(-2px)"
            : "translateY(0)"
          : "translateY(12px)",
        transitionDelay: `${250 + index * 80}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="article"
      aria-label={`${stat.label}: ${displayValue}`}
    >
      <div className="relative">
        {/* Icon */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl flex items-center justify-center mb-1.5 sm:mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
          style={{
            background: stat.accentBg,
            border: `1px solid ${stat.accentBorder}`,
            color: stat.accentColor,
          }}
        >
          <Icon />
        </div>

        {/* Value */}
        <div
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tabular-nums leading-none"
          style={{ color: stat.accentColor }}
        >
          {displayValue}
        </div>

        {/* Label */}
        <div
          className="text-[9px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 font-medium"
          style={{ color: "var(--color-text-light)" }}
        >
          {stat.label}
        </div>
      </div>
    </div>
  );
});
StatCard.displayName = "StatCard";

// ── Chart Bar ──────────────────────────────────────────

const ChartBar = memo(({ height, index, isVisible }) => {
  const tooltipValue = useMemo(() => Math.round(height * 1.2), [height]);

  return (
    <div
      className="flex-1 min-w-0 rounded-t-[2px] sm:rounded-t relative group cursor-pointer transition-all duration-600 ease-out"
      style={{
        height: isVisible ? `${height}%` : "0%",
        background:
          "linear-gradient(to top, var(--color-accent-600), var(--color-accent-400))",
        transitionDelay: `${500 + index * 35}ms`,
      }}
      role="img"
      aria-label={`${MONTHS_FULL[index]}: ${tooltipValue}K`}
    >
      {/* Tooltip — hidden on very small screens */}
      <div
        className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[8px] sm:text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 hidden sm:block"
        style={{
          background: "var(--color-text-primary)",
          color: "var(--color-surface-50)",
        }}
        role="tooltip"
      >
        {tooltipValue}K
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 border-[3px] sm:border-4 border-transparent"
          style={{ borderTopColor: "var(--color-text-primary)" }}
        />
      </div>

      {/* Hover highlight */}
      <div
        className="absolute inset-0 rounded-t-[2px] sm:rounded-t opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: "rgba(255,255,255,0.2)" }}
      />
    </div>
  );
});
ChartBar.displayName = "ChartBar";

// ── Insight Item ───────────────────────────────────────

const InsightItem = memo(({ insight, index, isVisible }) => {
  const { Icon, text, accent } = insight;
  const colorMap = {
    primary: "var(--color-primary-600)",
    accent: "var(--color-accent-600)",
    warning: "var(--color-warning-600)",
  };

  return (
    <div
      className="flex items-center gap-1 sm:gap-1.5 transition-all duration-400"
      style={{
        color: colorMap[accent],
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(6px)",
        transitionDelay: `${700 + index * 80}ms`,
      }}
    >
      <Icon />
      <span className="text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">
        {text}
      </span>
    </div>
  );
});
InsightItem.displayName = "InsightItem";

// ── Dashboard Header ───────────────────────────────────

const DashboardHeader = memo(({ isVisible }) => (
  <div
    className="px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4"
    style={{
      borderBottom: "1px solid var(--color-secondary-200)",
      background:
        "color-mix(in srgb, var(--color-surface-50) 80%, transparent)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    }}
  >
    <div className="flex items-center justify-between gap-2">
      <div
        className="flex items-center gap-1.5 sm:gap-2"
        role="group"
        aria-label="Platform selection"
      >
        {PLATFORMS.map((p, i) => (
          <PlatformButton
            key={i}
            Icon={p.Icon}
            isActive={p.isActive}
            bg={p.bg}
            delay={p.delay}
            isVisible={isVisible}
          />
        ))}
      </div>
      <SyncBadge isVisible={isVisible} />
    </div>
  </div>
));
DashboardHeader.displayName = "DashboardHeader";

// ── Growth Chart ───────────────────────────────────────

const GrowthChart = memo(({ isVisible }) => (
  <div
    className="h-full rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 lg:p-5"
    style={{
      background: "var(--color-surface-50)",
      border: "1px solid var(--color-secondary-200)",
      boxShadow: "0 2px 8px -2px rgba(0,0,0,0.03)",
    }}
  >
    {/* Header */}
    <div className="flex items-start sm:items-center justify-between gap-2 mb-2 sm:mb-3 md:mb-4">
      <div
        className="transition-all duration-400 min-w-0"
        style={{ opacity: isVisible ? 1 : 0, transitionDelay: "400ms" }}
      >
        <h4
          className="text-[11px] sm:text-xs md:text-sm font-bold truncate"
          style={{ color: "var(--color-text-primary)" }}
        >
          Growth Overview
        </h4>
        <p
          className="text-[9px] sm:text-[10px] md:text-xs mt-0.5 truncate"
          style={{ color: "var(--color-text-light)" }}
        >
          All platforms
        </p>
      </div>

      <div
        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg shrink-0 transition-all duration-400"
        style={{
          background: "var(--color-accent-50)",
          border: "1px solid var(--color-accent-200)",
          color: "var(--color-accent-600)",
          opacity: isVisible ? 1 : 0,
          transitionDelay: "450ms",
        }}
      >
        <ZapIcon />
        <span className="text-[9px] sm:text-[10px] md:text-xs font-bold whitespace-nowrap">
          +24%
        </span>
      </div>
    </div>

    {/* Bars */}
    <div
      className="flex items-end justify-between gap-[2px] sm:gap-1 md:gap-1.5"
      style={{ height: "clamp(48px, 12vw, 160px)" }}
      role="img"
      aria-label="Monthly growth chart"
    >
      {CHART_BARS.map((h, i) => (
        <ChartBar key={i} height={h} index={i} isVisible={isVisible} />
      ))}
    </div>

    {/* Month labels */}
    <div className="flex justify-between mt-1 sm:mt-2 md:mt-3">
      {MONTHS.map((m, i) => (
        <span
          key={m + i}
          className="flex-1 text-center text-[7px] sm:text-[8px] md:text-[10px] font-medium transition-all duration-400"
          style={{
            color: "var(--color-text-light)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${600 + i * 20}ms`,
          }}
        >
          {m}
        </span>
      ))}
    </div>

    {/* Insights — wrap on small, row on medium+ */}
    <div
      className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3 pt-2 sm:pt-3"
      style={{ borderTop: "1px solid var(--color-secondary-200)" }}
    >
      {INSIGHTS.map((ins, i) => (
        <InsightItem
          key={ins.text}
          insight={ins}
          index={i}
          isVisible={isVisible}
        />
      ))}
    </div>
  </div>
));
GrowthChart.displayName = "GrowthChart";

// ── Dashboard Content ──────────────────────────────────

const DashboardContent = memo(({ isVisible }) => (
  <div
    className="h-full flex flex-col"
    style={{
      background:
        "linear-gradient(135deg, var(--color-secondary-50), var(--color-surface-50), var(--color-accent-50))",
    }}
  >
    <DashboardHeader isVisible={isVisible} />

    {/* Stats — always 2×2 grid */}
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 lg:py-5">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
        {STATS_DATA.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} isVisible={isVisible} />
        ))}
      </div>
    </div>

    {/* Chart — fills remaining space */}
    <div className="flex-1 min-h-0 px-3 sm:px-4 md:px-6 lg:px-8 pb-2.5 sm:pb-3 md:pb-4 lg:pb-5">
      <GrowthChart isVisible={isVisible} />
    </div>
  </div>
));
DashboardContent.displayName = "DashboardContent";

// ── Curtain Panel ──────────────────────────────────────

const CurtainPanel = memo(({ side, revealed }) => {
  const isLeft = side === "left";

  return (
    <div
      className="absolute top-0 w-1/2 h-full z-10"
      style={{
        [isLeft ? "left" : "right"]: 0,
        transform: revealed
          ? isLeft
            ? "translateX(-100%)"
            : "translateX(100%)"
          : "translateX(0)",
        transition: "transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)",
      }}
      aria-hidden="true"
    >
      {/* Curtain body */}
      <div
        className="absolute inset-0"
        style={{
          background: isLeft
            ? "linear-gradient(to right, var(--color-secondary-100), var(--color-secondary-100), var(--color-accent-50))"
            : "linear-gradient(to left, var(--color-secondary-100), var(--color-secondary-100), var(--color-accent-50))",
        }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-secondary-400) 0.5px, transparent 0.5px)",
          backgroundSize: "16px 16px",
          opacity: 0.06,
        }}
      />

      {/* Edge glow */}
      <div
        className="absolute top-0 h-full w-[2px]"
        style={{
          [isLeft ? "right" : "left"]: 0,
          background:
            "linear-gradient(to bottom, transparent, var(--color-accent-400), transparent)",
        }}
      />

      {/* Edge shimmer */}
      <div
        className="absolute top-0 h-full w-4 sm:w-6 md:w-8"
        style={{
          [isLeft ? "right" : "left"]: 0,
          background: isLeft
            ? "linear-gradient(to left, var(--color-accent-200), transparent)"
            : "linear-gradient(to right, var(--color-accent-200), transparent)",
          opacity: 0.3,
        }}
      />
    </div>
  );
});
CurtainPanel.displayName = "CurtainPanel";

// ── Center Reveal Line ─────────────────────────────────

const CenterRevealLine = memo(({ revealed }) => (
  <div
    className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
    style={{ opacity: revealed ? 0 : 1 }}
    aria-hidden="true"
  >
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] sm:w-[3px] h-full"
      style={{
        background:
          "linear-gradient(to bottom, transparent, var(--color-accent-500), transparent)",
      }}
    />
    {Array.from({ length: 6 }, (_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
        style={{
          left: `${48 + (i % 2) * 4}%`,
          top: `${10 + i * 14}%`,
          background:
            "linear-gradient(135deg, var(--color-accent-400), var(--color-warning-400))",
          animation: `ping 1.5s cubic-bezier(0,0,0.2,1) infinite ${i * 120}ms`,
        }}
      />
    ))}
  </div>
));
CenterRevealLine.displayName = "CenterRevealLine";

// ── Dashboard Container ────────────────────────────────

const DashboardContainer = memo(({ revealed }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      style={{ height: "clamp(480px, 50vw, 600px)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow ring */}
      <div
        className="absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-2xl sm:rounded-[1.75rem] md:rounded-[2rem] transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-400) 20%, transparent), color-mix(in srgb, var(--color-warning-400) 15%, transparent))",
          filter: "blur(24px)",
          opacity: revealed ? (isHovered ? 1 : 0.6) : 0,
        }}
        aria-hidden="true"
      />

      {/* Main container */}
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-[1.5rem] overflow-hidden transition-all duration-500"
        style={{
          border: `1px solid ${isHovered ? "var(--color-accent-200)" : "var(--color-secondary-200)"}`,
          boxShadow: isHovered
            ? "0 30px 70px -15px rgba(0,0,0,0.1), 0 15px 35px -10px rgba(0,0,0,0.05)"
            : "0 25px 60px -12px rgba(0,0,0,0.07), 0 12px 28px -8px rgba(0,0,0,0.04)",
        }}
      >
        {/* Dashboard */}
        <div className="absolute inset-0">
          <DashboardContent isVisible={revealed} />
        </div>

        {/* Curtains */}
        <CurtainPanel side="left" revealed={revealed} />
        <CurtainPanel side="right" revealed={revealed} />

        {/* Center line */}
        <CenterRevealLine revealed={revealed} />
      </div>
    </div>
  );
});
DashboardContainer.displayName = "DashboardContainer";

// ── Feature Tag ────────────────────────────────────────

const FeatureTag = memo(({ text, delay, isVisible }) => (
  <span
    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs md:text-sm cursor-default select-none transition-all duration-400"
    style={{
      background: "var(--color-surface-50)",
      color: "var(--color-text-secondary)",
      border: "1px solid var(--color-secondary-200)",
      boxShadow: "0 2px 6px -2px rgba(0,0,0,0.04)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(6px)",
      transitionDelay: `${delay}ms`,
    }}
  >
    <span
      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, var(--color-success-400), var(--color-success-500))",
        color: "#fff",
      }}
    >
      <CheckIcon />
    </span>
    {text}
  </span>
));
FeatureTag.displayName = "FeatureTag";

// ── Caption Section ────────────────────────────────────

const CaptionSection = memo(({ revealed }) => (
  <div
    className="text-center mt-6 sm:mt-8 md:mt-12 lg:mt-14 transition-all duration-700"
    style={{
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateY(0)" : "translateY(12px)",
      transitionDelay: "600ms",
    }}
  >
    <p
      className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6"
      style={{ color: "var(--color-text-muted)" }}
    >
      One dashboard. Three platforms.{" "}
      <span style={{ color: "var(--color-text-primary)", fontWeight: 700 }}>
        Infinite clarity.
      </span>
    </p>

    <div
      className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3"
      role="list"
      aria-label="Key features"
    >
      {FEATURE_TAGS.map((tag) => (
        <FeatureTag
          key={tag.text}
          text={tag.text}
          delay={tag.delay}
          isVisible={revealed}
        />
      ))}
    </div>
  </div>
));
CaptionSection.displayName = "CaptionSection";

// ── MAIN COMPONENT ─────────────────────────────────────

const TurningPoint = () => {
  const [sectionRef, isInView] = useInView(0.1);
  const revealed = useCurtainReveal(isInView, 600);

  return (
    <section
      ref={sectionRef}
      id="turning-point"
      className="relative py-16 sm:py-20 md:py-28 lg:py-36 xl:py-44 px-4 sm:px-6 overflow-hidden"
      style={{ background: "var(--color-secondary-100)" }}
      aria-labelledby="turning-point-heading"
    >
      <BackgroundEffects />

      <div className="relative max-w-6xl mx-auto z-10">
        <h2 id="turning-point-heading" className="sr-only">
          See Everything — The Turning Point
        </h2>

        <SectionHeader isVisible={isInView} />
        <DashboardContainer revealed={revealed} />
        <CaptionSection revealed={revealed} />
      </div>

      <style>{`
        @keyframes oc-tp-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -15px) scale(1.02); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default memo(TurningPoint);

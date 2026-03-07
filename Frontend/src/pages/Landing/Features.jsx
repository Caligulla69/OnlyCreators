import React, { useState, useEffect, useRef, useCallback, memo } from "react";

// ============================================
// ONLY CREATORS — AI CONTENT ANALYZER
// 3D Card Carousel | Theme-Integrated | Premium Feel
// ============================================

// Memoized Icon Components
const GlobeIcon = memo(() => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
));
GlobeIcon.displayName = "GlobeIcon";

const BrainIcon = memo(() => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
));
BrainIcon.displayName = "BrainIcon";

const TrendingIcon = memo(() => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />
  </svg>
));
TrendingIcon.displayName = "TrendingIcon";

const UsersIcon = memo(() => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
));
UsersIcon.displayName = "UsersIcon";

const LightbulbIcon = memo(() => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
  </svg>
));
LightbulbIcon.displayName = "LightbulbIcon";

const ChevronLeftIcon = memo(() => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
));
ChevronLeftIcon.displayName = "ChevronLeftIcon";

const ChevronRightIcon = memo(() => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
));
ChevronRightIcon.displayName = "ChevronRightIcon";

const CheckIcon = memo(() => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
));
CheckIcon.displayName = "CheckIcon";

const PlayIcon = memo(() => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
));
PlayIcon.displayName = "PlayIcon";

const PauseIcon = memo(() => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
));
PauseIcon.displayName = "PauseIcon";

// Platform Icons
const YoutubeSmallIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
  </svg>
));
YoutubeSmallIcon.displayName = "YoutubeSmallIcon";

const InstagramSmallIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
  </svg>
));
InstagramSmallIcon.displayName = "InstagramSmallIcon";

const TikTokSmallIcon = memo(() => (
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
TikTokSmallIcon.displayName = "TikTokSmallIcon";

// Feature configurations using theme colors
const FEATURES = Object.freeze([
  {
    id: 1,
    Icon: GlobeIcon,
    title: "Unified Dashboard",
    subtitle: "All platforms, one view",
    description:
      "Connect YouTube, Instagram, TikTok and more. See everything in a single, beautiful command center.",
    metric: "5h+",
    metricLabel: "saved weekly",
    accentColor: "var(--color-primary-500)",
    accentColorLight: "var(--color-primary-100)",
    accentColorDark: "var(--color-primary-800)",
    glowColor: "rgba(42, 98, 117, 0.35)",
    visualType: "platforms",
    tags: ["Multi-Platform", "Real-time Sync"],
  },
  {
    id: 2,
    Icon: BrainIcon,
    title: "AI Content Analyzer",
    subtitle: "Deep learning analytics",
    description:
      "Our AI dissects every piece of content — sentiment, virality potential, and audience resonance scored instantly.",
    metric: "10x",
    metricLabel: "deeper analysis",
    accentColor: "var(--color-accent-500)",
    accentColorLight: "var(--color-accent-100)",
    accentColorDark: "var(--color-accent-800)",
    glowColor: "rgba(196, 143, 42, 0.35)",
    visualType: "ai",
    tags: ["Machine Learning", "NLP"],
  },
  {
    id: 3,
    Icon: TrendingIcon,
    title: "Trend Detection",
    subtitle: "Stay ahead of the curve",
    description:
      "Spot emerging trends 72 hours before they peak. Get actionable alerts so you never miss a wave.",
    metric: "72h",
    metricLabel: "early warning",
    accentColor: "var(--color-warning-500)",
    accentColorLight: "var(--color-warning-100)",
    accentColorDark: "var(--color-warning-800)",
    glowColor: "rgba(214, 135, 28, 0.35)",
    visualType: "trends",
    tags: ["Predictive", "Alerts"],
  },
  {
    id: 4,
    Icon: UsersIcon,
    title: "Audience Intelligence",
    subtitle: "Know your community",
    description:
      "Understand demographics, peak activity times, and sentiment shifts across your entire audience.",
    metric: "360°",
    metricLabel: "visibility",
    accentColor: "var(--color-success-500)",
    accentColorLight: "var(--color-success-100)",
    accentColorDark: "var(--color-success-800)",
    glowColor: "rgba(58, 122, 74, 0.35)",
    visualType: "audience",
    tags: ["Demographics", "Behavior"],
  },
  {
    id: 5,
    Icon: LightbulbIcon,
    title: "Smart Suggestions",
    subtitle: "AI-powered recommendations",
    description:
      "Get personalized content ideas, optimal posting times, and format recommendations backed by data.",
    metric: "87%",
    metricLabel: "success rate",
    accentColor: "var(--color-error-500)",
    accentColorLight: "var(--color-error-100)",
    accentColorDark: "var(--color-error-800)",
    glowColor: "rgba(212, 69, 69, 0.30)",
    visualType: "recommendations",
    tags: ["Personalized", "Data-Driven"],
  },
]);

// Custom hooks
const useIntersectionObserver = (threshold = 0.15) => {
  const ref = useRef(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [isInView, setIsInView] = useState(prefersReducedMotion);

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "50px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, isInView]);

  return [ref, isInView];
};

const useMediaQuery = (query) => {
  const subscribe = useCallback(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

// ============================================
// VISUAL PREVIEW COMPONENTS
// ============================================

const PlatformsVisual = memo(({ isActive }) => (
  <div className="relative h-full flex items-center justify-center">
    <div className="relative">
      {/* Central hub glow */}
      <div
        className="absolute inset-0 rounded-2xl blur-2xl transition-all duration-700"
        style={{
          background: "var(--color-primary-400)",
          opacity: isActive ? 0.3 : 0,
          transform: isActive ? "scale(1.5)" : "scale(0.8)",
        }}
      />
      {/* Central hub */}
      <div
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, var(--color-primary-400), var(--color-primary-700))`,
          transform: isActive
            ? "scale(1) rotate(0deg)"
            : "scale(0.85) rotate(12deg)",
          color: "var(--color-secondary-50)",
        }}
      >
        <GlobeIcon />
      </div>
    </div>

    {/* Orbiting platforms */}
    {[
      {
        Icon: YoutubeSmallIcon,
        bg: "#dc2626",
        angle: -40,
        radius: 72,
        delay: 0,
      },
      {
        Icon: InstagramSmallIcon,
        bg: "#e1306c",
        angle: 80,
        radius: 78,
        delay: 120,
      },
      {
        Icon: TikTokSmallIcon,
        bg: "var(--color-dark-surface)",
        angle: 200,
        radius: 72,
        delay: 240,
      },
    ].map(({ Icon: PlatformIcon, bg, angle, radius, delay }, i) => {
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;
      return (
        <div
          key={i}
          className="absolute w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all duration-600"
          style={{
            background: bg,
            color: "#fff",
            transform: isActive
              ? `translate(${x}px, ${y}px) scale(1)`
              : `translate(${x * 0.3}px, ${y * 0.3}px) scale(0)`,
            opacity: isActive ? 1 : 0,
            transitionDelay: `${delay}ms`,
          }}
        >
          <PlatformIcon />
        </div>
      );
    })}

    {/* Connection lines — rendered as absolutely positioned divs since SVG attributes don't support calc() */}
    {isActive &&
      [-40, 80, 200].map((angle, i) => {
        const endX = Math.cos((angle * Math.PI) / 180) * 56;
        const endY = Math.sin((angle * Math.PI) / 180) * 56;
        const length = Math.sqrt(endX * endX + endY * endY);
        const rotation = Math.atan2(endY, endX) * (180 / Math.PI);
        return (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              width: `${length}px`,
              height: "1.5px",
              transformOrigin: "0 50%",
              transform: `rotate(${rotation}deg)`,
              background: `repeating-linear-gradient(90deg, var(--color-primary-300) 0px, var(--color-primary-300) 3px, transparent 3px, transparent 8px)`,
              opacity: 0.5,
              animation: `oc-dash-shift 2s linear infinite ${i * 0.3}s`,
            }}
          />
        );
      })}
  </div>
));
PlatformsVisual.displayName = "PlatformsVisual";

const AIVisual = memo(({ isActive }) => {
  const bars = [
    { label: "Sentiment", value: 92, color: "var(--color-success-500)" },
    { label: "Virality", value: 78, color: "var(--color-accent-500)" },
    { label: "Relevance", value: 85, color: "var(--color-primary-500)" },
  ];

  return (
    <div className="relative h-full flex flex-col justify-center gap-4 px-1">
      {bars.map((item, i) => (
        <div
          key={item.label}
          className="flex items-center gap-3 transition-all duration-500"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0)" : "translateX(-16px)",
            transitionDelay: `${i * 130}ms`,
          }}
        >
          <span
            className="w-[72px] text-[11px] text-right font-semibold tracking-wide uppercase"
            style={{ color: "var(--color-text-muted)" }}
          >
            {item.label}
          </span>
          <div
            className="flex-1 h-3 rounded-full overflow-hidden"
            style={{ background: "var(--color-surface-300)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out relative"
              style={{
                width: isActive ? `${item.value}%` : "0%",
                background: item.color,
                transitionDelay: `${i * 130 + 200}ms`,
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  animation: "oc-shimmer 2s infinite",
                }}
              />
            </div>
          </div>
          <span
            className="w-10 text-sm font-bold tabular-nums transition-all duration-500"
            style={{
              color: item.color,
              opacity: isActive ? 1 : 0,
              transitionDelay: `${i * 130 + 500}ms`,
            }}
          >
            {item.value}%
          </span>
        </div>
      ))}

      {/* AI Active indicator */}
      <div
        className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-500"
        style={{
          background: "var(--color-accent-100)",
          color: "var(--color-accent-700)",
          border: "1px solid var(--color-accent-200)",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scale(1)" : "scale(0.5)",
          transitionDelay: "500ms",
        }}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{
              background: "var(--color-accent-500)",
              animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: "var(--color-accent-600)" }}
          />
        </span>
        AI Active
      </div>
    </div>
  );
});
AIVisual.displayName = "AIVisual";

const TrendsVisual = memo(({ isActive }) => {
  const bars = [18, 25, 20, 32, 42, 60, 80, 95];

  return (
    <div className="relative h-full flex items-end justify-center gap-2 pb-10 px-2">
      {bars.map((height, i) => {
        const isHot = i >= 5;
        return (
          <div
            key={i}
            className="flex-1 flex flex-col items-center"
            style={{ height: "100%" }}
          >
            <div className="flex-1" />
            <div
              className="w-full rounded-lg transition-all duration-700 ease-out relative"
              style={{
                height: isActive ? `${height}%` : "6px",
                background: isHot
                  ? `linear-gradient(to top, var(--color-warning-600), var(--color-accent-400))`
                  : "var(--color-surface-300)",
                boxShadow:
                  isHot && isActive ? "0 0 12px rgba(214,135,28,0.3)" : "none",
                transitionDelay: `${i * 70}ms`,
              }}
            >
              {isHot && isActive && (
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}

      {/* Trend badge */}
      <div
        className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-500"
        style={{
          background: "var(--color-warning-100)",
          color: "var(--color-warning-700)",
          border: "1px solid var(--color-warning-200)",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(-8px)",
          transitionDelay: "500ms",
        }}
      >
        <TrendingIcon />
        +47%
      </div>

      {/* Time axis */}
      <div
        className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] font-semibold"
        style={{ color: "var(--color-text-light)" }}
      >
        <span>-72h</span>
        <span style={{ color: "var(--color-warning-500)" }}>Now</span>
      </div>
    </div>
  );
});
TrendsVisual.displayName = "TrendsVisual";

const AudienceVisual = memo(({ isActive }) => {
  const segments = [
    { pct: 35, color: "var(--color-success-500)", label: "18-24" },
    { pct: 45, color: "var(--color-primary-500)", label: "25-34" },
    { pct: 20, color: "var(--color-accent-500)", label: "35+" },
  ];
  const circumference = 2 * Math.PI * 38;

  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="relative w-32 h-32">
        <svg
          viewBox="0 0 100 100"
          className="transform -rotate-90 drop-shadow-md"
        >
          {
            segments.reduce(
              (acc, seg, i) => {
                const dashLen = (seg.pct / 100) * circumference;
                acc.elements.push(
                  <circle
                    key={i}
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    strokeWidth="8"
                    stroke={seg.color}
                    strokeDasharray={
                      isActive ? `${dashLen} ${circumference}` : "0 1000"
                    }
                    strokeDashoffset={-acc.offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                    style={{ transitionDelay: `${i * 200}ms` }}
                  />,
                );
                acc.offset += dashLen;
                return acc;
              },
              { elements: [], offset: 0 },
            ).elements
          }
        </svg>

        {/* Center */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "scale(1)" : "scale(0.7)",
            transitionDelay: "400ms",
          }}
        >
          <span
            className="text-2xl font-bold"
            style={{ color: "var(--color-primary-600)" }}
          >
            152K
          </span>
          <span
            className="text-[10px] font-semibold"
            style={{ color: "var(--color-text-muted)" }}
          >
            followers
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-4">
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            className="flex items-center gap-1.5 transition-all duration-500"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(6px)",
              transitionDelay: `${i * 100 + 500}ms`,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: seg.color }}
            />
            <span
              className="text-[10px] font-semibold"
              style={{ color: "var(--color-text-muted)" }}
            >
              {seg.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
AudienceVisual.displayName = "AudienceVisual";

const RecommendationsVisual = memo(({ isActive }) => {
  const recs = [
    "Post at 7 PM for 2× reach",
    "Use trending audio #viral",
    "Add captions (+40% watch time)",
  ];

  return (
    <div className="relative h-full flex flex-col justify-center gap-3 px-1">
      {recs.map((text, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500"
          style={{
            background: "var(--color-surface-50)",
            border: "1px solid var(--color-surface-300)",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0)" : "translateX(12px)",
            transitionDelay: `${i * 120}ms`,
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md transition-all duration-400"
            style={{
              background: `linear-gradient(135deg, var(--color-success-400), var(--color-success-600))`,
              color: "#fff",
              transform: isActive ? "scale(1)" : "scale(0)",
              transitionDelay: `${i * 120 + 200}ms`,
            }}
          >
            <CheckIcon />
          </div>
          <span
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {text}
          </span>
        </div>
      ))}

      {/* Success badge */}
      <div
        className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-500"
        style={{
          background: "var(--color-success-100)",
          color: "var(--color-success-700)",
          border: "1px solid var(--color-success-200)",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scale(1)" : "scale(0.5)",
          transitionDelay: "500ms",
        }}
      >
        ⚡ 87% success
      </div>
    </div>
  );
});
RecommendationsVisual.displayName = "RecommendationsVisual";

const VISUAL_COMPONENTS = {
  platforms: PlatformsVisual,
  ai: AIVisual,
  trends: TrendsVisual,
  audience: AudienceVisual,
  recommendations: RecommendationsVisual,
};

// ============================================
// FEATURE CARD — Premium 3D Card
// ============================================
const FeatureCard = memo(({ feature, isActive, onClick, style, isMobile }) => {
  const {
    Icon,
    title,
    subtitle,
    description,
    metric,
    metricLabel,
    accentColor,
    accentColorLight,
    accentColorDark,
    glowColor,
    visualType,
    tags,
  } = feature;
  const VisualComponent = VISUAL_COMPONENTS[visualType];

  const cardContent = (
    <>
      {/* Outer glow — only on active */}
      <div
        className="absolute -inset-6 rounded-[2.5rem] blur-3xl transition-all duration-700 pointer-events-none"
        style={{
          background: glowColor,
          opacity: isActive ? 0.5 : 0,
        }}
      />

      {/* Main card body */}
      <div
        className={`oc-feature-card relative h-[400px] sm:h-[440px] lg:h-[480px] rounded-[1.75rem] overflow-hidden transition-all duration-500 ${
          isActive ? "oc-feature-card--active" : ""
        }`}
        style={{
          background: "var(--color-surface-50)",
          border: isActive
            ? `1.5px solid var(--color-primary-300)`
            : "1px solid var(--color-surface-300)",
          boxShadow: isActive
            ? `0 25px 60px -12px ${glowColor}, 0 12px 28px -8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)`
            : "0 8px 24px -4px rgba(0,0,0,0.06), 0 4px 12px -2px rgba(0,0,0,0.04)",
        }}
      >
        {/* Gradient accent strip at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            opacity: isActive ? 1 : 0.3,
          }}
        />

        {/* Card content layout */}
        <div className="relative h-full flex flex-col">
          {/* === TOP: Header Section === */}
          <div className="p-5 sm:p-6 pb-2 flex items-start gap-4">
            {/* Icon container */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColorDark})`,
                color: "var(--color-secondary-50)",
                transform: isActive
                  ? "scale(1) rotate(0deg)"
                  : "scale(0.88) rotate(-8deg)",
                boxShadow: isActive
                  ? `0 8px 20px -4px ${glowColor}`
                  : "0 4px 12px -2px rgba(0,0,0,0.1)",
              }}
            >
              <Icon />
            </div>

            {/* Title & Subtitle */}
            <div className="flex-1 min-w-0">
              <h3
                className="text-base sm:text-lg font-bold leading-tight"
                style={{ color: "var(--color-text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="text-xs font-medium mt-0.5"
                style={{ color: "var(--color-text-muted)" }}
              >
                {subtitle}
              </p>
            </div>

            {/* Metric badge */}
            <div
              className="text-right shrink-0 px-3 py-1.5 rounded-xl transition-all duration-500"
              style={{
                background: "var(--color-surface-200)",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(-6px)",
              }}
            >
              <div
                className="text-xl sm:text-2xl font-extrabold leading-none"
                style={{ color: accentColor }}
              >
                {metric}
              </div>
              <div
                className="text-[9px] font-semibold uppercase tracking-wider mt-0.5"
                style={{ color: "var(--color-text-light)" }}
              >
                {metricLabel}
              </div>
            </div>
          </div>

          {/* === MIDDLE: Visual Section === */}
          <div className="oc-feature-visual flex-1 relative mx-5 sm:mx-6 rounded-2xl overflow-hidden">
            <VisualComponent isActive={isActive} />
          </div>

          {/* === BOTTOM: Description + Tags === */}
          <div className="p-5 sm:p-6 pt-3">
            <p
              className="text-xs sm:text-sm leading-relaxed line-clamp-2 transition-all duration-500"
              style={{
                color: "var(--color-text-muted)",
                opacity: isActive ? 1 : 0.6,
              }}
            >
              {description}
            </p>

            {/* Tags */}
            <div className="flex items-center gap-2 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-500"
                  style={{
                    background: accentColorLight,
                    color: accentColorDark,
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {tag}
                </span>
              ))}

              {/* Card number */}
              <div className="ml-auto">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-500"
                  style={{
                    background: isActive
                      ? accentColor
                      : "var(--color-surface-300)",
                    color: isActive
                      ? "var(--color-secondary-50)"
                      : "var(--color-text-light)",
                    boxShadow: isActive
                      ? `0 4px 12px -2px ${glowColor}`
                      : "none",
                  }}
                >
                  {feature.id}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div
        className={`flex-shrink-0 w-[85vw] max-w-[360px] snap-center transition-all duration-500 ${
          isActive ? "scale-100" : "scale-[0.92] opacity-50"
        }`}
        onClick={onClick}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <div
      className="absolute left-1/2 top-1/2 w-[320px] sm:w-[360px] lg:w-[400px] cursor-pointer transition-all duration-600 ease-out"
      style={style}
      onClick={onClick}
    >
      {cardContent}
    </div>
  );
});
FeatureCard.displayName = "FeatureCard";

// ============================================
// NAVIGATION & CONTROLS
// ============================================

const NavButton = memo(({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    style={{
      background: "var(--color-surface-50)",
      border: "1px solid var(--color-surface-300)",
      color: "var(--color-text-secondary)",
      boxShadow: "0 4px 12px -2px rgba(0,0,0,0.06)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "var(--color-surface-100)";
      e.currentTarget.style.borderColor = "var(--color-primary-300)";
      e.currentTarget.style.boxShadow = "0 8px 24px -4px rgba(0,0,0,0.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "var(--color-surface-50)";
      e.currentTarget.style.borderColor = "var(--color-surface-300)";
      e.currentTarget.style.boxShadow = "0 4px 12px -2px rgba(0,0,0,0.06)";
    }}
    aria-label={direction === "left" ? "Previous feature" : "Next feature"}
  >
    {direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
  </button>
));
NavButton.displayName = "NavButton";

const ProgressIndicator = memo(
  ({ currentSlide, features, onSelect, isAutoPlaying }) => (
    <div className="flex items-center gap-2.5">
      {features.map((feature, i) => {
        const isActive = i === currentSlide;
        return (
          <button
            key={feature.id}
            onClick={() => onSelect(i)}
            className="relative rounded-full transition-all duration-500 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
            style={{
              width: isActive ? "40px" : "10px",
              height: "10px",
              background: isActive
                ? feature.accentColor
                : "var(--color-surface-400)",
              boxShadow: isActive
                ? `0 2px 8px -1px ${feature.glowColor}`
                : "none",
            }}
            aria-label={`Go to ${feature.title}`}
          >
            {isActive && isAutoPlaying && (
              <div
                className="absolute inset-0 origin-left"
                style={{
                  background: "rgba(255,255,255,0.4)",
                  animation: "oc-progress 4s linear forwards",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  ),
);
ProgressIndicator.displayName = "ProgressIndicator";

const AutoPlayToggle = memo(({ isPlaying, onToggle }) => (
  <button
    onClick={onToggle}
    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    style={{
      background: "var(--color-surface-50)",
      border: "1px solid var(--color-surface-300)",
      color: isPlaying ? "var(--color-primary-600)" : "var(--color-text-muted)",
    }}
    aria-label={isPlaying ? "Pause auto-play" : "Start auto-play"}
  >
    {isPlaying ? <PauseIcon /> : <PlayIcon />}
    <span className="hidden sm:inline">{isPlaying ? "Pause" : "Auto"}</span>
  </button>
));
AutoPlayToggle.displayName = "AutoPlayToggle";

// ============================================
// MOBILE CAROUSEL
// ============================================
const MobileCarousel = memo(({ currentSlide, setCurrentSlide }) => {
  const scrollRef = useRef(null);
  const isUserScrolling = useRef(false);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isProgrammaticScroll.current) return;
    isUserScrolling.current = true;

    // Debounce: wait for scroll to settle before updating the slide index
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const cardWidth = container.offsetWidth * 0.85;
      const gap = 16;
      const newIndex = Math.round(container.scrollLeft / (cardWidth + gap));
      const normalized =
        ((newIndex % FEATURES.length) + FEATURES.length) % FEATURES.length;
      setCurrentSlide(normalized);
      isUserScrolling.current = false;
    }, 80);
  }, [setCurrentSlide]);

  const scrollToSlide = useCallback((index) => {
    if (!scrollRef.current) return;
    isProgrammaticScroll.current = true;
    const cardWidth = scrollRef.current.offsetWidth * 0.85;
    scrollRef.current.scrollTo({
      left: index * (cardWidth + 16),
      behavior: "smooth",
    });
    // Release lock after smooth scroll completes
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 500);
  }, []);

  useEffect(() => {
    // Only programmatically scroll if NOT caused by user swiping
    if (!isUserScrolling.current) {
      scrollToSlide(currentSlide);
    }
  }, [currentSlide, scrollToSlide]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 px-[7.5vw]"
      onScroll={handleScroll}
      role="region"
      aria-label="Feature cards carousel"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {FEATURES.map((feature, i) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          isActive={i === currentSlide}
          position={i - currentSlide}
          onClick={() => setCurrentSlide(i)}
          isMobile={true}
        />
      ))}
    </div>
  );
});
MobileCarousel.displayName = "MobileCarousel";

// ============================================
// DESKTOP 3D CAROUSEL — Perspective & Depth
// ============================================
const DesktopCarousel = memo(({ currentSlide, setCurrentSlide }) => {
  const getCardStyle = useCallback(
    (index) => {
      const total = FEATURES.length;
      let diff = index - currentSlide;

      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const absDiff = Math.abs(diff);

      if (absDiff > 2) {
        return {
          opacity: 0,
          transform:
            "translateX(-50%) translateY(-50%) scale(0.6) rotateY(0deg)",
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(4px)",
        };
      }

      const xOffset = diff * 320;
      const zOffset = -absDiff * 150;
      const rotation = diff * -10;
      const scale = 1 - absDiff * 0.14;
      const opacity = 1 - absDiff * 0.4;

      return {
        transform: `translateX(calc(-50% + ${xOffset}px)) translateY(-50%) translateZ(${zOffset}px) rotateY(${rotation}deg) scale(${scale})`,
        opacity: Math.max(opacity, 0),
        zIndex: 10 - absDiff,
        pointerEvents: absDiff === 0 ? "auto" : "auto",
        filter: absDiff > 0 ? `blur(${absDiff * 1}px)` : "none",
        transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      };
    },
    [currentSlide],
  );

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        perspective: "1600px",
        height: "520px",
      }}
      role="region"
      aria-label="Feature cards carousel"
    >
      <div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {FEATURES.map((feature, i) => {
          const diff = (() => {
            let d = i - currentSlide;
            if (d > FEATURES.length / 2) d -= FEATURES.length;
            if (d < -FEATURES.length / 2) d += FEATURES.length;
            return d;
          })();

          return (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isActive={i === currentSlide}
              position={diff}
              onClick={() => setCurrentSlide(i)}
              style={getCardStyle(i)}
              isMobile={false}
            />
          );
        })}
      </div>

      {/* Side fade overlays for depth */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to right, var(--color-background), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to left, var(--color-background), transparent)",
        }}
      />
    </div>
  );
});
DesktopCarousel.displayName = "DesktopCarousel";

// ============================================
// BACKGROUND AMBIENT EFFECTS
// ============================================
const BackgroundEffects = memo(() => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    {/* Floating gradient orbs */}
    <div
      className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
      style={{
        background: "var(--color-primary-200)",
        opacity: 0.15,
        animation: "oc-float-slow 12s ease-in-out infinite",
      }}
    />
    <div
      className="absolute -right-40 top-1/2 w-[500px] h-[500px] rounded-full blur-[100px]"
      style={{
        background: "var(--color-accent-200)",
        opacity: 0.12,
        animation: "oc-float-slow 15s ease-in-out infinite reverse",
      }}
    />
    <div
      className="absolute left-1/3 -bottom-40 w-[400px] h-[400px] rounded-full blur-[100px]"
      style={{
        background: "var(--color-success-200)",
        opacity: 0.1,
        animation: "oc-float-slow 10s ease-in-out infinite 3s",
      }}
    />

    {/* Subtle dot grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle, var(--color-surface-400) 0.5px, transparent 0.5px)`,
        backgroundSize: "48px 48px",
        opacity: 0.3,
      }}
    />
  </div>
));
BackgroundEffects.displayName = "BackgroundEffects";

// ============================================
// MAIN FEATURES SECTION
// ============================================
const Features = () => {
  const [sectionRef, isInView] = useIntersectionObserver(0.1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const autoPlayRef = useRef(null);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % FEATURES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying && isInView) {
      autoPlayRef.current = setInterval(goToNext, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, isInView, goToNext]);

  const handleInteraction = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handleInteraction();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        handleInteraction();
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext, handleInteraction]);

  const currentFeature = FEATURES[currentSlide];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 overflow-hidden"
      style={{ background: "var(--color-background)" }}
      aria-labelledby="features-heading"
    >
      <BackgroundEffects />

      <div className="relative max-w-7xl mx-auto">
        {/* === SECTION HEADER === */}
        <div
          className="text-center mb-14 sm:mb-18 lg:mb-24 transition-all duration-1000"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: "var(--color-primary-100)",
              border: "1px solid var(--color-primary-200)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{
                  background: "var(--color-primary-500)",
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--color-primary-600)" }}
              />
            </span>
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: "var(--color-primary-700)" }}
            >
              AI-Powered Features
            </span>
          </div>

          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-sans)",
              lineHeight: 1.1,
            }}
          >
            Your Content{" "}
            <span
              className="text-gradient-primary"
              style={{
                background: `linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Command Center
            </span>
          </h2>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Everything you need to analyze, optimize, and dominate content
            creation — powered by advanced AI.
          </p>
        </div>

        {/* === CAROUSEL === */}
        <div
          className="transition-all duration-1000"
          style={{
            opacity: isInView ? 1 : 0,
            transitionDelay: "300ms",
          }}
          onMouseEnter={handleInteraction}
          onTouchStart={handleInteraction}
        >
          {isMobile ? (
            <MobileCarousel
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
          ) : (
            <DesktopCarousel
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
          )}
        </div>

        {/* === FEATURE TITLE TICKER (Desktop) === */}
        {!isMobile && (
          <div
            className="text-center mt-6 mb-2 transition-all duration-500"
            style={{
              opacity: isInView ? 1 : 0,
              transitionDelay: "400ms",
            }}
          >
            <p
              className="text-sm font-semibold tracking-wider uppercase transition-all duration-400"
              style={{ color: currentFeature.accentColor }}
              key={currentSlide}
            >
              {currentFeature.title}
            </p>
          </div>
        )}

        {/* === CONTROLS === */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 sm:mt-10 transition-all duration-1000"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "500ms",
          }}
        >
          <div className="flex items-center gap-5">
            <NavButton
              direction="left"
              onClick={() => {
                handleInteraction();
                goToPrev();
              }}
            />
            <ProgressIndicator
              currentSlide={currentSlide}
              features={FEATURES}
              onSelect={(i) => {
                handleInteraction();
                setCurrentSlide(i);
              }}
              isAutoPlaying={isAutoPlaying}
            />
            <NavButton
              direction="right"
              onClick={() => {
                handleInteraction();
                goToNext();
              }}
            />
          </div>

          <AutoPlayToggle
            isPlaying={isAutoPlaying}
            onToggle={() => setIsAutoPlaying(!isAutoPlaying)}
          />
        </div>

        {/* Keyboard hint */}
        <div
          className="hidden lg:flex justify-center mt-6 transition-all duration-700"
          style={{
            opacity: isInView ? 0.6 : 0,
            transitionDelay: "700ms",
          }}
        >
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--color-text-light)" }}
          >
            <kbd
              className="px-2.5 py-1 rounded-lg text-xs font-mono"
              style={{
                background: "var(--color-surface-200)",
                border: "1px solid var(--color-surface-300)",
                color: "var(--color-text-muted)",
              }}
            >
              ←
            </kbd>
            <kbd
              className="px-2.5 py-1 rounded-lg text-xs font-mono"
              style={{
                background: "var(--color-surface-200)",
                border: "1px solid var(--color-surface-300)",
                color: "var(--color-text-muted)",
              }}
            >
              →
            </kbd>
            <span>to navigate</span>
          </div>
        </div>
      </div>

      {/* === ANIMATION KEYFRAMES === */}
      <style>{`
        @keyframes oc-float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.05); }
        }

        @keyframes oc-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes oc-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes oc-dash-shift {
          from { background-position: 0 0; }
          to { background-position: 20px 0; }
        }

        @keyframes oc-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(8px); opacity: 0.6; }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Feature card base styles */
        .oc-feature-card {
          will-change: transform, box-shadow;
          background: var(--color-surface-50);
        }

        .oc-feature-visual {
          background: var(--color-surface-100);
          border: 1px solid var(--color-surface-300);
        }

        /* Dark mode overrides for feature cards */
        .dark .oc-feature-card {
          background: var(--color-dark-surface);
          border-color: var(--color-dark-border) !important;
        }

        .dark .oc-feature-card--active {
          border-color: var(--color-primary-600) !important;
        }

        .dark .oc-feature-visual {
          background: var(--color-dark-surface-light);
          border-color: var(--color-dark-border);
        }

        /* Line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default memo(Features);

import React, { useState, useEffect, useRef, memo, useCallback } from "react";

// ============================================
// ONLY CREATORS — "THE BLIND SPOT"
// Split-Reality Scroll Experience
// Creator's Chaos vs. Hidden Insights
// ============================================

// ── Intersection Observer Hook ──────────────────────────

const useInView = (threshold = 0.2, once = true) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && isInView)) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setIsInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin: "40px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once, isInView]);

  return [ref, isInView];
};

// ── Scroll Progress Hook ────────────────────────────────

const useScrollProgress = (ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.max(
          0,
          Math.min(1, (vh - rect.top) / (vh + rect.height)),
        );
        setProgress(p);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return progress;
};

// ── Counter Animation Hook ──────────────────────────────

const useCounter = (end, isActive, duration = 1800) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setValue(end);
      return;
    }

    let start = 0;
    let startTime = null;
    let raf;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, isActive, duration]);

  return value;
};

// ── Static Data ─────────────────────────────────────────

const NOTIFICATIONS = Object.freeze([
  {
    platform: "YouTube",
    text: "Views dropped 23% this week",
    type: "warning",
    delay: 0,
  },
  {
    platform: "Instagram",
    text: "Engagement rate below average",
    type: "error",
    delay: 600,
  },
  {
    platform: "TikTok",
    text: "3 videos stuck at 0 FYP reach",
    type: "error",
    delay: 1200,
  },
  {
    platform: "YouTube",
    text: "New subscriber milestone!",
    type: "success",
    delay: 1800,
  },
  {
    platform: "Instagram",
    text: "Story views declining steadily",
    type: "warning",
    delay: 2400,
  },
  {
    platform: "TikTok",
    text: "Audio trending — act now?",
    type: "info",
    delay: 3000,
  },
]);

const REALITY_STATS = Object.freeze([
  {
    label: "Platforms to check daily",
    value: 5,
    suffix: "+",
    color: "var(--color-warning-500)",
  },
  {
    label: "Hours lost to dashboard hopping",
    value: 12,
    suffix: "h",
    color: "var(--color-error-500)",
  },
  {
    label: "Data points you're ignoring",
    value: 94,
    suffix: "%",
    color: "var(--color-error-400)",
  },
]);

const BLINDSPOT_ITEMS = Object.freeze([
  {
    title: "Why your Tuesday posts outperform Friday",
    category: "Pattern",
    hidden: true,
  },
  {
    title: "Your audience peaks at 9:47 PM, not 7 PM",
    category: "Timing",
    hidden: true,
  },
  {
    title: "Carousel posts get 3.2× more saves than reels",
    category: "Format",
    hidden: true,
  },
  {
    title: "68% of unfollows happen after promotional content",
    category: "Sentiment",
    hidden: true,
  },
  {
    title: "Your competitor's strategy shift last Thursday",
    category: "Market",
    hidden: true,
  },
]);

// ── Notification Toast ──────────────────────────────────

const NotificationToast = memo(({ notification, isVisible, index }) => {
  const typeStyles = {
    warning: {
      border: "var(--color-warning-300)",
      bg: "var(--color-warning-50)",
      dot: "var(--color-warning-500)",
      text: "var(--color-warning-700)",
    },
    error: {
      border: "var(--color-error-300)",
      bg: "var(--color-error-50)",
      dot: "var(--color-error-500)",
      text: "var(--color-error-700)",
    },
    success: {
      border: "var(--color-success-300)",
      bg: "var(--color-success-50)",
      dot: "var(--color-success-500)",
      text: "var(--color-success-700)",
    },
    info: {
      border: "var(--color-primary-300)",
      bg: "var(--color-primary-50)",
      dot: "var(--color-primary-500)",
      text: "var(--color-primary-700)",
    },
  };

  const s = typeStyles[notification.type];

  return (
    <div
      className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl transition-all duration-500"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateX(0) scale(1)"
          : "translateX(-20px) scale(0.95)",
        transitionDelay: `${notification.delay}ms`,
      }}
    >
      {/* Status dot */}
      <div className="mt-1 shrink-0">
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: s.dot,
            animation:
              notification.type === "error"
                ? "oc-pulse-dot 1.5s ease-in-out infinite"
                : undefined,
          }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: s.text }}
          >
            {notification.platform}
          </span>
        </div>
        <p
          className="text-xs sm:text-sm leading-snug"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {notification.text}
        </p>
      </div>

      {/* Timestamp */}
      <span
        className="text-[9px] font-medium shrink-0 mt-0.5"
        style={{ color: "var(--color-text-light)" }}
      >
        {index + 1}m ago
      </span>
    </div>
  );
});
NotificationToast.displayName = "NotificationToast";

// ── Chaos Side (Left) ───────────────────────────────────

const ChaosSide = memo(({ isVisible }) => (
  <div className="relative h-full flex flex-col">
    {/* Header */}
    <div
      className="mb-4 sm:mb-6 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: "var(--color-error-400)",
            animation: "oc-pulse-dot 2s ease-in-out infinite",
          }}
        />
        <span
          className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--color-error-500)" }}
        >
          Your Reality
        </span>
      </div>
      <h3
        className="text-lg sm:text-xl md:text-2xl font-bold leading-tight"
        style={{ color: "var(--color-text-primary)" }}
      >
        The noise you're
        <br />
        <span style={{ color: "var(--color-error-500)" }}>drowning in</span>
      </h3>
    </div>

    {/* Notification stream */}
    <div className="flex-1 space-y-2.5 sm:space-y-3 overflow-hidden">
      {NOTIFICATIONS.map((notif, i) => (
        <NotificationToast
          key={i}
          notification={notif}
          isVisible={isVisible}
          index={i}
        />
      ))}
    </div>

    {/* Overwhelm indicator */}
    <div
      className="mt-4 sm:mt-6 flex items-center gap-3 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDelay: "3200ms",
      }}
    >
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ background: "var(--color-surface-300)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-[2000ms] ease-out"
          style={{
            width: isVisible ? "89%" : "0%",
            background: `linear-gradient(90deg, var(--color-warning-400), var(--color-error-500))`,
            transitionDelay: "3400ms",
          }}
        />
      </div>
      <span
        className="text-xs font-bold tabular-nums"
        style={{ color: "var(--color-error-500)" }}
      >
        89% noise
      </span>
    </div>
  </div>
));
ChaosSide.displayName = "ChaosSide";

// ── Blind Spot Item ─────────────────────────────────────

const BlindSpotItem = memo(({ item, index, isRevealed }) => (
  <div
    className="group relative flex items-center gap-3 p-3 sm:p-3.5 rounded-xl transition-all duration-500 cursor-default"
    style={{
      background: isRevealed
        ? "var(--color-surface-50)"
        : "var(--color-surface-200)",
      border: `1px solid ${isRevealed ? "var(--color-primary-200)" : "var(--color-surface-300)"}`,
      opacity: isRevealed ? 1 : 0.5,
      transform: isRevealed ? "translateX(0)" : "translateX(12px)",
      transitionDelay: `${index * 200}ms`,
    }}
  >
    {/* Redacted / Revealed content */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: isRevealed
              ? "var(--color-primary-100)"
              : "var(--color-surface-300)",
            color: isRevealed
              ? "var(--color-primary-700)"
              : "var(--color-text-light)",
          }}
        >
          {item.category}
        </span>
      </div>

      {isRevealed ? (
        <p
          className="text-xs sm:text-sm font-medium leading-snug"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {item.title}
        </p>
      ) : (
        <div className="space-y-1.5">
          <div
            className="h-2.5 rounded-full"
            style={{
              background: "var(--color-surface-400)",
              width: `${70 + index * 5}%`,
            }}
          />
          <div
            className="h-2.5 rounded-full"
            style={{
              background: "var(--color-surface-400)",
              width: `${40 + index * 8}%`,
            }}
          />
        </div>
      )}
    </div>

    {/* Lock / Unlock icon */}
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500"
      style={{
        background: isRevealed
          ? "var(--color-primary-500)"
          : "var(--color-surface-300)",
        color: isRevealed ? "#fff" : "var(--color-text-light)",
        transform: isRevealed ? "rotate(0deg)" : "rotate(12deg)",
      }}
    >
      {isRevealed ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )}
    </div>
  </div>
));
BlindSpotItem.displayName = "BlindSpotItem";

// ── Blind Spot Side (Right) ─────────────────────────────

const BlindSpotSide = memo(({ isVisible, revealProgress }) => {
  const revealedCount = Math.floor(revealProgress * BLINDSPOT_ITEMS.length);

  return (
    <div className="relative h-full flex flex-col">
      {/* Header */}
      <div
        className="mb-4 sm:mb-6 transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(12px)",
          transitionDelay: "200ms",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--color-primary-500)" }}
          />
          <span
            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--color-primary-600)" }}
          >
            Your Blind Spot
          </span>
        </div>
        <h3
          className="text-lg sm:text-xl md:text-2xl font-bold leading-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          The insights you're
          <br />
          <span style={{ color: "var(--color-primary-600)" }}>not seeing</span>
        </h3>
      </div>

      {/* Blind spot items */}
      <div className="flex-1 space-y-2.5 sm:space-y-3">
        {BLINDSPOT_ITEMS.map((item, i) => (
          <BlindSpotItem
            key={i}
            item={item}
            index={i}
            isRevealed={i < revealedCount}
          />
        ))}
      </div>

      {/* Insight counter */}
      <div
        className="mt-4 sm:mt-6 flex items-center gap-3 transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: "400ms",
        }}
      >
        <div
          className="flex-1 h-2 rounded-full overflow-hidden"
          style={{ background: "var(--color-surface-300)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${(revealedCount / BLINDSPOT_ITEMS.length) * 100}%`,
              background: `linear-gradient(90deg, var(--color-primary-400), var(--color-primary-600))`,
            }}
          />
        </div>
        <span
          className="text-xs font-bold tabular-nums"
          style={{ color: "var(--color-primary-600)" }}
        >
          {revealedCount}/{BLINDSPOT_ITEMS.length} found
        </span>
      </div>
    </div>
  );
});
BlindSpotSide.displayName = "BlindSpotSide";

// ── Stat Card ───────────────────────────────────────────

const StatCard = memo(({ stat, index, isVisible }) => {
  const count = useCounter(stat.value, isVisible, 1500 + index * 300);

  return (
    <div
      className="text-center p-5 sm:p-6 rounded-2xl transition-all duration-600 ease-out"
      style={{
        background: "var(--color-surface-50)",
        border: "1px solid var(--color-surface-300)",
        boxShadow: "0 4px 16px -4px rgba(0,0,0,0.04)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.95)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tabular-nums leading-none mb-2"
        style={{ color: stat.color }}
      >
        {count}
        <span className="text-xl sm:text-2xl">{stat.suffix}</span>
      </div>
      <p
        className="text-xs sm:text-sm font-medium"
        style={{ color: "var(--color-text-muted)" }}
      >
        {stat.label}
      </p>
    </div>
  );
});
StatCard.displayName = "StatCard";

// ── Divider Connector ───────────────────────────────────

const SplitDivider = memo(({ isVisible, scrollProgress }) => {
  const height = Math.min(100, scrollProgress * 150);

  return (
    <div
      className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center z-10"
      aria-hidden="true"
    >
      {/* Vertical line */}
      <div
        className="w-px flex-1 transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--color-surface-400), transparent)`,
          opacity: isVisible ? 0.6 : 0,
        }}
      />

      {/* Center emblem */}
      <div
        className="relative my-4 transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.5)",
          transitionDelay: "500ms",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "var(--color-surface-50)",
            border: "2px solid var(--color-accent-300)",
            boxShadow: `0 0 24px -4px var(--color-accent-200)`,
          }}
        >
          <span
            className="text-lg"
            style={{ color: "var(--color-accent-500)" }}
          >
            vs
          </span>
        </div>

        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid var(--color-accent-300)",
            animation: "oc-ring-pulse 3s ease-out infinite",
            opacity: 0.4,
          }}
        />
      </div>

      {/* Vertical line */}
      <div
        className="w-px flex-1 transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--color-surface-400), transparent)`,
          opacity: isVisible ? 0.6 : 0,
        }}
      />
    </div>
  );
});
SplitDivider.displayName = "SplitDivider";

// ── Section Heading ─────────────────────────────────────

const SectionHeading = memo(({ isVisible }) => (
  <div
    className="text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-800 ease-out"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
    }}
  >
    {/* Tag */}
    <div
      className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8"
      style={{
        background: "var(--color-accent-100)",
        border: "1px solid var(--color-accent-200)",
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
      <span
        className="text-xs sm:text-sm font-semibold tracking-wide"
        style={{ color: "var(--color-accent-700)" }}
      >
        The Problem
      </span>
    </div>

    {/* Title */}
    <h2
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 leading-tight"
      style={{
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-sans)",
      }}
    >
      You're working{" "}
      <span
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent-500), var(--color-error-500))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        harder
      </span>
      , not smarter
    </h2>

    <p
      className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
      style={{ color: "var(--color-text-muted)" }}
    >
      Every day, creators drown in fragmented data across platforms. The
      insights that could transform your content? They're hiding in plain sight.
    </p>
  </div>
));
SectionHeading.displayName = "SectionHeading";

// ── Bottom CTA / Transition ─────────────────────────────

const BottomTransition = memo(({ isVisible }) => (
  <div
    className="text-center mt-12 sm:mt-16 md:mt-20 transition-all duration-1000 ease-out"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(16px)",
      transitionDelay: "400ms",
    }}
  >
    {/* Divider */}
    <div
      className="mx-auto w-16 h-px mb-8 sm:mb-10"
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--color-accent-400), transparent)",
      }}
    />

    <p
      className="text-base sm:text-lg md:text-xl italic mb-2"
      style={{
        fontFamily: "var(--font-serif)",
        color: "var(--color-text-secondary)",
      }}
    >
      What if one AI could connect all the dots?
    </p>

    <p
      className="text-xs sm:text-sm font-medium mb-8"
      style={{ color: "var(--color-text-light)" }}
    >
      Stop guessing. Start knowing.
    </p>

    {/* Scroll indicator */}
    <div
      className="inline-flex flex-col items-center gap-2"
      style={{
        color: "var(--color-primary-400)",
        animation: "oc-float 3s ease-in-out infinite",
      }}
    >
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: "var(--color-text-light)" }}
      >
        See the solution
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  </div>
));
BottomTransition.displayName = "BottomTransition";

// ── Mobile Split (Stacked) ──────────────────────────────

const MobileSplit = memo(
  ({ chaosVisible, blindSpotVisible, revealProgress }) => (
    <div className="md:hidden space-y-6 sm:space-y-8">
      {/* Chaos section */}
      <div
        className="p-5 sm:p-6 rounded-2xl"
        style={{
          background: "var(--color-surface-50)",
          border: "1px solid var(--color-surface-300)",
          boxShadow: "0 8px 32px -4px rgba(0,0,0,0.06)",
        }}
      >
        <ChaosSide isVisible={chaosVisible} />
      </div>

      {/* Mobile divider */}
      <div className="flex items-center justify-center py-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "var(--color-surface-100)",
            border: "2px solid var(--color-accent-300)",
            color: "var(--color-accent-500)",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          vs
        </div>
      </div>

      {/* Blind spot section */}
      <div
        className="p-5 sm:p-6 rounded-2xl"
        style={{
          background: "var(--color-surface-50)",
          border: "1px solid var(--color-surface-300)",
          boxShadow: "0 8px 32px -4px rgba(0,0,0,0.06)",
        }}
      >
        <BlindSpotSide
          isVisible={blindSpotVisible}
          revealProgress={revealProgress}
        />
      </div>
    </div>
  ),
);
MobileSplit.displayName = "MobileSplit";

// ── Desktop Split ───────────────────────────────────────

const DesktopSplit = memo(({ isVisible, revealProgress, scrollProgress }) => (
  <div className="hidden md:block relative">
    <div className="grid grid-cols-2 gap-0" style={{ minHeight: "520px" }}>
      {/* Left — Chaos */}
      <div
        className="p-6 lg:p-8 xl:p-10 rounded-l-2xl"
        style={{
          background: "var(--color-surface-50)",
          borderTop: "1px solid var(--color-surface-300)",
          borderLeft: "1px solid var(--color-surface-300)",
          borderBottom: "1px solid var(--color-surface-300)",
          boxShadow: "-4px 0 24px -8px rgba(0,0,0,0.04)",
        }}
      >
        <ChaosSide isVisible={isVisible} />
      </div>

      {/* Divider */}
      <SplitDivider isVisible={isVisible} scrollProgress={scrollProgress} />

      {/* Right — Blind Spot */}
      <div
        className="p-6 lg:p-8 xl:p-10 rounded-r-2xl"
        style={{
          background: "var(--color-surface-50)",
          borderTop: "1px solid var(--color-surface-300)",
          borderRight: "1px solid var(--color-surface-300)",
          borderBottom: "1px solid var(--color-surface-300)",
          boxShadow: "4px 0 24px -8px rgba(0,0,0,0.04)",
        }}
      >
        <BlindSpotSide isVisible={isVisible} revealProgress={revealProgress} />
      </div>
    </div>
  </div>
));
DesktopSplit.displayName = "DesktopSplit";

// ── MAIN COMPONENT ──────────────────────────────────────

const Dilemma = () => {
  const sectionRef = useRef(null);
  const [headerRef, headerInView] = useInView(0.15);
  const [splitRef, splitInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [bottomRef, bottomInView] = useInView(0.3);

  const scrollProgress = useScrollProgress(sectionRef);

  // Auto-reveal blind spots as user scrolls
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    if (!splitInView) return;

    const timers = [];
    for (let i = 1; i <= BLINDSPOT_ITEMS.length; i++) {
      const timer = setTimeout(
        () => {
          setRevealProgress(i / BLINDSPOT_ITEMS.length);
        },
        2000 + i * 800,
      );
      timers.push(timer);
    }

    return () => timers.forEach(clearTimeout);
  }, [splitInView]);

  return (
    <section
      ref={sectionRef}
      id="dilemma"
      className="relative py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden"
      style={{ background: "var(--color-surface-100)" }}
      aria-labelledby="dilemma-heading"
    >
      {/* ── Ambient Background ── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[140px]"
          style={{
            background: "var(--color-warning-200)",
            opacity: 0.08 + scrollProgress * 0.06,
            top: "5%",
            left: "-10%",
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[140px]"
          style={{
            background: "var(--color-primary-200)",
            opacity: 0.06 + scrollProgress * 0.05,
            bottom: "10%",
            right: "-8%",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-surface-400) 0.5px, transparent 0.5px)`,
            backgroundSize: "40px 40px",
            opacity: 0.12,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── Section Header ── */}
        <div ref={headerRef}>
          <h2 className="sr-only" id="dilemma-heading">
            The Creator's Dilemma — Why you need Only Creators
          </h2>
          <SectionHeading isVisible={headerInView} />
        </div>

        {/* ── Stats Bar ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-14 md:mb-18"
        >
          {REALITY_STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              isVisible={statsInView}
            />
          ))}
        </div>

        {/* ── Split Screen ── */}
        <div ref={splitRef}>
          {/* Desktop */}
          <DesktopSplit
            isVisible={splitInView}
            revealProgress={revealProgress}
            scrollProgress={scrollProgress}
          />

          {/* Mobile */}
          <MobileSplit
            chaosVisible={splitInView}
            blindSpotVisible={splitInView}
            revealProgress={revealProgress}
          />
        </div>

        {/* ── Bottom Transition ── */}
        <div ref={bottomRef}>
          <BottomTransition isVisible={bottomInView} />
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes oc-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        @keyframes oc-ring-pulse {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2); opacity: 0; }
        }

        @keyframes oc-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
};

export default memo(Dilemma);

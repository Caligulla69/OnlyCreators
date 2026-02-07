import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ============================================
// ONLY CREATORS — HERO SECTION
// Warm Accent Palette | Fully Responsive
// Accessible | Theme-Integrated
// ============================================

// ── Icons ──────────────────────────────────────────────

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

const YoutubeIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

const SparkleIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
));
SparkleIcon.displayName = "SparkleIcon";

const ArrowRightIcon = memo(() => (
  <svg
    width="16"
    height="16"
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

const ICON_MAP = {
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};

// ── Static Data ────────────────────────────────────────

const PLATFORMS_CONFIG = Object.freeze([
  { icon: "youtube", name: "YouTube", color: "#dc2626" },
  { icon: "instagram", name: "Instagram", color: "#e1306c" },
  { icon: "tiktok", name: "TikTok", color: "var(--color-text-primary)" },
]);

const FLOATING_EMBERS = Object.freeze([
  { delay: 0, duration: 7, size: 4, left: 15, top: 30 },
  { delay: 1.2, duration: 9, size: 3, left: 75, top: 20 },
  { delay: 0.5, duration: 6, size: 5, left: 85, top: 60 },
  { delay: 2, duration: 8, size: 3, left: 25, top: 70 },
  { delay: 1.8, duration: 7, size: 4, left: 60, top: 80 },
  { delay: 0.8, duration: 10, size: 3, left: 40, top: 15 },
  { delay: 2.5, duration: 6, size: 5, left: 90, top: 40 },
  { delay: 1, duration: 8, size: 3, left: 10, top: 55 },
]);

const STAT_PILLS = Object.freeze([
  { value: "50K+", label: "Creators", delay: 2200 },
  { value: "3", label: "Platforms", delay: 2400 },
  { value: "10x", label: "Faster Insights", delay: 2600 },
]);

// ── Hooks ──────────────────────────────────────────────

const useMouseParallax = (ref, enabled = true) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const lastRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e) => {
      if (!ref.current || window.innerWidth < 768) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 60;
        const y = (e.clientY - rect.top - rect.height / 2) / 60;
        if (
          Math.abs(x - lastRef.current.x) > 0.08 ||
          Math.abs(y - lastRef.current.y) > 0.08
        ) {
          lastRef.current = { x, y };
          setPos({ x, y });
        }
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ref, enabled]);

  return pos;
};

const useAnimationSequence = () => {
  const [state, setState] = useState({
    loaded: false,
    showTitle: false,
    showTagline: false,
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState({ loaded: true, showTitle: true, showTagline: true });
      return;
    }
    const timers = [
      setTimeout(() => setState((s) => ({ ...s, loaded: true })), 100),
      setTimeout(() => setState((s) => ({ ...s, showTitle: true })), 500),
      setTimeout(() => setState((s) => ({ ...s, showTagline: true })), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return state;
};

// ── Floating Ember ─────────────────────────────────────

const FloatingEmber = memo(({ delay, duration, size, left, top }) => (
  <div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      top: `${top}%`,
      background:
        "radial-gradient(circle, var(--color-accent-400), var(--color-error-400))",
      opacity: 0,
      animation: `oc-ember-rise ${duration}s ease-in-out infinite ${delay}s`,
      willChange: "transform, opacity",
    }}
    aria-hidden="true"
  />
));
FloatingEmber.displayName = "FloatingEmber";

// ── Background ─────────────────────────────────────────

const HeroBackground = memo(({ loaded, mousePos }) => (
  <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
    {/* Top-left warm glow */}
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(200px, 45vw, 600px)",
        height: "clamp(200px, 45vw, 600px)",
        top: "0%",
        left: "0%",
        background:
          "radial-gradient(circle, var(--color-accent-200), transparent 70%)",
        filter: "blur(80px)",
        opacity: loaded ? 0.35 : 0,
        transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
        transition: "transform 0.4s ease-out, opacity 1s ease",
      }}
    />

    {/* Bottom-right rose glow */}
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(180px, 40vw, 500px)",
        height: "clamp(180px, 40vw, 500px)",
        bottom: "5%",
        right: "0%",
        background:
          "radial-gradient(circle, var(--color-error-200), transparent 70%)",
        filter: "blur(80px)",
        opacity: loaded ? 0.25 : 0,
        transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)`,
        transition: "transform 0.4s ease-out, opacity 1s ease",
        transitionDelay: "200ms",
      }}
    />

    {/* Center amber glow */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: "clamp(160px, 30vw, 400px)",
        height: "clamp(160px, 30vw, 400px)",
        background:
          "radial-gradient(circle, var(--color-warning-200), transparent 70%)",
        filter: "blur(100px)",
        opacity: loaded ? 0.2 : 0,
        transition: "opacity 1s ease",
        transitionDelay: "400ms",
      }}
    />

    {/* Bottom gradient fade into next section */}
    <div
      className="absolute bottom-0 left-0 right-0 h-32 sm:h-40"
      style={{
        background:
          "linear-gradient(to top, var(--color-secondary-100), transparent)",
      }}
    />

    {/* Dot grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-secondary-400) 0.5px, transparent 0.5px)",
        backgroundSize: "36px 36px",
        opacity: loaded ? 0.07 : 0,
        transition: "opacity 1s ease",
      }}
    />

    {/* Floating embers — hidden on mobile for performance */}
    <div className="hidden lg:block">
      {FLOATING_EMBERS.map((ember, i) => (
        <FloatingEmber key={i} {...ember} />
      ))}
    </div>
  </div>
));
HeroBackground.displayName = "HeroBackground";

// ── Intro Badge ────────────────────────────────────────

const IntroBadge = memo(({ loaded }) => (
  <div
    className="transition-all duration-700"
    style={{
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(12px)",
    }}
  >
    <div
      className="inline-flex items-center gap-2 px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full"
      style={{
        background: "var(--color-accent-50)",
        border: "1px solid var(--color-accent-200)",
        boxShadow:
          "0 2px 12px -3px color-mix(in srgb, var(--color-accent-400) 20%, transparent)",
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
        className="text-[10px] sm:text-xs md:text-sm font-semibold"
        style={{ color: "var(--color-accent-700)", letterSpacing: "0.06em" }}
      >
        AI-Powered Content Intelligence
      </span>
    </div>
  </div>
));
IntroBadge.displayName = "IntroBadge";

// ── Platform Badge ─────────────────────────────────────

const PlatformBadge = memo(({ icon, name, color, delay, isVisible }) => {
  const IconComponent = ICON_MAP[icon];

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full cursor-pointer select-none transition-all duration-500"
      style={{
        background: "var(--color-surface-50)",
        border: "1px solid var(--color-secondary-200)",
        boxShadow: "0 2px 8px -2px rgba(0,0,0,0.05)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(8px) scale(0.95)",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 4px 16px -3px ${color}30`;
        e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-secondary-200)";
        e.currentTarget.style.boxShadow = "0 2px 8px -2px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      }}
      role="listitem"
      tabIndex={0}
    >
      <span style={{ color }}>{IconComponent && <IconComponent />}</span>
      <span
        className="text-xs sm:text-sm font-semibold"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {name}
      </span>
    </div>
  );
});
PlatformBadge.displayName = "PlatformBadge";

// ── Stat Pill ──────────────────────────────────────────

const StatPill = memo(({ value, label, delay, isVisible }) => (
  <div
    className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-600"
    style={{
      background: "var(--color-accent-50)",
      border: "1px solid var(--color-accent-200)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(6px)",
      transitionDelay: `${delay}ms`,
    }}
  >
    <span
      className="text-xs sm:text-sm font-extrabold"
      style={{ color: "var(--color-accent-600)" }}
    >
      {value}
    </span>
    <span
      className="text-[10px] sm:text-xs font-medium"
      style={{ color: "var(--color-text-muted)" }}
    >
      {label}
    </span>
  </div>
));
StatPill.displayName = "StatPill";

// ── Primary CTA ────────────────────────────────────────

const PrimaryCTA = memo(({ children, isVisible, onClick }) => (
  <a
    href="/signup"
    onClick={onClick}
    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full font-semibold overflow-hidden transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    style={{
      padding: "clamp(14px, 2vw, 20px) clamp(28px, 4vw, 44px)",
      fontSize: "clamp(14px, 1.6vw, 18px)",
      background:
        "linear-gradient(135deg, var(--color-accent-500), var(--color-error-500))",
      color: "#fff",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(10px)",
      transitionDelay: "1700ms",
      boxShadow:
        "0 8px 24px -4px color-mix(in srgb, var(--color-accent-500) 35%, transparent)",
      outlineColor: "var(--color-accent-500)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow =
        "0 16px 40px -6px color-mix(in srgb, var(--color-accent-500) 45%, transparent)";
      e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow =
        "0 8px 24px -4px color-mix(in srgb, var(--color-accent-500) 35%, transparent)";
      e.currentTarget.style.transform = "translateY(0) scale(1)";
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.transform = "translateY(0) scale(0.98)";
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
    }}
    aria-label="Start analyzing your content"
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowRightIcon />
      </span>
    </span>
    {/* Hover gradient shift */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          "linear-gradient(135deg, var(--color-error-500), var(--color-accent-600))",
      }}
    />
  </a>
));
PrimaryCTA.displayName = "PrimaryCTA";

// ── Secondary CTA ──────────────────────────────────────

const SecondaryCTA = memo(({ children, isVisible, onClick }) => (
  <button
    onClick={onClick}
    className="group w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    style={{
      padding: "clamp(12px, 1.8vw, 18px) clamp(24px, 3.5vw, 40px)",
      fontSize: "clamp(14px, 1.6vw, 18px)",
      color: "var(--color-text-secondary)",
      border: "2px solid var(--color-secondary-300)",
      background:
        "color-mix(in srgb, var(--color-surface-50) 85%, transparent)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(10px)",
      transitionDelay: "1850ms",
      outlineColor: "var(--color-accent-500)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--color-accent-300)";
      e.currentTarget.style.background = "var(--color-surface-50)";
      e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.08)";
      e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--color-secondary-300)";
      e.currentTarget.style.background =
        "color-mix(in srgb, var(--color-surface-50) 85%, transparent)";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "translateY(0) scale(1)";
    }}
    aria-label="Watch product demo"
  >
    <div
      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
      style={{
        background:
          "linear-gradient(135deg, var(--color-accent-100), var(--color-accent-50))",
        border: "1px solid var(--color-accent-200)",
      }}
    >
      <span className="ml-0.5" style={{ color: "var(--color-accent-600)" }}>
        <PlayIcon />
      </span>
    </div>
    {children}
  </button>
));
SecondaryCTA.displayName = "SecondaryCTA";

// ── Scroll Indicator ───────────────────────────────────

const ScrollIndicator = memo(({ isVisible }) => (
  <div
    className="hidden sm:flex absolute bottom-6 md:bottom-10 left-1/2 flex-col items-center gap-2.5 transition-all duration-1000"
    style={{
      transform: `translateX(-50%) ${isVisible ? "translateY(0)" : "translateY(10px)"}`,
      opacity: isVisible ? 1 : 0,
      transitionDelay: "2800ms",
    }}
    aria-hidden="true"
  >
    <div
      className="relative w-5 h-8 sm:w-6 sm:h-9 rounded-full flex justify-center"
      style={{ border: "2px solid var(--color-accent-300)" }}
    >
      <div
        className="w-1 h-1.5 sm:h-2 rounded-full mt-1.5 sm:mt-2"
        style={{
          background: "var(--color-accent-500)",
          animation: "oc-hero-scroll-dot 1.5s ease-in-out infinite",
        }}
      />
    </div>
    <span
      className="text-[9px] sm:text-[10px] uppercase font-semibold"
      style={{ color: "var(--color-text-light)", letterSpacing: "0.2em" }}
    >
      Scroll
    </span>
  </div>
));
ScrollIndicator.displayName = "ScrollIndicator";

// ── Corner Decorations ─────────────────────────────────

const CornerMark = memo(({ position, loaded, delay }) => {
  const styles = {
    "top-left": {
      top: 12,
      left: 12,
      borderLeft: "2px solid",
      borderTop: "2px solid",
    },
    "top-right": {
      top: 12,
      right: 12,
      borderRight: "2px solid",
      borderTop: "2px solid",
    },
    "bottom-left": {
      bottom: 12,
      left: 12,
      borderLeft: "2px solid",
      borderBottom: "2px solid",
    },
    "bottom-right": {
      bottom: 12,
      right: 12,
      borderRight: "2px solid",
      borderBottom: "2px solid",
    },
  };

  return (
    <div
      className="absolute hidden md:block transition-all duration-1000"
      style={{
        ...styles[position],
        width: "clamp(24px, 3vw, 48px)",
        height: "clamp(24px, 3vw, 48px)",
        borderColor:
          "color-mix(in srgb, var(--color-accent-300) 40%, transparent)",
        opacity: loaded ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
      aria-hidden="true"
    />
  );
});
CornerMark.displayName = "CornerMark";

// ── MAIN HERO COMPONENT ────────────────────────────────

const Hero = () => {
  const heroRef = useRef(null);
  const { loaded, showTitle, showTagline } = useAnimationSequence();
  const mousePos = useMouseParallax(heroRef, loaded);
  const navigate = useNavigate();

  const handlePrimary = useCallback(() => {
    navigate("/signup");
  }, [navigate]);
  const handleSecondary = useCallback(() => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        minHeight: "100dvh",
        background: "var(--color-secondary-100)",
      }}
      aria-labelledby="hero-heading"
    >
      <HeroBackground loaded={loaded} mousePos={mousePos} />

      {/* ── Content wrapper ── */}
      {/* pt accounts for navbar, pb accounts for scroll indicator */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center flex-1 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 px-4 sm:px-6">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-5 sm:mb-6 md:mb-8">
            <IntroBadge loaded={loaded} />
          </div>

          {/* ── Title Line 1 ── */}
          <div className="overflow-hidden mb-1 sm:mb-1.5 md:mb-2">
            <h1
              id="hero-heading"
              className="transition-all duration-900"
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(1.75rem, 5.5vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--color-text-primary)",
                transform: showTitle ? "translateY(0)" : "translateY(110%)",
                opacity: showTitle ? 1 : 0,
              }}
            >
              Every Creator Has a
            </h1>
          </div>

          {/* ── Title Line 2: "Story" ── */}
          <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
            <p
              className="transition-all duration-900"
              style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "clamp(2.25rem, 8vw, 6rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                background:
                  "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400), var(--color-warning-400))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                transform: showTitle ? "translateY(0)" : "translateY(110%)",
                opacity: showTitle ? 1 : 0,
                transitionDelay: "150ms",
              }}
              aria-hidden="true"
            >
              Story
            </p>
          </div>

          {/* ── Divider ── */}
          <div
            className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 md:mb-7 transition-all duration-800"
            style={{
              opacity: showTitle ? 1 : 0,
              transform: showTitle ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: "400ms",
            }}
          >
            <div
              className="h-px w-12 sm:w-16 md:w-20"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--color-accent-300))",
              }}
            />
            <span style={{ color: "var(--color-accent-400)" }}>
              <SparkleIcon />
            </span>
            <div
              className="h-px w-12 sm:w-16 md:w-20"
              style={{
                background:
                  "linear-gradient(to left, transparent, var(--color-accent-300))",
              }}
            />
          </div>

          {/* ── Tagline + CTAs ── */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: showTagline ? 1 : 0,
              transform: showTagline ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {/* Tagline */}
            <p
              className="max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto mb-7 sm:mb-8 md:mb-10 leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.8vw, 1.25rem)",
                color: "var(--color-text-muted)",
                fontWeight: 300,
              }}
            >
              We use AI to analyze your content across every platform — so you
              can stop guessing and start{" "}
              <span
                style={{ color: "var(--color-accent-600)", fontWeight: 600 }}
              >
                growing
              </span>
              .
            </p>

            {/* CTA Buttons — stack on mobile, row on sm+ */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-10 md:mb-12 max-w-md sm:max-w-none mx-auto"
              role="group"
              aria-label="Call to action"
            >
              <PrimaryCTA isVisible={showTagline} onClick={handlePrimary}>
                Start Free Analysis
              </PrimaryCTA>
              <SecondaryCTA isVisible={showTagline} onClick={handleSecondary}>
                Watch Demo
              </SecondaryCTA>
            </div>

            {/* Stat pills */}
            <div
              className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-7 sm:mb-8 md:mb-10"
              role="list"
              aria-label="Key statistics"
            >
              {STAT_PILLS.map((pill) => (
                <StatPill key={pill.label} {...pill} isVisible={showTagline} />
              ))}
            </div>

            {/* Platform badges */}
            <div
              className="transition-all duration-700"
              style={{
                opacity: showTagline ? 1 : 0,
                transitionDelay: "2800ms",
              }}
            >
              <p
                className="text-[9px] sm:text-[10px] md:text-xs uppercase font-semibold mb-2.5 sm:mb-3"
                style={{
                  color: "var(--color-text-light)",
                  letterSpacing: "0.2em",
                }}
              >
                Works with your platforms
              </p>
              <div
                className="flex flex-wrap justify-center gap-2 sm:gap-2.5"
                role="list"
                aria-label="Supported platforms"
              >
                {PLATFORMS_CONFIG.map((p, i) => (
                  <PlatformBadge
                    key={p.name}
                    icon={p.icon}
                    name={p.name}
                    color={p.color}
                    delay={2900 + i * 120}
                    isVisible={showTagline}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator isVisible={showTagline} />

      {/* Corner Decorations */}
      <CornerMark position="top-left" loaded={loaded} delay={1500} />
      <CornerMark position="top-right" loaded={loaded} delay={1600} />
      <CornerMark position="bottom-left" loaded={loaded} delay={1700} />
      <CornerMark position="bottom-right" loaded={loaded} delay={1800} />

      {/* Keyframes */}
      <style>{`
        @keyframes oc-ember-rise {
          0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
          15% { opacity: 0.6; transform: translateY(-10px) translateX(3px) scale(1); }
          50% { opacity: 0.3; transform: translateY(-40px) translateX(-5px) scale(0.8); }
          85% { opacity: 0.5; transform: translateY(-20px) translateX(8px) scale(1.1); }
          100% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
        }
        @keyframes oc-hero-scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.2; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default memo(Hero);

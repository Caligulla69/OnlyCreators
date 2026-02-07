import React, { useState, useEffect, useRef, memo, useCallback } from "react";

// ============================================
// ONLY CREATORS — TESTIMONIALS SECTION
// 3D Cards | Warm Accent Palette | Theme-Integrated
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

const StarIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
));
StarIcon.displayName = "StarIcon";

const QuoteIcon = memo(() => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ opacity: 0.12 }}
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
));
QuoteIcon.displayName = "QuoteIcon";

const ArrowUpIcon = memo(() => (
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
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
));
ArrowUpIcon.displayName = "ArrowUpIcon";

const VerifiedIcon = memo(() => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
));
VerifiedIcon.displayName = "VerifiedIcon";

const ChevronRightIcon = memo(() => (
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
    <path d="M9 5l7 7-7 7" />
  </svg>
));
ChevronRightIcon.displayName = "ChevronRightIcon";

const YoutubeIcon = memo(() => (
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

// ── Platform Config ────────────────────────────────────

const PLATFORM_CONFIG = {
  youtube: {
    Icon: YoutubeIcon,
    name: "YouTube",
    color: "#dc2626",
    bgLight: "#fef2f2",
    bgDark: "rgba(220, 38, 38, 0.1)",
  },
  instagram: {
    Icon: InstagramIcon,
    name: "Instagram",
    color: "#e1306c",
    bgLight: "var(--color-accent-50)",
    bgDark: "rgba(225, 48, 108, 0.1)",
  },
  tiktok: {
    Icon: TikTokIcon,
    name: "TikTok",
    color: "var(--color-text-primary)",
    bgLight: "var(--color-surface-100)",
    bgDark: "rgba(255,255,255,0.08)",
  },
};

// ── Testimonial Data ───────────────────────────────────

const TESTIMONIALS = Object.freeze([
  {
    id: 1,
    name: "Sarah Chen",
    handle: "@sarahcreates",
    avatar: "SC",
    platform: "youtube",
    before: { value: "12K", label: "subscribers" },
    after: { value: "847K", label: "subscribers" },
    growthPercent: "6,958%",
    quote:
      "I went from posting blindly to having a real strategy. OnlyCreators showed me exactly when my audience was active and what content they craved.",
    highlight: "Real strategy that works",
    rating: 5,
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "Marcus Rivera",
    handle: "@marcusflow",
    avatar: "MR",
    platform: "tiktok",
    before: { value: "5K", label: "followers" },
    after: { value: "2.3M", label: "followers" },
    growthPercent: "45,900%",
    quote:
      "The trend detection is insane. I caught 3 viral waves early because OnlyCreators spotted them before they peaked.",
    highlight: "Viral wave catcher",
    rating: 5,
    verified: true,
    featured: false,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    handle: "@emmastyle",
    avatar: "ER",
    platform: "instagram",
    before: { value: "28K", label: "followers" },
    after: { value: "567K", label: "followers" },
    growthPercent: "1,925%",
    quote:
      "I used to spend 3 hours a day checking analytics. Now I spend 10 minutes with OnlyCreators and know everything I need.",
    highlight: "Time saver extraordinaire",
    rating: 5,
    verified: true,
    featured: false,
  },
]);

const SOCIAL_STATS = Object.freeze([
  {
    value: 15000,
    suffix: "+",
    label: "Active Creators",
    color: "var(--color-accent-500)",
  },
  {
    value: 49,
    suffix: "/5",
    label: "Average Rating",
    color: "var(--color-warning-500)",
    divisor: 10,
  },
  {
    value: 25,
    suffix: "M+",
    label: "Followers Gained",
    color: "var(--color-success-500)",
    divisor: 10,
  },
]);

// ── Star Rating ────────────────────────────────────────

const StarRating = memo(({ rating }) => (
  <div
    className="flex items-center gap-0.5"
    aria-label={`${rating} out of 5 stars`}
  >
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        style={{
          color:
            i < rating
              ? "var(--color-warning-400)"
              : "var(--color-surface-300)",
        }}
      >
        <StarIcon />
      </span>
    ))}
  </div>
));
StarRating.displayName = "StarRating";

// ── Growth Badge ───────────────────────────────────────

const GrowthBadge = memo(({ percent }) => (
  <div
    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
    style={{
      background: "var(--color-success-50)",
      color: "var(--color-success-600)",
      border: "1px solid var(--color-success-200)",
    }}
  >
    <ArrowUpIcon />
    <span>{percent}</span>
  </div>
));
GrowthBadge.displayName = "GrowthBadge";

// ── Platform Badge ─────────────────────────────────────

const PlatformBadge = memo(({ platform }) => {
  const config = PLATFORM_CONFIG[platform];
  const Icon = config.Icon;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
      style={{
        background: config.bgLight,
        border: `1px solid color-mix(in srgb, ${config.color} 15%, transparent)`,
      }}
    >
      <span style={{ color: config.color }}>
        <Icon />
      </span>
      <span
        className="text-xs font-semibold"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {config.name}
      </span>
    </div>
  );
});
PlatformBadge.displayName = "PlatformBadge";

// ── Testimonial Card ───────────────────────────────────

const TestimonialCard = memo(({ testimonial, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const platform = PLATFORM_CONFIG[testimonial.platform];

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative transition-all duration-700"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${200 + index * 150}ms`,
        perspective: "1200px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D tilt wrapper */}
      <div
        className="relative h-full transition-transform duration-300 ease-out"
        style={{
          transform: isHovered
            ? `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) scale(1.01)`
            : "rotateY(0) rotateX(0) scale(1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute -inset-1 rounded-[1.75rem] transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${platform.color}, transparent 70%)`,
            filter: "blur(20px)",
            opacity: isHovered ? 0.2 : 0,
          }}
          aria-hidden="true"
        />

        {/* Main card */}
        <div
          className="relative h-full flex flex-col rounded-[1.5rem] p-6 sm:p-7 md:p-8 transition-all duration-500"
          style={{
            background: "var(--color-surface-50)",
            border: `1px solid ${isHovered ? "var(--color-secondary-300)" : "var(--color-secondary-200)"}`,
            boxShadow: isHovered
              ? "0 25px 50px -12px rgba(0,0,0,0.08), 0 12px 24px -8px rgba(0,0,0,0.04)"
              : "0 8px 24px -4px rgba(0,0,0,0.04), 0 4px 12px -2px rgba(0,0,0,0.02)",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Featured badge */}
          {testimonial.featured && (
            <div
              className="absolute -top-3 left-6 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg"
              style={{
                background: `linear-gradient(135deg, var(--color-accent-400), var(--color-warning-400))`,
                color: "#fff",
                boxShadow:
                  "0 4px 12px -2px color-mix(in srgb, var(--color-accent-400) 40%, transparent)",
              }}
            >
              ⭐ Featured
            </div>
          )}

          {/* Top: Platform + Growth */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <PlatformBadge platform={testimonial.platform} />
            <GrowthBadge percent={testimonial.growthPercent} />
          </div>

          {/* Before / After stats */}
          <div
            className="relative rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 overflow-hidden"
            style={{
              background: "var(--color-surface-100)",
              border: "1px solid var(--color-secondary-200)",
            }}
          >
            {/* Subtle dot pattern */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--color-secondary-400) 0.5px, transparent 0.5px)",
                backgroundSize: "14px 14px",
                opacity: 0.06,
              }}
              aria-hidden="true"
            />

            <div className="relative flex items-center">
              {/* Before */}
              <div className="flex-1 text-center">
                <div
                  className="text-[10px] sm:text-xs uppercase font-semibold mb-1"
                  style={{
                    color: "var(--color-text-light)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Before
                </div>
                <div
                  className="text-xl sm:text-2xl font-extrabold tabular-nums"
                  style={{ color: "var(--color-secondary-400)" }}
                >
                  {testimonial.before.value}
                </div>
                <div
                  className="text-[10px] sm:text-xs mt-0.5"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {testimonial.before.label}
                </div>
              </div>

              {/* Arrow divider */}
              <div className="flex flex-col items-center px-3 sm:px-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--color-accent-400)" }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* After */}
              <div className="flex-1 text-center">
                <div
                  className="text-[10px] sm:text-xs uppercase font-semibold mb-1"
                  style={{
                    color: "var(--color-text-light)",
                    letterSpacing: "0.1em",
                  }}
                >
                  After
                </div>
                <div
                  className="text-xl sm:text-2xl font-extrabold tabular-nums"
                  style={{ color: platform.color }}
                >
                  {testimonial.after.value}
                </div>
                <div
                  className="text-[10px] sm:text-xs mt-0.5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {testimonial.after.label}
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="flex-1 relative mb-5 sm:mb-6">
            <div
              className="absolute -top-1 -left-1"
              style={{ color: "var(--color-accent-300)" }}
            >
              <QuoteIcon />
            </div>
            <blockquote className="relative z-10 pl-5 sm:pl-6">
              <p
                className="text-sm sm:text-base leading-relaxed italic"
                style={{ color: "var(--color-text-secondary)" }}
              >
                "{testimonial.quote}"
              </p>
            </blockquote>

            {/* Highlight tag */}
            <div
              className="inline-flex items-center mt-3 ml-5 sm:ml-6 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold"
              style={{
                background: "var(--color-accent-50)",
                color: "var(--color-accent-600)",
                border: "1px solid var(--color-accent-200)",
              }}
            >
              💡 {testimonial.highlight}
            </div>
          </div>

          {/* Author */}
          <div
            className="flex items-center gap-3 sm:gap-4 pt-5 sm:pt-6"
            style={{ borderTop: "1px solid var(--color-secondary-200)" }}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${platform.color}, color-mix(in srgb, ${platform.color} 70%, #000))`,
                  boxShadow: `0 4px 12px -2px ${platform.color}40`,
                  width: "clamp(2.75rem, 4vw, 3.25rem)",
                  height: "clamp(2.75rem, 4vw, 3.25rem)",
                }}
              >
                {testimonial.avatar}
              </div>
              {testimonial.verified && (
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                  style={{
                    background: "var(--color-primary-500)",
                    color: "#fff",
                  }}
                >
                  <VerifiedIcon />
                </div>
              )}
            </div>

            {/* Name + Handle */}
            <div className="flex-1 min-w-0">
              <div
                className="font-bold text-sm sm:text-base truncate"
                style={{ color: "var(--color-text-primary)" }}
              >
                {testimonial.name}
              </div>
              <div
                className="text-xs sm:text-sm truncate"
                style={{ color: "var(--color-text-light)" }}
              >
                {testimonial.handle}
              </div>
            </div>

            {/* Rating */}
            <div className="shrink-0 hidden sm:block">
              <StarRating rating={testimonial.rating} />
            </div>
          </div>

          {/* Mobile rating */}
          <div className="sm:hidden mt-3 flex justify-center">
            <StarRating rating={testimonial.rating} />
          </div>
        </div>

        {/* 3D depth shadow */}
        <div
          className="absolute inset-2 rounded-[1.5rem] -z-10 transition-all duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, var(--color-secondary-300), var(--color-secondary-200))`,
            filter: `blur(${isHovered ? 24 : 16}px)`,
            opacity: isHovered ? 0.35 : 0.2,
            transform: isHovered
              ? "translateY(12px) scale(0.97)"
              : "translateY(8px) scale(0.98)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
});
TestimonialCard.displayName = "TestimonialCard";

// ── Stats Banner ───────────────────────────────────────

const StatItem = memo(({ stat, index, isVisible }) => {
  const rawCount = useCounter(stat.value, isVisible, 1400 + index * 200);

  const displayValue = stat.divisor
    ? (rawCount / stat.divisor).toFixed(1)
    : rawCount.toLocaleString();

  return (
    <div
      className="text-center transition-all duration-600"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transitionDelay: `${800 + index * 120}ms`,
      }}
    >
      <div
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold tabular-nums leading-none"
        style={{ color: stat.color }}
      >
        {displayValue}
        <span className="text-lg sm:text-xl md:text-2xl">{stat.suffix}</span>
      </div>
      <div
        className="text-xs sm:text-sm mt-1.5 font-medium"
        style={{ color: "var(--color-text-muted)" }}
      >
        {stat.label}
      </div>
    </div>
  );
});
StatItem.displayName = "StatItem";

const StatsBanner = memo(({ isVisible }) => (
  <div
    className="grid grid-cols-3 gap-4 sm:gap-8 mt-14 sm:mt-18 md:mt-22 p-5 sm:p-7 md:p-8 rounded-2xl transition-all duration-700"
    style={{
      background: "var(--color-surface-50)",
      border: "1px solid var(--color-secondary-200)",
      boxShadow: "0 8px 32px -8px rgba(0,0,0,0.06)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(12px)",
      transitionDelay: "600ms",
    }}
  >
    {SOCIAL_STATS.map((stat, i) => (
      <StatItem key={stat.label} stat={stat} index={i} isVisible={isVisible} />
    ))}
  </div>
));
StatsBanner.displayName = "StatsBanner";

// ── Section Header ─────────────────────────────────────

const SectionHeader = memo(({ isVisible }) => (
  <div className="text-center mb-12 sm:mb-16 md:mb-20">
    {/* Badge */}
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
        Creator Success Stories
      </span>
    </div>

    {/* Title */}
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
      Real creators.{" "}
      <span
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Real results.
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
      See how creators like you transformed their content strategy — and their
      numbers — with AI-powered insights.
    </p>
  </div>
));
SectionHeader.displayName = "SectionHeader";

// ── Bottom CTA ─────────────────────────────────────────

const BottomCTA = memo(({ isVisible }) => (
  <div
    className="mt-12 sm:mt-16 md:mt-20 text-center transition-all duration-800"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(12px)",
      transitionDelay: "900ms",
    }}
  >
    {/* Divider */}
    <div
      className="mx-auto w-16 h-px mb-8 sm:mb-10"
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--color-accent-300), transparent)",
      }}
    />

    <p
      className="text-sm sm:text-base mb-6 sm:mb-8"
      style={{ color: "var(--color-text-muted)" }}
    >
      Join thousands of creators who've transformed their content strategy
    </p>

    <button
      className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-base font-semibold overflow-hidden transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        background:
          "linear-gradient(135deg, var(--color-accent-500), var(--color-error-500))",
        color: "#fff",
        boxShadow:
          "0 8px 24px -4px color-mix(in srgb, var(--color-accent-500) 35%, transparent)",
        outlineColor: "var(--color-accent-500)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 16px 40px -6px color-mix(in srgb, var(--color-accent-500) 50%, transparent)";
        e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 24px -4px color-mix(in srgb, var(--color-accent-500) 35%, transparent)";
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        Start Your Transformation
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <ChevronRightIcon />
        </span>
      </span>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, var(--color-error-500), var(--color-accent-600))",
        }}
      />
    </button>
  </div>
));
BottomCTA.displayName = "BottomCTA";

// ── Background Effects ─────────────────────────────────

const SectionBackground = memo(() => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    {/* Warm gradient orbs */}
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(300px, 40vw, 500px)",
        height: "clamp(300px, 40vw, 500px)",
        top: "-5%",
        left: "15%",
        background: "var(--color-accent-100)",
        filter: "blur(120px)",
        opacity: 0.15,
      }}
    />
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(250px, 35vw, 450px)",
        height: "clamp(250px, 35vw, 450px)",
        bottom: "5%",
        right: "10%",
        background: "var(--color-error-100)",
        filter: "blur(120px)",
        opacity: 0.1,
      }}
    />

    {/* Floating rings */}
    <div
      className="absolute w-20 h-20 rounded-full hidden md:block"
      style={{
        top: "12%",
        right: "8%",
        border: "1px solid var(--color-accent-200)",
        opacity: 0.3,
        animation: "oc-test-float 7s ease-in-out infinite",
      }}
    />
    <div
      className="absolute w-14 h-14 rounded-full hidden md:block"
      style={{
        bottom: "20%",
        left: "6%",
        border: "1px solid var(--color-error-200)",
        opacity: 0.25,
        animation: "oc-test-float 9s ease-in-out infinite 1.5s",
      }}
    />

    {/* Dot grid */}
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

// ── MAIN COMPONENT ─────────────────────────────────────

const Testimonials = () => {
  const [headerRef, headerVisible] = useInView(0.15);
  const [cardsRef, cardsVisible] = useInView(0.08);
  const [statsRef, statsVisible] = useInView(0.2);
  const [ctaRef, ctaVisible] = useInView(0.2);

  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-6 overflow-hidden"
      style={{ background: "var(--color-secondary-100)" }}
      aria-labelledby="testimonials-heading"
    >
      <SectionBackground />

      <div className="relative max-w-6xl mx-auto">
        {/* SR heading */}
        <h2 className="sr-only" id="testimonials-heading">
          Creator success stories and testimonials
        </h2>

        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader isVisible={headerVisible} />
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 lg:gap-8"
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={i}
              isInView={cardsVisible}
            />
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef}>
          <StatsBanner isVisible={statsVisible} />
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef}>
          <BottomCTA isVisible={ctaVisible} />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes oc-test-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
};

export default memo(Testimonials);

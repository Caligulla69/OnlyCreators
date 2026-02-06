import React, { useState, useEffect, useRef } from "react";

// ============================================
// TURNING POINT SECTION
// Enhanced Curtain Reveal Design
// ============================================

// Icons
const Icons = {
  Youtube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white" />
    </svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  TikTok: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  TrendingUp: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Users: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  MessageCircle: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  DollarSign: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Check: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Zap: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Eye: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

// Stats Data
const statsData = [
  {
    label: "Total Reach",
    value: "12.4M",
    icon: Icons.TrendingUp,
    color: "primary",
    gradient: "from-primary-500 to-primary-600",
    bgGradient: "from-primary-50 to-primary-100",
  },
  {
    label: "Engagement",
    value: "847K",
    icon: Icons.MessageCircle,
    color: "accent",
    gradient: "from-accent-500 to-accent-600",
    bgGradient: "from-accent-50 to-accent-100",
  },
  {
    label: "Followers",
    value: "152K",
    icon: Icons.Users,
    color: "primary",
    gradient: "from-primary-400 to-primary-500",
    bgGradient: "from-primary-50 to-primary-100",
  },
  {
    label: "Revenue",
    value: "$8.4K",
    icon: Icons.DollarSign,
    color: "success",
    gradient: "from-success-500 to-success-600",
    bgGradient: "from-success-50 to-success-100",
  },
];

// Chart bar heights
const chartBars = [35, 55, 42, 78, 52, 88, 65, 95, 72, 85, 68, 100];

// Platform Button Component
const PlatformButton = ({ Icon, isActive, delay, isVisible, color }) => (
  <div
    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-500 cursor-pointer ${
      isActive
        ? `${color} text-white shadow-lg`
        : "bg-white text-text-muted hover:text-text-secondary border border-secondary-200 hover:border-secondary-300 hover:shadow-md"
    } ${
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-4 scale-90"
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <Icon />
  </div>
);

// Stat Card Component
const StatCard = ({ stat, index, isInView }) => {
  const Icon = stat.icon;

  return (
    <div
      className={`group relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 transition-all duration-700 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${400 + index * 100}ms` }}
    >
      {/* Hover glow effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-500`}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
        >
          <div className={`text-${stat.color}-500`}>
            <Icon />
          </div>
        </div>

        {/* Value */}
        <div
          className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
        >
          {stat.value}
        </div>

        {/* Label */}
        <div className="text-xs sm:text-sm text-gray-400 mt-1">
          {stat.label}
        </div>
      </div>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = ({ isInView }) => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-secondary-50/80 via-white to-primary-50/30">
      {/* Header */}
      <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-gray-100/80 bg-white/60 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Platform toggles */}
          <div className="flex items-center gap-2 sm:gap-3">
            <PlatformButton
              Icon={Icons.Youtube}
              isActive={true}
              color="bg-gradient-to-br from-error-500 to-error-600 shadow-error-500/25"
              delay={200}
              isVisible={isInView}
            />
            <PlatformButton
              Icon={Icons.Instagram}
              isActive={false}
              color="bg-gradient-to-br from-accent-500 to-accent-600"
              delay={300}
              isVisible={isInView}
            />
            <PlatformButton
              Icon={Icons.TikTok}
              isActive={false}
              color="bg-primary-800"
              delay={400}
              isVisible={isInView}
            />
          </div>

          {/* Sync status */}
          <div
            className={`flex items-center gap-2 px-4 py-2 bg-success-50 rounded-full border border-success-100 transition-all duration-500 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-success-700">
              All Synced
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-5 sm:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statsData.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 px-5 sm:px-8 pb-5 sm:pb-6">
        <div className="h-full bg-white rounded-2xl border border-secondary-200 shadow-sm p-4 sm:p-6">
          {/* Chart Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div
              className={`transition-all duration-500 ${
                isInView ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <h4 className="text-sm font-semibold text-gray-900">
                Growth Overview
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Performance across all platforms
              </p>
            </div>
            <div
              className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100/50 transition-all duration-500 ${
                isInView ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "750ms" }}
            >
              <Icons.Zap />
              <span className="text-xs font-semibold text-primary-600">
                +24% Growth
              </span>
            </div>
          </div>

          {/* Chart Bars */}
          <div className="flex items-end justify-between h-24 sm:h-32 md:h-40 gap-1.5 sm:gap-2">
            {chartBars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md sm:rounded-t-lg bg-primary-500 transition-all duration-1000 relative group cursor-pointer hover:bg-primary-600"
                style={{
                  height: isInView ? `${h}%` : "0%",
                  transitionDelay: `${900 + i * 60}ms`,
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-primary-600 rounded-t-md sm:rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {Math.round(h * 1.2)}K
                </div>
              </div>
            ))}
          </div>

          {/* Chart Labels */}
          <div className="flex justify-between mt-3 sm:mt-4">
            {[
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
            ].map((month, i) => (
              <span
                key={i}
                className={`text-[9px] sm:text-[10px] text-gray-400 transition-all duration-500 ${
                  isInView ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${1100 + i * 30}ms` }}
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Footer */}
      <div className="px-5 sm:px-8 py-4 bg-gradient-to-r from-primary-50/80 via-secondary-50/80 to-accent-50/80 border-t border-primary-100/30">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {[
            {
              icon: Icons.Zap,
              text: "Best time: 7 PM",
              color: "text-primary-600",
            },
            {
              icon: Icons.Eye,
              text: "Peak day: Tuesday",
              color: "text-accent-600",
            },
            {
              icon: Icons.TrendingUp,
              text: "Trending: Tutorials",
              color: "text-orange-600",
            },
          ].map((insight, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 ${
                insight.color
              } transition-all duration-500 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${1400 + i * 100}ms` }}
            >
              <insight.icon />
              <span className="text-xs sm:text-sm font-medium">
                {insight.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Curtain Component
const Curtain = ({ side, revealed }) => {
  const isLeft = side === "left";

  return (
    <div
      className={`absolute top-0 ${
        isLeft ? "left-0" : "right-0"
      } w-1/2 h-full z-10 transition-transform duration-1000 ${
        isLeft ? "origin-left" : "origin-right"
      } ${
        revealed
          ? isLeft
            ? "-translate-x-full"
            : "translate-x-full"
          : "translate-x-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      {/* Curtain background with gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-${
          isLeft ? "r" : "l"
        } from-white via-white to-primary-50/50`}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Edge glow line */}
      <div
        className={`absolute ${
          isLeft ? "right-0" : "left-0"
        } top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary-400 to-transparent`}
      />

      {/* Edge shimmer effect */}
      <div
        className={`absolute ${
          isLeft ? "right-0" : "left-0"
        } top-0 h-full w-8 bg-gradient-to-${
          isLeft ? "l" : "r"
        } from-primary-200/20 to-transparent`}
      />
    </div>
  );
};

// Sparkle Component
const Sparkle = ({ style }) => (
  <div
    className="absolute w-1 h-1 rounded-full animate-ping"
    style={{
      background:
        "linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))",
      ...style,
    }}
  />
);

// Main Component
const TurningPoint = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Intersection Observer
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Reveal curtain
  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="turning-point"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-secondary-100 overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-100/50 via-white to-white" />

        {/* Animated gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"
          style={{ animation: "pulse 4s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl"
          style={{
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-100/20 via-accent-100/20 to-secondary-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          {/* Chapter Badge */}
          <div className="overflow-hidden mb-6">
            <div
              className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-100 via-secondary-50 to-primary-100 rounded-full border border-primary-200/50 transition-all duration-700 ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-primary-600 tracking-wide">
                The Turning Point
              </span>
            </div>
          </div>

          {/* "See" text */}
          <div className="overflow-hidden">
            <h2
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-text-primary leading-none mb-2 sm:mb-4 transition-transform duration-1000 ${
                isInView ? "translate-y-0" : "translate-y-full"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              See
            </h2>
          </div>

          {/* "Everything" text */}
          <div className="overflow-hidden">
            <h2
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic leading-none transition-transform duration-1000 ${
                isInView ? "translate-y-0" : "translate-y-full"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <span className="text-primary-600">Everything</span>
            </h2>
          </div>

          {/* Animated underline */}
          <div className="flex justify-center mt-4">
            <svg
              className={`w-48 sm:w-64 h-3 transition-all duration-1000 ${
                isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "600ms" }}
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
            >
              <path
                d="M0 6 Q 50 0, 100 6 T 200 6"
                fill="none"
                stroke="url(#underline-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="underline-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="var(--color-primary-600)" />
                  <stop offset="50%" stopColor="var(--color-primary-500)" />
                  <stop offset="100%" stopColor="var(--color-accent-500)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Dashboard with Curtain Reveal */}
        <div className="relative h-[400px] sm:h-[500px] md:h-[580px] lg:h-[640px]">
          {/* Decorative frame glow */}
          <div
            className={`absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-accent-500/20 rounded-[2rem] sm:rounded-[2.5rem] blur-xl transition-opacity duration-1000 ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Dashboard container */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/10 border border-secondary-200/50">
            {/* Dashboard Content */}
            <div className="absolute inset-0">
              <DashboardContent isInView={revealed} />
            </div>

            {/* Curtains */}
            <Curtain side="left" revealed={revealed} />
            <Curtain side="right" revealed={revealed} />

            {/* Center reveal line */}
            <div
              className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 ${
                revealed ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent" />

              {/* Sparkle effects */}
              {[...Array(8)].map((_, i) => (
                <Sparkle
                  key={i}
                  style={{
                    left: `${48 + Math.random() * 4}%`,
                    top: `${5 + i * 12}%`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: "1.2s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Caption & Feature Tags */}
        <div
          className={`text-center mt-10 sm:mt-14 transition-all duration-1000 ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <p className="text-text-muted text-base sm:text-lg mb-6">
            One dashboard. Three platforms.{" "}
            <span className="text-text-primary font-medium">
              Infinite clarity.
            </span>
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              { text: "Real-time Sync", delay: 1300 },
              { text: "AI Insights", delay: 1400 },
              { text: "Cross-platform", delay: 1500 },
            ].map((tag, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-white text-text-secondary text-xs sm:text-sm rounded-full border border-secondary-200 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-500 cursor-pointer ${
                  revealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${tag.delay}ms` }}
              >
                <span className="w-4 h-4 rounded-full bg-gradient-to-br from-success-400 to-success-500 flex items-center justify-center text-white">
                  <Icons.Check />
                </span>
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
};

export default TurningPoint;

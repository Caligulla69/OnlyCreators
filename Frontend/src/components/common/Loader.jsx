import { memo } from "react";

// ============================================
// SMOOTH GRADIENT ARC SPINNER
// ============================================
const Loader = memo(
  ({ size = "md", color = "primary", fullScreen = false, text = "" }) => {
    const sizes = {
      sm: { container: "w-5 h-5", stroke: 2.5 },
      md: { container: "w-8 h-8", stroke: 2.5 },
      lg: { container: "w-12 h-12", stroke: 2 },
      xl: { container: "w-16 h-16", stroke: 2 },
    };

    const colors = {
      primary: {
        track: "stroke-primary-200 dark:stroke-primary-900/40",
        arc: "stroke-primary-600 dark:stroke-primary-400",
        glow: "drop-shadow-[0_0_6px_rgba(58,125,148,0.35)] dark:drop-shadow-[0_0_6px_rgba(58,125,148,0.25)]",
      },
      secondary: {
        track: "stroke-secondary-200 dark:stroke-secondary-800/40",
        arc: "stroke-secondary-500 dark:stroke-secondary-400",
        glow: "drop-shadow-[0_0_6px_rgba(196,143,42,0.3)]",
      },
      white: {
        track: "stroke-white/20",
        arc: "stroke-white",
        glow: "drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]",
      },
    };

    const { container, stroke } = sizes[size] || sizes.md;
    const colorSet = colors[color] || colors.primary;

    // SVG circle math — r=10, circumference ≈ 62.83
    const r = 10;
    const circumference = 2 * Math.PI * r;
    const arcLength = circumference * 0.28; // visible arc ~28%
    const gapLength = circumference - arcLength;

    const spinner = (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className={`${container} relative ${colorSet.glow}`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full"
            aria-hidden="true"
          >
            {/* Background track */}
            <circle
              cx="12"
              cy="12"
              r={r}
              strokeWidth={stroke}
              className={`${colorSet.track} transition-colors duration-300`}
              strokeLinecap="round"
            />
            {/* Animated gradient arc */}
            <circle
              cx="12"
              cy="12"
              r={r}
              strokeWidth={stroke}
              className={`${colorSet.arc} transition-colors duration-300`}
              strokeLinecap="round"
              strokeDasharray={`${arcLength} ${gapLength}`}
              style={{
                transformOrigin: "center",
                animation:
                  "oc-spinner-rotate 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
              }}
            />
          </svg>
        </div>

        {text && (
          <p
            className="text-sm font-medium text-text-muted dark:text-dark-text-muted animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            {text}
          </p>
        )}

        <style>{`
          @keyframes oc-spinner-rotate {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );

    if (fullScreen) {
      return (
        <div className="fixed inset-0 bg-surface-50/80 dark:bg-dark-bg/80 backdrop-blur-sm flex items-center justify-center z-50 transition-colors duration-300">
          {spinner}
        </div>
      );
    }

    return spinner;
  },
);
Loader.displayName = "Loader";

// ============================================
// SHIMMER SKELETON LOADER
// Smooth left→right shimmer instead of basic pulse
// ============================================
export const SkeletonLoader = memo(({ className = "", variant = "text" }) => {
  const variants = {
    text: "h-4 w-full",
    title: "h-8 w-3/4",
    avatar: "h-12 w-12 rounded-full",
    thumbnail: "h-24 w-40 rounded-lg",
    card: "h-48 w-full rounded-xl",
    chart: "h-64 w-full rounded-xl",
  };

  return (
    <>
      <div
        className={`
            relative overflow-hidden rounded
            bg-surface-200/70 dark:bg-dark-surface-light/50
            ${variants[variant]} ${className}
          `}
      >
        {/* Shimmer sweep — light mode: white highlight, dark mode: subtle white */}
        <div
          className="absolute inset-0 oc-skeleton-shimmer"
          aria-hidden="true"
        />
      </div>
      <style>{`
          .oc-skeleton-shimmer {
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255,255,255,0.45) 40%,
              rgba(255,255,255,0.65) 50%,
              rgba(255,255,255,0.45) 60%,
              transparent 100%
            );
            animation: oc-skeleton-slide 1.8s cubic-bezier(0.4,0,0.6,1) infinite;
          }
          .dark .oc-skeleton-shimmer {
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255,255,255,0.04) 35%,
              rgba(255,255,255,0.08) 50%,
              rgba(255,255,255,0.04) 65%,
              transparent 100%
            );
          }
          @keyframes oc-skeleton-slide {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
    </>
  );
});
SkeletonLoader.displayName = "SkeletonLoader";

// ============================================
// PRESET SKELETON COMPOSITIONS
// ============================================
export const CardSkeleton = memo(() => (
  <div className="bg-surface-50 dark:bg-dark-surface rounded-2xl p-6 shadow-sm border border-surface-200 dark:border-dark-border">
    <div className="flex items-start justify-between mb-4">
      <div className="space-y-2">
        <SkeletonLoader className="h-4 w-24" />
        <SkeletonLoader className="h-8 w-32" />
      </div>
      <SkeletonLoader className="h-12 w-12 rounded-xl" />
    </div>
    <div className="flex items-center justify-between">
      <SkeletonLoader className="h-6 w-20 rounded-full" />
      <SkeletonLoader className="h-10 w-20" />
    </div>
  </div>
));
CardSkeleton.displayName = "CardSkeleton";

export const TableSkeleton = memo(({ rows = 5 }) => (
  <div className="bg-surface-50 dark:bg-dark-surface rounded-2xl shadow-sm border border-surface-200 dark:border-dark-border overflow-hidden">
    <div className="p-6 border-b border-surface-200 dark:border-dark-border">
      <SkeletonLoader className="h-6 w-48" />
    </div>
    <div className="divide-y divide-surface-200 dark:divide-dark-border">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 flex items-center gap-4">
          <SkeletonLoader variant="thumbnail" className="w-24 h-14" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader className="h-4 w-3/4" />
            <SkeletonLoader className="h-3 w-1/2" />
          </div>
          <SkeletonLoader className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  </div>
));
TableSkeleton.displayName = "TableSkeleton";

export const ChartSkeleton = memo(() => (
  <div className="bg-surface-50 dark:bg-dark-surface rounded-2xl p-6 shadow-sm border border-surface-200 dark:border-dark-border">
    <div className="flex items-center justify-between mb-6">
      <SkeletonLoader className="h-6 w-40" />
      <SkeletonLoader className="h-10 w-32 rounded-lg" />
    </div>
    <SkeletonLoader variant="chart" />
  </div>
));
ChartSkeleton.displayName = "ChartSkeleton";

export const DashboardSkeleton = memo(() => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-2">
        <SkeletonLoader className="h-10 w-48" />
        <SkeletonLoader className="h-4 w-72" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonLoader className="h-10 w-36 rounded-xl" />
        <SkeletonLoader className="h-10 w-24 rounded-xl" />
      </div>
    </div>

    {/* Quick Insights */}
    <SkeletonLoader className="h-40 w-full rounded-2xl" />

    {/* Metric Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {[...Array(4)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <ChartSkeleton />
      </div>
      <ChartSkeleton />
    </div>

    {/* Bottom Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TableSkeleton rows={5} />
      </div>
      <div className="bg-surface-50 dark:bg-dark-surface rounded-2xl p-6 shadow-sm border border-surface-200 dark:border-dark-border">
        <SkeletonLoader className="h-6 w-32 mb-4" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonLoader className="h-8 w-8 rounded-lg" />
              <SkeletonLoader variant="thumbnail" className="w-16 h-10" />
              <div className="flex-1 space-y-1">
                <SkeletonLoader className="h-4 w-full" />
                <SkeletonLoader className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
));
DashboardSkeleton.displayName = "DashboardSkeleton";

export default Loader;

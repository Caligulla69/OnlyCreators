import React, { useState, useEffect, useRef } from "react";

// ============================================
// METRICS SECTION - The Numbers
// Clean, Elegant, Animated Counters
// ============================================

// Animated counter hook
const useCounter = (end, duration = 2000, isActive = true) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;

    hasAnimated.current = true;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quart for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOut));

      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate);
      }
    };

    countRef.current = requestAnimationFrame(animate);

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [end, duration, isActive]);

  return count;
};

// Format number with commas
const formatNumber = (num) => {
  return num.toLocaleString("en-US");
};

// Stats data
const stats = [
  {
    id: 1,
    value: 15000,
    suffix: "+",
    label: "Creators",
    description: "Trust their growth to us",
  },
  {
    id: 2,
    value: 50,
    suffix: "M+",
    label: "Insights",
    description: "Generated every day",
  },
  {
    id: 3,
    value: 3,
    suffix: "x",
    label: "Growth",
    description: "Average engagement increase",
  },
  {
    id: 4,
    value: 24,
    suffix: "/7",
    label: "Monitoring",
    description: "Never miss a moment",
  },
];

// Individual Stat Card Component
const StatCard = ({ stat, index, isInView }) => {
  const count = useCounter(stat.value, 2000 + index * 200, isInView);

  return (
    <div
      className={`relative text-center p-6 sm:p-8 transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${200 + index * 100}ms` }}
    >
      {/* Value */}
      <div className="mb-3">
        <span className="text-4xl text-white/60 sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          {stat.value >= 1000 ? formatNumber(count) : count}
          <span className="text-accent-500">{stat.suffix}</span>
        </span>
      </div>

      {/* Label */}
      <div className="text-lg sm:text-xl font-semibold text-primary-800 mb-1">
        {stat.label}
      </div>

      {/* Description */}
      <div className="text-sm text-text-muted">{stat.description}</div>
    </div>
  );
};

// Main Metrics Component
const Metrics = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

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

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-primary-700 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-700" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-primary-300 mb-4">
            The Numbers
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white">
            Growth in <span className="italic text-accent-400">numbers</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Bottom Accent Line */}
        <div
          className={`mt-12 sm:mt-16 md:mt-20 flex justify-center transition-all duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-primary-400" />
            <div className="w-2 h-2 rounded-full bg-accent-500" />
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-primary-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Metrics;

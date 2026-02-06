import React, { useState, useEffect, useRef } from "react";

// ============================================
// PROBLEMS SECTION - Chapter Two
// Professional, Optimized, Responsive
// ============================================

// Professional SVG Icons
const Icons = {
  TrendingDown: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  HelpCircle: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Clock: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Users: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  BarChart: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  Zap: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

// Color configurations (avoiding dynamic Tailwind classes)
const colorConfig = {
  purple: {
    bg: "bg-primary-50",
    bgGradientFrom: "from-primary-100",
    bgGradientTo: "to-primary-50",
    border: "border-primary-200",
    borderActive: "border-primary-300",
    text: "text-primary-600",
    iconBg: "bg-primary-100",
    shadow: "shadow-primary-100/50",
    pulseRing: "bg-primary-100",
    statBorder: "border-primary-100",
  },
  blue: {
    bg: "bg-primary-50",
    bgGradientFrom: "from-primary-100",
    bgGradientTo: "to-primary-50",
    border: "border-primary-200",
    borderActive: "border-primary-300",
    text: "text-primary-600",
    iconBg: "bg-primary-100",
    shadow: "shadow-primary-100/50",
    pulseRing: "bg-primary-100",
    statBorder: "border-primary-100",
  },
  rose: {
    bg: "bg-accent-50",
    bgGradientFrom: "from-accent-100",
    bgGradientTo: "to-accent-50",
    border: "border-accent-200",
    borderActive: "border-accent-300",
    text: "text-accent-600",
    iconBg: "bg-accent-100",
    shadow: "shadow-accent-100/50",
    pulseRing: "bg-accent-100",
    statBorder: "border-accent-100",
  },
};

// Problem data with professional icons
const problems = [
  {
    Icon: Icons.TrendingDown,
    title: "Where did my audience go?",
    description:
      "You check your analytics obsessively, switching between tabs, trying to piece together the story of why your last video underperformed.",
    stat: "73%",
    statLabel: "of creators struggle with this",
    color: "purple",
  },
  {
    Icon: Icons.HelpCircle,
    title: "Which content actually works?",
    description:
      "Hours spent creating, but you're never quite sure what resonates. Is it the topic? The timing? The thumbnail? The algorithm remains a mystery.",
    stat: "4.5hrs",
    statLabel: "average time spent analyzing",
    color: "blue",
  },
  {
    Icon: Icons.Clock,
    title: "Am I missing the next trend?",
    description:
      "By the time you spot what's trending, everyone else has too. You're always one step behind, reacting instead of leading.",
    stat: "89%",
    statLabel: "feel they miss opportunities",
    color: "rose",
  },
];

// FadeIn animation component
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Individual Problem Card Component
const ProblemCard = ({
  problem,
  index,
  isActive,
  onHover,
  onLeave,
  isInView,
}) => {
  const { Icon, title, description, stat, statLabel, color } = problem;
  const colors = colorConfig[color];

  return (
    <div
      className={`relative transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${300 + index * 150}ms` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Pulse ring effect on hover */}
      <div
        className={`absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none ${
          isActive ? "opacity-100 scale-105" : "opacity-0 scale-100"
        }`}
      >
        <div
          className={`absolute inset-0 rounded-3xl ${colors.pulseRing} animate-pulse`}
        />
      </div>

      {/* Main Card */}
      <div
        className={`relative bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all duration-500 h-full flex flex-col ${
          isActive
            ? `${colors.borderActive} shadow-xl ${colors.shadow}`
            : "border-secondary-200 shadow-lg hover:shadow-xl"
        }`}
      >
        {/* Icon Container */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${
            colors.bgGradientFrom
          } ${
            colors.bgGradientTo
          } flex items-center justify-center mb-6 transition-all duration-500 ${
            isActive ? "scale-110 rotate-3" : "scale-100 rotate-0"
          }`}
        >
          <div className={colors.text}>
            <Icon />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3 sm:mb-4">
          "{title}"
        </h3>

        {/* Description */}
        <p className="text-text-muted leading-relaxed text-sm sm:text-base flex-grow">
          {description}
        </p>

        {/* Stat reveal on hover */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            isActive ? "max-h-32 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className={`pt-6 border-t ${colors.statBorder}`}>
            <div className={`text-3xl sm:text-4xl font-bold ${colors.text}`}>
              {stat}
            </div>
            <div className="text-sm text-text-light mt-1">{statLabel}</div>
          </div>
        </div>

        {/* Subtle indicator for more info */}
        <div
          className={`absolute bottom-4 right-4 transition-all duration-300 ${
            isActive ? "opacity-0" : "opacity-40"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-secondary-400"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Main Problems Component
const Problems = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

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
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="problems"
      className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-secondary-100 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 text-accent-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-accent-100">
              <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
              Chapter Two
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-4 sm:mb-6 leading-tight">
              Three Platforms,
              <br />
              <span className="italic text-text-light">Endless Questions</span>
            </h2>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto">
              Sound familiar? You're not alone.
            </p>
          </FadeIn>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {problems.map((problem, i) => (
            <ProblemCard
              key={i}
              problem={problem}
              index={i}
              isActive={activeIndex === i}
              onHover={() => setActiveIndex(i)}
              onLeave={() => setActiveIndex(null)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA hint */}
        <FadeIn delay={700}>
          <div className="mt-12 sm:mt-16 md:mt-20 text-center">
            <div className="inline-flex items-center gap-2 text-text-light text-sm">
              <span>But what if there was a better way?</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="animate-bounce"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Background decorative elements */}
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-primary-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-primary-100/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Problems;

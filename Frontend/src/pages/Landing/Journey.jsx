import React, { useState, useEffect, useRef } from "react";

// ============================================
// JOURNEY SECTION - Chapter Four
// 30-Day Timeline with Interactive Calendar
// Professional, Optimized, Responsive
// ============================================

// Professional SVG Icons
const Icons = {
  Plug: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a6 6 0 0 1-6 6v0a6 6 0 0 1-6-6V8h12Z" />
    </svg>
  ),
  Sparkles: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  Lightbulb: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
    </svg>
  ),
  Rocket: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
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
  Calendar: () => (
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Clock: () => (
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  ArrowRight: () => (
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ChevronLeft: () => (
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

// Milestone data with professional icons
const milestones = {
  1: {
    title: "Connect & Discover",
    description:
      "Link your platforms in under a minute. We securely connect to YouTube, Instagram, and TikTok to start gathering your data.",
    Icon: Icons.Plug,
    color: "primary",
    gradient: "from-primary-500 to-primary-400",
    bgGradient: "from-primary-50 to-primary-100",
    iconBg: "bg-gradient-to-br from-primary-500 to-primary-400",
    events: [
      { text: "Platform connected", time: "Instant" },
      { text: "Initial sync complete", time: "~30 sec" },
      { text: "Account verified", time: "~1 min" },
    ],
  },
  2: {
    title: "AI Works Its Magic",
    description:
      "Our AI analyzes your content history, audience patterns, and engagement metrics to build your creator profile.",
    Icon: Icons.Sparkles,
    color: "primary",
    gradient: "from-primary-600 to-primary-500",
    bgGradient: "from-primary-50 to-primary-100",
    iconBg: "bg-gradient-to-br from-primary-600 to-primary-500",
    events: [
      { text: "AI analysis started", time: "Automatic" },
      { text: "Content indexed", time: "~2 hours" },
      { text: "Patterns detected", time: "~4 hours" },
    ],
  },
  7: {
    title: "Your First Insights",
    description:
      "Receive personalized recommendations based on your unique data. Actionable insights delivered to your dashboard.",
    Icon: Icons.Lightbulb,
    color: "accent",
    gradient: "from-accent-500 to-accent-600",
    bgGradient: "from-accent-50 to-accent-100",
    iconBg: "bg-gradient-to-br from-accent-500 to-accent-600",
    events: [
      { text: "First report ready", time: "Day 7" },
      { text: "Recommendations sent", time: "Email + Dashboard" },
      { text: "Action items created", time: "Prioritized" },
    ],
  },
  30: {
    title: "Watch Your Growth",
    description:
      "Track improvements and celebrate your wins. See the transformation with before/after comparisons.",
    Icon: Icons.Rocket,
    color: "success",
    gradient: "from-success-500 to-success-600",
    bgGradient: "from-success-50 to-success-100",
    iconBg: "bg-gradient-to-br from-success-500 to-success-600",
    events: [
      { text: "Growth report generated", time: "Monthly" },
      { text: "Milestones achieved", time: "Tracked" },
      { text: "Next goals set", time: "AI-suggested" },
    ],
  },
};

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

// Calendar Day Button Component
const CalendarDay = ({
  day,
  isMilestone,
  isSelected,
  milestone,
  onClick,
  isInView,
  animationDelay,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={!isMilestone}
      className={`
        relative aspect-square rounded-xl flex items-center justify-center
        text-xs sm:text-sm font-medium transition-all duration-300
        ${
          isSelected
            ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200 scale-110 z-10"
            : isMilestone
              ? "bg-primary-100 text-primary-700 hover:bg-primary-200 hover:scale-105 cursor-pointer"
              : "bg-white text-text-light cursor-default"
        }
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      {day}

      {/* Milestone indicator dot */}
      {isMilestone && !isSelected && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </span>
      )}

      {/* Selected milestone icon */}
      {isSelected && milestone && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2">
          <span className="flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-sm">
            <span className="w-2 h-2 bg-primary-500 rounded-full" />
          </span>
        </span>
      )}

      {/* Pulse effect for milestones */}
      {isMilestone && !isSelected && (
        <span className="absolute inset-0 rounded-xl bg-primary-400 animate-ping opacity-20" />
      )}
    </button>
  );
};

// Milestone Detail Card Component
const MilestoneCard = ({ milestone, day, isVisible }) => {
  if (!milestone) {
    return (
      <div className="bg-gradient-to-br from-secondary-50 to-white rounded-3xl p-8 sm:p-10 text-center border border-secondary-200 shadow-lg">
        <div className="w-20 h-20 mx-auto mb-6 bg-secondary-100 rounded-2xl flex items-center justify-center">
          <Icons.Calendar />
        </div>
        <h3 className="text-xl font-bold text-text-light mb-2">
          Select a Milestone
        </h3>
        <p className="text-text-light">
          Click on a highlighted day to see what happens
        </p>
      </div>
    );
  }

  const { Icon, title, description, events, iconBg, bgGradient, gradient } =
    milestone;

  return (
    <div
      className={`bg-gradient-to-br ${bgGradient} rounded-3xl p-6 sm:p-8 border border-white/50 shadow-xl transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${iconBg} flex items-center justify-center text-white shadow-lg mb-6`}
      >
        <Icon />
      </div>

      {/* Day badge */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent border border-white shadow-sm`}
        >
          <Icons.Clock />
          Day {day}
        </span>
        {day === 1 && (
          <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
            Start Here
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

      {/* Events timeline */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          What Happens
        </p>
        {events.map((event, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 sm:p-4 bg-white/80 backdrop-blur rounded-xl border border-white shadow-sm transition-all duration-500 hover:shadow-md ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${300 + i * 100}ms` }}
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Icons.Check />
            </span>
            <span className="flex-1 text-gray-700 text-sm sm:text-base">
              {event.text}
            </span>
            <span className="text-xs sm:text-sm text-gray-400 font-medium">
              {event.time}
            </span>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="mt-6 pt-6 border-t border-white/50">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Journey Progress</span>
          <span className="font-semibold">{Math.round((day / 30) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000`}
            style={{ width: `${(day / 30) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Timeline Navigation Component
const TimelineNav = ({ milestoneKeys, selectedDay, setSelectedDay }) => {
  const currentIndex = milestoneKeys.indexOf(selectedDay);

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedDay(milestoneKeys[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < milestoneKeys.length - 1) {
      setSelectedDay(milestoneKeys[currentIndex + 1]);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={goToPrev}
        disabled={currentIndex === 0}
        className="w-10 h-10 rounded-full bg-white shadow-md border border-secondary-200 flex items-center justify-center text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary-50 transition-all"
      >
        <Icons.ChevronLeft />
      </button>

      <div className="flex items-center gap-2">
        {milestoneKeys.map((day, i) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              day === selectedDay
                ? "w-6 bg-primary-500"
                : "bg-secondary-300 hover:bg-secondary-400"
            }`}
          />
        ))}
      </div>

      <button
        onClick={goToNext}
        disabled={currentIndex === milestoneKeys.length - 1}
        className="w-10 h-10 rounded-full bg-white shadow-md border border-secondary-200 flex items-center justify-center text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary-50 transition-all"
      >
        <Icons.ChevronRight />
      </button>
    </div>
  );
};

// Main Journey Component
const Journey = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const highlightedDays = [1, 2, 7, 30];
  const currentMilestone = milestones[selectedDay] || null;

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = highlightedDays.indexOf(selectedDay);

      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setSelectedDay(highlightedDays[currentIndex - 1]);
      } else if (
        e.key === "ArrowRight" &&
        currentIndex < highlightedDays.length - 1
      ) {
        setSelectedDay(highlightedDays[currentIndex + 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDay]);

  return (
    <section
      ref={ref}
      id="journey"
      className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-secondary-100 overflow-hidden relative"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-primary-200">
              <Icons.Calendar />
              <span>Chapter Four</span>
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-3 sm:mb-4">
              Your 30-Day Journey
            </h2>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto">
              From setup to success — see exactly what happens at each milestone
            </p>
          </FadeIn>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Calendar */}
          <FadeIn delay={300}>
            <div className="bg-gradient-to-br from-secondary-50 to-white rounded-3xl p-5 sm:p-6 md:p-8 border border-secondary-200 shadow-xl">
              {/* Calendar header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                    Your First Month
                  </h3>
                  <p className="text-sm text-text-light">30 Days to Clarity</p>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-primary-100" />
                    Milestone
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-primary-500" />
                    Selected
                  </span>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div
                    key={i}
                    className="text-center text-xs sm:text-sm font-medium text-text-light py-1 sm:py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {/* Empty cell for offset (assuming month starts on Monday) */}
                <div />

                {days.map((day, index) => {
                  const isMilestone = highlightedDays.includes(day);
                  const isSelected = selectedDay === day;
                  const milestone = milestones[day];

                  return (
                    <CalendarDay
                      key={day}
                      day={day}
                      isMilestone={isMilestone}
                      isSelected={isSelected}
                      milestone={milestone}
                      onClick={() => isMilestone && setSelectedDay(day)}
                      isInView={isInView}
                      animationDelay={400 + index * 15}
                    />
                  );
                })}
              </div>

              {/* Timeline navigation (mobile) */}
              <div className="lg:hidden mt-6 pt-6 border-t border-secondary-200">
                <TimelineNav
                  milestoneKeys={highlightedDays}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                />
              </div>

              {/* Keyboard hint (desktop) */}
              <div className="hidden lg:flex justify-center mt-6 pt-6 border-t border-secondary-200">
                <span className="text-xs text-text-light flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-secondary-100 rounded text-text-muted font-mono text-xs">
                    ←
                  </kbd>
                  <kbd className="px-2 py-1 bg-secondary-100 rounded text-text-muted font-mono text-xs">
                    →
                  </kbd>
                  <span>to navigate milestones</span>
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Milestone details */}
          <FadeIn delay={400}>
            <div className="lg:sticky lg:top-24">
              <MilestoneCard
                milestone={currentMilestone}
                day={selectedDay}
                isVisible={isInView}
              />

              {/* Quick jump buttons (desktop) */}
              <div className="hidden lg:flex flex-wrap gap-2 mt-6">
                {highlightedDays.map((day) => {
                  const milestone = milestones[day];
                  const isActive = selectedDay === day;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary-100 text-primary-700 border-primary-200"
                          : "bg-white text-text-secondary hover:bg-secondary-50 border-secondary-200"
                      } border`}
                    >
                      <span
                        className={`${milestone.iconBg} w-5 h-5 rounded-full flex items-center justify-center`}
                      >
                        <span className="w-2 h-2 bg-white rounded-full" />
                      </span>
                      Day {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={600}>
          <div className="mt-16 sm:mt-20 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl border border-primary-100">
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1">
                  Ready to start your journey?
                </h3>
                <p className="text-text-muted text-sm sm:text-base">
                  Join 15,000+ creators who transformed their growth
                </p>
              </div>
              <button className="group flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl">
                Start Day 1 Now
                <span className="group-hover:translate-x-1 transition-transform">
                  <Icons.ArrowRight />
                </span>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Journey;

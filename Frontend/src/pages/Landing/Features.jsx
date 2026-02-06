import React, { useState, useEffect, useRef, useCallback } from "react";

// ============================================
// FEATURES SECTION - Chapter Three
// Professional 3D Carousel with Touch Support
// ============================================

// Professional SVG Icons
const Icons = {
  Globe: () => (
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
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Brain: () => (
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
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
    </svg>
  ),
  TrendingUp: () => (
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
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Users: () => (
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
  Sparkles: () => (
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
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
    </svg>
  ),
  Book: () => (
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
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
};

// Feature configurations with explicit color classes
const features = [
  {
    id: 1,
    Icon: Icons.Globe,
    title: "One Dashboard, Three Worlds United",
    story:
      "Imagine opening a single window and seeing your entire creative universe. YouTube, Instagram, and TikTok — unified.",
    benefit: "Save 5+ hours every week",
    iconGradient: "from-primary-500 to-primary-400",
    cardBg: "from-primary-50 to-secondary-50",
    iconBg: "bg-gradient-to-br from-primary-500 to-primary-400",
    accentColor: "text-primary-600",
  },
  {
    id: 2,
    Icon: Icons.Brain,
    title: "AI Reads Between the Lines",
    story:
      "Our AI spots patterns invisible to the human eye, translating complex data streams into actionable wisdom.",
    benefit: "10x deeper insights",
    iconGradient: "from-primary-600 to-primary-500",
    cardBg: "from-primary-50 to-primary-100",
    iconBg: "bg-gradient-to-br from-primary-600 to-primary-500",
    accentColor: "text-primary-700",
  },
  {
    id: 3,
    Icon: Icons.TrendingUp,
    title: "Spot Trends Before They Peak",
    story:
      "Get 72-hour early warnings on what's about to explode in your niche. Be first, not second.",
    benefit: "72hr early detection",
    iconGradient: "from-accent-500 to-accent-400",
    cardBg: "from-accent-50 to-secondary-50",
    iconBg: "bg-gradient-to-br from-accent-500 to-accent-400",
    accentColor: "text-accent-600",
  },
  {
    id: 4,
    Icon: Icons.Users,
    title: "Know Your Audience Deeply",
    story:
      "Behind every view is a person. Understand them deeply, and they become your community.",
    benefit: "360° audience view",
    iconGradient: "from-success-500 to-success-400",
    cardBg: "from-success-50 to-secondary-50",
    iconBg: "bg-gradient-to-br from-success-500 to-success-400",
    accentColor: "text-success-600",
  },
  {
    id: 5,
    Icon: Icons.Lightbulb,
    title: "Recommendations That Work",
    story:
      "Every suggestion is tailored to your unique voice, audience demographics, and growth goals.",
    benefit: "87% success rate",
    iconGradient: "from-accent-600 to-accent-500",
    cardBg: "from-accent-50 to-accent-100",
    iconBg: "bg-gradient-to-br from-accent-600 to-accent-500",
    accentColor: "text-accent-700",
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

// Individual Feature Card Component
const FeatureCard = ({ feature, isActive, onClick, style, isMobile }) => {
  const { Icon, title, story, benefit, cardBg, iconBg, accentColor } = feature;

  if (isMobile) {
    // Mobile card layout
    return (
      <div
        className={`flex-shrink-0 w-[85vw] max-w-[320px] snap-center ${
          isActive ? "scale-100" : "scale-95 opacity-70"
        } transition-all duration-300`}
        onClick={onClick}
      >
        <div
          className={`h-full rounded-2xl bg-gradient-to-br ${cardBg} dark:from-dark-surface dark:to-dark-surface-light border border-white/50 dark:border-dark-border shadow-xl p-6 flex flex-col`}
        >
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center text-white shadow-lg mb-5`}
          >
            <Icon />
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-dark-text-muted text-sm leading-relaxed mb-5 flex-1">
            {story}
          </p>

          {/* Benefit badge */}
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 dark:bg-dark-surface/80 backdrop-blur shadow-sm w-fit">
            <span className={accentColor}>
              <Icons.Sparkles />
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-dark-text">
              {benefit}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Desktop 3D card layout
  return (
    <div
      className="absolute left-1/2 top-1/2 w-[320px] lg:w-[380px] cursor-pointer transition-all duration-500 ease-out"
      style={style}
      onClick={onClick}
    >
      <div
        className={`h-[380px] lg:h-[420px] rounded-3xl bg-gradient-to-br ${cardBg} dark:from-dark-surface dark:to-dark-surface-light border border-white/50 dark:border-dark-border shadow-2xl p-6 lg:p-8 flex flex-col relative overflow-hidden group`}
      >
        {/* Hover glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${cardBg} dark:from-dark-surface-light dark:to-dark-surface opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        {/* Icon */}
        <div
          className={`relative z-10 w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl ${iconBg} flex items-center justify-center text-white shadow-lg mb-5 lg:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
        >
          <Icon />
        </div>

        {/* Content */}
        <h3 className="relative z-10 text-lg lg:text-xl font-bold text-gray-900 dark:text-dark-text mb-2 lg:mb-3">
          {title}
        </h3>
        <p className="relative z-10 text-gray-600 dark:text-dark-text-muted text-sm leading-relaxed mb-5 lg:mb-6 flex-1">
          {story}
        </p>

        {/* Benefit badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full bg-white/80 dark:bg-dark-surface/80 backdrop-blur shadow-sm w-fit group-hover:shadow-md transition-shadow duration-300">
          <span className={accentColor}>
            <Icons.Sparkles />
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-dark-text">
            {benefit}
          </span>
        </div>

        {/* Reflection effect */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/20 dark:from-white/5 to-transparent rounded-b-3xl pointer-events-none" />

        {/* Card number indicator */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/50 dark:bg-dark-surface-light/50 backdrop-blur flex items-center justify-center text-xs font-medium text-gray-500 dark:text-dark-text-muted">
          {feature.id}
        </div>
      </div>
    </div>
  );
};

// Navigation Button Component
const NavButton = ({ direction, onClick, disabled }) => {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-dark-surface border border-secondary-200 dark:border-dark-border flex items-center justify-center transition-all duration-300 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-0.5 active:scale-95"
      }`}
      aria-label={isLeft ? "Previous feature" : "Next feature"}
    >
      {isLeft ? <Icons.ChevronLeft /> : <Icons.ChevronRight />}
    </button>
  );
};

// Dot Indicator Component
const DotIndicator = ({ index, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`h-2 rounded-full transition-all duration-300 ${
      isActive
        ? "w-6 bg-primary-500"
        : "w-2 bg-secondary-300 hover:bg-secondary-400"
    }`}
    aria-label={`Go to feature ${index + 1}`}
  />
);

// Mobile Carousel Component
const MobileCarousel = ({ currentSlide, setCurrentSlide }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle scroll snap
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isDragging) return;

    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85;
    const gap = 16;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));

    if (
      newIndex !== currentSlide &&
      newIndex >= 0 &&
      newIndex < features.length
    ) {
      setCurrentSlide(newIndex);
    }
  }, [currentSlide, setCurrentSlide, isDragging]);

  // Scroll to slide
  const scrollToSlide = useCallback((index) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const cardWidth = container.offsetWidth * 0.85;
    const gap = 16;
    const scrollPosition = index * (cardWidth + gap);

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToSlide(currentSlide);
  }, [currentSlide, scrollToSlide]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-[7.5vw]"
      onScroll={handleScroll}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => {
        setIsDragging(false);
        handleScroll();
      }}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {features.map((feature, i) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          isActive={i === currentSlide}
          onClick={() => setCurrentSlide(i)}
          isMobile={true}
        />
      ))}
    </div>
  );
};

// Desktop 3D Carousel Component
const DesktopCarousel = ({ currentSlide, setCurrentSlide }) => {
  // Calculate 3D card styles
  const getCardStyle = (index) => {
    const diff = index - currentSlide;
    const absDiff = Math.abs(diff);

    let translateX = diff * 260;
    let translateZ = -absDiff * 120;
    let rotateY = diff * -20;
    let opacity = 1 - absDiff * 0.25;
    let scale = 1 - absDiff * 0.12;

    if (absDiff > 2) {
      opacity = 0;
      scale = 0.8;
    }

    return {
      transform: `translateX(calc(-50% + ${translateX}px)) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - absDiff,
    };
  };

  return (
    <div
      className="relative h-[480px] lg:h-[520px] flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {features.map((feature, i) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            isActive={i === currentSlide}
            onClick={() => setCurrentSlide(i)}
            style={getCardStyle(i)}
            isMobile={false}
          />
        ))}
      </div>
    </div>
  );
};

// Main Features Component
const Features = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

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

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => Math.min(features.length - 1, prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Navigation handlers
  const goToPrev = () => setCurrentSlide((prev) => Math.max(0, prev - 1));
  const goToNext = () =>
    setCurrentSlide((prev) => Math.min(features.length - 1, prev + 1));

  return (
    <section
      ref={ref}
      id="features"
      className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-secondary-100 dark:bg-dark-bg overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-primary-200 dark:border-primary-700">
              <Icons.Book />
              <span>Chapter Three</span>
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary dark:text-dark-text mb-3 sm:mb-4">
              Your Command Center
            </h2>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg sm:text-xl text-text-muted dark:text-dark-text-muted max-w-2xl mx-auto">
              Explore the features that change everything
            </p>
          </FadeIn>
        </div>

        {/* Carousel - Mobile or Desktop */}
        <div
          className={`transition-all duration-700 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
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

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          <NavButton
            direction="left"
            onClick={goToPrev}
            disabled={currentSlide === 0}
          />

          {/* Dot indicators */}
          <div className="flex gap-2">
            {features.map((_, i) => (
              <DotIndicator
                key={i}
                index={i}
                isActive={i === currentSlide}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>

          <NavButton
            direction="right"
            onClick={goToNext}
            disabled={currentSlide === features.length - 1}
          />
        </div>

        {/* Keyboard hint (desktop only) */}
        <div className="hidden md:flex justify-center mt-6">
          <span className="text-xs text-text-light dark:text-dark-text-muted flex items-center gap-2">
            <kbd className="px-2 py-1 bg-secondary-100 dark:bg-dark-surface rounded text-text-muted dark:text-dark-text-muted font-mono text-xs">
              ←
            </kbd>
            <kbd className="px-2 py-1 bg-secondary-100 dark:bg-dark-surface rounded text-text-muted dark:text-dark-text-muted font-mono text-xs">
              →
            </kbd>
            <span>to navigate</span>
          </span>
        </div>

        {/* Feature details panel */}
        <FadeIn delay={400}>
          <div className="mt-12 sm:mt-16 max-w-2xl mx-auto">
            <div
              className={`bg-white dark:bg-dark-surface rounded-2xl p-6 sm:p-8 border border-secondary-200 dark:border-dark-border shadow-lg transition-all duration-500`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${features[currentSlide].iconBg} flex items-center justify-center text-white shadow-md flex-shrink-0`}
                >
                  {React.createElement(features[currentSlide].Icon)}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary dark:text-dark-text mb-2">
                    {features[currentSlide].title}
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-muted text-sm sm:text-base leading-relaxed">
                    {features[currentSlide].story}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className={`${features[currentSlide].accentColor}`}>
                      <Icons.Sparkles />
                    </span>
                    <span className="text-sm font-medium text-text-secondary dark:text-dark-text-muted">
                      {features[currentSlide].benefit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Background decorative elements */}
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-primary-100/20 dark:bg-primary-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-primary-100/20 dark:bg-primary-800/10 rounded-full blur-3xl pointer-events-none" />

      {/* Custom scrollbar hide styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Features;

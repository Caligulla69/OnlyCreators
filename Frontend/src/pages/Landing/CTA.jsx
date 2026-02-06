import React, { useState, useEffect, useRef } from "react";

// ============================================
// FINAL CTA SECTION
// Clean, Elegant, Conversion-Focused
// ============================================

// Icons
const Icons = {
  ArrowRight: () => (
    <svg
      width="18"
      height="18"
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
  Check: () => (
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Sparkles: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
    </svg>
  ),
};

// Trust badges
const trustBadges = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
];

// FadeIn Component
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Main FinalCTA Component
const FinalCTA = () => {
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
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-secondary-100 dark:bg-dark-bg overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-100/40 via-secondary-100/30 to-accent-100/40 dark:from-primary-800/20 dark:via-dark-bg/30 dark:to-accent-800/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Decorative Element */}
        <FadeIn>
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full">
              <span className="text-primary-500 dark:text-primary-400">
                <Icons.Sparkles />
              </span>
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Start your journey today
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Main Headline */}
        <FadeIn delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary dark:text-dark-text leading-tight mb-6">
            Ready to write your
            <br />
            <span className="italic text-primary-600 dark:text-primary-400">
              success story?
            </span>
          </h2>
        </FadeIn>

        {/* Subheadline */}
        <FadeIn delay={200}>
          <p className="text-lg sm:text-xl text-text-muted dark:text-dark-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
            Join 15,000+ creators who transformed their content strategy.
          </p>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button className="group w-full sm:w-auto px-8 py-4 bg-primary-600 dark:bg-primary-500 text-white rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:bg-primary-700 dark:hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-600/20 flex items-center justify-center gap-3">
              <span>Get Started Free</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                <Icons.ArrowRight />
              </span>
            </button>

            <button className="w-full sm:w-auto px-8 py-4 text-text-secondary dark:text-dark-text-muted rounded-full text-base sm:text-lg font-medium border border-secondary-300 dark:border-dark-border transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-secondary-50 dark:hover:bg-dark-surface-light flex items-center justify-center gap-3">
              <span className="w-8 h-8 rounded-full bg-secondary-200 dark:bg-dark-surface-light flex items-center justify-center">
                <Icons.Play />
              </span>
              <span>Watch Demo</span>
            </button>
          </div>
        </FadeIn>

        {/* Trust Badges */}
        <FadeIn delay={400}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-light dark:text-dark-text-muted">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-success-500 dark:text-success-400">
                  <Icons.Check />
                </span>
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FinalCTA;

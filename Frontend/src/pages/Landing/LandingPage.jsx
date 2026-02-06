import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import Dilemma from "./dilemma";
import Problems from "./problems";
import TurningPoint from "./TurningPoint";
import Features from "./Features";
import Hero from "./Hero";
import Journey from "./Journey";
import Testimonials from "./Testimonials";
import Metrics from "./Metrics";
import FinalCTA from "./CTA";
import Navigation from "./Navbar";
import Footer from "./Footer";

// ============================================
// ONLY CREATORS - STORYTELLING LANDING PAGE
// Light, Airy, Narrative-Driven Design
// ============================================

// ============================================
// STORY CONTEXT
// ============================================

const StoryContext = createContext();

const StoryProvider = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StoryContext.Provider
      value={{ scrollProgress, currentChapter, setCurrentChapter }}
    >
      {children}
    </StoryContext.Provider>
  );
};

const useStory = () => useContext(StoryContext);

// ============================================
// CUSTOM HOOKS
// ============================================

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once) observer.unobserve(element);
        } else if (!options.once) {
          setIsInView(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.once, options.threshold, options.rootMargin]);

  return [ref, isInView];
};

const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = (window.innerHeight - rect.top) * speed;
      setOffset(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return [ref, offset];
};

const useCounter = (end, duration = 2000, isActive = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const startTime = performance.now();
    let rafId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOut));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, isActive]);

  return count;
};

// ============================================
// ICONS
// ============================================

const Icons = {
  Menu: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  ArrowDown: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  ),
  Check: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  Star: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Quote: () => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="currentColor"
      opacity="0.1"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  ),
  Play: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Youtube: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5v-7l6.4 3.5-6.4 3.5z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c2.7 0 3 0 4.1.1 1 0 1.6.2 2 .3.5.2.8.4 1.2.8.4.4.6.7.8 1.2.1.4.3 1 .3 2 .1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.6-.3 2-.2.5-.4.8-.8 1.2-.4.4-.7.6-1.2.8-.4.1-1 .3-2 .3-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.6-.2-2-.3-.5-.2-.8-.4-1.2-.8-.4-.4-.6-.7-.8-1.2-.1-.4-.3-1-.3-2C2 15 2 14.7 2 12s0-3 .1-4.1c0-1 .2-1.6.3-2 .2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.1 1-.3 2-.3C7 2 7.3 2 12 2zm0 1.8c-2.7 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.3-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.3.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.3.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.3-.1-4-.1zm0 3.1a5.1 5.1 0 110 10.2 5.1 5.1 0 010-10.2zm0 8.4a3.3 3.3 0 100-6.6 3.3 3.3 0 000 6.6zm6.5-8.6a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
    </svg>
  ),
  TikTok: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.6 5.7c-1.3-.9-2.2-2.4-2.3-4.1h-3.8v14.5c0 1.8-1.5 3.3-3.3 3.3s-3.3-1.5-3.3-3.3 1.5-3.3 3.3-3.3c.3 0 .7 0 1 .1V9c-.3 0-.7-.1-1-.1-3.8 0-6.9 3.1-6.9 6.9s3.1 6.9 6.9 6.9 6.9-3.1 6.9-6.9V9.9c1.3.9 2.9 1.4 4.5 1.4V7.5c-.8 0-1.5-.7-2-1.8z" />
    </svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  ),
  Sparkle: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
    </svg>
  ),
  Brain: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M12 4.5a2.5 2.5 0 00-4.96-.46 2.5 2.5 0 00-1.98 3 2.5 2.5 0 00-1.32 4.24 3 3 0 00.34 5.58 2.5 2.5 0 002.96 3.08A2.5 2.5 0 0012 19.5m0-15a2.5 2.5 0 014.96-.46 2.5 2.5 0 011.98 3 2.5 2.5 0 011.32 4.24 3 3 0 01-.34 5.58 2.5 2.5 0 01-2.96 3.08A2.5 2.5 0 0112 19.5" />
    </svg>
  ),
  TrendingUp: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />
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
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Lightbulb: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
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
    >
      <path d="M12 20V10M18 20V4M6 20v-4" />
    </svg>
  ),
  Clock: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  Shield: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Mail: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  Plug: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M12 22v-5M9 7V2M15 7V2M6 7h12v5a6 6 0 01-12 0V7z" />
    </svg>
  ),
  Wand: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8l1.4 1.4M12.2 6.2l1.4-1.4M21 21l-9-9" />
    </svg>
  ),
  Mail2: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  Chart: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 16l4-4 4 4 6-6" />
    </svg>
  ),
};

// ============================================
// REVEAL COMPONENTS
// ============================================

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const [ref, isInView] = useInView({ once: true, threshold: 0.2 });

  const directions = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate(0, 0)" : undefined,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className={!isInView ? directions[direction] : ""}>{children}</div>
    </div>
  );
};

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const ScrollProgress = () => {
  const { scrollProgress } = useStory();

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-secondary-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-accent-400 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

// ============================================
// CHAPTER HEADING
// ============================================

const ChapterHeading = ({ number, title, subtitle }) => {
  const [ref, isInView] = useInView({ once: true, threshold: 0.5 });

  return (
    <div ref={ref} className="text-center mb-16">
      <div
        className={`inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4 transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Chapter {number}
      </div>
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-text-primary mb-4 transition-all duration-700 delay-100 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-xl text-text-muted max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

// ============================================
// PRICING SECTION
// ============================================

const Pricing = () => {
  const plans = [
    {
      name: "Explorer",
      chapter: "Chapter 1",
      price: "Free",
      period: "forever",
      description: "For creators starting their journey",
      features: [
        "1 platform connected",
        "Basic analytics dashboard",
        "7-day data history",
        "Weekly email reports",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Storyteller",
      chapter: "Chapter 2",
      price: "$29",
      period: "/month",
      description: "For creators ready to grow",
      features: [
        "All 3 platforms",
        "AI-powered insights",
        "Unlimited data history",
        "Real-time analytics",
        "Trend detection",
        "Priority support",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Legend",
      chapter: "Chapter 3",
      price: "Custom",
      period: "",
      description: "For creator teams & agencies",
      features: [
        "Everything in Storyteller",
        "Unlimited team members",
        "Custom AI models",
        "API access",
        "Dedicated success manager",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-32 px-6 bg-secondary-100">
      <div className="max-w-6xl mx-auto">
        <ChapterHeading
          number="Six"
          title="Choose Your Chapter"
          subtitle="Every great story has a beginning. Choose yours."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div
                className={`relative rounded-3xl p-8 h-full flex flex-col transition-all duration-500 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-2xl scale-105"
                    : "bg-white border border-secondary-200 hover:border-primary-200 hover:shadow-xl"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white text-primary-600 text-sm font-semibold rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-primary-200" : "text-text-light"
                    }`}
                  >
                    {plan.chapter}
                  </span>
                  <h3
                    className={`text-2xl font-serif font-semibold mt-1 ${
                      plan.highlighted ? "text-white" : "text-text-primary"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mt-2 ${
                      plan.highlighted ? "text-primary-200" : "text-text-muted"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span
                    className={`text-5xl font-bold ${
                      plan.highlighted ? "text-white" : "text-text-primary"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={
                        plan.highlighted
                          ? "text-primary-200"
                          : "text-text-muted"
                      }
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className={`flex items-center gap-3 ${
                        plan.highlighted
                          ? "text-primary-100"
                          : "text-text-secondary"
                      }`}
                    >
                      <Icons.Check
                        className={
                          plan.highlighted ? "text-white" : "text-primary-500"
                        }
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-2xl font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-white text-primary-600 hover:bg-secondary-50"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN APP
// ============================================

// In your main App component

export default function OnlyCreatorsStorytelling() {
  return (
    <StoryProvider>
      {/* Global Styles */}
      <style>{`
        /* ... your existing styles ... */

        /* IMPORTANT: Ensure sections have solid backgrounds */
        .section-overlay {
          position: relative;
          z-index: 10;
          background-color: white;
        }
      `}</style>

      <div className="min-h-screen text-text-primary">
        <ScrollProgress />
        <Navigation />

        {/* Hero - Fixed position, stays behind */}
        <Hero />

        {/* Content wrapper with proper stacking */}
        <div className="relative z-10">
          {/* All sections with guaranteed solid backgrounds */}
          <div className="bg-secondary-100">
            <Dilemma />
          </div>
          <div className="bg-secondary-100">
            <Problems />
          </div>
          <div className="bg-secondary-100">
            <TurningPoint />
          </div>
          <div className="bg-secondary-100">
            <Features />
          </div>
          <div className="bg-secondary-100">
            <Journey />
          </div>
          <div className="bg-secondary-100">
            <Testimonials />
          </div>
          <div className="bg-primary-700">
            <Metrics />
          </div>
          <div className="bg-secondary-100">
            <Pricing />
          </div>
          <div className="bg-secondary-100">
            <FinalCTA />
          </div>
          <Footer />
        </div>
      </div>
    </StoryProvider>
  );
}

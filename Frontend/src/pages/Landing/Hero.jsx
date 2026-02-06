import React, { useState, useEffect, useRef } from "react";

// ============================================
// HERO SECTION - Cinematic Landing
// Professional, Optimized, Responsive
// ============================================

// Professional SVG Icons
const Icons = {
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Youtube: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  TikTok: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  ArrowDown: () => (
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  ),
  Sparkle: () => (
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
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
    </svg>
  ),
  Layers: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="text-primary-400"
    >
      {/* Outer ring */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="opacity-90"
      />
      {/* Inner growth bars */}
      <path
        d="M8 14V12M12 14V9M16 14V11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  MousePointer: () => (
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
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="M13 13l6 6" />
    </svg>
  ),
};

// Floating particle component
const FloatingParticle = ({ delay, duration, size, left, top }) => (
  <div
    className="absolute rounded-full bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-700 dark:to-accent-700 opacity-30 animate-float"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

// Platform badge component
const PlatformBadge = ({ Icon, name, delay, isVisible }) => (
  <div
    className={`flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm rounded-full border border-gray-100 dark:border-dark-border shadow-sm transition-all duration-700 hover:shadow-md hover:scale-105 cursor-pointer ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <span className="text-gray-600 dark:text-dark-text-muted">
      <Icon />
    </span>
    <span className="text-sm font-medium text-gray-700 dark:text-dark-text">
      {name}
    </span>
  </div>
);

// Animated stat component
const AnimatedStat = ({ value, label, delay, isVisible }) => (
  <div
    className={`text-center transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
      {value}
    </div>
    <div className="text-xs sm:text-sm text-text-light dark:text-dark-text-muted">
      {label}
    </div>
  </div>
);

// Scroll indicator component
const ScrollIndicator = ({ isVisible }) => (
  <div
    className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
    style={{ transitionDelay: "2000ms" }}
  >
    {/* Animated mouse icon */}
    <div className="relative w-6 h-10 border-2 border-secondary-400 dark:border-secondary-600 rounded-full flex justify-center">
      <div className="w-1 h-2 bg-secondary-500 dark:bg-secondary-400 rounded-full mt-2 animate-scroll-dot" />
    </div>

    {/* Film reel dots */}
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 h-2 bg-secondary-400 dark:bg-secondary-600 rounded-full animate-pulse"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>

    <span className="text-text-light dark:text-dark-text-muted text-[10px] sm:text-xs tracking-[0.2em] uppercase">
      Scroll to Begin
    </span>
  </div>
);

// Primary CTA button
const PrimaryButton = ({ children, isVisible }) => (
  <button
    className={`group relative px-8 sm:px-10 py-4 sm:py-5 bg-primary-600 dark:bg-primary-500 text-white rounded-full text-base sm:text-lg font-medium overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/25 active:scale-95 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
    style={{ transitionDelay: "1800ms" }}
  >
    <span className="relative z-10 flex items-center justify-center gap-3">
      <span className="w-3 h-3 border-2 border-white rounded-full group-hover:bg-white transition-colors duration-300" />
      {children}
    </span>
    <div className="absolute inset-0 bg-primary-700 dark:bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </button>
);

// Secondary CTA button
const SecondaryButton = ({ children, isVisible }) => (
  <button
    className={`group px-8 sm:px-10 py-4 sm:py-5 text-text-secondary dark:text-dark-text-muted rounded-full text-base sm:text-lg font-medium border-2 border-secondary-300 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-500 hover:bg-secondary-50 dark:hover:bg-dark-surface-light transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
    style={{ transitionDelay: "1900ms" }}
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-50 dark:from-dark-surface-light dark:to-dark-surface flex items-center justify-center group-hover:from-primary-100 group-hover:to-primary-50 dark:group-hover:from-primary-900/50 dark:group-hover:to-primary-800/30 transition-all duration-300 shadow-inner">
      <span className="ml-0.5 text-text-secondary dark:text-dark-text-muted group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
        <Icons.Play />
      </span>
    </div>
    {children}
  </button>
);

// Main Hero Component
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Animation sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setLoaded(true), 100),
      setTimeout(() => setShowTitle(true), 600),
      setTimeout(() => setShowTagline(true), 1400),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Parallax mouse tracking (desktop only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current || window.innerWidth < 768) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 50;
      const y = (e.clientY - rect.top - rect.height / 2) / 50;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating particles configuration
  const particles = [
    { delay: 0, duration: 6, size: 80, left: 10, top: 20 },
    { delay: 1, duration: 8, size: 60, left: 80, top: 15 },
    { delay: 2, duration: 7, size: 100, left: 70, top: 70 },
    { delay: 1.5, duration: 9, size: 50, left: 20, top: 75 },
    { delay: 0.5, duration: 6, size: 70, left: 85, top: 45 },
    { delay: 2.5, duration: 8, size: 40, left: 5, top: 50 },
  ];

  const platforms = [
    { Icon: Icons.Youtube, name: "YouTube" },
    { Icon: Icons.Instagram, name: "Instagram" },
    { Icon: Icons.TikTok, name: "TikTok" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-secondary-100 dark:bg-dark-bg overflow-hidden"
    >
      {/* Cinematic letterbox bars */}

      {/* Animated ambient lights with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary-300 dark:bg-primary-700 rounded-full blur-3xl transition-opacity duration-1000 ${
            loaded ? "opacity-40 dark:opacity-20" : "opacity-0"
          }`}
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${
              mousePosition.y * 2
            }px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary-400 dark:bg-primary-600 rounded-full blur-3xl transition-opacity duration-1000 delay-300 ${
            loaded ? "opacity-40 dark:opacity-20" : "opacity-0"
          }`}
          style={{
            transform: `translate(${-mousePosition.x * 2}px, ${
              -mousePosition.y * 2
            }px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-accent-200 dark:bg-accent-700 rounded-full blur-3xl transition-opacity duration-1000 delay-500 ${
            loaded ? "opacity-30 dark:opacity-15" : "opacity-0"
          }`}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <FloatingParticle key={i} {...particle} />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div
        className={`absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none transition-opacity duration-1000 ${
          loaded ? "opacity-[0.015] dark:opacity-[0.03]" : "opacity-0"
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6">
        {/* Film studio intro */}
        <div
          className={`mb-8 sm:mb-12 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-3 sm:gap-4">
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
            <div className="flex items-center gap-2">
              <span className="text-primary-500 dark:text-primary-400">
                <Icons.Layers />
              </span>
              <span className="text-text-muted dark:text-dark-text-muted text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium">
                OnlyCreators Presents
              </span>
            </div>
            <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600" />
          </div>
        </div>

        {/* Main title - Line 1 */}
        <div className="overflow-hidden mb-2 sm:mb-4">
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif transition-all duration-1000 ${
              showTitle
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <span className="block text-text-primary dark:text-dark-text font-light tracking-tight">
              Every Creator
            </span>
          </h1>
        </div>

        {/* Main title - Line 2 */}
        <div className="overflow-hidden mb-6 sm:mb-8">
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif transition-all duration-1000 ${
              showTitle
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="block">
              <span className="text-text-primary dark:text-dark-text font-light tracking-tight">
                Has a{" "}
              </span>
              <span className="relative inline-block">
                <span className="italic text-primary-600 dark:text-primary-400">
                  Story
                </span>
                {/* Decorative underline */}
                <svg
                  className={`absolute -bottom-2 left-0 w-full h-3 text-primary-300/50 dark:text-primary-500/50 transition-all duration-1000 ${
                    showTitle
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0, 50 5 T 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </span>
          </h1>
        </div>

        {/* Tagline and CTAs */}
        <div
          className={`transition-all duration-1000 ${
            showTagline
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl text-text-muted dark:text-dark-text-muted max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed px-4">
            This is yours. Let us help you{" "}
            <span className="text-text-secondary dark:text-dark-text font-medium">
              tell it
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
            <PrimaryButton isVisible={showTagline}>
              Begin Chapter One
            </PrimaryButton>
            <SecondaryButton isVisible={showTagline}>
              Watch Trailer
            </SecondaryButton>
          </div>

          {/* Platform badges */}
          <div
            className={`transition-all duration-700 ${
              showTagline ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "2100ms" }}
          >
            <p className="text-xs sm:text-sm text-text-light dark:text-dark-text-muted tracking-wider uppercase mb-4 sm:mb-6">
              Unify your presence across
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4 sm:gap-4">
              {platforms.map((platform, i) => (
                <PlatformBadge
                  key={i}
                  Icon={platform.Icon}
                  name={platform.name}
                  delay={2200 + i * 100}
                  isVisible={showTagline}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator isVisible={showTagline} />

      {/* Decorative corner elements */}
      <div
        className={`absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-secondary-300/50 dark:border-secondary-700/50 transition-all duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1500ms" }}
      />
      <div
        className={`absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-secondary-300/50 dark:border-secondary-700/50 transition-all duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1600ms" }}
      />
      <div
        className={`absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-secondary-300/50 dark:border-secondary-700/50 transition-all duration-1000 hidden sm:block ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1700ms" }}
      />
      <div
        className={`absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-secondary-300/50 dark:border-secondary-700/50 transition-all duration-1000 hidden sm:block ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1800ms" }}
      />

      {/* Animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.6;
          }
        }

        @keyframes scroll-dot {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.3;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-scroll-dot {
          animation: scroll-dot 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;

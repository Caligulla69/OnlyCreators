import React, { useState, useEffect, useRef } from "react";

// ============================================
// TESTIMONIALS SECTION - Chapter Five
// 3D Modern Aesthetic Design
// Professional, Optimized, Responsive
// ============================================

// Professional SVG Icons
const Icons = {
  Youtube: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  TikTok: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Quote: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="opacity-20"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  ),
  ArrowUp: () => (
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
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  ),
  Verified: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Users: () => (
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

// Platform configurations
const platformConfig = {
  youtube: {
    Icon: Icons.Youtube,
    name: "YouTube",
    color: "text-red-500",
    bgColor: "bg-red-50",
    gradient: "from-red-500 to-red-600",
  },
  instagram: {
    Icon: Icons.Instagram,
    name: "Instagram",
    color: "text-accent-500",
    bgColor: "bg-gradient-to-br from-accent-50 to-secondary-50",
    gradient: "from-accent-500 via-accent-600 to-accent-500",
  },
  tiktok: {
    Icon: Icons.TikTok,
    name: "TikTok",
    color: "text-gray-900",
    bgColor: "bg-gray-50",
    gradient: "from-gray-800 to-gray-900",
  },
};

// Testimonials data with professional structure
const testimonials = [
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Star Rating Component
const StarRating = ({ rating, size = "sm" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`${i < rating ? "text-amber-400" : "text-gray-200"} ${
            sizeClasses[size]
          } transition-colors duration-300`}
        >
          <Icons.Star />
        </span>
      ))}
    </div>
  );
};

// Growth Badge Component
const GrowthBadge = ({ percent }) => (
  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">
    <Icons.ArrowUp />
    <span>{percent}</span>
  </div>
);

// Platform Badge Component
const PlatformBadge = ({ platform }) => {
  const config = platformConfig[platform];
  const Icon = config.Icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${config.bgColor} rounded-full`}
    >
      <span className={config.color}>
        <Icon />
      </span>
      <span className="text-xs font-medium text-gray-700">{config.name}</span>
    </div>
  );
};

// 3D Testimonial Card Component
const TestimonialCard = ({ testimonial, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const platform = platformConfig[testimonial.platform];

  // 3D tilt effect on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;

    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${300 + index * 150}ms`,
        perspective: "1000px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Card Container */}
      <div
        className="relative h-full transition-transform duration-300 ease-out"
        style={{
          transform: isHovered
            ? `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
            : "rotateY(0deg) rotateX(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card Glow Effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${
            platform.gradient
          } rounded-[28px] opacity-0 blur-xl transition-opacity duration-500 ${
            isHovered ? "opacity-30" : ""
          }`}
        />

        {/* Main Card */}
        <div
          className={`relative bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 h-full flex flex-col transition-all duration-500 ${
            isHovered
              ? "shadow-2xl shadow-gray-200/50 border-gray-200"
              : "shadow-xl shadow-gray-100/50"
          }`}
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Featured Badge */}
          {testimonial.featured && (
            <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg">
              ⭐ Featured
            </div>
          )}

          {/* Top Section: Platform & Growth */}
          <div className="flex items-center justify-between mb-6">
            <PlatformBadge platform={testimonial.platform} />
            <GrowthBadge percent={testimonial.growthPercent} />
          </div>

          {/* Before/After Stats */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 mb-6 border border-gray-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 1px)`,
                  backgroundSize: "16px 16px",
                }}
              />
            </div>

            <div className="relative flex items-center gap-4">
              {/* Before */}
              <div className="flex-1 text-center">
                <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1 font-medium">
                  Before
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-400">
                  {testimonial.before.value}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400">
                  {testimonial.before.label}
                </div>
              </div>

              {/* After */}
              <div className="flex-1 text-center">
                <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1 font-medium">
                  After
                </div>
                <div
                  className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${platform.gradient} bg-clip-text text-transparent`}
                >
                  {testimonial.after.value}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500">
                  {testimonial.after.label}
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="flex-1 relative">
            <div className="absolute -top-2 -left-2 text-gray-200">
              <Icons.Quote />
            </div>
            <blockquote className="relative z-10 pl-6">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base italic">
                "{testimonial.quote}"
              </p>
            </blockquote>
          </div>

          {/* Author Section */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
            {/* Avatar */}
            <div className="relative">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${platform.gradient} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg`}
              >
                {testimonial.avatar}
              </div>
              {testimonial.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md">
                  <Icons.Verified />
                </div>
              )}
            </div>

            {/* Name & Handle */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">
                  {testimonial.name}
                </span>
              </div>
              <div className="text-sm text-gray-500">{testimonial.handle}</div>
            </div>

            {/* Rating */}
            <div className="hidden sm:block">
              <StarRating rating={testimonial.rating} />
            </div>
          </div>

          {/* Mobile Rating */}
          <div className="sm:hidden mt-4 flex justify-center">
            <StarRating rating={testimonial.rating} />
          </div>
        </div>

        {/* 3D Shadow Layer */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 rounded-3xl -z-10 transition-all duration-300"
          style={{
            transform: isHovered
              ? "translateZ(-40px) translateY(20px)"
              : "translateZ(-20px) translateY(10px)",
            filter: "blur(20px)",
            opacity: isHovered ? 0.5 : 0.3,
          }}
        />
      </div>
    </div>
  );
};

// Stats Banner Component
const StatsBanner = ({ isInView }) => {
  const stats = [
    { value: "15,000+", label: "Active Creators" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "2.5M+", label: "Followers Gained" },
  ];

  return (
    <div
      className={`grid grid-cols-3 gap-4 sm:gap-8 mt-16 sm:mt-20 p-6 sm:p-8 bg-gradient-to-br from-secondary-50 to-white rounded-3xl border border-secondary-200 shadow-lg transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: "800ms" }}
    >
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-xl sm:text-3xl md:text-4xl font-bold text-primary-600">
            {stat.value}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Testimonials Component
const Testimonials = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

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
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="creators"
      className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-secondary-100 overflow-hidden relative"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 border border-primary-200/50 rounded-full animate-float opacity-30" />
      <div
        className="absolute bottom-40 left-10 w-16 h-16 border border-accent-200/50 rounded-full animate-float opacity-30"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-primary-200">
              <Icons.Users />
              <span>Chapter Five</span>
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-3 sm:mb-4">
              Creators Who Changed
              <br />
              <span className="italic text-primary-600">Their Story</span>
            </h2>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto">
              Real transformations from real creators. See what's possible.
            </p>
          </FadeIn>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Stats Banner */}
        <StatsBanner isInView={isInView} />

        {/* Bottom CTA */}
        <FadeIn delay={900}>
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-text-muted mb-6">
              Join thousands of creators who've transformed their content
              strategy
            </p>
            <button className="group relative px-8 py-4 bg-primary-600 text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary-500/25">
              <span className="relative z-10 flex items-center gap-2">
                Start Your Transformation
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </FadeIn>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .border-l-6 {
          border-left-width: 6px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;

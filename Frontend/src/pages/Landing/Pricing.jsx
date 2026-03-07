import React, { useState, useEffect, useRef, memo, useCallback } from "react";

// ============================================
// ONLY CREATORS — PRICING SECTION
// Warm Accent Palette | Theme-Integrated | 3D Cards
// ============================================

// ── Hooks ──────────────────────────────────────────────

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "40px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, visible]);
  return [ref, visible];
};

// ── Icons ──────────────────────────────────────────────

const CheckIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
));
CheckIcon.displayName = "CheckIcon";

const SparkleIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2l2.09 6.26L20 10l-5 4.87 1.18 6.88L12 18.77l-4.18 2.98L9 14.87 4 10l5.91-1.74L12 2z" />
  </svg>
));
SparkleIcon.displayName = "SparkleIcon";

const ArrowRightIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
));
ArrowRightIcon.displayName = "ArrowRightIcon";

const ShieldIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
));
ShieldIcon.displayName = "ShieldIcon";

const ZapIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
));
ZapIcon.displayName = "ZapIcon";

const CrownIcon = memo(() => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 20h20M4 20l2-14 4 6 2-8 2 8 4-6 2 14" />
  </svg>
));
CrownIcon.displayName = "CrownIcon";

// ── Plan Data ──────────────────────────────────────────

const PLANS = Object.freeze([
  {
    id: "explorer",
    name: "Explorer",
    icon: ShieldIcon,
    price: "Free",
    period: "forever",
    priceSuffix: "",
    description: "For creators just getting started with content analytics",
    features: [
      "1 platform connected",
      "Basic analytics dashboard",
      "7-day data history",
      "Weekly email reports",
      "Community access",
    ],
    cta: "Start Free",
    highlighted: false,
    accentColor: "var(--color-primary-500)",
    accentBg: "var(--color-primary-50)",
    accentBorder: "var(--color-primary-200)",
  },
  {
    id: "storyteller",
    name: "Storyteller",
    icon: ZapIcon,
    price: "$29",
    period: "/month",
    priceSuffix: "billed annually",
    description: "For creators ready to grow with AI-powered insights",
    features: [
      "All 3 platforms connected",
      "AI-powered content analysis",
      "Unlimited data history",
      "Real-time analytics",
      "Trend detection & alerts",
      "Priority support",
      "Custom report builder",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    accentColor: "var(--color-accent-500)",
    accentBg: "var(--color-accent-50)",
    accentBorder: "var(--color-accent-200)",
  },
  {
    id: "legend",
    name: "Legend",
    icon: CrownIcon,
    price: "Custom",
    period: "",
    priceSuffix: "tailored to you",
    description: "For creator teams, agencies, and enterprise workflows",
    features: [
      "Everything in Storyteller",
      "Unlimited team members",
      "Custom AI models",
      "Full API access",
      "Dedicated success manager",
      "White-label reports",
    ],
    cta: "Contact Sales",
    highlighted: false,
    accentColor: "var(--color-warning-500)",
    accentBg: "var(--color-warning-50)",
    accentBorder: "var(--color-warning-200)",
  },
]);

const TRUST_ITEMS = Object.freeze([
  "No credit card required",
  "14-day free trial on paid plans",
  "Cancel anytime",
]);

// ── Pricing Card ───────────────────────────────────────

const PricingCard = memo(({ plan, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = plan.icon;

  const isPopular = plan.highlighted;

  return (
    <div
      className="relative transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isPopular
            ? "translateY(-8px) scale(1)"
            : "translateY(0) scale(1)"
          : "translateY(24px) scale(0.97)",
        transitionDelay: `${200 + index * 140}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular badge */}
      {isPopular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent-400), var(--color-warning-400))",
            color: "#fff",
            boxShadow:
              "0 4px 16px -3px color-mix(in srgb, var(--color-accent-400) 40%, transparent)",
          }}
        >
          <SparkleIcon />
          Most Popular
        </div>
      )}

      {/* Glow ring for popular */}
      {isPopular && (
        <div
          className="absolute -inset-px rounded-[1.75rem] pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent-400), var(--color-warning-400), var(--color-error-400))",
            opacity: isHovered ? 0.8 : 0.5,
            padding: "2px",
          }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full rounded-[calc(1.75rem-2px)]"
            style={{ background: "var(--color-surface-50)" }}
          />
        </div>
      )}

      {/* Hover glow for non-popular */}
      {!isPopular && (
        <div
          className="absolute -inset-1 rounded-[2rem] pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${plan.accentColor}, transparent 70%)`,
            filter: "blur(20px)",
            opacity: isHovered ? 0.12 : 0,
          }}
          aria-hidden="true"
        />
      )}

      {/* Card body */}
      <div
        className="relative h-full flex flex-col rounded-[1.5rem] overflow-hidden transition-all duration-500"
        style={{
          background: isPopular
            ? "var(--color-surface-50)"
            : "var(--color-surface-50)",
          border: isPopular
            ? "none"
            : `1px solid ${isHovered ? plan.accentBorder : "var(--color-secondary-200)"}`,
          boxShadow: isHovered
            ? "0 25px 60px -12px rgba(0,0,0,0.08), 0 12px 28px -8px rgba(0,0,0,0.04)"
            : "0 4px 16px -4px rgba(0,0,0,0.04), 0 2px 8px -2px rgba(0,0,0,0.02)",
          transform: isHovered && !isPopular ? "translateY(-4px)" : undefined,
        }}
      >
        {/* Accent top bar */}
        <div
          className="h-1 w-full transition-all duration-500"
          style={{
            background: isPopular
              ? "linear-gradient(90deg, var(--color-accent-400), var(--color-warning-400), var(--color-error-400))"
              : isHovered
                ? `linear-gradient(90deg, transparent, ${plan.accentColor}, transparent)`
                : "transparent",
            opacity: isPopular ? 1 : 0.6,
          }}
        />

        <div className="flex flex-col h-full p-6 sm:p-7 md:p-8">
          {/* ── Header ── */}
          <div className="mb-6 sm:mb-7">
            {/* Icon + Name row */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: plan.accentBg,
                  color: plan.accentColor,
                  border: `1px solid ${plan.accentBorder}`,
                  transform: isHovered
                    ? "scale(1.05) rotate(-3deg)"
                    : "scale(1) rotate(0)",
                }}
              >
                <Icon />
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {plan.name}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-xs sm:text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {plan.description}
            </p>
          </div>

          {/* ── Price ── */}
          <div className="mb-6 sm:mb-7">
            <div className="flex items-baseline gap-1">
              <span
                className="text-4xl sm:text-5xl font-extrabold tabular-nums"
                style={{
                  color: isPopular
                    ? plan.accentColor
                    : "var(--color-text-primary)",
                }}
              >
                {plan.price}
              </span>
              {plan.period && (
                <span
                  className="text-sm sm:text-base font-medium"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {plan.period}
                </span>
              )}
            </div>
            {plan.priceSuffix && (
              <p
                className="text-[10px] sm:text-xs mt-1 font-medium"
                style={{ color: "var(--color-text-light)" }}
              >
                {plan.priceSuffix}
              </p>
            )}
          </div>

          {/* ── Divider ── */}
          <div
            className="h-px w-full mb-6 sm:mb-7"
            style={{
              background: isPopular
                ? `linear-gradient(90deg, transparent, var(--color-accent-200), transparent)`
                : `linear-gradient(90deg, transparent, var(--color-secondary-300), transparent)`,
            }}
          />

          {/* ── Features ── */}
          <ul
            className="space-y-3 sm:space-y-3.5 mb-8 sm:mb-9 flex-1"
            role="list"
          >
            {plan.features.map((feature, j) => (
              <li
                key={j}
                className="flex items-start gap-2.5 transition-all duration-400"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-8px)",
                  transitionDelay: `${400 + index * 140 + j * 60}ms`,
                }}
              >
                {/* Check circle */}
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: isPopular
                      ? plan.accentBg
                      : "var(--color-surface-200)",
                    color: plan.accentColor,
                    border: `1px solid ${isPopular ? plan.accentBorder : "var(--color-secondary-300)"}`,
                  }}
                >
                  <CheckIcon />
                </div>
                <span
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* ── CTA Button ── */}
          {isPopular ? (
            <button
              className="group w-full py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-500 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent-500), var(--color-error-500))",
                color: "#fff",
                boxShadow:
                  "0 6px 20px -4px color-mix(in srgb, var(--color-accent-500) 35%, transparent)",
                outlineColor: "var(--color-accent-500)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 12px 32px -4px color-mix(in srgb, var(--color-accent-500) 50%, transparent)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 6px 20px -4px color-mix(in srgb, var(--color-accent-500) 35%, transparent)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {plan.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRightIcon />
              </span>
            </button>
          ) : (
            <button
              className="group w-full py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-500 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: "var(--color-surface-50)",
                color: "var(--color-text-secondary)",
                border: "2px solid var(--color-secondary-300)",
                outlineColor: "var(--color-primary-500)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = plan.accentColor;
                e.currentTarget.style.color = plan.accentColor;
                e.currentTarget.style.boxShadow = `0 4px 16px -4px color-mix(in srgb, ${plan.accentColor} 20%, transparent)`;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--color-secondary-300)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {plan.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRightIcon />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
PricingCard.displayName = "PricingCard";

// ── Section Header ─────────────────────────────────────

const SectionHeader = memo(({ isVisible }) => (
  <div className="text-center mb-12 sm:mb-16 md:mb-20">
    {/* Badge */}
    <div
      className="transition-all duration-600"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
      }}
    >
      <span
        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-semibold"
        style={{
          background: "var(--color-accent-50)",
          color: "var(--color-accent-700)",
          border: "1px solid var(--color-accent-200)",
        }}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{
              background: "var(--color-accent-400)",
              animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: "var(--color-accent-500)" }}
          />
        </span>
        Simple Pricing
      </span>
    </div>

    {/* Title */}
    <h2
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5 transition-all duration-700"
      style={{
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-sans)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(14px)",
        transitionDelay: "100ms",
      }}
    >
      Invest in your{" "}
      <span
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        growth story
      </span>
    </h2>

    {/* Subtitle */}
    <p
      className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-all duration-700"
      style={{
        color: "var(--color-text-muted)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transitionDelay: "200ms",
      }}
    >
      Start free. Upgrade when you're ready. No surprises, no hidden fees.
    </p>
  </div>
));
SectionHeader.displayName = "SectionHeader";

// ── Trust Bar ──────────────────────────────────────────

const TrustBar = memo(({ isVisible }) => (
  <div
    className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-14 transition-all duration-700"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(10px)",
      transitionDelay: "700ms",
    }}
  >
    {TRUST_ITEMS.map((item, i) => (
      <div key={item} className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center"
          style={{
            background: "var(--color-success-50)",
            color: "var(--color-success-500)",
            border: "1px solid var(--color-success-200)",
          }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <span
          className="text-xs sm:text-sm font-medium"
          style={{ color: "var(--color-text-muted)" }}
        >
          {item}
        </span>
      </div>
    ))}
  </div>
));
TrustBar.displayName = "TrustBar";

// ── FAQ Teaser ─────────────────────────────────────────

const FAQTeaser = memo(({ isVisible }) => (
  <div
    className="mt-14 sm:mt-18 md:mt-22 text-center transition-all duration-800"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(12px)",
      transitionDelay: "800ms",
    }}
  >
    <div
      className="mx-auto w-16 h-px mb-8"
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--color-secondary-300), transparent)",
      }}
    />

    <p
      className="text-sm sm:text-base mb-3"
      style={{ color: "var(--color-text-muted)" }}
    >
      Have questions about which plan is right for you?
    </p>

    <button
      className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold transition-all duration-300"
      style={{ color: "var(--color-accent-600)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--color-accent-700)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--color-accent-600)";
      }}
    >
      Compare plans in detail
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRightIcon />
      </span>
    </button>
  </div>
));
FAQTeaser.displayName = "FAQTeaser";

// ── Background ─────────────────────────────────────────

const SectionBackground = memo(() => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(300px, 40vw, 550px)",
        height: "clamp(300px, 40vw, 550px)",
        top: "0%",
        left: "10%",
        background: "var(--color-accent-100)",
        filter: "blur(130px)",
        opacity: 0.12,
      }}
    />
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(250px, 35vw, 450px)",
        height: "clamp(250px, 35vw, 450px)",
        bottom: "5%",
        right: "5%",
        background: "var(--color-warning-100)",
        filter: "blur(130px)",
        opacity: 0.08,
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-secondary-400) 0.5px, transparent 0.5px)",
        backgroundSize: "40px 40px",
        opacity: 0.06,
      }}
    />
  </div>
));
SectionBackground.displayName = "SectionBackground";

// ── MAIN COMPONENT ─────────────────────────────────────

const Pricing = () => {
  const [headerRef, headerVisible] = useInView(0.15);
  const [cardsRef, cardsVisible] = useInView(0.08);
  const [bottomRef, bottomVisible] = useInView(0.2);

  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-6 overflow-hidden"
      style={{ background: "var(--color-secondary-100)" }}
      aria-labelledby="pricing-heading"
    >
      <SectionBackground />

      <div className="relative max-w-6xl mx-auto">
        <h2 className="sr-only" id="pricing-heading">
          Pricing plans
        </h2>

        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader isVisible={headerVisible} />
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-5 lg:gap-7 items-start max-w-5xl mx-auto"
        >
          {PLANS.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={i}
              isVisible={cardsVisible}
            />
          ))}
        </div>

        {/* Trust bar */}
        <div ref={bottomRef}>
          <TrustBar isVisible={bottomVisible} />
          <FAQTeaser isVisible={bottomVisible} />
        </div>
      </div>
    </section>
  );
};

export default memo(Pricing);

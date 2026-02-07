import { memo, useMemo, useCallback, useState, useRef, useEffect } from "react";

// ============================================
// FOOTER COMPONENT
// Warm Accent Palette | Theme-Integrated
// Newsletter above links, fast & accessible
// ============================================

// ── Icons ──────────────────────────────────────────────

const TwitterIcon = memo(({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
));
TwitterIcon.displayName = "TwitterIcon";

const LinkedinIcon = memo(({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
));
LinkedinIcon.displayName = "LinkedinIcon";

const InstagramIcon = memo(({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
));
InstagramIcon.displayName = "InstagramIcon";

const YoutubeIcon = memo(({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
));
YoutubeIcon.displayName = "YoutubeIcon";

const ExternalLinkIcon = memo(({ className }) => (
  <svg
    className={className}
    width="11"
    height="11"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM3.64645 8.64645C3.45118 8.84171 3.45118 9.15829 3.64645 9.35355C3.84171 9.54882 4.15829 9.54882 4.35355 9.35355L3.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L3.64645 8.64645L4.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
      fill="currentColor"
    />
  </svg>
));
ExternalLinkIcon.displayName = "ExternalLinkIcon";

const CheckIcon = memo(({ className }) => (
  <svg
    className={className}
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
    <path d="M5 13l4 4L19 7" />
  </svg>
));
CheckIcon.displayName = "CheckIcon";

const SpinnerIcon = memo(({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
));
SpinnerIcon.displayName = "SpinnerIcon";

const ArrowRightIcon = memo(({ className }) => (
  <svg
    className={className}
    width="14"
    height="14"
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

// ── Data ───────────────────────────────────────────────

const FOOTER_NAVIGATION = Object.freeze([
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Documentation", href: "/docs" },
      { label: "API", href: "/api", isExternal: true },
      { label: "Status", href: "/status", isExternal: true },
    ],
  },
]);

const LEGAL_LINKS = Object.freeze([
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
]);

const SOCIAL_PLATFORMS = Object.freeze([
  { name: "Twitter", Icon: TwitterIcon, href: "https://twitter.com" },
  { name: "LinkedIn", Icon: LinkedinIcon, href: "https://linkedin.com" },
  { name: "Instagram", Icon: InstagramIcon, href: "https://instagram.com" },
  { name: "YouTube", Icon: YoutubeIcon, href: "https://youtube.com" },
]);

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

// ── Background ─────────────────────────────────────────

const FooterBackground = memo(() => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(250px, 30vw, 400px)",
        height: "clamp(250px, 30vw, 400px)",
        top: "-10%",
        right: "10%",
        background: "var(--color-accent-100)",
        filter: "blur(130px)",
        opacity: 0.08,
      }}
    />
    <div
      className="absolute rounded-full"
      style={{
        width: "clamp(200px, 25vw, 350px)",
        height: "clamp(200px, 25vw, 350px)",
        bottom: "5%",
        left: "5%",
        background: "var(--color-warning-100)",
        filter: "blur(130px)",
        opacity: 0.06,
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-secondary-400) 0.5px, transparent 0.5px)",
        backgroundSize: "32px 32px",
        opacity: 0.05,
      }}
    />
  </div>
));
FooterBackground.displayName = "FooterBackground";

// ── Logo ───────────────────────────────────────────────

const Logo = memo(() => (
  <a
    href="/"
    className="flex items-center gap-2.5 group outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
    style={{ outlineColor: "var(--color-accent-500)" }}
    aria-label="OnlyCreators — Go to homepage"
  >
    <div className="relative">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400))",
          boxShadow:
            "0 4px 16px -3px color-mix(in srgb, var(--color-accent-500) 30%, transparent)",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M8 14V12M12 14V9M16 14V11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10 pointer-events-none"
        style={{ background: "var(--color-accent-500)", filter: "blur(16px)" }}
        aria-hidden="true"
      />
    </div>

    <div className="flex items-baseline">
      <span
        className="text-xl font-semibold tracking-tight"
        style={{ color: "var(--color-text-primary)" }}
      >
        Only
      </span>
      <span
        className="text-xl font-semibold tracking-tight"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Creators
      </span>
    </div>
  </a>
));
Logo.displayName = "Logo";

// ── Social Links ───────────────────────────────────────

const SocialLinks = memo(() => (
  <nav aria-label="Social media links">
    <ul className="flex gap-2.5" role="list">
      {SOCIAL_PLATFORMS.map(({ name, Icon, href }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on ${name}`}
            className="group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2"
            style={{
              background: "var(--color-surface-50)",
              color: "var(--color-text-muted)",
              border: "1px solid var(--color-secondary-300)",
              outlineColor: "var(--color-accent-500)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-accent-600)";
              e.currentTarget.style.borderColor = "var(--color-accent-300)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px -4px color-mix(in srgb, var(--color-accent-500) 20%, transparent)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-muted)";
              e.currentTarget.style.borderColor = "var(--color-secondary-300)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Icon className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />

            {/* Tooltip */}
            <span
              className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap"
              style={{
                background: "var(--color-text-primary)",
                color: "var(--color-surface-50)",
              }}
            >
              {name}
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
                style={{
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: "4px solid var(--color-text-primary)",
                }}
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
));
SocialLinks.displayName = "SocialLinks";

// ── Newsletter ─────────────────────────────────────────

const Newsletter = memo(({ isVisible }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email.trim()) return;
      setStatus("loading");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    },
    [email],
  );

  const isDisabled = status === "loading" || status === "success";

  return (
    <section
      className="relative rounded-[1.5rem] overflow-hidden transition-all duration-500"
      style={{
        background: "var(--color-surface-50)",
        border: `1px solid ${isHovered ? "var(--color-accent-200)" : "var(--color-secondary-200)"}`,
        boxShadow: isHovered
          ? "0 25px 60px -12px rgba(0,0,0,0.06), 0 0 0 1px color-mix(in srgb, var(--color-accent-200) 50%, transparent)"
          : "0 4px 16px -4px rgba(0,0,0,0.03)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: "100ms",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-labelledby="newsletter-heading"
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full transition-all duration-500"
        style={{
          background: isHovered
            ? "linear-gradient(90deg, var(--color-accent-400), var(--color-warning-400), var(--color-error-400))"
            : "linear-gradient(90deg, transparent, var(--color-accent-200), transparent)",
          opacity: isHovered ? 1 : 0.5,
        }}
      />

      {/* Glow */}
      <div
        className="absolute -inset-1 rounded-[2rem] pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-accent-500), transparent 70%)",
          filter: "blur(40px)",
          opacity: isHovered ? 0.06 : 0,
        }}
        aria-hidden="true"
      />

      <div className="relative p-6 sm:p-8 md:p-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          {/* Text */}
          <div className="text-center lg:text-left flex-shrink-0">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
                style={{
                  background: "var(--color-accent-50)",
                  color: "var(--color-accent-700)",
                  border: "1px solid var(--color-accent-200)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{
                      background: "var(--color-accent-400)",
                      animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
                    }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ background: "var(--color-accent-500)" }}
                  />
                </span>
                Weekly
              </span>
            </div>
            <h3
              id="newsletter-heading"
              className="text-lg sm:text-xl font-bold mb-1.5"
              style={{ color: "var(--color-text-primary)" }}
            >
              Stay in the loop
            </h3>
            <p
              className="text-sm max-w-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Creator insights, growth strategies, and platform updates
              delivered weekly.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
          >
            <div className="relative flex-1 lg:w-72">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isDisabled}
                className="w-full px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
                style={{
                  background: "var(--color-secondary-50)",
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--color-secondary-200)",
                  opacity: isDisabled ? 0.6 : 1,
                  cursor: isDisabled ? "not-allowed" : "text",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent-400)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px color-mix(in srgb, var(--color-accent-500) 12%, transparent)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--color-secondary-200)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                aria-label="Email address"
              />
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="group relative px-7 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap overflow-hidden transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent-500), var(--color-error-500))",
                color: "#fff",
                boxShadow:
                  "0 4px 16px -3px color-mix(in srgb, var(--color-accent-500) 35%, transparent)",
                opacity: isDisabled ? 0.6 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
                outlineColor: "var(--color-accent-500)",
              }}
              onMouseEnter={(e) => {
                if (!isDisabled) {
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px -4px color-mix(in srgb, var(--color-accent-500) 50%, transparent)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 16px -3px color-mix(in srgb, var(--color-accent-500) 35%, transparent)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span
                className="inline-flex items-center justify-center gap-2 transition-all duration-300"
                style={{ opacity: status === "loading" ? 0 : 1 }}
              >
                {status === "success" ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                )}
              </span>

              {status === "loading" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <SpinnerIcon className="animate-spin h-5 w-5" />
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Feedback */}
        <div className="min-h-[20px] mt-3">
          {status === "success" && (
            <p
              className="text-sm text-center lg:text-right font-medium"
              style={{ color: "var(--color-success-600)" }}
            >
              🎉 Thanks for subscribing! Check your inbox soon.
            </p>
          )}
          {status === "error" && (
            <p
              className="text-sm text-center lg:text-right font-medium"
              style={{ color: "var(--color-error-500)" }}
            >
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
});
Newsletter.displayName = "Newsletter";

// ── Navigation Column ──────────────────────────────────

const NavigationColumn = memo(({ title, links, isVisible, delay }) => (
  <div
    className="transition-all duration-700"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(12px)",
      transitionDelay: `${delay}ms`,
    }}
  >
    <h3
      className="font-bold text-[11px] uppercase tracking-[0.12em] mb-4 sm:mb-5"
      style={{ color: "var(--color-text-light)" }}
    >
      {title}
    </h3>
    <ul className="space-y-2.5" role="list">
      {links.map(({ label, href, isExternal }) => (
        <li key={label}>
          <a
            href={href}
            {...(isExternal && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            className="group inline-flex items-center gap-1.5 text-sm transition-all duration-200 outline-none focus-visible:ring-2 rounded-sm"
            style={{
              color: "var(--color-text-muted)",
              outlineColor: "var(--color-accent-500)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-accent-600)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            <span className="relative">
              {label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background: "var(--color-accent-500)" }}
              />
            </span>
            {isExternal && (
              <ExternalLinkIcon className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200" />
            )}
          </a>
        </li>
      ))}
    </ul>
  </div>
));
NavigationColumn.displayName = "NavigationColumn";

// ── Legal Links ────────────────────────────────────────

const LegalLinks = memo(() => (
  <nav aria-label="Legal links">
    <ul
      className="flex flex-wrap justify-center md:justify-end gap-6"
      role="list"
    >
      {LEGAL_LINKS.map(({ label, href }) => (
        <li key={label}>
          <a
            href={href}
            className="text-sm transition-colors duration-200 outline-none focus-visible:ring-2 rounded-sm"
            style={{
              color: "var(--color-text-light)",
              outlineColor: "var(--color-accent-500)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-accent-600)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-light)";
            }}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
));
LegalLinks.displayName = "LegalLinks";

// ── Main Footer ────────────────────────────────────────

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [topRef, topVisible] = useInView(0.1);
  const [gridRef, gridVisible] = useInView(0.08);
  const [bottomRef, bottomVisible] = useInView(0.2);

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--color-secondary-100)",
        borderTop: "1px solid var(--color-secondary-300)",
      }}
      role="contentinfo"
    >
      <FooterBackground />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16 lg:py-20">
        {/* ── 1. Newsletter (above everything) ── */}
        <div ref={topRef} className="mb-12 sm:mb-14 lg:mb-16">
          <Newsletter isVisible={topVisible} />
        </div>

        {/* ── 2. Brand + Navigation Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-14 mb-12 sm:mb-14"
        >
          {/* Brand column */}
          <div
            className="col-span-2 space-y-5 transition-all duration-700"
            style={{
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <Logo />
            <p
              className="max-w-xs leading-relaxed text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Your story, amplified by AI. Analytics and insights that help
              creators understand their audience and grow their influence.
            </p>
            <SocialLinks />
          </div>

          {/* Nav columns */}
          {FOOTER_NAVIGATION.map((column, i) => (
            <NavigationColumn
              key={column.title}
              title={column.title}
              links={column.links}
              isVisible={gridVisible}
              delay={200 + i * 100}
            />
          ))}
        </div>

        {/* ── 3. Divider ── */}
        <div
          className="h-px w-full mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-secondary-300), transparent)",
          }}
        />

        {/* ── 4. Bottom Bar ── */}
        <div
          ref={bottomRef}
          className="flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700"
          style={{
            opacity: bottomVisible ? 1 : 0,
            transform: bottomVisible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: "100ms",
          }}
        >
          <p
            className="text-sm order-2 md:order-1"
            style={{ color: "var(--color-text-light)" }}
          >
            © {currentYear} OnlyCreators. Crafted with purpose.
          </p>
          <div className="order-1 md:order-2">
            <LegalLinks />
          </div>
        </div>

        {/* ── 5. Closing Line ── */}
        <div
          className="text-center mt-12 sm:mt-14 pt-8 transition-all duration-700"
          style={{
            borderTop:
              "1px solid color-mix(in srgb, var(--color-secondary-300) 60%, transparent)",
            opacity: bottomVisible ? 1 : 0,
            transform: bottomVisible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: "300ms",
          }}
        >
          <p
            className="italic text-sm tracking-wide select-none"
            style={{
              color: "var(--color-text-light)",
              fontFamily: "var(--font-serif, Georgia, serif)",
            }}
          >
            — Where every page ends, your story begins —
          </p>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  );
};

export default memo(Footer);

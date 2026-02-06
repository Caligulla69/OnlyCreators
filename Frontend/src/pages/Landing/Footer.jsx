import { memo, useMemo, useCallback, useState } from "react";

// ============================================================================
// Icon Components
// ============================================================================
const Icons = {
  Twitter: ({ className }) => (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),

  Linkedin: ({ className }) => (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),

  Instagram: ({ className }) => (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),

  Youtube: ({ className }) => (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),

  ExternalLink: ({ className }) => (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM3.64645 8.64645C3.45118 8.84171 3.45118 9.15829 3.64645 9.35355C3.84171 9.54882 4.15829 9.54882 4.35355 9.35355L3.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L3.64645 8.64645L4.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
        fill="currentColor"
      />
    </svg>
  ),

  Check: ({ className }) => (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),

  Spinner: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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
  ),
};

// ============================================================================
// Constants
// ============================================================================
const FOOTER_NAVIGATION = [
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
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

const SOCIAL_PLATFORMS = [
  { name: "Twitter", icon: Icons.Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Icons.Linkedin, href: "https://linkedin.com" },
  { name: "Instagram", icon: Icons.Instagram, href: "https://instagram.com" },
  { name: "YouTube", icon: Icons.Youtube, href: "https://youtube.com" },
];

// ============================================================================
// Logo Component
// ============================================================================
const Logo = memo(() => (
  <a
    href="/"
    className="flex items-center gap-2.5 group"
    aria-label="OnlyCreators - Go to homepage"
  >
    {/* Logo Mark */}
    <div className="relative">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary-600 dark:bg-primary-500 shadow-lg shadow-primary-500/20 transition-all duration-300 group-hover:shadow-primary-500/40 group-hover:scale-105">
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
            className="opacity-90"
          />
          <path
            d="M8 14V12M12 14V9M16 14V11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-xl bg-primary-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"
        aria-hidden="true"
      />
    </div>

    {/* Logo Text */}
    <div className="flex items-baseline">
      <span className="text-xl font-semibold tracking-tight text-text-primary dark:text-dark-text transition-colors">
        Only
      </span>
      <span className="text-xl font-semibold tracking-tight text-primary-600 dark:text-primary-400">
        Creators
      </span>
    </div>
  </a>
));

Logo.displayName = "Logo";

// ============================================================================
// Social Links Component
// ============================================================================
const SocialLinks = memo(() => (
  <nav aria-label="Social media links">
    <ul className="flex gap-3" role="list">
      {SOCIAL_PLATFORMS.map(({ name, icon: Icon, href }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on ${name}`}
            className="group relative w-10 h-10 bg-white dark:bg-dark-surface rounded-xl flex items-center justify-center text-text-muted dark:text-dark-text-muted border border-secondary-300 dark:border-dark-border transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-0.5"
          >
            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
));

SocialLinks.displayName = "SocialLinks";

// ============================================================================
// Navigation Column Component
// ============================================================================
const NavigationColumn = memo(({ title, links }) => (
  <div>
    <h3 className="font-semibold text-text-primary dark:text-dark-text mb-4 text-sm uppercase tracking-wider">
      {title}
    </h3>
    <ul className="space-y-3" role="list">
      {links.map(({ label, href, isExternal }) => (
        <li key={label}>
          <a
            href={href}
            {...(isExternal && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            className="group inline-flex items-center gap-1 text-text-muted dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 text-sm"
          >
            <span className="relative">
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full" />
            </span>
            {isExternal && (
              <Icons.ExternalLink className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            )}
          </a>
        </li>
      ))}
    </ul>
  </div>
));

NavigationColumn.displayName = "NavigationColumn";

// ============================================================================
// Newsletter Component
// ============================================================================
const Newsletter = memo(() => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email.trim()) return;

      setStatus("loading");

      try {
        // Replace with your actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } catch (error) {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    },
    [email],
  );

  const isDisabled = status === "loading" || status === "success";

  const buttonContent = useMemo(() => {
    switch (status) {
      case "success":
        return (
          <>
            <Icons.Check className="w-4 h-4" />
            <span>Subscribed!</span>
          </>
        );
      case "loading":
        return null;
      default:
        return "Subscribe";
    }
  }, [status]);

  return (
    <section
      className="py-10 border-t border-b border-gray-200/60 dark:border-dark-border"
      aria-labelledby="newsletter-heading"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <h3
            id="newsletter-heading"
            className="font-semibold text-gray-900 dark:text-dark-text mb-2 text-lg"
          >
            Stay in the loop
          </h3>
          <p className="text-gray-500 dark:text-dark-text-muted text-sm max-w-sm leading-relaxed">
            Get creator insights, growth strategies, and platform updates
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
              className="w-full px-5 py-3.5 rounded-xl border border-secondary-200 dark:border-dark-border bg-white dark:bg-dark-surface dark:text-dark-text focus:border-primary-400 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 outline-none transition-all duration-200 text-sm placeholder:text-text-light dark:placeholder:text-dark-text-muted disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Email address"
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="relative px-7 py-3.5 bg-primary-600 dark:bg-primary-500 text-white rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span
              className={`inline-flex items-center justify-center gap-2 transition-all duration-300 ${
                status === "loading" ? "opacity-0" : "opacity-100"
              }`}
            >
              {buttonContent}
            </span>

            {status === "loading" && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Icons.Spinner className="animate-spin h-5 w-5" />
              </span>
            )}
          </button>
        </form>
      </div>

      {/* Feedback Messages */}
      <div className="min-h-[24px] mt-4">
        {status === "success" && (
          <p className="text-green-600 text-sm text-center lg:text-right animate-fade-in">
            🎉 Thanks for subscribing! Check your inbox soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm text-center lg:text-right animate-fade-in">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
});

Newsletter.displayName = "Newsletter";

// ============================================================================
// Legal Links Component
// ============================================================================
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
            className="text-text-light dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
));

LegalLinks.displayName = "LegalLinks";

// ============================================================================
// Main Footer Component
// ============================================================================
const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      className="relative bg-secondary-100 dark:bg-dark-bg border-t border-secondary-300 dark:border-dark-border"
      role="contentinfo"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(30,77,94,0.03)_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.03)_1px,_transparent_0)] bg-[size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
        {/* Main Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 space-y-6">
            <Logo />
            <p className="text-text-muted dark:text-dark-text-muted max-w-xs leading-relaxed text-sm">
              Your story, amplified by AI. Analytics and insights that help
              creators understand their audience and grow their influence.
            </p>
            <SocialLinks />
          </div>

          {/* Navigation Columns */}
          {FOOTER_NAVIGATION.map((column) => (
            <NavigationColumn
              key={column.title}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>

        {/* Newsletter Section */}
        <Newsletter />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-sm">
          <p className="text-text-light dark:text-dark-text-muted order-2 md:order-1">
            © {currentYear} OnlyCreators. Crafted with purpose.
          </p>
          <div className="order-1 md:order-2">
            <LegalLinks />
          </div>
        </div>

        {/* Poetic Closing */}
        <div className="text-center mt-16 pt-8 border-t border-secondary-300/60 dark:border-dark-border/60">
          <p className="text-secondary-500 dark:text-secondary-400 font-serif italic text-sm tracking-wide select-none">
            — Where every page ends, your story begins —
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);

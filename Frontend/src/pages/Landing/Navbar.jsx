import { useState, useEffect, useCallback, useRef, memo } from "react";

// ============================================
// NAVIGATION COMPONENT
// ============================================

// ── Icons ──────────────────────────────────────────────

const MenuIcon = memo(({ isOpen }) => (
  <div
    className="w-6 h-6 flex flex-col justify-center items-center"
    aria-hidden="true"
  >
    <span
      className="block h-0.5 w-5 rounded-full transition-all duration-300 ease-out"
      style={{
        background: "currentColor",
        transform: isOpen ? "rotate(45deg) translateY(6px)" : "none",
      }}
    />
    <span
      className="block h-0.5 w-5 rounded-full my-1 transition-all duration-300 ease-out"
      style={{
        background: "currentColor",
        opacity: isOpen ? 0 : 1,
        transform: isOpen ? "scale(0)" : "scale(1)",
      }}
    />
    <span
      className="block h-0.5 w-5 rounded-full transition-all duration-300 ease-out"
      style={{
        background: "currentColor",
        transform: isOpen ? "rotate(-45deg) translateY(-6px)" : "none",
      }}
    />
  </div>
));
MenuIcon.displayName = "MenuIcon";

const CloseIcon = memo(() => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
));
CloseIcon.displayName = "CloseIcon";

const ArrowRightIcon = memo(() => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="transition-transform duration-200 group-hover:translate-x-0.5"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
));
ArrowRightIcon.displayName = "ArrowRightIcon";

// ── Data ───────────────────────────────────────────────

const NAV_LINKS = Object.freeze([
  { label: "Dilemma", href: "#dilemma" },
  { label: "Features", href: "#features" },
  { label: "Journey", href: "#journey" },
  { label: "Pricing", href: "#pricing" },
]);

// ── Logo ───────────────────────────────────────────────

const Logo = memo(() => (
  <a
    href="#"
    className="flex items-center gap-2.5 group outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
    style={{ outlineColor: "var(--color-accent-500)" }}
  >
    <div className="relative">
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent-500), var(--color-error-400))",
          boxShadow:
            "0 4px 16px -3px color-mix(in srgb, var(--color-accent-500) 35%, transparent)",
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
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "var(--color-accent-500)",
          filter: "blur(12px)",
        }}
        aria-hidden="true"
      />
    </div>

    <div className="flex items-baseline">
      <span
        className="text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300"
        style={{ color: "var(--color-text-primary)" }}
      >
        Only
      </span>
      <span
        className="text-lg sm:text-xl font-semibold tracking-tight"
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

// ── Desktop Nav Link ───────────────────────────────────

const NavLink = memo(({ href, label }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(href);
      if (section) {
        const rect = section.getBoundingClientRect();
        setIsActive(rect.top <= 100 && rect.bottom >= 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [href]);

  return (
    <a
      href={href}
      className="relative px-1 py-2 text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
      style={{
        color: isActive
          ? "var(--color-accent-600)"
          : "var(--color-text-secondary)",
        outlineColor: "var(--color-accent-500)",
      }}
      onMouseEnter={(e) => {
        if (!isActive)
          e.currentTarget.style.color = "var(--color-text-primary)";
      }}
      onMouseLeave={(e) => {
        if (!isActive)
          e.currentTarget.style.color = "var(--color-text-secondary)";
      }}
    >
      {label}
      <span
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-transform duration-300 origin-left"
        style={{
          background:
            "linear-gradient(90deg, var(--color-accent-500), var(--color-error-400))",
          transform: isActive ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </a>
  );
});
NavLink.displayName = "NavLink";

// ── Mobile Nav Link ────────────────────────────────────

const MobileNavLink = memo(({ href, label, onClick, index }) => (
  <a
    href={href}
    onClick={onClick}
    className="flex items-center justify-between py-3.5 font-medium transition-all duration-200 outline-none focus-visible:ring-2 rounded-lg px-2 -mx-2"
    style={{
      color: "var(--color-text-secondary)",
      borderBottom: "1px solid var(--color-secondary-200)",
      animationDelay: `${index * 50}ms`,
      outlineColor: "var(--color-accent-500)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = "var(--color-accent-600)";
      e.currentTarget.style.background = "var(--color-accent-50)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "var(--color-text-secondary)";
      e.currentTarget.style.background = "transparent";
    }}
  >
    {label}
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ opacity: 0.4 }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </a>
));
MobileNavLink.displayName = "MobileNavLink";

// ── Main Navigation ────────────────────────────────────

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Performant scroll handler using ref instead of state for lastScrollY
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setScrolled(currentY > 20);

        if (currentY > lastScrollY.current && currentY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          transform:
            hidden && !menuOpen ? "translateY(-100%)" : "translateY(0)",
          background: scrolled
            ? "color-mix(in srgb, var(--color-surface-50) 85%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          borderBottom: scrolled
            ? "1px solid color-mix(in srgb, var(--color-secondary-200) 50%, transparent)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 8px -2px rgba(0,0,0,0.06)" : "none",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.label} href={link.href} label={link.label} />
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/login"
                className="text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 rounded-lg px-3 py-2"
                style={{
                  color: "var(--color-text-secondary)",
                  outlineColor: "var(--color-accent-500)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }}
              >
                Log in
              </a>

              <a
                href="/signup"
                className="group flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent-500), var(--color-error-500))",
                  color: "#fff",
                  boxShadow:
                    "0 4px 16px -3px color-mix(in srgb, var(--color-accent-500) 35%, transparent)",
                  outlineColor: "var(--color-accent-500)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px -4px color-mix(in srgb, var(--color-accent-500) 50%, transparent)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px -3px color-mix(in srgb, var(--color-accent-500) 35%, transparent)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>Get Started</span>
                <ArrowRightIcon />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 active:scale-95 outline-none focus-visible:ring-2"
              style={{
                background: menuOpen
                  ? "var(--color-secondary-100)"
                  : "transparent",
                color: menuOpen
                  ? "var(--color-text-primary)"
                  : "var(--color-text-secondary)",
                outlineColor: "var(--color-accent-500)",
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <MenuIcon isOpen={menuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Overlay ── */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── Mobile Slide Panel ── */}
      <div
        className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 md:hidden transition-transform duration-500 ease-out"
        style={{
          background: "var(--color-surface-50)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          boxShadow: menuOpen ? "-8px 0 40px -12px rgba(0,0,0,0.15)" : "none",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Panel Header */}
        <div
          className="flex items-center justify-between p-4"
          style={{ borderBottom: "1px solid var(--color-secondary-200)" }}
        >
          <Logo />
          <button
            onClick={closeMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 outline-none focus-visible:ring-2"
            style={{
              color: "var(--color-text-secondary)",
              outlineColor: "var(--color-accent-500)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-secondary-100)";
              e.currentTarget.style.color = "var(--color-text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-text-secondary)";
            }}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Panel Content */}
        <div className="p-6 flex flex-col h-[calc(100%-73px)]">
          {/* Nav links */}
          <nav className="mb-8" aria-label="Mobile navigation links">
            {NAV_LINKS.map((link, i) => (
              <MobileNavLink
                key={link.label}
                href={link.href}
                label={link.label}
                onClick={closeMenu}
                index={i}
              />
            ))}
          </nav>

          {/* CTAs — all proper <a> tags for routing */}
          <div className="space-y-3">
            <a
              href="/signup"
              onClick={closeMenu}
              className="group w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent-500), var(--color-error-500))",
                color: "#fff",
                boxShadow:
                  "0 6px 20px -4px color-mix(in srgb, var(--color-accent-500) 35%, transparent)",
                outlineColor: "var(--color-accent-500)",
              }}
            >
              Get Started Free
              <ArrowRightIcon />
            </a>

            <a
              href="/login"
              onClick={closeMenu}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2"
              style={{
                background: "transparent",
                color: "var(--color-text-secondary)",
                border: "2px solid var(--color-secondary-300)",
                outlineColor: "var(--color-accent-500)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent-500)";
                e.currentTarget.style.color = "var(--color-accent-600)";
                e.currentTarget.style.background = "var(--color-accent-50)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--color-secondary-300)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Log in
            </a>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-8">
            <div
              className="h-px w-full mb-6"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-secondary-300), transparent)",
              }}
            />
            <p
              className="text-sm text-center font-medium"
              style={{ color: "var(--color-text-light)" }}
            >
              Join{" "}
              <span style={{ color: "var(--color-accent-600)" }}>15,000+</span>{" "}
              creators
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Navigation);

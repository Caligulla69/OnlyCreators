import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle, {
  ThemeToggleSwitch,
} from "../../components/common/ThemeToggle";

// ============================================
// NAVIGATION COMPONENT
// Professional, Elegant, Responsive
// ============================================

// Professional Logo Component - Analytics/Creator focused
const Logo = ({ scrolled }) => (
  <a href="#" className="flex items-center gap-2.5 group">
    {/* Logo Mark */}
    <div className="relative">
      {/* Main Logo */}
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
          scrolled
            ? "bg-primary-600 shadow-lg shadow-primary-500/25"
            : "bg-primary-600 shadow-lg shadow-primary-500/20"
        }`}
      >
        {/* Abstract "O" with analytics element */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white"
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
      </div>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-primary-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
    </div>

    {/* Logo Text */}
    <div className="flex items-baseline">
      <span
        className={`text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 ${
          scrolled
            ? "text-text-primary dark:text-dark-text"
            : "text-text-primary dark:text-dark-text"
        }`}
      >
        Only
      </span>
      <span className="text-lg sm:text-xl font-semibold tracking-tight text-primary-600 dark:text-primary-400">
        Creators
      </span>
    </div>
  </a>
);

// Alternative Elegant Logo Options
const LogoVariant2 = () => (
  <a href="#" className="flex items-center gap-2.5 group">
    <div className="relative">
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 shadow-lg shadow-primary-500/20`}
      >
        {/* Prism/Diamond - representing insights */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L4 8L12 22L20 8L12 2Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M4 8H20"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 2V8L4 8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2V8L20 8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V22"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="absolute inset-0 rounded-xl bg-primary-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
    </div>

    <div className="flex items-baseline">
      <span className="text-lg sm:text-xl font-semibold tracking-tight text-text-primary dark:text-dark-text">
        Only
      </span>
      <span className="text-lg sm:text-xl font-semibold tracking-tight text-primary-600 dark:text-primary-400">
        Creators
      </span>
    </div>
  </a>
);

// Minimal Elegant Logo
const LogoVariant3 = () => (
  <a href="#" className="flex items-center gap-3 group">
    <div className="relative">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-primary-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
        {/* Stylized "OC" monogram */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="url(#logo-gradient)"
            strokeWidth="2.5"
          />
          <path
            d="M12 8V16M9 12H15"
            stroke="url(#logo-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="logo-gradient" x1="4" y1="4" x2="20" y2="20">
              <stop stopColor="var(--color-primary-400)" />
              <stop offset="1" stopColor="var(--color-accent-500)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    <span className="text-lg sm:text-xl font-semibold tracking-tight text-text-primary dark:text-dark-text">
      Only
      <span className="text-primary-600 dark:text-primary-400">Creators</span>
    </span>
  </a>
);

// Minimal Elegant Animated Icons
const Icons = {
  // Clean hamburger to X animation using CSS
  Menu: ({ isOpen }) => (
    <div className="w-6 h-6 flex flex-col justify-center items-center">
      <span
        className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-out ${
          isOpen ? "rotate-45 translate-y-1" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-out my-1 ${
          isOpen ? "opacity-0 scale-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-out ${
          isOpen ? "-rotate-45 -translate-y-1" : ""
        }`}
      />
    </div>
  ),
  // Simple close icon
  X: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  // Minimal arrow
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
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
};

// Nav links configuration
const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Features", href: "#features" },
  { label: "Creators", href: "#creators" },
  { label: "Pricing", href: "#pricing" },
];

// Desktop Nav Link Component
const NavLink = ({ href, label, scrolled }) => {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [href]);

  return (
    <a
      href={href}
      className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${
        isActive
          ? "text-primary-600 dark:text-primary-400"
          : scrolled
            ? "text-text-secondary dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text"
            : "text-text-secondary dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text"
      }`}
    >
      {label}
      {/* Active indicator */}
      <span
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full transition-transform duration-300 origin-left ${
          isActive ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </a>
  );
};

// Mobile Menu Link
const MobileNavLink = ({ href, label, onClick, index }) => (
  <a
    href={href}
    onClick={onClick}
    className="block py-3 text-text-secondary dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 border-b border-secondary-200 dark:border-dark-border last:border-0"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {label}
  </a>
);

// Main Navigation Component
const Navigation = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Scrolled state for background
    setScrolled(currentScrollY > 20);

    // Hide/show on scroll direction (optional - remove if not wanted)
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl shadow-sm border-b border-secondary-200/50 dark:border-dark-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Logo scrolled={scrolled} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  scrolled={scrolled}
                />
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Professional Theme Toggle */}
              <ThemeToggle
                isDark={isDark}
                toggleTheme={toggleTheme}
                size="default"
              />

              <a
                href="/login"
                className="text-sm font-medium text-text-secondary dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text transition-colors"
              >
                Log in
              </a>
              <button className="group flex items-center gap-2 px-5 py-2.5 bg-primary-600 dark:bg-primary-500 text-white text-sm font-medium rounded-full transition-all duration-300 hover:bg-primary-700 dark:hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-600/20 active:scale-[0.98]">
                <span>Get Started</span>
                <Icons.ArrowRight />
              </button>
            </div>

            {/* Mobile Menu Button - Minimal Animated Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                menuOpen
                  ? "bg-secondary-200 dark:bg-dark-surface-light text-text-primary dark:text-dark-text"
                  : "text-text-secondary dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text hover:bg-secondary-100 dark:hover:bg-dark-surface-light"
              } active:scale-95`}
              aria-label="Toggle menu"
            >
              <Icons.Menu isOpen={menuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-dark-surface z-50 md:hidden transition-transform duration-500 ease-out shadow-2xl ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-dark-border">
          <Logo scrolled={true} />
          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-text-secondary dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text hover:bg-secondary-100 dark:hover:bg-dark-surface-light transition-colors"
          >
            <Icons.X />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-6">
          {/* Nav Links */}
          <nav className="mb-8">
            {navLinks.map((link, i) => (
              <MobileNavLink
                key={link.label}
                href={link.href}
                label={link.label}
                onClick={() => setMenuOpen(false)}
                index={i}
              />
            ))}
          </nav>

          {/* Mobile CTAs */}
          <div className="space-y-3">
            <button className="w-full py-3.5 bg-primary-600 dark:bg-primary-500 text-white rounded-full font-medium transition-all hover:bg-primary-700 dark:hover:bg-primary-600 flex items-center justify-center gap-2">
              <span>Get Started Free</span>
              <Icons.ArrowRight />
            </button>
            <button className="w-full py-3.5 text-text-secondary dark:text-dark-text-muted rounded-full font-medium border border-secondary-300 dark:border-dark-border transition-all hover:bg-secondary-50 dark:hover:bg-dark-surface-light">
              Log in
            </button>
          </div>

          {/* Mobile Theme Toggle - Professional Switch Style */}
          <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-dark-border">
            <ThemeToggleSwitch isDark={isDark} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile Footer Info */}
          <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-dark-border">
            <p className="text-sm text-text-light dark:text-dark-text-muted text-center">
              Join 15,000+ creators
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;

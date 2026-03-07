// src/components/layout/Footer.jsx
import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoYoutube,
  IoLogoDiscord,
  IoMailOutline,
  IoArrowForward,
  IoHeart,
  IoCheckmarkCircle,
} from "react-icons/io5";

const footerLinks = {
  product: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Trends", path: "/trends" },
    { label: "Insights", path: "/insights" },
    { label: "Audience", path: "/audience" },
    { label: "Settings", path: "/settings" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers", badge: "Hiring" },
    { label: "Contact", href: "#contact" },
  ],
  resources: [
    { label: "Documentation", href: "#docs" },
    { label: "API Reference", href: "#api" },
    { label: "Guides", href: "#guides" },
    { label: "Community", href: "#community" },
    { label: "Support", href: "#support" },
  ],
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Cookies", href: "#cookies" },
    { label: "Security", href: "#security" },
  ],
};

const socialLinks = [
  {
    icon: IoLogoTwitter,
    href: "#",
    label: "Twitter",
    color: "hover:text-blue-400",
  },
  {
    icon: IoLogoGithub,
    href: "#",
    label: "GitHub",
    color: "hover:text-surface-100",
  },
  {
    icon: IoLogoLinkedin,
    href: "#",
    label: "LinkedIn",
    color: "hover:text-blue-500",
  },
  {
    icon: IoLogoYoutube,
    href: "#",
    label: "YouTube",
    color: "hover:text-error-400",
  },
  {
    icon: IoLogoDiscord,
    href: "#",
    label: "Discord",
    color: "hover:text-primary-400",
  },
];

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = useCallback((e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  }, []);

  return (
    <footer className="relative bg-primary-950 dark:bg-dark-bg text-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-primary-900/50 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                Stay in the loop
              </h3>
              <p className="text-primary-200/60 dark:text-dark-text-muted">
                Get the latest updates on new features, tips for creators, and
                exclusive insights.
              </p>
            </div>

            <div className="flex-1 max-w-md">
              <form className="relative" onSubmit={handleSubscribe}>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300/50" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-primary-900/50 dark:bg-dark-surface border border-primary-800/50 dark:border-dark-border rounded-xl text-white placeholder:text-primary-300/40 dark:placeholder:text-dark-text-muted focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200 active:scale-[0.98]"
                  >
                    {subscribed ? (
                      <>
                        <IoCheckmarkCircle className="w-4 h-4" />
                        Done!
                      </>
                    ) : (
                      <>
                        Subscribe
                        <IoArrowForward className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
              <p className="text-sm text-primary-300/40 dark:text-dark-text-muted mt-3">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow duration-300">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
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
              <div>
                <span className="text-xl font-bold">
                  Only<span className="text-primary-400">Creators</span>
                </span>
                <p className="text-sm text-primary-200/50 dark:text-dark-text-muted">
                  AI-Powered Analytics
                </p>
              </div>
            </Link>
            <p className="text-primary-200/50 dark:text-dark-text-muted text-sm leading-relaxed mb-6 max-w-sm">
              Empowering content creators with AI-powered analytics to grow
              their audience and optimize content strategy.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`p-2.5 bg-primary-900/50 dark:bg-dark-surface hover:bg-primary-800/50 dark:hover:bg-dark-surface-light rounded-xl text-primary-300/60 dark:text-dark-text-muted ${social.color} transition-all duration-200 hover:scale-105`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-200/50 dark:text-dark-text-muted hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-200/50 dark:text-dark-text-muted hover:text-white text-sm transition-colors inline-flex items-center gap-2"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="px-2 py-0.5 bg-success-500/20 text-success-400 text-xs font-medium rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-200/50 dark:text-dark-text-muted hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-200/50 dark:text-dark-text-muted hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-primary-900/50 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-200/50 dark:text-dark-text-muted text-sm flex items-center gap-1">
              © 2025 OnlyCreators. Made with
              <IoHeart className="w-4 h-4 text-error-400 mx-1" />
              for creators worldwide.
            </p>

            <div className="flex items-center gap-6">
              <select className="bg-primary-900/50 dark:bg-dark-surface border border-primary-800/50 dark:border-dark-border rounded-lg px-3 py-1.5 text-sm text-primary-200/60 dark:text-dark-text-muted focus:outline-none focus:border-primary-500">
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>

              <div className="flex items-center gap-2 text-sm text-primary-300/40 dark:text-dark-text-muted">
                <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);

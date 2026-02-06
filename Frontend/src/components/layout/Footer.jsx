// src/components/layout/Footer.jsx
import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IoSparkles,
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoYoutube,
  IoLogoDiscord,
  IoMailOutline,
  IoArrowForward,
  IoHeart,
} from "react-icons/io5";

const footerLinks = {
  product: [
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "Integrations", path: "/integrations" },
    { label: "Changelog", path: "/changelog" },
    { label: "Roadmap", path: "/roadmap" },
  ],
  company: [
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Careers", path: "/careers", badge: "Hiring" },
    { label: "Press Kit", path: "/press" },
    { label: "Contact", path: "/contact" },
  ],
  resources: [
    { label: "Documentation", path: "/docs" },
    { label: "API Reference", path: "/api" },
    { label: "Guides", path: "/guides" },
    { label: "Community", path: "/community" },
    { label: "Support", path: "/support" },
  ],
  legal: [
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
    { label: "Cookies", path: "/cookies" },
    { label: "Security", path: "/security" },
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
    color: "hover:text-gray-100",
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
    color: "hover:text-red-500",
  },
  {
    icon: IoLogoDiscord,
    href: "#",
    label: "Discord",
    color: "hover:text-indigo-400",
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                Stay in the loop
              </h3>
              <p className="text-gray-400">
                Get the latest updates on new features, tips for creators, and
                exclusive insights.
              </p>
            </div>

            <div className="flex-1 max-w-md">
              <form className="relative">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-shadow"
                  >
                    Subscribe
                    <IoArrowForward className="w-4 h-4" />
                  </motion.button>
                </div>
              </form>
              <p className="text-sm text-gray-500 mt-3">
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
                <p className="text-sm text-gray-400">AI-Powered Analytics</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering content creators with AI-powered analytics to grow
              their audience and optimize content strategy.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-400 ${social.color} transition-colors`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
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
                    className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="px-2 py-0.5 bg-primary-500/20 text-primary-400 text-xs font-medium rounded-full">
                        {link.badge}
                      </span>
                    )}
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
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-1">
              © 2025 OnlyCreators. Made with
              <IoHeart className="w-4 h-4 text-red-500 mx-1" />
              for creators worldwide.
            </p>

            <div className="flex items-center gap-6">
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-400 focus:outline-none focus:border-primary-500">
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
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

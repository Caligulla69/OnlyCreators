import { useState, useRef, useEffect, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoNotificationsOutline,
  IoSearchOutline,
  IoMenuOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoChevronDown,
  IoClose,
  IoSparkles,
  IoTrendingUp,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoFlame,
  IoVideocam,
  IoPeople,
  IoBulb,
  IoStatsChart,
} from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../common/ThemeToggle";

const searchSuggestions = [
  {
    id: 1,
    type: "page",
    icon: IoVideocam,
    title: "Dashboard",
    path: "/dashboard",
  },
  { id: 2, type: "page", icon: IoTrendingUp, title: "Trends", path: "/trends" },
  { id: 3, type: "page", icon: IoBulb, title: "Insights", path: "/insights" },
  { id: 4, type: "page", icon: IoPeople, title: "Audience", path: "/audience" },
  {
    id: 5,
    type: "video",
    icon: IoVideocam,
    title: "React Tutorial - 10K views",
    path: "#",
  },
  {
    id: 6,
    type: "trend",
    icon: IoFlame,
    title: "AI Tools Trending",
    path: "/trends",
  },
];

const notificationIcons = {
  success: IoCheckmarkCircle,
  trend: IoFlame,
  insight: IoBulb,
  alert: IoAlertCircle,
};

const notificationStyles = {
  success: {
    bg: "bg-success-100",
    color: "text-success-600",
    ring: "ring-success-200",
  },
  trend: {
    bg: "bg-warning-100",
    color: "text-warning-600",
    ring: "ring-warning-200",
  },
  insight: {
    bg: "bg-accent-100",
    color: "text-accent-700",
    ring: "ring-accent-200",
  },
  alert: {
    bg: "bg-error-100",
    color: "text-error-600",
    ring: "ring-error-200",
  },
};

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, toggleSidebar } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const notifications = [
    {
      id: 1,
      type: "success",
      message: 'Your video "React Tutorial" hit 10K views!',
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "trend",
      message: 'The topic "AI Tools" is trending now',
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "insight",
      message: "New recommendation available for your channel",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      type: "success",
      message: "You gained 500 new subscribers this week!",
      time: "2 days ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowNotifications(false);
        setShowProfile(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const filteredSuggestions = searchQuery
    ? searchSuggestions.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : searchSuggestions;

  return (
    <>
      <header
        className={`
          sticky top-0 z-40 transition-all duration-300
          ${
            isScrolled
              ? isDark
                ? "bg-dark-surface/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-dark-border/50"
                : "bg-white/90 backdrop-blur-xl shadow-lg shadow-surface-200/50 border-b border-surface-200/50"
              : isDark
                ? "bg-dark-surface border-b border-dark-border"
                : "bg-white border-b border-surface-200"
          }
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebar}
              className={`p-2.5 rounded-xl lg:hidden transition-all duration-200 ${
                isDark
                  ? "text-dark-text-muted hover:text-dark-text hover:bg-dark-surface-light"
                  : "text-text-muted hover:text-text-primary hover:bg-surface-100"
              }`}
            >
              <IoMenuOutline className="w-6 h-6" />
            </motion.button>

            {/* Search bar */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              onClick={() => setShowSearch(true)}
              className={`hidden md:flex items-center gap-3 w-64 lg:w-80 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                isDark
                  ? "bg-dark-surface-light hover:bg-dark-border border border-transparent hover:border-dark-border text-dark-text-muted"
                  : "bg-surface-100 hover:bg-surface-200 border border-transparent hover:border-surface-300 text-text-muted"
              }`}
            >
              <IoSearchOutline
                className={`w-5 h-5 transition-colors ${isDark ? "text-dark-text-muted group-hover:text-dark-text" : "text-text-light group-hover:text-text-muted"}`}
              />
              <span className="text-sm">Search anything...</span>
              <div
                className={`ml-auto flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${isDark ? "bg-dark-surface text-dark-text-muted border border-dark-border" : "bg-white text-text-light border border-surface-200"}`}
              >
                <span>⌘</span>
                <span>K</span>
              </div>
            </motion.button>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Mobile search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearch(true)}
              className={`p-2.5 rounded-xl md:hidden transition-all ${
                isDark
                  ? "text-dark-text-muted hover:text-dark-text hover:bg-dark-surface-light"
                  : "text-text-muted hover:text-text-primary hover:bg-surface-100"
              }`}
            >
              <IoSearchOutline className="w-5 h-5" />
            </motion.button>

            {/* Professional Theme Toggle */}
            <ThemeToggle
              isDark={isDark}
              toggleTheme={toggleTheme}
              size="default"
            />

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2.5 rounded-xl transition-all ${
                  isDark
                    ? "text-dark-text-muted hover:text-dark-text hover:bg-dark-surface-light"
                    : "text-text-muted hover:text-text-primary hover:bg-surface-100"
                }`}
              >
                <IoNotificationsOutline className="w-5 h-5" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-96 rounded-2xl shadow-2xl overflow-hidden ${
                      isDark
                        ? "bg-dark-surface border border-dark-border"
                        : "bg-white border border-surface-200"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between px-5 py-4 border-b ${
                        isDark
                          ? "border-dark-border bg-gradient-to-r from-dark-surface-light to-dark-surface"
                          : "border-surface-200 bg-gradient-to-r from-surface-50 to-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-bold ${isDark ? "text-dark-text" : "text-text-primary"}`}
                        >
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="px-2.5 py-0.5 bg-primary-100 text-primary-900 text-xs font-bold rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <button className="text-sm text-primary-900 hover:text-primary-700 font-semibold transition-colors">
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification, index) => {
                        const Icon = notificationIcons[notification.type];
                        const styles = notificationStyles[notification.type];
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`
                              px-5 py-4 cursor-pointer transition-colors last:border-0
                              ${
                                isDark
                                  ? `hover:bg-dark-surface-light border-b border-dark-border ${!notification.read ? "bg-primary-900/20" : ""}`
                                  : `hover:bg-surface-50 border-b border-surface-100 ${!notification.read ? "bg-primary-50/30" : ""}`
                              }
                            `}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`p-2.5 rounded-xl ${styles.bg} ring-2 ${styles.ring}`}
                              >
                                <Icon className={`w-5 h-5 ${styles.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-medium ${isDark ? "text-dark-text" : "text-text-primary"}`}
                                >
                                  {notification.message}
                                </p>
                                <p
                                  className={`text-xs mt-1 ${isDark ? "text-dark-text-muted" : "text-text-muted"}`}
                                >
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <span className="w-2.5 h-2.5 bg-primary-900 rounded-full flex-shrink-0 mt-1.5 animate-pulse" />
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div
                      className={`px-5 py-3 border-t ${isDark ? "border-dark-border bg-dark-surface-light" : "border-surface-200 bg-surface-50"}`}
                    >
                      <Link
                        to="/notifications"
                        onClick={() => setShowNotifications(false)}
                        className="block text-center text-sm text-primary-900 hover:text-primary-700 font-semibold transition-colors"
                      >
                        View all notifications →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowProfile(!showProfile)}
                className={`flex items-center gap-3 p-1.5 rounded-xl transition-all ${
                  isDark
                    ? "hover:bg-dark-surface-light"
                    : "hover:bg-surface-100"
                }`}
              >
                <div className="relative">
                  <img
                    src={
                      user?.profilePicture || "https://via.placeholder.com/40"
                    }
                    alt={user?.name}
                    className={`w-10 h-10 rounded-xl object-cover ring-2 ${isDark ? "ring-dark-border" : "ring-surface-200"}`}
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success-500 border-2 rounded-full ${isDark ? "border-dark-surface" : "border-white"}`}
                  />
                </div>
                <div className="hidden md:block text-left">
                  <p
                    className={`text-sm font-semibold ${isDark ? "text-dark-text" : "text-text-primary"}`}
                  >
                    {user?.name?.split(" ")[0]}
                  </p>
                  <p
                    className={`text-xs ${isDark ? "text-dark-text-muted" : "text-text-muted"}`}
                  >
                    Pro Plan
                  </p>
                </div>
                <IoChevronDown
                  className={`hidden md:block w-4 h-4 transition-transform duration-200 ${
                    isDark ? "text-dark-text-muted" : "text-text-muted"
                  } ${showProfile ? "rotate-180" : ""}`}
                />
              </motion.button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl overflow-hidden ${
                      isDark
                        ? "bg-dark-surface border border-dark-border"
                        : "bg-white border border-surface-200"
                    }`}
                  >
                    {/* User Info */}
                    <div
                      className={`relative px-5 py-5 border-b ${
                        isDark
                          ? "border-dark-border bg-gradient-to-br from-dark-surface-light to-dark-surface"
                          : "border-surface-200 bg-gradient-to-br from-surface-50 to-white"
                      }`}
                    >
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full opacity-50 blur-2xl" />
                      <div className="relative flex items-center gap-4">
                        <img
                          src={
                            user?.profilePicture ||
                            "https://via.placeholder.com/40"
                          }
                          alt={user?.name}
                          className={`w-14 h-14 rounded-xl object-cover ring-2 shadow-lg ${isDark ? "ring-dark-border" : "ring-white"}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-bold truncate ${isDark ? "text-dark-text" : "text-text-primary"}`}
                          >
                            {user?.name}
                          </p>
                          <p
                            className={`text-sm truncate ${isDark ? "text-dark-text-muted" : "text-text-muted"}`}
                          >
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div
                        className={`flex items-center gap-3 mt-4 pt-4 border-t ${isDark ? "border-dark-border" : "border-surface-200"}`}
                      >
                        <div
                          className={`flex-1 text-center p-2 rounded-xl ${isDark ? "bg-dark-surface" : "bg-white"}`}
                        >
                          <p
                            className={`text-lg font-bold ${isDark ? "text-dark-text" : "text-text-primary"}`}
                          >
                            {(user?.subscriberCount / 1000).toFixed(1)}K
                          </p>
                          <p
                            className={`text-xs ${isDark ? "text-dark-text-muted" : "text-text-muted"}`}
                          >
                            Subs
                          </p>
                        </div>
                        <div
                          className={`flex-1 text-center p-2 rounded-xl ${isDark ? "bg-dark-surface" : "bg-white"}`}
                        >
                          <p
                            className={`text-lg font-bold ${isDark ? "text-dark-text" : "text-text-primary"}`}
                          >
                            1.2M
                          </p>
                          <p
                            className={`text-xs ${isDark ? "text-dark-text-muted" : "text-text-muted"}`}
                          >
                            Views
                          </p>
                        </div>
                        <div className="flex-1 text-center p-2 bg-success-50 rounded-xl">
                          <p className="text-lg font-bold text-success-600">
                            +12%
                          </p>
                          <p className="text-xs text-success-600">Growth</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {[
                        {
                          icon: IoPersonOutline,
                          label: "Profile",
                          path: "/profile",
                        },
                        {
                          icon: IoSettingsOutline,
                          label: "Settings",
                          path: "/settings",
                        },
                      ].map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setShowProfile(false)}
                          className={`flex items-center gap-3 px-5 py-3 transition-all group ${
                            isDark
                              ? "text-dark-text-muted hover:text-dark-text hover:bg-dark-surface-light"
                              : "text-text-secondary hover:text-text-primary hover:bg-surface-50"
                          }`}
                        >
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Logout */}
                    <div
                      className={`py-2 border-t ${isDark ? "border-dark-border" : "border-surface-200"}`}
                    >
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-5 py-3 w-full text-error-600 hover:bg-error-50 transition-all group"
                      >
                        <IoLogOutOutline className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Command Palette / Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowSearch(false)}
            />

            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden z-50 ${
                isDark
                  ? "bg-dark-surface border border-dark-border"
                  : "bg-white border border-surface-200"
              }`}
            >
              <div
                className={`flex items-center gap-3 px-5 py-4 border-b ${isDark ? "border-dark-border" : "border-surface-200"}`}
              >
                <IoSearchOutline
                  className={`w-5 h-5 ${isDark ? "text-dark-text-muted" : "text-text-muted"}`}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search videos, trends, pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`flex-1 bg-transparent focus:outline-none ${
                    isDark
                      ? "text-dark-text placeholder:text-dark-text-muted"
                      : "text-text-primary placeholder:text-text-light"
                  }`}
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isDark
                      ? "text-dark-text-muted hover:text-dark-text hover:bg-dark-surface-light"
                      : "text-text-muted hover:text-text-primary hover:bg-surface-100"
                  }`}
                >
                  <IoClose className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto py-2">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => {
                        navigate(item.path);
                        setShowSearch(false);
                        setSearchQuery("");
                      }}
                      className={`w-full flex items-center gap-4 px-5 py-3 transition-all group ${
                        isDark
                          ? "hover:bg-dark-surface-light"
                          : "hover:bg-surface-50"
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-xl ${
                          item.type === "page"
                            ? "bg-primary-100 text-primary-900"
                            : item.type === "trend"
                              ? "bg-warning-100 text-warning-600"
                              : "bg-surface-200 text-text-secondary"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <p
                          className={`text-sm font-medium transition-colors ${
                            isDark
                              ? "text-dark-text group-hover:text-primary-400"
                              : "text-text-primary group-hover:text-primary-900"
                          }`}
                        >
                          {item.title}
                        </p>
                        <p
                          className={`text-xs capitalize ${isDark ? "text-dark-text-muted" : "text-text-muted"}`}
                        >
                          {item.type}
                        </p>
                      </div>
                      <span
                        className={`text-xs ${isDark ? "text-dark-text-muted" : "text-text-light"}`}
                      >
                        ↵
                      </span>
                    </motion.button>
                  ))
                ) : (
                  <div className="px-5 py-8 text-center">
                    <p
                      className={
                        isDark ? "text-dark-text-muted" : "text-text-muted"
                      }
                    >
                      No results found
                    </p>
                  </div>
                )}
              </div>

              <div
                className={`px-5 py-3 border-t ${isDark ? "border-dark-border bg-dark-surface-light" : "border-surface-200 bg-surface-50"}`}
              >
                <div
                  className={`flex items-center justify-between text-xs ${isDark ? "text-dark-text-muted" : "text-text-light"}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd
                        className={`px-1.5 py-0.5 rounded ${isDark ? "bg-dark-surface border border-dark-border text-dark-text-muted" : "bg-white border border-surface-200 text-text-muted"}`}
                      >
                        ↑
                      </kbd>
                      <kbd
                        className={`px-1.5 py-0.5 rounded ${isDark ? "bg-dark-surface border border-dark-border text-dark-text-muted" : "bg-white border border-surface-200 text-text-muted"}`}
                      >
                        ↓
                      </kbd>
                      navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd
                        className={`px-1.5 py-0.5 rounded ${isDark ? "bg-dark-surface border border-dark-border text-dark-text-muted" : "bg-white border border-surface-200 text-text-muted"}`}
                      >
                        ↵
                      </kbd>
                      select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd
                      className={`px-1.5 py-0.5 rounded ${isDark ? "bg-dark-surface border border-dark-border text-dark-text-muted" : "bg-white border border-surface-200 text-text-muted"}`}
                    >
                      esc
                    </kbd>
                    close
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);

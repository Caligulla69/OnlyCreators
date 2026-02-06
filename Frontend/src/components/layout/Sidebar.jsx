import { NavLink, Link } from "react-router-dom";
import {
  IoGridOutline,
  IoTrendingUpOutline,
  IoBulbOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoCloseOutline,
  IoSparkles,
  IoHelpCircleOutline,
  IoRocketOutline,
  IoChevronForward,
} from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: IoGridOutline },
  { path: "/trends", label: "Trends", icon: IoTrendingUpOutline },
  { path: "/insights", label: "Insights", icon: IoBulbOutline, badge: "3" },
  { path: "/audience", label: "Audience", icon: IoPeopleOutline },
  { path: "/settings", label: "Settings", icon: IoSettingsOutline },
];

const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useTheme();

  return (
    <>
      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-primary-950/60 dark:bg-dark-900/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72
          bg-surface-50 dark:bg-dark-surface
          border-r border-surface-300 dark:border-dark-border
          transition-transform duration-300 ease-out
          lg:sticky lg:translate-x-0 lg:z-30
          ${sidebarCollapsed ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="flex items-center justify-between h-16 px-5 border-b border-surface-300 dark:border-dark-border shrink-0">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              {/* Logo */}
              <div className="relative">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/30 transition-shadow duration-300">
                  <svg
                    width="22"
                    height="22"
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
                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success-500 border-2 border-surface-50 dark:border-dark-surface" />
                </span>
              </div>

              {/* Brand */}
              <div>
                <h1 className="text-lg font-bold text-text-primary dark:text-dark-text leading-tight">
                  Only
                  <span className="text-primary-700 dark:text-primary-400">
                    Creators
                  </span>
                </h1>
                <p className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-dark-text-muted">
                  Analytics Suite
                </p>
              </div>
            </Link>

            {/* Close button - Mobile only */}
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-200 dark:text-dark-text-muted dark:hover:text-dark-text dark:hover:bg-dark-surface-light transition-colors lg:hidden"
              aria-label="Close sidebar"
            >
              <IoCloseOutline className="w-5 h-5" />
            </button>
          </header>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-light dark:text-dark-text-muted px-3 mb-3">
              Main Menu
            </p>

            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setSidebarCollapsed(true)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                          isActive
                            ? "bg-gradient-to-r from-primary-700 to-primary-600 text-surface-50 shadow-md shadow-primary-900/25 dark:from-primary-500 dark:to-primary-600 dark:text-white dark:shadow-primary-500/20"
                            : "text-text-secondary hover:text-text-primary hover:bg-surface-200 dark:text-white  dark:hover:text-dark-text dark:hover:bg-dark-surface-light"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-white/15"
                                : "bg-surface-200 dark:bg-dark-surface-light group-hover:bg-surface-300 dark:group-hover:bg-dark-border"
                            }`}
                          >
                            <Icon className="w-[18px] h-[18px]" />
                          </span>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-accent-200 text-accent-800 dark:bg-accent-500/20 dark:text-accent-300"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {isActive && (
                            <IoChevronForward className="w-4 h-4 opacity-70" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <div className="my-5 mx-3 h-px bg-gradient-to-r from-transparent via-surface-300 dark:via-dark-border to-transparent" />

            {/* Support Section */}
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-light dark:text-dark-text-muted px-3 mb-3">
              Support
            </p>

            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-200 dark:text-dark-text-muted dark:hover:text-dark-text dark:hover:bg-dark-surface-light transition-colors group">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-200 dark:bg-dark-surface-light group-hover:bg-surface-300 dark:group-hover:bg-dark-border transition-colors">
                <IoHelpCircleOutline className="w-[18px] h-[18px]" />
              </span>
              <span>Help & Support</span>
            </button>
          </nav>

          {/* Upgrade Card */}
          <div className="p-4 shrink-0">
            <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 dark:from-primary-600 dark:via-primary-700 dark:to-primary-800 rounded-2xl p-5 text-surface-50">
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary-400/20 rounded-full blur-xl" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex items-center justify-center w-9 h-9 bg-white/10 backdrop-blur-sm rounded-lg">
                    <IoRocketOutline className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-sm">Upgrade to Pro</h3>
                    <p className="text-[10px] text-white">
                      Unlock all features
                    </p>
                  </div>
                </div>

                <p className="text-xs text-white mb-4 leading-relaxed">
                  Get advanced analytics, AI insights, and priority support.
                </p>

                <button className="w-full py-2.5 bg-surface-50 hover:bg-white text-primary-500 rounded-xl font-semibold text-sm shadow-lg shadow-black/10 transition-all duration-200 active:scale-[0.98]">
                  Get Started →
                </button>
              </div>
            </div>

            {/* Version */}
            <p className="text-center text-[10px] text-text-light dark:text-dark-text-muted mt-4">
              v2.4.1 • © 2024 OnlyCreators
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

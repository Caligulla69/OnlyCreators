import { memo } from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline, IoArrowBack, IoSearchOutline } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-bg px-4 py-12 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 dark:bg-primary-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200/30 dark:bg-accent-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary-200/20 dark:bg-secondary-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-lg mx-auto">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1
            className="text-[10rem] sm:text-[12rem] font-bold leading-none select-none"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600), var(--color-accent-500))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.15,
            }}
          >
            404
          </h1>

          {/* Overlay Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-surface-50 dark:bg-dark-surface border-2 border-surface-300 dark:border-dark-border rounded-3xl flex items-center justify-center shadow-xl dark:shadow-black/30">
              <IoSearchOutline className="w-12 h-12 sm:w-14 sm:h-14 text-primary-500 dark:text-primary-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-dark-text mb-3">
          Page Not Found
        </h2>
        <p className="text-text-muted dark:text-dark-text-muted mb-8 max-w-sm mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg shadow-primary-600/20 dark:shadow-primary-500/20 transition-all duration-200 active:scale-[0.98]"
          >
            <IoHomeOutline className="w-5 h-5" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface-100 dark:bg-dark-surface hover:bg-surface-200 dark:hover:bg-dark-surface-light border border-surface-300 dark:border-dark-border text-text-primary dark:text-dark-text rounded-xl font-semibold transition-all duration-200 active:scale-[0.98]"
          >
            <IoArrowBack className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-surface-300 dark:border-dark-border">
          <p className="text-sm text-text-light dark:text-dark-text-muted mb-4">
            Popular pages you might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Dashboard", path: "/dashboard" },
              { label: "Trends", path: "/trends" },
              { label: "Insights", path: "/insights" },
              { label: "Audience", path: "/audience" },
              { label: "Settings", path: "/settings" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 border border-primary-200 dark:border-primary-700/40 rounded-full transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NotFound);

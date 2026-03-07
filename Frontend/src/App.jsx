import { lazy, Suspense, Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { motion } from "framer-motion";

// Layout
import Layout from "./components/layout/Layout";

// Lazy-loaded Pages
const OnlyCreatorsStorytelling = lazy(
  () => import("./pages/Landing/LandingPage"),
);
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Trends = lazy(() => import("./pages/Trends"));
const Insights = lazy(() => import("./pages/Insights"));
const Audience = lazy(() => import("./pages/Audience"));
const Settings = lazy(() => import("./pages/Settings"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-bg px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-error-100 dark:bg-error-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-error-500"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-3">
              Something went wrong
            </h1>
            <p className="text-text-muted dark:text-dark-text-muted mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = "/";
              }}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors shadow-md"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading component for auth state and lazy loading
const AuthLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-bg">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        {/* Logo with breathing glow */}
        <motion.div
          className="relative mb-10"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Outer breathing glow ring */}
          <motion.div
            animate={{
              opacity: [0.15, 0.35, 0.15],
              scale: [0.92, 1.08, 0.92],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-6 bg-primary-300/50 dark:bg-primary-500/20 rounded-[1.75rem] blur-2xl"
          />

          {/* Inner soft glow */}
          <motion.div
            animate={{
              opacity: [0.25, 0.5, 0.25],
              scale: [0.97, 1.05, 0.97],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="absolute -inset-3 bg-primary-200/60 dark:bg-primary-600/15 rounded-2xl blur-xl"
          />

          {/* Logo container — gentle float */}
          <motion.div
            animate={{
              y: [0, -3, 0],
              rotate: [0, 1.5, 0, -1.5, 0],
            }}
            transition={{
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-500 dark:to-primary-800 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-600/25 dark:shadow-primary-500/15"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              {/* Circle track */}
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-30"
              />
              {/* Animated arc — spins smoothly via CSS */}
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="14 42.5"
                className="origin-center"
                style={{
                  animation:
                    "oc-logo-spin 1.8s cubic-bezier(0.4,0,0.2,1) infinite",
                }}
              />
              {/* Bar chart lines */}
              <motion.path
                d="M8 14V12M12 14V9M16 14V11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Brand name */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm font-semibold tracking-widest uppercase text-primary-600/70 dark:text-primary-400/60 mb-8 select-none"
        >
          Only Creators
        </motion.p>

        {/* Smooth shimmer progress bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-48 h-[3px] rounded-full overflow-hidden bg-surface-200/80 dark:bg-dark-surface-light/60"
        >
          {/* Continuous shimmer — slides left-to-right endlessly */}
          <div
            className="absolute inset-y-0 w-2/5 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-primary-500), var(--color-accent-500), transparent)",
              animation:
                "oc-shimmer-slide 1.6s cubic-bezier(0.4,0,0.2,1) infinite",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes oc-logo-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes oc-shimmer-slide {
          0%   { left: -40%; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Suspense wrapper for lazy loaded routes
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<AuthLoader />}>{children}</Suspense>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <AuthLoader />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <AuthLoader />;
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ErrorBoundary>
      <SuspenseWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<OnlyCreatorsStorytelling />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trends"
            element={
              <ProtectedRoute>
                <Layout>
                  <Trends />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <ProtectedRoute>
                <Layout>
                  <Insights />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/audience"
            element={
              <ProtectedRoute>
                <Layout>
                  <Audience />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found */}
          <Route path="/not-found" element={<NotFound />} />

          {/* Catch all - show 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SuspenseWrapper>
    </ErrorBoundary>
  );
}

export default App;

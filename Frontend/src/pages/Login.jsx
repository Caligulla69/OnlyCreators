import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForward,
  IoLogoGoogle,
  IoSparkles,
  IoAlertCircle,
} from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";

// Animated geometric shapes
const GeometricShape = ({ type, size, color, position, delay, rotation }) => {
  const shapes = {
    circle: (
      <motion.div
        className={`absolute rounded-full ${color}`}
        style={{ width: size, height: size, ...position }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -20, 0],
        }}
        transition={{
          delay,
          y: {
            delay: delay + 1,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
    ),
    square: (
      <motion.div
        className={`absolute ${color}`}
        style={{ width: size, height: size, ...position }}
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: rotation || 45,
          y: [0, 15, 0],
        }}
        transition={{
          delay,
          y: {
            delay: delay + 1,
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
    ),
    triangle: (
      <motion.div
        className={`absolute w-0 h-0 border-l-[${size / 2}px] border-l-transparent border-r-[${size / 2}px] border-r-transparent border-b-[${size}px] ${color}`}
        style={{ ...position }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: [0, 10, 0],
        }}
        transition={{
          delay,
          rotate: {
            delay: delay + 1,
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
    ),
  };

  return shapes[type] || null;
};

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/dashboard");
      }
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth integration
    setError("Google login coming soon!");
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Geometric Art */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-text">
        {/* Geometric Shapes */}
        <div className="absolute inset-0">
          {/* Large shapes */}
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-br from-primary-400/40 to-primary-600/20 rounded-3xl rotate-12"
          />
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-32 left-32 w-32 h-32 bg-gradient-to-br from-accent-400/50 to-accent-600/20 rounded-full"
          />
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="absolute top-1/3 right-24 w-40 h-40 bg-gradient-to-br from-primary-300/30 to-accent-400/20 rounded-2xl -rotate-12"
          />
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="absolute bottom-20 right-32 w-24 h-24 bg-gradient-to-br from-accent-300/40 to-primary-400/20 rounded-xl rotate-45"
          />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Content overlay */}
        <div className="relative z-10 text-center px-12 max-w-lg">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
              <IoSparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Welcome Back!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-white/70 mb-8"
          >
            Analytics, insights, and growth tools designed for modern creators
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "AI Insights",
              "Real-time Data",
              "Growth Tools",
              "Trend Analysis",
            ].map((feature, index) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-white/80"
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Bottom wave */}
        <svg
          className="absolute bottom-0 left-0 right-0"
          viewBox="0 0 1440 120"
          fill="none"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
            d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 55C960 40 1056 20 1152 25C1248 30 1344 60 1392 75L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            fill="url(#wave-gradient)"
          />
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-xl opacity-30 group-hover:opacity-50 transition-opacity"
                />
                <div className="relative w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
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
              </div>
              <div>
                <span className="text-2xl font-bold text-text-primary">
                  Only<span className="text-primary-600">Creators</span>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold text-text-primary mb-3">
              Sign in
            </h1>
            <p className="text-text-muted text-lg">
              Access your creator analytics dashboard
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-error-50 border border-error-200 rounded-xl flex items-center gap-3 text-error-700"
            >
              <IoAlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </motion.div>
          )}

          {/* Google Login */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-secondary-200 rounded-2xl text-text-primary font-medium hover:border-secondary-300 hover:shadow-lg transition-all mb-8"
          >
            <IoLogoGoogle className="w-5 h-5 text-red-800" />
            <span>Continue with Google</span>
          </motion.button>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-secondary-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 text-text-muted bg-background font-medium">
                or
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
                Email
              </label>
              <div
                className={`relative rounded-2xl transition-all duration-300 ${
                  focusedField === "email"
                    ? "ring-2 ring-primary-500 ring-offset-2"
                    : validationErrors.email
                      ? "ring-2 ring-error-500 ring-offset-2"
                      : ""
                }`}
              >
                <IoMailOutline
                  className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "email"
                      ? "text-primary-900"
                      : validationErrors.email
                        ? "text-error-500"
                        : "text-secondary-400"
                  }`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationErrors.email) {
                      setValidationErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  className="w-full pl-14 pr-5 py-4 bg-surface-100 border-2 border-transparent rounded-2xl text-text-primary placeholder:text-secondary-400 focus:outline-none focus:bg-white focus:border-primary-500 transition-all text-lg"
                />
              </div>
              {validationErrors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-error-600 flex items-center gap-1"
                >
                  <IoAlertCircle className="w-4 h-4" />
                  {validationErrors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-900 hover:text-primary-700 font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div
                className={`relative rounded-2xl transition-all duration-300 ${
                  focusedField === "password"
                    ? "ring-2 ring-primary-500 ring-offset-2"
                    : validationErrors.password
                      ? "ring-2 ring-error-500 ring-offset-2"
                      : ""
                }`}
              >
                <IoLockClosedOutline
                  className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "password"
                      ? "text-primary-900"
                      : validationErrors.password
                        ? "text-error-500"
                        : "text-secondary-400"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (validationErrors.password) {
                      setValidationErrors((prev) => ({
                        ...prev,
                        password: "",
                      }));
                    }
                  }}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-14 pr-14 py-4 bg-surface-100 border-2 border-transparent rounded-2xl text-text-primary placeholder:text-secondary-400 focus:outline-none focus:bg-white focus:border-primary-500 transition-all text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-text-secondary transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-error-600 flex items-center gap-1"
                >
                  <IoAlertCircle className="w-4 h-4" />
                  {validationErrors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-2"
            >
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-primary-700 hover:bg-primary-800 disabled:bg-primary-400 disabled:cursor-not-allowed text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary-900/30 hover:shadow-xl hover:shadow-primary-900/40 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Sign in
                    <IoArrowForward className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Sign Up */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-center text-text-muted text-lg"
          >
            New to OnlyCreators?{" "}
            <Link
              to="/signup"
              className="text-primary-900 hover:text-primary-700 font-semibold transition-colors"
            >
              Create an account
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoMailOutline,
  IoArrowForward,
  IoArrowBack,
  IoSparkles,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoRefresh,
  IoShieldCheckmark,
  IoLockClosedOutline,
  IoTimeOutline,
} from "react-icons/io5";

// Steps for the process
const STEPS = {
  EMAIL: "email",
  SENT: "sent",
};

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Email validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success (you can also simulate failure for testing)
          resolve();
        }, 2000);
      });

      setCurrentStep(STEPS.SENT);
      setResendCooldown(60); // 60 second cooldown
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend email
  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setResendCount((prev) => prev + 1);
      setResendCooldown(60);
    } catch (err) {
      setError("Failed to resend email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle try different email
  const handleTryDifferentEmail = () => {
    setCurrentStep(STEPS.EMAIL);
    setEmail("");
    setError("");
    setResendCooldown(0);
  };

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
            className="absolute bottom-48 right-48 w-24 h-24 bg-gradient-to-br from-accent-300/40 to-primary-500/20 rounded-full"
          />

          {/* Small floating dots */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(white 1px, transparent 1px),
                               linear-gradient(90deg, white 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-md px-12 text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="inline-flex mb-8"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center">
                <IoLockClosedOutline className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Secure Account
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-accent-200">
              Recovery
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-xl text-white/70 mb-8"
          >
            We'll help you regain access to your creator dashboard safely
          </motion.p>

          {/* Security features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="space-y-3"
          >
            {[
              { icon: IoShieldCheckmark, text: "Secure encrypted link" },
              { icon: IoTimeOutline, text: "Link expires in 1 hour" },
              {
                icon: IoMailOutline,
                text: "Check spam folder if not received",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                className="flex items-center gap-3 text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3"
              >
                <item.icon className="w-5 h-5 text-white/70" />
                <span className="text-white/70 text-sm">{item.text}</span>
              </motion.div>
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
            fill="url(#wave-gradient-forgot)"
          />
          <defs>
            <linearGradient
              id="wave-gradient-forgot"
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

          <AnimatePresence mode="wait">
            {currentStep === STEPS.EMAIL ? (
              /* Email Input Step */
              <motion.div
                key="email-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h1 className="text-4xl font-bold text-text-primary mb-3">
                    Forgot password?
                  </h1>
                  <p className="text-text-muted text-lg">
                    No worries! Enter your email and we'll send you a reset
                    link.
                  </p>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="mb-6 p-4 bg-error-50 border border-error-200 rounded-2xl flex items-center gap-3"
                    >
                      <IoCloseCircle className="w-5 h-5 text-error-500 flex-shrink-0" />
                      <p className="text-error-700 text-sm">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div
                      className={`relative rounded-2xl transition-all duration-300 ${
                        focusedField === "email"
                          ? "ring-2 ring-primary-500 ring-offset-2"
                          : ""
                      }`}
                    >
                      <IoMailOutline
                        className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                          focusedField === "email"
                            ? "text-primary-900"
                            : "text-secondary-400"
                        }`}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your@email.com"
                        disabled={isLoading}
                        className="w-full pl-14 pr-5 py-4 bg-surface-100 border-2 border-transparent rounded-2xl text-text-primary placeholder:text-secondary-400 focus:outline-none focus:bg-white focus:border-primary-500 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-primary-700 hover:bg-primary-800 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary-900/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                          Send Reset Link
                          <IoArrowForward className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </form>

                {/* Back to Login */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-text-muted hover:text-primary-700 transition-colors group"
                  >
                    <IoArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to sign in</span>
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              /* Email Sent Step */
              <motion.div
                key="sent-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-8 inline-flex"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-4 bg-success-100 rounded-full"
                    />
                    <div className="relative w-20 h-20 bg-success-500 rounded-full flex items-center justify-center shadow-lg shadow-success-500/30">
                      <IoCheckmarkCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <h1 className="text-4xl font-bold text-text-primary mb-3">
                    Check your email
                  </h1>
                  <p className="text-text-muted text-lg">
                    We've sent a password reset link to
                  </p>
                  <p className="text-primary-700 font-semibold text-lg mt-1">
                    {email}
                  </p>
                </motion.div>

                {/* Instructions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-surface-100 rounded-2xl p-6 mb-6 text-left"
                >
                  <h3 className="font-semibold text-text-primary mb-3">
                    Next steps:
                  </h3>
                  <ol className="space-y-2 text-text-muted">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        1
                      </span>
                      <span>Open the email from OnlyCreators</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        2
                      </span>
                      <span>Click the "Reset Password" button</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        3
                      </span>
                      <span>Create your new password</span>
                    </li>
                  </ol>
                </motion.div>

                {/* Resend Email */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <p className="text-text-muted text-sm mb-3">
                    Didn't receive the email?
                  </p>
                  <motion.button
                    whileHover={{ scale: resendCooldown > 0 ? 1 : 1.02 }}
                    whileTap={{ scale: resendCooldown > 0 ? 1 : 0.98 }}
                    onClick={handleResend}
                    disabled={resendCooldown > 0 || isLoading}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      resendCooldown > 0
                        ? "bg-secondary-100 text-secondary-400 cursor-not-allowed"
                        : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                    }`}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-primary-300 border-t-primary-700 rounded-full"
                      />
                    ) : (
                      <>
                        <IoRefresh
                          className={`w-5 h-5 ${
                            resendCooldown > 0
                              ? ""
                              : "group-hover:rotate-180 transition-transform"
                          }`}
                        />
                        {resendCooldown > 0
                          ? `Resend in ${resendCooldown}s`
                          : "Resend email"}
                      </>
                    )}
                  </motion.button>

                  {resendCount > 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-success-600 text-sm mt-2"
                    >
                      Email resent successfully!
                    </motion.p>
                  )}
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-error-50 border border-error-200 rounded-2xl flex items-center gap-3 text-left"
                    >
                      <IoCloseCircle className="w-5 h-5 text-error-500 flex-shrink-0" />
                      <p className="text-error-700 text-sm">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <button
                    onClick={handleTryDifferentEmail}
                    className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
                  >
                    Try a different email
                  </button>

                  <div className="pt-4">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-text-muted hover:text-primary-700 transition-colors group"
                    >
                      <IoArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      <span>Back to sign in</span>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-text-light text-sm">
              Need help?{" "}
              <Link
                to="/support"
                className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
              >
                Contact support
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;

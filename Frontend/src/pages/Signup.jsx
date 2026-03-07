import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForward,
  IoArrowBack,
  IoLogoGoogle,
  IoLogoYoutube,
  IoSparkles,
  IoPersonOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoRocket,
  IoTrendingUp,
  IoBulb,
  IoShieldCheckmark,
} from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";

// Password requirements configuration
const passwordRequirements = [
  { id: "length", label: "8+ characters", test: (p) => p.length >= 8 },
  { id: "uppercase", label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "lowercase", label: "Lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: "number", label: "Number", test: (p) => /\d/.test(p) },
  {
    id: "special",
    label: "Special character",
    test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
  },
];

// Features to display on the left side
const features = [
  {
    icon: IoTrendingUp,
    title: "Real-time Analytics",
    description: "Track your growth as it happens",
  },
  {
    icon: IoBulb,
    title: "AI Insights",
    description: "Smart recommendations for your content",
  },
  {
    icon: IoRocket,
    title: "Growth Tools",
    description: "Everything you need to scale",
  },
  {
    icon: IoShieldCheckmark,
    title: "Secure & Private",
    description: "Your data is always protected",
  },
];

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isLoading: authLoading } = useAuth() || {};

  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    return passwordRequirements.filter((req) => req.test(formData.password))
      .length;
  }, [formData.password]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-error-500";
    if (passwordStrength <= 2) return "bg-warning-500";
    if (passwordStrength <= 3) return "bg-warning-400";
    if (passwordStrength <= 4) return "bg-success-400";
    return "bg-success-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 2) return "Fair";
    if (passwordStrength <= 3) return "Good";
    if (passwordStrength <= 4) return "Strong";
    return "Excellent";
  };

  const getStrengthTextColor = () => {
    if (passwordStrength <= 2) return "text-error-600";
    if (passwordStrength <= 3) return "text-warning-600";
    return "text-success-600";
  };

  // Input change handler
  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  // Step 1 validation
  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  // Step 2 validation
  const validateStep2 = () => {
    if (!formData.password) {
      setError("Please enter a password");
      return false;
    }
    if (passwordStrength < 3) {
      setError("Please create a stronger password");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return false;
    }
    return true;
  };

  // Navigation handlers
  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setError("");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    setError("");
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsLoading(true);
    setError("");

    try {
      if (signup) {
        await signup(formData.name, formData.email, formData.password);
      } else {
        // Simulated signup for demo
        await new Promise((r) => setTimeout(r, 2000));
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Social signup handlers
  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Implement Google OAuth here
      await new Promise((r) => setTimeout(r, 1500));
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleYouTubeSignup = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Implement YouTube OAuth here
      await new Promise((r) => setTimeout(r, 1500));
      navigate("/dashboard");
    } catch (err) {
      setError("YouTube sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            className="absolute top-16 left-16 w-52 h-52 bg-gradient-to-br from-primary-400/40 to-primary-600/20 rounded-3xl rotate-12"
          />
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-28 left-28 w-36 h-36 bg-gradient-to-br from-accent-400/50 to-accent-600/20 rounded-full"
          />
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="absolute top-1/4 right-20 w-44 h-44 bg-gradient-to-br from-primary-300/30 to-accent-400/20 rounded-2xl -rotate-12"
          />
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="absolute bottom-40 right-40 w-28 h-28 bg-gradient-to-br from-accent-300/40 to-primary-500/20 rounded-full"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-xl rotate-45"
          />

          {/* Small floating dots */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
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
        <div className="relative z-10 max-w-lg px-12 text-center">
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
                <IoRocket className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Start Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-accent-200">
              Creator Journey
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-xl text-white/70 mb-10"
          >
            Join 50,000+ creators growing their channels with AI-powered
            insights
          </motion.p>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="space-y-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                className="flex items-center gap-4 text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{feature.title}</p>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </div>
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
            fill="url(#wave-gradient-signup)"
          />
          <defs>
            <linearGradient
              id="wave-gradient-signup"
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
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 py-8 overflow-y-auto">
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
            className="mb-8"
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

          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              {/* Step 1 */}
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    backgroundColor: currentStep >= 1 ? "#662843" : "#dcdcda",
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                >
                  {currentStep > 1 ? (
                    <IoCheckmarkCircle className="w-6 h-6" />
                  ) : (
                    "1"
                  )}
                </motion.div>
                <span
                  className={`text-sm font-medium ${currentStep >= 1 ? "text-primary-900" : "text-secondary-400"}`}
                >
                  Account
                </span>
              </div>

              {/* Connector */}
              <motion.div
                animate={{
                  backgroundColor: currentStep >= 2 ? "#662843" : "#dcdcda",
                }}
                className="w-16 h-1 rounded-full"
              />

              {/* Step 2 */}
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    backgroundColor: currentStep >= 2 ? "#662843" : "#dcdcda",
                    color: currentStep >= 2 ? "#ffffff" : "#6b6370",
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                >
                  2
                </motion.div>
                <span
                  className={`text-sm font-medium ${currentStep >= 2 ? "text-primary-900" : "text-secondary-400"}`}
                >
                  Security
                </span>
              </div>
            </div>

            {/* Header */}
            <h1 className="text-4xl font-bold text-text-primary mb-3">
              {currentStep === 1 ? "Create account" : "Secure your account"}
            </h1>
            <p className="text-text-muted text-lg">
              {currentStep === 1
                ? "Start your 14-day free trial"
                : "Create a strong password to protect your account"}
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

          <AnimatePresence mode="wait">
            {currentStep === 1 ? (
              /* Step 1: Account Info */
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Social Signup */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-secondary-200 rounded-2xl text-text-primary font-medium hover:border-secondary-300 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IoLogoGoogle className="w-5 h-5 text-red-500" />
                    <span>Google</span>
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleYouTubeSignup}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-secondary-200 rounded-2xl text-text-primary font-medium hover:border-secondary-300 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IoLogoYoutube className="w-5 h-5 text-red-600" />
                    <span>YouTube</span>
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-secondary-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-6 text-text-muted bg-background font-medium">
                      or
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div
                      className={`relative rounded-2xl transition-all duration-300 ${
                        focusedField === "name"
                          ? "ring-2 ring-primary-500 ring-offset-2"
                          : ""
                      }`}
                    >
                      <IoPersonOutline
                        className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                          focusedField === "name"
                            ? "text-primary-900"
                            : "text-secondary-400"
                        }`}
                      />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className="w-full pl-14 pr-5 py-4 bg-surface-100 border-2 border-transparent rounded-2xl text-text-primary placeholder:text-secondary-400 focus:outline-none focus:bg-white focus:border-primary-500 transition-all text-lg"
                      />
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
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
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your@email.com"
                        className="w-full pl-14 pr-5 py-4 bg-surface-100 border-2 border-transparent rounded-2xl text-text-primary placeholder:text-secondary-400 focus:outline-none focus:bg-white focus:border-primary-500 transition-all text-lg"
                      />
                    </div>
                  </motion.div>

                  {/* Continue Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="pt-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleNextStep}
                      disabled={isLoading}
                      className="w-full py-4 bg-primary-700 hover:bg-primary-800 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary-900/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      Continue
                      <IoArrowForward className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* Step 2: Password */
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
                    Password
                  </label>
                  <div
                    className={`relative rounded-2xl transition-all duration-300 ${
                      focusedField === "password"
                        ? "ring-2 ring-primary-500 ring-offset-2"
                        : ""
                    }`}
                  >
                    <IoLockClosedOutline
                      className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        focusedField === "password"
                          ? "text-primary-900"
                          : "text-secondary-400"
                      }`}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange("password")}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Create a strong password"
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

                  {/* Password Strength Indicator */}
                  <AnimatePresence>
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-3"
                      >
                        {/* Strength bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-secondary-100 rounded-full overflow-hidden flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <motion.div
                                key={level}
                                initial={{ scaleX: 0 }}
                                animate={{
                                  scaleX: passwordStrength >= level ? 1 : 0,
                                }}
                                className={`flex-1 h-full origin-left transition-all duration-300 ${
                                  passwordStrength >= level
                                    ? getStrengthColor()
                                    : "bg-secondary-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span
                            className={`text-sm font-semibold min-w-[70px] ${getStrengthTextColor()}`}
                          >
                            {getStrengthText()}
                          </span>
                        </div>

                        {/* Requirements checklist */}
                        <div className="grid grid-cols-2 gap-2">
                          {passwordRequirements.map((req) => {
                            const passed = req.test(formData.password);
                            return (
                              <motion.div
                                key={req.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex items-center gap-2 text-sm transition-colors ${
                                  passed
                                    ? "text-success-600"
                                    : "text-secondary-400"
                                }`}
                              >
                                <IoCheckmarkCircle
                                  className={`w-4 h-4 transition-opacity ${
                                    passed ? "opacity-100" : "opacity-30"
                                  }`}
                                />
                                <span>{req.label}</span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div
                    className={`relative rounded-2xl transition-all duration-300 ${
                      focusedField === "confirmPassword"
                        ? "ring-2 ring-primary-500 ring-offset-2"
                        : ""
                    } ${
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword
                        ? "ring-2 ring-error-400 ring-offset-2"
                        : ""
                    } ${
                      formData.confirmPassword &&
                      formData.password === formData.confirmPassword &&
                      formData.password.length > 0
                        ? "ring-2 ring-success-400 ring-offset-2"
                        : ""
                    }`}
                  >
                    <IoLockClosedOutline
                      className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        focusedField === "confirmPassword"
                          ? "text-primary-900"
                          : formData.confirmPassword &&
                              formData.password === formData.confirmPassword
                            ? "text-success-600"
                            : formData.confirmPassword &&
                                formData.password !== formData.confirmPassword
                              ? "text-error-500"
                              : "text-secondary-400"
                      }`}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange("confirmPassword")}
                      onFocus={() => setFocusedField("confirmPassword")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Confirm your password"
                      className="w-full pl-14 pr-14 py-4 bg-surface-100 border-2 border-transparent rounded-2xl text-text-primary placeholder:text-secondary-400 focus:outline-none focus:bg-white focus:border-primary-500 transition-all text-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-text-secondary transition-colors"
                    >
                      {showConfirmPassword ? (
                        <IoEyeOffOutline className="w-5 h-5" />
                      ) : (
                        <IoEyeOutline className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Password match indicator */}
                  <AnimatePresence>
                    {formData.confirmPassword && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className={`mt-2 flex items-center gap-2 text-sm ${
                          formData.password === formData.confirmPassword
                            ? "text-success-600"
                            : "text-error-600"
                        }`}
                      >
                        {formData.password === formData.confirmPassword ? (
                          <>
                            <IoCheckmarkCircle className="w-4 h-4" />
                            <span>Passwords match</span>
                          </>
                        ) : (
                          <>
                            <IoCloseCircle className="w-4 h-4" />
                            <span>Passwords do not match</span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Terms Agreement */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <button
                    type="button"
                    onClick={() => setAgreeToTerms(!agreeToTerms)}
                    className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      agreeToTerms
                        ? "bg-primary-700 border-primary-700"
                        : "border-secondary-300 hover:border-primary-400"
                    }`}
                  >
                    {agreeToTerms && (
                      <IoCheckmarkCircle className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <p className="text-sm text-text-muted leading-relaxed">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-primary-700 hover:text-primary-900 font-medium underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-primary-700 hover:text-primary-900 font-medium underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4 pt-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-4 bg-surface-100 border-2 border-secondary-200 text-text-secondary rounded-2xl font-semibold hover:bg-surface-200 hover:border-secondary-300 transition-all flex items-center gap-2"
                  >
                    <IoArrowBack className="w-5 h-5" />
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading || authLoading}
                    className="flex-1 py-4 bg-primary-700 hover:bg-primary-800 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary-900/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading || authLoading ? (
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
                        Create Account
                        <IoArrowForward className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Sign In Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center text-text-muted text-lg"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-900 hover:text-primary-700 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-text-light"
          >
            <div className="flex items-center gap-2">
              <IoShieldCheckmark className="w-4 h-4 text-success-500" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="w-4 h-4 text-success-500" />
              <span>GDPR Compliant</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;

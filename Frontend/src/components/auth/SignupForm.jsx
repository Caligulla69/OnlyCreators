import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoLogoGoogle,
} from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
import Input from "../common/Input";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  validatePasswordStrength,
} from "../../utils/validators";

const PasswordStrengthIndicator = ({ password }) => {
  const { strength, checks } = validatePasswordStrength(password);

  const colors = {
    weak: "bg-error-500",
    medium: "bg-warning-500",
    strong: "bg-success-500",
  };

  const widths = {
    weak: "w-1/3",
    medium: "w-2/3",
    strong: "w-full",
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[strength]} ${widths[strength]} transition-all duration-300`}
        />
      </div>
      <p
        className={`text-xs font-medium ${
          strength === "weak"
            ? "text-error-600"
            : strength === "medium"
              ? "text-warning-600"
              : "text-success-600"
        }`}
      >
        Password strength:{" "}
        {strength.charAt(0).toUpperCase() + strength.slice(1)}
      </p>
      <ul className="text-xs text-gray-500 space-y-1">
        <li className={checks.length ? "text-success-600" : ""}>
          {checks.length ? "✓" : "○"} At least 8 characters
        </li>
        <li className={checks.uppercase ? "text-success-600" : ""}>
          {checks.uppercase ? "✓" : "○"} One uppercase letter
        </li>
        <li className={checks.number ? "text-success-600" : ""}>
          {checks.number ? "✓" : "○"} One number
        </li>
        <li className={checks.special ? "text-success-600" : ""}>
          {checks.special ? "✓" : "○"} One special character
        </li>
      </ul>
    </div>
  );
};

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
    );
    if (confirmError) newErrors.confirmPassword = confirmError;

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(formData.name, formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && (
        <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
          <p className="text-sm text-error-700">{errors.general}</p>
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        name="name"
        placeholder="John Doe"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        leftIcon={<IoPersonOutline className="w-5 h-5" />}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        leftIcon={<IoMailOutline className="w-5 h-5" />}
        required
      />

      <div>
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          leftIcon={<IoLockClosedOutline className="w-5 h-5" />}
          required
        />
        <PasswordStrengthIndicator password={formData.password} />
      </div>

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        leftIcon={<IoLockClosedOutline className="w-5 h-5" />}
        required
      />

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 mt-0.5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-600">
            I agree to the{" "}
            <Link
              to="/terms"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-1 text-sm text-error-500">{errors.agreeToTerms}</p>
        )}
      </div>

      <Button type="submit" fullWidth isLoading={isLoading} size="lg">
        Create Account
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        fullWidth
        leftIcon={<IoLogoGoogle className="w-5 h-5" />}
      >
        Sign up with Google
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary-600 hover:text-primary-700"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;

export const COLORS = {
  primary: "#4F46E5",
  secondary: "#06B6D4",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  gray: "#6B7280",
};

export const CHART_COLORS = [
  "#4F46E5", // Primary - Indigo
  "#06B6D4", // Secondary - Cyan
  "#10B981", // Success - Green
  "#F59E0B", // Warning - Amber
  "#EF4444", // Error - Red
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#F97316", // Orange
];

export const DATE_RANGES = [
  { label: "7 days", value: "7days" },
  { label: "30 days", value: "30days" },
  { label: "90 days", value: "90days" },
  { label: "12 months", value: "12months" },
  { label: "Custom", value: "custom" },
];

export const TREND_CATEGORIES = [
  { label: "All Categories", value: "all" },
  { label: "Technology", value: "Technology" },
  { label: "Lifestyle", value: "Lifestyle" },
  { label: "Content Creation", value: "Content Creation" },
  { label: "Gaming", value: "Gaming" },
  { label: "Education", value: "Education" },
];

export const INSIGHT_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Performance", value: "Performance" },
  { label: "Audience", value: "Audience" },
  { label: "Trends", value: "Trends" },
  { label: "Optimization", value: "Optimization" },
];

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const HOURS_OF_DAY = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const ampm = i < 12 ? "AM" : "PM";
  return `${hour}${ampm}`;
});

export const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { path: "/trends", label: "Trends", icon: "TrendingUp" },
  { path: "/insights", label: "Insights", icon: "Lightbulb" },
  { path: "/audience", label: "Audience", icon: "Users" },
  { path: "/settings", label: "Settings", icon: "Settings" },
];

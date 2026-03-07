import { memo } from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { formatNumber, formatPercentage } from "../../utils/formatters";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const MetricCard = ({
  title,
  value,
  change = 0,
  changeLabel = "vs last period",
  icon: Icon,
  iconBg = "bg-primary-900",
  sparklineData,
  sparklineColor = "#662843",
  format = "number",
  index = 0,
}) => {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  const formattedValue = (() => {
    if (format === "percentage") return `${value}%`;
    if (format === "hours") return `${(value / 1000).toFixed(1)}K hrs`;
    return formatNumber(value);
  })();

  const chartData = (() => {
    if (Array.isArray(sparklineData) && sparklineData.length > 0) {
      return sparklineData.map((v) => ({
        value: typeof v === "number" ? v : 0,
      }));
    }
    // Use deterministic values based on index to avoid impure function issues
    return Array.from({ length: 7 }, (_, i) => ({
      value: 50 + i * 5 + ((i * 17) % 100),
    }));
  })();

  return (
    <div
      className="relative overflow-hidden bg-white dark:bg-dark-surface rounded-2xl p-6 border border-surface-400 dark:border-dark-border shadow-sm hover:shadow-md dark:hover:shadow-black/30 transition-all duration-300 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background Decoration */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-surface-200 dark:bg-dark-surface-light opacity-50 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-text-muted dark:text-dark-text-muted mb-1">
              {title}
            </p>
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-dark-text font-mono tracking-tight">
              {formattedValue}
            </h3>
          </div>

          {Icon && (
            <div className={`p-3 rounded-xl ${iconBg} shadow-md`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isNeutral && (
              <div
                className={`
                  flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-semibold
                  ${
                    isPositive
                      ? "bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400"
                      : "bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400"
                  }
                `}
              >
                {isPositive ? (
                  <IoArrowUp className="w-3.5 h-3.5" />
                ) : (
                  <IoArrowDown className="w-3.5 h-3.5" />
                )}
                <span>{formatPercentage(Math.abs(change))}</span>
              </div>
            )}
            {isNeutral && (
              <div className="px-2.5 py-1 rounded-full text-sm font-medium bg-surface-200 dark:bg-dark-surface-light text-text-muted dark:text-dark-text-muted">
                No change
              </div>
            )}
            <span className="text-xs text-text-light dark:text-dark-text-muted hidden sm:inline">
              {changeLabel}
            </span>
          </div>

          {/* Sparkline */}
          <div className="w-20 h-10 opacity-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id={`metric-gradient-${title?.replace(/\s/g, "")}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={sparklineColor}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor={sparklineColor}
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={sparklineColor}
                  strokeWidth={2}
                  fill={`url(#metric-gradient-${title?.replace(/\s/g, "")})`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MetricCard);

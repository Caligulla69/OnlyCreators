import { memo } from "react";
import {
  IoTrendingUp,
  IoPeople,
  IoFlame,
  IoImage,
  IoTime,
  IoChevronForward,
  IoCheckmarkCircle,
} from "react-icons/io5";
import Badge from "../common/Badge";
import Button from "../common/Button";

const iconMap = {
  TrendingUp: IoTrendingUp,
  Users: IoPeople,
  Flame: IoFlame,
  Image: IoImage,
  Clock: IoTime,
};

const priorityConfig = {
  High: { color: "error", dot: "🔴" },
  Medium: { color: "warning", dot: "🟡" },
  Low: { color: "neutral", dot: "⚪" },
};

const categoryConfig = {
  Performance: {
    bg: "bg-primary-100 dark:bg-primary-900/30",
    text: "text-primary-700 dark:text-primary-300",
    icon: "text-primary-600 dark:text-primary-400",
  },
  Audience: {
    bg: "bg-accent-100 dark:bg-accent-900/30",
    text: "text-accent-700 dark:text-accent-300",
    icon: "text-accent-600 dark:text-accent-400",
  },
  Trends: {
    bg: "bg-success-100 dark:bg-success-900/30",
    text: "text-success-700 dark:text-success-300",
    icon: "text-success-600 dark:text-success-400",
  },
  Optimization: {
    bg: "bg-warning-100 dark:bg-warning-900/30",
    text: "text-warning-700 dark:text-warning-300",
    icon: "text-warning-600 dark:text-warning-400",
  },
};

const InsightCard = ({ insight, onApply, onDismiss, isApplied = false }) => {
  const Icon = iconMap[insight.icon] || IoTrendingUp;
  const priority = priorityConfig[insight.priority] || priorityConfig.Medium;
  const category =
    categoryConfig[insight.category] || categoryConfig.Performance;

  return (
    <div
      className={`
      relative bg-surface-50 dark:bg-dark-surface rounded-2xl border transition-all duration-300 overflow-hidden group
      ${
        isApplied
          ? "border-success-200 dark:border-success-800 bg-success-50/50 dark:bg-success-900/10"
          : "border-surface-200 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg dark:hover:shadow-black/30"
      }
    `}
    >
      {/* Applied Overlay */}
      {isApplied && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success-500 dark:bg-success-600 text-white rounded-full text-sm font-medium">
            <IoCheckmarkCircle className="w-4 h-4" />
            Applied
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`relative p-3 rounded-xl ${category.bg}`}>
            <Icon className={`w-6 h-6 ${category.icon}`} />
            {/* Priority Dot */}
            <span
              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-surface-50 dark:border-dark-surface flex items-center justify-center text-[8px] ${
                insight.priority === "High"
                  ? "bg-error-500"
                  : insight.priority === "Medium"
                    ? "bg-warning-500"
                    : "bg-surface-400 dark:bg-dark-border"
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant={priority.color} size="sm">
                {insight.priority} Priority
              </Badge>
              <span className="text-xs text-text-light dark:text-dark-text-muted">
                •
              </span>
              <span className="text-xs text-text-muted dark:text-dark-text-muted">
                {insight.category}
              </span>
            </div>
            <h3 className="font-semibold text-text-primary dark:text-dark-text text-lg">
              {insight.title}
            </h3>
          </div>
        </div>

        {/* Message */}
        <p className="text-text-secondary dark:text-dark-text-muted mb-4 leading-relaxed">
          {insight.message}
        </p>

        {/* Impact Badge */}
        {insight.impact && !isApplied && (
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700/50 rounded-xl mb-4">
            <IoTrendingUp className="w-4 h-4 text-success-600 dark:text-success-400" />
            <span className="text-sm font-semibold text-success-700 dark:text-success-300">
              {insight.impact}
            </span>
          </div>
        )}

        {/* Actions */}
        {!isApplied && insight.actionable && insight.actions && (
          <div className="flex items-center gap-3 pt-4 border-t border-surface-200 dark:border-dark-border">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onApply?.(insight)}
              rightIcon={<IoChevronForward className="w-4 h-4" />}
              className="flex-1 sm:flex-none"
            >
              {insight.actions[0]}
            </Button>
            {insight.actions[1] && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss?.(insight)}
              >
                {insight.actions[1]}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(InsightCard);

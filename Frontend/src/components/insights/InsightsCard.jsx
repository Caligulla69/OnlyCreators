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
    bg: "bg-violet-100",
    text: "text-violet-700",
    icon: "text-violet-600",
  },
  Audience: { bg: "bg-cyan-100", text: "text-cyan-700", icon: "text-cyan-600" },
  Trends: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: "text-emerald-600",
  },
  Optimization: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    icon: "text-amber-600",
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
      relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden group
      ${
        isApplied
          ? "border-emerald-200 bg-emerald-50/50"
          : "border-gray-100 hover:border-primary-200 hover:shadow-lg"
      }
    `}
    >
      {/* Applied Overlay */}
      {isApplied && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-full text-sm font-medium">
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
              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] ${
                insight.priority === "High"
                  ? "bg-red-500"
                  : insight.priority === "Medium"
                    ? "bg-amber-500"
                    : "bg-gray-400"
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant={priority.color} size="sm">
                {insight.priority} Priority
              </Badge>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{insight.category}</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {insight.title}
            </h3>
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-4 leading-relaxed">{insight.message}</p>

        {/* Impact Badge */}
        {insight.impact && !isApplied && (
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl mb-4">
            <IoTrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">
              {insight.impact}
            </span>
          </div>
        )}

        {/* Actions */}
        {!isApplied && insight.actionable && insight.actions && (
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
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

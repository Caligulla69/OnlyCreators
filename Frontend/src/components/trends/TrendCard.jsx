import { useState } from "react";
import {
  IoBookmarkOutline,
  IoBookmark,
  IoShareSocialOutline,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import Badge from "../common/Badge";
import Button from "../common/Button";

const TrendCard = ({ trend, onExplore }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const strengthColors = {
    High: "success",
    Medium: "warning",
    Low: "neutral",
  };

  const chartData = trend.growthData.map((value) => ({ value }));

  return (
    <div className="bg-surface-50 dark:bg-dark-surface rounded-xl border border-surface-300 dark:border-dark-border hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={strengthColors[trend.strength]} size="sm">
                {trend.strength} Trend
              </Badge>
              {trend.covered && (
                <Badge variant="info" size="sm">
                  Covered
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-bold text-text-primary dark:text-dark-text mb-1">
              {trend.topic}
            </h3>
            <p className="text-sm text-text-muted dark:text-dark-text-muted">
              {trend.searchVolume} monthly searches
            </p>
          </div>

          {/* Growth Chart */}
          <div className="w-24 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id={`trendGradient-${trend.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3a7a4a" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3a7a4a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3a7a4a"
                  strokeWidth={2}
                  fill={`url(#trendGradient-${trend.id})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trend.hashtags.map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-surface-200 dark:bg-dark-surface-light text-text-secondary dark:text-dark-text-muted text-sm rounded-full hover:bg-surface-300 dark:hover:bg-dark-border cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Opportunity Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-text-muted dark:text-dark-text-muted">
              Opportunity Score
            </span>
            <span className="font-bold text-text-primary dark:text-dark-text">
              {trend.opportunityScore}/100
            </span>
          </div>
          <div className="h-2 bg-surface-200 dark:bg-dark-surface-light rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                trend.opportunityScore >= 80
                  ? "bg-success-500"
                  : trend.opportunityScore >= 50
                    ? "bg-warning-500"
                    : "bg-error-500"
              }`}
              style={{ width: `${trend.opportunityScore}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onExplore?.(trend)}
            className="flex-1"
          >
            Explore Topic
          </Button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? "bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400"
                : "border-surface-300 dark:border-dark-border text-text-muted dark:text-dark-text-muted hover:bg-surface-100 dark:hover:bg-dark-surface-light"
            }`}
          >
            {isBookmarked ? (
              <IoBookmark className="w-5 h-5" />
            ) : (
              <IoBookmarkOutline className="w-5 h-5" />
            )}
          </button>
          <button className="p-2 rounded-lg border border-surface-300 dark:border-dark-border text-text-muted dark:text-dark-text-muted hover:bg-surface-100 dark:hover:bg-dark-surface-light transition-colors">
            <IoShareSocialOutline className="w-5 h-5" />
          </button>
        </div>

        {/* Expand Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 pt-4 border-t border-surface-200 dark:border-dark-border flex items-center justify-center gap-1 text-sm text-text-muted dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text transition-colors"
        >
          {isExpanded ? "Show less" : "Show more"}
          {isExpanded ? (
            <IoChevronUp className="w-4 h-4" />
          ) : (
            <IoChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-surface-200 dark:border-dark-border bg-surface-100 dark:bg-dark-surface-light animate-slide-down">
          <div className="pt-4">
            <p className="text-sm text-text-secondary dark:text-dark-text-muted mb-4">
              {trend.description}
            </p>

            <h4 className="text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
              Related Videos Performing Well
            </h4>
            <div className="space-y-2">
              {trend.relatedVideos.map((video, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-surface-50 dark:bg-dark-surface rounded-lg border border-surface-200 dark:border-dark-border"
                >
                  <span className="text-sm text-text-secondary dark:text-dark-text-muted truncate flex-1 mr-4">
                    {video.title}
                  </span>
                  <span className="text-sm font-semibold text-text-primary dark:text-dark-text whitespace-nowrap">
                    {video.views} views
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendCard;

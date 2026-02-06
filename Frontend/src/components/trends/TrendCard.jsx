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
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
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
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {trend.topic}
            </h3>
            <p className="text-sm text-gray-500">
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
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
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
              className="px-2.5 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Opportunity Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Opportunity Score</span>
            <span className="font-bold text-gray-900">
              {trend.opportunityScore}/100
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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
                ? "bg-primary-50 border-primary-200 text-primary-600"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {isBookmarked ? (
              <IoBookmark className="w-5 h-5" />
            ) : (
              <IoBookmarkOutline className="w-5 h-5" />
            )}
          </button>
          <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <IoShareSocialOutline className="w-5 h-5" />
          </button>
        </div>

        {/* Expand Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
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
        <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50 animate-slide-down">
          <div className="pt-4">
            <p className="text-sm text-gray-600 mb-4">{trend.description}</p>

            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Related Videos Performing Well
            </h4>
            <div className="space-y-2">
              {trend.relatedVideos.map((video, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                >
                  <span className="text-sm text-gray-700 truncate flex-1 mr-4">
                    {video.title}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
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

import { memo } from "react";
import { IoPlayCircle, IoTrendingUp, IoFlame } from "react-icons/io5";
import { formatNumber } from "../../utils/formatters";
import Card from "../common/Card";

const TopPerformers = ({ videos = [] }) => {
  const topVideos = videos.slice(0, 5);

  if (topVideos.length === 0) {
    return (
      <Card title="Top Performers" subtitle="This week's best content">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <IoPlayCircle className="w-12 h-12 text-surface-400 dark:text-dark-text-muted mb-3" />
          <p className="text-text-muted dark:text-dark-text-muted">
            No videos to display
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Top Performers"
      subtitle="This week's best content"
      headerAction={
        <span className="flex items-center gap-1 text-xs font-semibold text-warning-700 dark:text-warning-400 bg-warning-100 dark:bg-warning-900/30 px-2.5 py-1 rounded-full">
          <IoFlame className="w-3 h-3" />
          Hot
        </span>
      }
    >
      <div className="space-y-3">
        {topVideos.map((video, index) => (
          <div
            key={video.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-200 dark:hover:bg-dark-surface-light transition-all duration-200 cursor-pointer group"
          >
            {/* Rank */}
            <div
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0
                ${
                  index === 0
                    ? "bg-warning-500 text-white"
                    : index === 1
                      ? "bg-secondary-400 dark:bg-secondary-600 text-white"
                      : index === 2
                        ? "bg-warning-600 text-white"
                        : "bg-surface-200 dark:bg-dark-surface-light text-text-muted dark:text-dark-text-muted"
                }
              `}
            >
              {index + 1}
            </div>

            {/* Thumbnail */}
            <div className="relative w-16 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-text-primary/30 dark:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <IoPlayCircle className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-primary dark:text-dark-text truncate group-hover:text-primary-900 dark:group-hover:text-primary-400 transition-colors">
                {video.title}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-text-muted dark:text-dark-text-muted">
                  {formatNumber(video.views)} views
                </span>
                {video.engagementRate >= 7 && (
                  <span className="flex items-center gap-0.5 text-xs font-medium text-success-600 dark:text-success-400">
                    <IoTrendingUp className="w-3 h-3" />
                    {video.engagementRate}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2.5 text-sm font-semibold text-primary-900 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-xl transition-colors">
        View All Videos →
      </button>
    </Card>
  );
};

export default memo(TopPerformers);

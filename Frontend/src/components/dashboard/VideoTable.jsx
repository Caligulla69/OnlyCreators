import { memo, useState, useMemo } from "react";
import {
  IoPlay,
  IoEye,
  IoHeart,
  IoTrendingUp,
  IoSearch,
  IoChevronUp,
  IoChevronDown,
  IoEllipsisVertical,
} from "react-icons/io5";
import { formatNumber, formatDate } from "../../utils/formatters";

const VideoTable = memo(({ videos = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "views",
    direction: "desc",
  });
  const [hoveredRow, setHoveredRow] = useState(null);

  const filteredAndSortedVideos = useMemo(() => {
    let result = [...videos];

    if (searchQuery) {
      result = result.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      const modifier = sortConfig.direction === "asc" ? 1 : -1;
      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue) * modifier;
      }
      return (aValue - bValue) * modifier;
    });

    return result;
  }, [videos, searchQuery, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return (
        <IoChevronUp className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
      );
    }
    return sortConfig.direction === "desc" ? (
      <IoChevronDown className="w-3 h-3 text-primary-900 dark:text-primary-400" />
    ) : (
      <IoChevronUp className="w-3 h-3 text-primary-900 dark:text-primary-400" />
    );
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-surface-400 dark:border-dark-border shadow-sm dark:shadow-black/20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-surface-300 dark:border-dark-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-accent-700 rounded-xl shadow-md">
              <IoPlay className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text">
                Top Performing Videos
              </h3>
              <p className="text-sm text-text-muted dark:text-dark-text-muted">
                {videos.length} videos this period
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light dark:text-dark-text-muted" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 bg-surface-100 dark:bg-dark-surface-light border border-surface-400 dark:border-dark-border rounded-xl text-sm text-text-primary dark:text-dark-text placeholder:text-text-light dark:placeholder:text-dark-text-muted focus:outline-none focus:ring-2 focus:ring-primary-900 dark:focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-200 dark:bg-dark-surface-light">
              <th className="text-left text-xs font-semibold text-text-secondary dark:text-dark-text-muted uppercase tracking-wider px-6 py-4">
                Video
              </th>
              {[
                { key: "views", label: "Views", icon: IoEye },
                { key: "likes", label: "Likes", icon: IoHeart },
                {
                  key: "engagementRate",
                  label: "Engagement",
                  icon: IoTrendingUp,
                },
              ].map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className="text-left text-xs font-semibold text-text-secondary dark:text-dark-text-muted uppercase tracking-wider px-6 py-4 cursor-pointer group hover:text-text-primary dark:hover:text-dark-text transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    {column.label}
                    <SortIcon columnKey={column.key} />
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 w-12" />
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedVideos.map((video, index) => (
              <tr
                key={video.id}
                onMouseEnter={() => setHoveredRow(video.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`
                  border-b border-surface-300 dark:border-dark-border transition-colors duration-150
                  ${hoveredRow === video.id ? "bg-surface-100 dark:bg-dark-surface-light" : ""}
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {/* Video Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0 group">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-20 h-12 object-cover rounded-lg"
                      />
                      <div
                        className={`
                          absolute inset-0 bg-text-primary/50 dark:bg-black/60 rounded-lg flex items-center justify-center
                          transition-opacity duration-200
                          ${hoveredRow === video.id ? "opacity-100" : "opacity-0"}
                        `}
                      >
                        <IoPlay className="w-6 h-6 text-white" />
                      </div>
                      {video.avgViewDuration && (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-text-primary/80 dark:bg-black/80 text-white text-[10px] font-medium rounded">
                          {video.avgViewDuration}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-text-primary dark:text-dark-text truncate max-w-[200px] lg:max-w-[300px]">
                        {video.title}
                      </p>
                      <p className="text-sm text-text-muted dark:text-dark-text-muted">
                        {formatDate(video.publishedAt)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Views */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <IoEye className="w-4 h-4 text-text-light dark:text-dark-text-muted" />
                    <span className="text-sm font-semibold text-text-primary dark:text-dark-text">
                      {formatNumber(video.views)}
                    </span>
                  </div>
                </td>

                {/* Likes */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <IoHeart className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-semibold text-text-primary dark:text-dark-text">
                      {formatNumber(video.likes)}
                    </span>
                  </div>
                </td>

                {/* Engagement */}
                <td className="px-6 py-4">
                  <div
                    className={`
                      inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
                      ${
                        video.engagementRate >= 7
                          ? "bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400"
                          : video.engagementRate >= 5
                            ? "bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400"
                            : "bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400"
                      }
                    `}
                  >
                    <IoTrendingUp className="w-3 h-3" />
                    {video.engagementRate}%
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <button className="p-2 text-text-light dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text hover:bg-surface-200 dark:hover:bg-dark-surface-light rounded-lg transition-colors">
                    <IoEllipsisVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredAndSortedVideos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <IoSearch className="w-12 h-12 text-surface-400 dark:text-dark-text-muted mb-3" />
            <p className="text-text-muted dark:text-dark-text-muted">
              No videos found
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-surface-300 dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-100 dark:bg-dark-surface-light">
        <p className="text-sm text-text-muted dark:text-dark-text-muted">
          Showing {filteredAndSortedVideos.length} of {videos.length} videos
        </p>
        <button className="text-sm font-semibold text-primary-900 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
          View All Videos →
        </button>
      </div>
    </div>
  );
});

VideoTable.displayName = "VideoTable";

export default VideoTable;

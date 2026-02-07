import { useState, useMemo, memo, useCallback } from "react";
import {
  IoFlame,
  IoSearch,
  IoFilter,
  IoChevronDown,
  IoSparkles,
  IoTrendingUp,
  IoBookmarkOutline,
  IoGridOutline,
  IoListOutline,
} from "react-icons/io5";
import TrendCard from "../components/trends/TrendCard";
import Badge from "../components/common/Badge";
import { DashboardSkeleton } from "../components/common/Loader";
import { useTrends } from "../hooks/useTrends";
import { TREND_CATEGORIES } from "../utils/constants";

const StatCard = memo(
  ({
    label,
    value,
    icon: IconComponent,
    color,
    bgColor,
    darkColor,
    darkBgColor,
  }) => (
    <div className="relative overflow-hidden bg-surface-50 dark:bg-dark-surface rounded-2xl p-5 border border-surface-200 dark:border-dark-border shadow-sm hover:shadow-md dark:hover:shadow-black/30 transition-all duration-300 group">
      <div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"
        style={{ backgroundColor: bgColor }}
      />
      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl" style={{ backgroundColor: bgColor }}>
            <IconComponent className="w-4 h-4" style={{ color }} />
          </div>
          <span className="text-sm font-medium text-text-muted dark:text-dark-text-muted">
            {label}
          </span>
        </div>
        <p className="text-2xl font-bold text-text-primary dark:text-dark-text">
          {value}
        </p>
      </div>
    </div>
  ),
);

const Trends = () => {
  const { trends, isLoading, category, setCategory } = useTrends();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("opportunityScore");

  const filteredTrends = useMemo(() => {
    let result = [...trends];

    if (searchQuery) {
      result = result.filter(
        (trend) =>
          trend.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trend.hashtags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    result.sort((a, b) => {
      if (sortBy === "opportunityScore") {
        return b.opportunityScore - a.opportunityScore;
      }
      if (sortBy === "searchVolume") {
        const parseVolume = (str) => {
          const num = parseFloat(str.replace(/[^0-9.]/g, ""));
          if (str.includes("M")) return num * 1000000;
          if (str.includes("K")) return num * 1000;
          return num;
        };
        return parseVolume(b.searchVolume) - parseVolume(a.searchVolume);
      }
      if (sortBy === "strength") {
        const strengthOrder = { High: 3, Medium: 2, Low: 1 };
        return strengthOrder[b.strength] - strengthOrder[a.strength];
      }
      return 0;
    });

    return result;
  }, [trends, searchQuery, sortBy]);

  const stats = useMemo(
    () => ({
      total: trends.length,
      highTrends: trends.filter((t) => t.strength === "High").length,
      uncovered: trends.filter((t) => !t.covered).length,
      avgOpportunity: Math.round(
        trends.reduce((acc, t) => acc + t.opportunityScore, 0) /
          trends.length || 0,
      ),
    }),
    [trends],
  );

  const handleExplore = useCallback((trend) => {
    // In a real app, this would navigate to a detailed view or open a modal
  }, []);

  const selectedCategory = TREND_CATEGORIES.find((c) => c.value === category);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-gradient-to-br from-primary-300/20 to-accent-400/20 dark:from-primary-600/10 dark:to-accent-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="p-3 bg-gradient-to-br from-success-500 to-success-600 dark:from-success-400 dark:to-success-500 rounded-2xl shadow-lg shadow-success-500/30">
                <IoTrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-dark-text">
                Trend Detection
              </h1>
              {stats.highTrends > 0 && (
                <Badge variant="success" className="animate-pulse">
                  {stats.highTrends} Hot Trends
                </Badge>
              )}
            </div>
            <p className="text-text-muted dark:text-dark-text-muted flex items-center gap-2 ml-16">
              <IoFlame className="w-4 h-4 text-warning-500 dark:text-warning-400" />
              Discover trending topics before they peak
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Trends"
          value={stats.total}
          icon={IoTrendingUp}
          color="#3a7a4a"
          bgColor="#eef5f0"
          darkColor="#86efac"
          darkBgColor="rgba(34,197,94,0.15)"
        />
        <StatCard
          label="High Potential"
          value={stats.highTrends}
          icon={IoFlame}
          color="#d6871c"
          bgColor="#fef9ee"
          darkColor="#fcd34d"
          darkBgColor="rgba(245,158,11,0.15)"
        />
        <StatCard
          label="Uncovered"
          value={stats.uncovered}
          icon={IoSparkles}
          color="#1e4d5e"
          bgColor="#e6f0f3"
          darkColor="#a5b4fc"
          darkBgColor="rgba(99,102,241,0.15)"
        />
        <StatCard
          label="Avg. Opportunity"
          value={`${stats.avgOpportunity}%`}
          icon={IoBookmarkOutline}
          color="#2a6275"
          bgColor="#c2dce4"
          darkColor="#67e8f9"
          darkBgColor="rgba(6,182,212,0.15)"
        />
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-surface-50 dark:bg-dark-surface rounded-2xl border border-surface-200 dark:border-dark-border shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light dark:text-dark-text-muted" />
            <input
              type="text"
              placeholder="Search trends or hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-100 dark:bg-dark-surface-light border border-surface-300 dark:border-dark-border rounded-xl text-sm text-text-primary dark:text-dark-text placeholder:text-text-light dark:placeholder:text-dark-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between gap-3 px-4 py-2.5 bg-surface-100 dark:bg-dark-surface-light hover:bg-surface-200 dark:hover:bg-dark-border border border-surface-300 dark:border-dark-border rounded-xl min-w-[180px] transition-colors"
            >
              <div className="flex items-center gap-2">
                <IoFilter className="w-4 h-4 text-text-muted dark:text-dark-text-muted" />
                <span className="text-sm font-medium text-text-secondary dark:text-dark-text">
                  {selectedCategory?.label || "All Categories"}
                </span>
              </div>
              <IoChevronDown
                className={`w-4 h-4 text-text-light dark:text-dark-text-muted transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isFilterOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-full bg-surface-50 dark:bg-dark-surface border border-surface-300 dark:border-dark-border rounded-xl shadow-xl dark:shadow-black/40 z-50 overflow-hidden animate-fade-in">
                  {TREND_CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setCategory(cat.value);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        category === cat.value
                          ? "bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 font-medium"
                          : "text-text-primary dark:text-dark-text hover:bg-surface-100 dark:hover:bg-dark-surface-light"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sort & View Options */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 bg-surface-100 dark:bg-dark-surface-light border border-surface-300 dark:border-dark-border rounded-xl text-sm text-text-secondary dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          >
            <option value="opportunityScore">Opportunity Score</option>
            <option value="searchVolume">Search Volume</option>
            <option value="strength">Trend Strength</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-surface-200 dark:bg-dark-surface-light rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-surface-50 dark:bg-dark-surface text-primary-700 dark:text-primary-400 shadow-sm"
                  : "text-text-muted dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text"
              }`}
            >
              <IoGridOutline className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-surface-50 dark:bg-dark-surface text-primary-700 dark:text-primary-400 shadow-sm"
                  : "text-text-muted dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text"
              }`}
            >
              <IoListOutline className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted dark:text-dark-text-muted">
          Showing {filteredTrends.length} of {trends.length} trends
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-sm text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Trends Grid/List */}
      {filteredTrends.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredTrends.map((trend, index) => (
            <div
              key={trend.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TrendCard trend={trend} onExplore={handleExplore} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-surface-50 via-surface-100 to-surface-50 dark:from-dark-surface dark:via-dark-surface-light dark:to-dark-surface rounded-2xl border border-surface-200 dark:border-dark-border">
          <div className="w-20 h-20 bg-gradient-to-br from-surface-200 to-surface-300 dark:from-dark-surface-light dark:to-dark-border rounded-full flex items-center justify-center mx-auto mb-4">
            <IoSearch className="w-10 h-10 text-text-light dark:text-dark-text-muted" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text mb-2">
            No trends found
          </h3>
          <p className="text-text-muted dark:text-dark-text-muted max-w-md mx-auto">
            {searchQuery
              ? `No trends matching "${searchQuery}". Try a different search term.`
              : "No trends available in this category. Check back later for updates."}
          </p>
        </div>
      )}

      {/* Content Gap Opportunities */}
      {stats.uncovered > 0 && (
        <div className="bg-gradient-to-r from-accent-50 to-warning-50 dark:from-accent-900/20 dark:to-warning-900/20 rounded-2xl p-6 border border-accent-200 dark:border-accent-700/40">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent-100 dark:bg-accent-800/30 rounded-xl">
              <IoSparkles className="w-6 h-6 text-accent-600 dark:text-accent-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text mb-1">
                Content Gap Opportunities
              </h3>
              <p className="text-text-secondary dark:text-dark-text-muted mb-4">
                You haven't covered {stats.uncovered} trending topics yet. These
                represent potential growth opportunities for your channel.
              </p>
              <div className="flex flex-wrap gap-2">
                {filteredTrends
                  .filter((t) => !t.covered)
                  .slice(0, 5)
                  .map((trend) => (
                    <span
                      key={trend.id}
                      className="px-3 py-1.5 bg-surface-50 dark:bg-dark-surface text-accent-700 dark:text-accent-300 text-sm font-medium rounded-full border border-accent-200 dark:border-accent-700/50 hover:bg-accent-50 dark:hover:bg-accent-900/20 cursor-pointer transition-colors"
                    >
                      {trend.topic}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Trends);

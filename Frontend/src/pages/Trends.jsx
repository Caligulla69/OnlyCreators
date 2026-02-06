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
  ({ label, value, icon: IconComponent, color, bgColor }) => (
    <div className="relative overflow-hidden bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"
        style={{ backgroundColor: bgColor }}
      />
      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl" style={{ backgroundColor: bgColor }}>
            <IconComponent className="w-4 h-4" style={{ color }} />
          </div>
          <span className="text-sm font-medium text-gray-500">{label}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  ),
);

const Trends = () => {
  const { trends, isLoading, category, setCategory } = useTrends();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("opportunityScore"); // 'opportunityScore', 'searchVolume', 'strength'

  const filteredTrends = useMemo(() => {
    let result = [...trends];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (trend) =>
          trend.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trend.hashtags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Sort trends
    result.sort((a, b) => {
      if (sortBy === "opportunityScore") {
        return b.opportunityScore - a.opportunityScore;
      }
      if (sortBy === "searchVolume") {
        // Parse search volume strings like "2.5M+"
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
    console.log("Exploring trend:", trend.topic);
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
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Trend Detection
              </h1>
              {stats.highTrends > 0 && (
                <Badge variant="success" className="animate-pulse">
                  {stats.highTrends} Hot Trends
                </Badge>
              )}
            </div>
            <p className="text-gray-500 flex items-center gap-2">
              <IoFlame className="w-4 h-4 text-orange-500" />
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
          color="#10B981"
          bgColor="#ECFDF5"
        />
        <StatCard
          label="High Potential"
          value={stats.highTrends}
          icon={IoFlame}
          color="#F59E0B"
          bgColor="#FEF3C7"
        />
        <StatCard
          label="Uncovered"
          value={stats.uncovered}
          icon={IoSparkles}
          color="#8B5CF6"
          bgColor="#F5F3FF"
        />
        <StatCard
          label="Avg. Opportunity"
          value={`${stats.avgOpportunity}%`}
          icon={IoBookmarkOutline}
          color="#06B6D4"
          bgColor="#ECFEFF"
        />
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search trends or hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl min-w-[180px] transition-colors"
            >
              <div className="flex items-center gap-2">
                <IoFilter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {selectedCategory?.label || "All Categories"}
                </span>
              </div>
              <IoChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isFilterOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                  {TREND_CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setCategory(cat.value);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        category === cat.value
                          ? "bg-primary-50 text-primary-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
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
            className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="opportunityScore">Opportunity Score</option>
            <option value="searchVolume">Search Volume</option>
            <option value="strength">Trend Strength</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-primary-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <IoGridOutline className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-white text-primary-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <IoListOutline className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredTrends.length} of {trends.length} trends
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
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
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoSearch className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No trends found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchQuery
              ? `No trends matching "${searchQuery}". Try a different search term.`
              : "No trends available in this category. Check back later for updates."}
          </p>
        </div>
      )}

      {/* Content Gap Opportunities */}
      {stats.uncovered > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <IoSparkles className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Content Gap Opportunities
              </h3>
              <p className="text-gray-600 mb-4">
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
                      className="px-3 py-1.5 bg-white text-amber-700 text-sm font-medium rounded-full border border-amber-200 hover:bg-amber-50 cursor-pointer transition-colors"
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

import { useState, useEffect, useMemo, useCallback, memo } from "react";
import {
  IoSparkles,
  IoCheckmarkCircle,
  IoFilter,
  IoTrendingUp,
  IoFlash,
  IoRocket,
  IoChevronDown,
  IoBulb,
  IoStarOutline,
  IoTime,
} from "react-icons/io5";
import PostingHeatmap from "../components/insights/PostingHeatmap";
import RecommendationCard from "../components/insights/RecommendationCard";
import Badge from "../components/common/Badge";
import { DashboardSkeleton } from "../components/common/Loader";
import { INSIGHT_CATEGORIES } from "../utils/constants";
import mockInsights from "../data/mockInsights.json";
import InsightsCard from "../components/insights/InsightsCard";

const StatCard = memo(
  ({ label, value, icon: Icon, gradient, lightBg, delay = 0 }) => (
    <div
      className="relative overflow-hidden bg-white rounded-2xl p-6 border border-surface-300 shadow-sm hover:shadow-xl transition-all duration-500 group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Animated background */}
      <div
        className={`absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-30 blur-xl group-hover:scale-150 transition-transform duration-700 ${lightBg}`}
      />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-surface-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`p-2.5 rounded-xl ${gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-text-muted">{label}</span>
        </div>
        <p className="text-3xl font-bold text-text-primary tracking-tight">
          {value}
        </p>
      </div>
    </div>
  ),
);

const Insights = () => {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [appliedInsights, setAppliedInsights] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const loadInsights = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setInsights(mockInsights);
      setIsLoading(false);
    };
    loadInsights();
  }, []);

  const filteredInsights = useMemo(
    () =>
      insights.filter(
        (insight) => category === "all" || insight.category === category,
      ),
    [insights, category],
  );

  const stats = useMemo(
    () => ({
      total: insights.length,
      applied: appliedInsights.length,
      highPriority: insights.filter((i) => i.priority === "High").length,
      potentialImpact: "+45%",
    }),
    [insights, appliedInsights],
  );

  const handleApply = useCallback((insight) => {
    setAppliedInsights((prev) => [...prev, insight.id]);
  }, []);

  const handleDismiss = useCallback((insight) => {
    setInsights((prev) => prev.filter((i) => i.id !== insight.id));
  }, []);

  const selectedCategory = INSIGHT_CATEGORIES.find((c) => c.value === category);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="relative">
        {/* Decorative backgrounds */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-warning-400/20 to-accent-700/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -top-10 left-1/3 w-40 h-40 bg-gradient-to-br from-primary-900/10 to-accent-700/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="p-3 bg-gradient-to-br from-warning-500 to-warning-600 rounded-2xl shadow-lg shadow-warning-500/30">
                <IoSparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
                AI Insights
              </h1>
              {stats.highPriority > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-error-100 text-error-700 animate-pulse">
                  <IoFlash className="w-3 h-3" />
                  {stats.highPriority} High Priority
                </span>
              )}
            </div>
            <p className="text-text-muted flex items-center gap-2 ml-16">
              <IoBulb className="w-4 h-4 text-warning-500" />
              Personalized recommendations to optimize your content strategy
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          label="Total Insights"
          value={stats.total}
          icon={IoSparkles}
          gradient="bg-gradient-to-br from-primary-900 to-accent-700"
          lightBg="bg-primary-200"
          delay={0}
        />
        <StatCard
          label="Applied"
          value={stats.applied}
          icon={IoCheckmarkCircle}
          gradient="bg-gradient-to-br from-success-500 to-success-600"
          lightBg="bg-success-200"
          delay={100}
        />
        <StatCard
          label="High Priority"
          value={stats.highPriority}
          icon={IoFlash}
          gradient="bg-gradient-to-br from-error-500 to-error-600"
          lightBg="bg-error-200"
          delay={200}
        />
        <StatCard
          label="Potential Impact"
          value={stats.potentialImpact}
          icon={IoRocket}
          gradient="bg-gradient-to-br from-accent-700 to-primary-600"
          lightBg="bg-accent-200"
          delay={300}
        />
      </div>

      {/* Filter Section */}
      <div className="relative bg-white rounded-2xl border border-surface-300 shadow-sm overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-900 via-accent-700 to-warning-500" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-surface-100 rounded-xl">
              <IoFilter className="w-5 h-5 text-text-secondary" />
            </div>
            <div>
              <p className="text-base font-semibold text-text-primary">
                Filter Insights
              </p>
              <p className="text-sm text-text-muted">
                Showing{" "}
                <span className="font-bold text-primary-900">
                  {filteredInsights.length}
                </span>{" "}
                of {insights.length} insights
              </p>
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between gap-3 px-5 py-3 bg-surface-100 hover:bg-surface-200 border border-surface-300 hover:border-primary-300 rounded-xl min-w-[200px] transition-all duration-200 group"
            >
              <span className="text-sm font-semibold text-text-primary">
                {selectedCategory?.label || "All Categories"}
              </span>
              <IoChevronDown
                className={`w-4 h-4 text-text-muted group-hover:text-primary-900 transition-all duration-200 ${
                  isFilterOpen ? "rotate-180 text-primary-900" : ""
                }`}
              />
            </button>

            {isFilterOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-full bg-white border border-surface-300 rounded-xl shadow-xl z-50 overflow-hidden animate-slide-down">
                  {INSIGHT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setCategory(cat.value);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 ${
                        category === cat.value
                          ? "bg-primary-100 text-primary-900 font-semibold"
                          : "text-text-primary hover:bg-surface-100"
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
      </div>

      {/* Insights Grid */}
      {filteredInsights.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInsights.map((insight, index) => (
            <div
              key={insight.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <InsightsCard
                insight={insight}
                onApply={handleApply}
                onDismiss={handleDismiss}
                isApplied={appliedInsights.includes(insight.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative overflow-hidden text-center py-20 bg-gradient-to-br from-surface-50 via-white to-surface-100 rounded-2xl border border-surface-300">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border border-surface-200 rounded-full opacity-50" />
          <div className="absolute bottom-10 right-10 w-32 h-32 border border-surface-200 rounded-full opacity-30" />

          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-success-100 to-success-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-success-500/20">
              <IoCheckmarkCircle className="w-12 h-12 text-success-500" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              All caught up!
            </h3>
            <p className="text-text-muted max-w-md mx-auto">
              No insights in this category. Keep creating great content and
              check back later for new recommendations.
            </p>
          </div>
        </div>
      )}

      {/* Posting Heatmap */}
      <PostingHeatmap />

      {/* Recommendations */}
      <RecommendationCard />
    </div>
  );
};

export default memo(Insights);

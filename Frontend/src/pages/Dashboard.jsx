import { useState, useMemo, useCallback, memo } from "react";
import {
  IoEyeOutline,
  IoPeopleOutline,
  IoHeartOutline,
  IoTimeOutline,
  IoRefresh,
  IoSparkles,
  IoCalendarOutline,
  IoChevronDown,
} from "react-icons/io5";
import { useAnalytics } from "../hooks/useAnalytics";
import MetricCard from "../components/dashboard/MetricCard";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import EngagementChart from "../components/dashboard/EngagementChart";
import VideoTable from "../components/dashboard/VideoTable";
import QuickInsights from "../components/dashboard/QuickInsights";
import TopPerformers from "../components/dashboard/TopPerformers";
import { DashboardSkeleton } from "../components/common/Loader";

const dateRanges = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Last year", value: "1y" },
  { label: "All time", value: "all" },
];

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("30d");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { analytics, videos, isLoading, refreshData, lastUpdated } =
    useAnalytics(dateRange);

  const metrics = useMemo(
    () => [
      {
        id: "views",
        title: "Total Views",
        value: analytics?.totalViews || 0,
        change: analytics?.viewsChange || 0,
        icon: IoEyeOutline,
        iconBg: "bg-primary-600",
        sparklineColor: "#662843",
        sparklineData: analytics?.viewsSparkline,
      },
      {
        id: "subscribers",
        title: "Subscribers",
        value: analytics?.totalSubscribers || 0,
        change: analytics?.subscribersChange || 0,
        icon: IoPeopleOutline,
        iconBg: "bg-accent-700",
        sparklineColor: "#835CAA",
        sparklineData: analytics?.subscribersSparkline,
      },
      {
        id: "engagement",
        title: "Engagement Rate",
        value: analytics?.engagementRate || 0,
        change: analytics?.engagementChange || 0,
        icon: IoHeartOutline,
        iconBg: "bg-secondary-600",
        sparklineColor: "#81837D",
        format: "percentage",
        sparklineData: analytics?.engagementSparkline,
      },
      {
        id: "watchTime",
        title: "Watch Time",
        value: analytics?.watchTimeHours || 0,
        change: analytics?.watchTimeChange || 0,
        icon: IoTimeOutline,
        iconBg: "bg-warning-600",
        sparklineColor: "#d97706",
        format: "hours",
        sparklineData: analytics?.watchTimeSparkline,
      },
    ],
    [analytics],
  );

  const handleRefresh = useCallback(() => {
    refreshData();
  }, [refreshData]);

  const selectedRange = dateRanges.find((r) => r.value === dateRange);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header Section */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
                Dashboard
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success-100 text-success-700">
                <span className="w-1.5 h-1.5 bg-success-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-text-muted flex items-center gap-2">
              <IoSparkles className="w-4 h-4 text-warning-500" />
              Welcome back! Your channel is growing{" "}
              <span className="text-success-600 font-semibold">
                +{analytics?.viewsChange || 12.5}%
              </span>{" "}
              this month
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range Picker */}
            <div className="relative">
              <button
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-dark-surface border border-surface-400 dark:border-dark-border rounded-xl shadow-sm hover:shadow-md hover:border-primary-900 dark:hover:border-primary-500 transition-all duration-200"
              >
                <IoCalendarOutline className="w-4 h-4 text-text-muted" />
                <span className="text-sm font-medium text-text-primary">
                  {selectedRange?.label}
                </span>
                <IoChevronDown
                  className={`w-4 h-4 text-text-light transition-transform duration-200 ${
                    isDatePickerOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDatePickerOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDatePickerOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface border border-surface-400 dark:border-dark-border rounded-xl shadow-xl z-50 overflow-hidden animate-slide-down">
                    {dateRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => {
                          setDateRange(range.value);
                          setIsDatePickerOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                          dateRange === range.value
                            ? "bg-primary-100 dark:bg-primary-900/30 text-primary-900 dark:text-primary-300 font-semibold"
                            : "text-text-primary dark:text-dark-text hover:bg-surface-100 dark:hover:bg-dark-surface-light"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl shadow-md hover:bg-primary-800 hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              <IoRefresh className="w-4 h-4" />
              <span className="text-sm font-semibold hidden sm:inline">
                Refresh
              </span>
            </button>
          </div>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <p className="mt-3 text-xs text-text-light">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Quick Insights Banner */}
      <QuickInsights analytics={analytics} />

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.id} {...metric} index={index} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <PerformanceChart data={analytics?.viewsOverTime || []} />
        </div>
        <div>
          <EngagementChart data={analytics?.engagementBreakdown} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoTable videos={videos} />
        </div>
        <div>
          <TopPerformers videos={videos?.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);

import { memo, useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IoAnalytics, IoExpand, IoDownload } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";

const chartTabs = [
  {
    id: "views",
    label: "Views",
    color: "#1e4d5e",
    darkColor: "#6366f1",
    dataKey: "views",
  },
  {
    id: "subscribers",
    label: "Subscribers",
    color: "#835CAA",
    darkColor: "#a78bfa",
    dataKey: "subscribers",
  },
  {
    id: "revenue",
    label: "Revenue",
    color: "#81837D",
    darkColor: "#94a3b8",
    dataKey: "revenue",
  },
];

const CustomTooltip = memo(({ active, payload, label, isDark }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={`rounded-xl shadow-lg border p-4 min-w-[180px] animate-scale-in ${
        isDark
          ? "bg-dark-surface border-dark-border"
          : "bg-white border-surface-300"
      }`}
    >
      <p
        className={`text-sm font-semibold mb-2 ${
          isDark ? "text-dark-text" : "text-text-primary"
        }`}
      >
        {label}
      </p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span
              className={`text-sm ${
                isDark ? "text-dark-text-muted" : "text-text-muted"
              }`}
            >
              {entry.name}
            </span>
          </div>
          <span
            className={`text-sm font-bold ${
              isDark ? "text-dark-text" : "text-text-primary"
            }`}
          >
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
});

CustomTooltip.displayName = "CustomTooltip";

const PerformanceChart = memo(({ data = [] }) => {
  const [activeTab, setActiveTab] = useState("views");
  const { isDark } = useTheme();

  const activeConfig = useMemo(
    () => chartTabs.find((t) => t.id === activeTab),
    [activeTab],
  );

  const activeColor = isDark ? activeConfig.darkColor : activeConfig.color;

  const formattedData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      name: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      // Map the views data to other chart types for demo purposes
      views: item.views,
      // Use deterministic values based on index to avoid impure function issues
      subscribers: Math.floor(40000 + index * 200 + ((index * 17) % 100)),
      revenue: Math.floor(item.views * 0.002 + ((index * 23) % 50)),
    }));
  }, [data]);

  return (
    <div
      className={`rounded-2xl border shadow-sm overflow-hidden ${
        isDark
          ? "bg-dark-surface border-dark-border shadow-black/20"
          : "bg-white border-surface-400"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 pb-0 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary-600 rounded-xl shadow-md">
            <IoAnalytics className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3
              className={`text-lg font-semibold ${
                isDark ? "text-dark-text" : "text-text-primary"
              }`}
            >
              Performance Overview
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-dark-text-muted" : "text-text-muted"
              }`}
            >
              Track your growth over time
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${
              isDark
                ? "text-dark-text-muted hover:text-dark-text hover:bg-dark-surface-light"
                : "text-text-muted hover:text-text-primary hover:bg-surface-300"
            }`}
          >
            <IoExpand className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${
              isDark
                ? "text-dark-text-muted hover:text-dark-text hover:bg-dark-surface-light"
                : "text-text-muted hover:text-text-primary hover:bg-surface-300"
            }`}
          >
            <IoDownload className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-6 mt-4">
        {chartTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const tabColor = isDark ? tab.darkColor : tab.color;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "text-white"
                    : isDark
                      ? "text-dark-text-muted hover:text-dark-text hover:bg-dark-surface-light"
                      : "text-text-muted hover:text-text-primary hover:bg-surface-200"
                }
              `}
              style={{
                backgroundColor: isActive ? tabColor : "transparent",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="p-6 pt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`gradient-${activeTab}-${isDark ? "dark" : "light"}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={activeColor}
                    stopOpacity={isDark ? 0.3 : 0.2}
                  />
                  <stop
                    offset="100%"
                    stopColor={activeColor}
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#3d3d3d" : "#d5cecc"}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: isDark ? "#a1a1aa" : "#6b6370", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: isDark ? "#a1a1aa" : "#6b6370", fontSize: 12 }}
                tickFormatter={(value) =>
                  value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value
                }
                dx={-10}
              />
              <Tooltip
                content={<CustomTooltip isDark={isDark} />}
                cursor={false}
              />
              <Area
                type="monotone"
                dataKey={activeConfig.dataKey}
                name={activeConfig.label}
                stroke={activeColor}
                strokeWidth={2.5}
                fill={`url(#gradient-${activeTab}-${isDark ? "dark" : "light"})`}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});

PerformanceChart.displayName = "PerformanceChart";

export default PerformanceChart;

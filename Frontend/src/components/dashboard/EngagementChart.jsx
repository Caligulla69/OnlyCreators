import { memo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import {
  IoHeart,
  IoThumbsUp,
  IoChatbubble,
  IoShareSocial,
} from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";

const COLORS = {
  likes: {
    color: "#1e4d5e",
    darkColor: "#6366f1",
    light: "#fdf2f6",
    dark: "rgba(99, 102, 241, 0.2)",
  },
  comments: {
    color: "#8f8a72",
    darkColor: "#a78bfa",
    light: "#faf8fc",
    dark: "rgba(167, 139, 250, 0.2)",
  },
  shares: {
    color: "#82591e",
    darkColor: "#f59e0b",
    light: "#f8f8f7",
    dark: "rgba(245, 158, 11, 0.2)",
  },
  saves: {
    color: "#221726",
    darkColor: "#ec4899",
    light: "#f3f0ef",
    dark: "rgba(236, 72, 153, 0.2)",
  },
};

const ICONS = {
  likes: IoThumbsUp,
  comments: IoChatbubble,
  shares: IoShareSocial,
  saves: IoHeart,
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: "drop-shadow(0 4px 12px rgba(34, 23, 38, 0.15))",
        }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
        opacity={0.3}
      />
    </g>
  );
};

const EngagementChart = memo(({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { isDark } = useTheme();

  const chartData = data
    ? Object.entries(data).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value,
        key,
      }))
    : [];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className={`rounded-2xl border shadow-sm p-6 h-full ${
        isDark
          ? "bg-dark-surface border-dark-border shadow-black/20"
          : "bg-white border-surface-400"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-accent-700 rounded-xl shadow-md">
          <IoHeart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3
            className={`text-lg font-semibold ${
              isDark ? "text-dark-text" : "text-text-primary"
            }`}
          >
            Engagement Mix
          </h3>
          <p
            className={`text-sm ${
              isDark ? "text-dark-text-muted" : "text-text-muted"
            }`}
          >
            How users interact
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.key}
                  fill={
                    isDark
                      ? COLORS[entry.key]?.darkColor || "#c23372"
                      : COLORS[entry.key]?.color || "#c23372"
                  }
                  stroke="transparent"
                  style={{ cursor: "pointer" }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div
            className="text-center animate-fade-in"
            key={activeIndex ?? "total"}
          >
            <p
              className={`text-2xl font-bold ${
                isDark ? "text-dark-text" : "text-text-primary"
              }`}
            >
              {activeIndex !== null
                ? chartData[activeIndex]?.value.toLocaleString()
                : total.toLocaleString()}
            </p>
            <p
              className={`text-xs ${
                isDark ? "text-dark-text-muted" : "text-text-muted"
              }`}
            >
              {activeIndex !== null ? chartData[activeIndex]?.name : "Total"}
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {chartData.map((item, index) => {
          const Icon = ICONS[item.key];
          const percentage = ((item.value / total) * 100).toFixed(1);
          const isActive = activeIndex === index;
          const colorConfig = COLORS[item.key];

          return (
            <div
              key={item.key}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`
                flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? isDark
                      ? "bg-dark-surface-light scale-[1.02]"
                      : "bg-surface-200 scale-[1.02]"
                    : isDark
                      ? "hover:bg-dark-surface-light"
                      : "hover:bg-surface-100"
                }
              `}
            >
              <div
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: isDark
                    ? colorConfig?.dark
                    : colorConfig?.light,
                }}
              >
                <Icon
                  className="w-4 h-4"
                  style={{
                    color: isDark ? colorConfig?.darkColor : colorConfig?.color,
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isDark ? "text-dark-text" : "text-text-primary"
                  }`}
                >
                  {item.name}
                </p>
                <p
                  className={`text-xs ${
                    isDark ? "text-dark-text-muted" : "text-text-muted"
                  }`}
                >
                  {percentage}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

EngagementChart.displayName = "EngagementChart";

export default EngagementChart;

import { useState, useEffect, useMemo, memo } from "react";
import {
  IoPeople,
  IoMale,
  IoFemale,
  IoGlobe,
  IoPhonePortrait,
  IoDesktop,
  IoTabletPortrait,
  IoTv,
  IoTrendingUp,
  IoArrowUp,
  IoStatsChart,
  IoEarth,
  IoSparkles,
} from "react-icons/io5";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  Sector,
} from "recharts";
import Card from "../components/common/Card";
import { DashboardSkeleton } from "../components/common/Loader";
import mockAnalytics from "../data/mockAnalytics.json";

const COLORS = {
  primary: "#662843",
  accent: "#835CAA",
  secondary: "#81837D",
  dark: "#221726",
  success: "#10B981",
  warning: "#F59E0B",
  cyan: "#06B6D4",
};

const CHART_COLORS = [
  "#a37322",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EC4899",
  "#8B5CF6",
];

const StatCard = memo(
  ({ icon: Icon, label, value, subValue, gradient, delay = 0 }) => (
    <div
      className="relative overflow-hidden bg-white rounded-2xl p-6 border border-surface-300 shadow-sm hover:shadow-xl transition-all duration-500 group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background gradient blob */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-700 ${gradient}`}
      />

      {/* Decorative circles */}
      <div className="absolute top-4 right-4 w-20 h-20 border border-surface-200 rounded-full opacity-30" />
      <div className="absolute top-6 right-6 w-14 h-14 border border-surface-200 rounded-full opacity-20" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`p-3 rounded-xl ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-text-muted">{label}</span>
        </div>
        <p className="text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
          {value}
        </p>
        {subValue && (
          <div className="flex items-center gap-1.5 mt-2 text-success-600">
            <div className="p-1 bg-success-100 rounded-full">
              <IoArrowUp className="w-3 h-3" />
            </div>
            <span className="text-sm font-semibold">{subValue}</span>
          </div>
        )}
      </div>
    </div>
  ),
);

const CustomTooltip = memo(({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-dark-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 backdrop-blur-xl">
      {label && (
        <p className="text-sm font-medium text-white/70 mb-1">{label}</p>
      )}
      <p className="text-xl font-bold">{payload[0].value}%</p>
    </div>
  );
});

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: "drop-shadow(0 8px 16px rgba(102, 40, 67, 0.3))" }}
      />
    </g>
  );
};

const Audience = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeGenderIndex, setActiveGenderIndex] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setData(mockAnalytics.demographicData);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const deviceIcons = useMemo(
    () => ({
      Mobile: IoPhonePortrait,
      Desktop: IoDesktop,
      Tablet: IoTabletPortrait,
      TV: IoTv,
    }),
    [],
  );

  const deviceGradients = useMemo(
    () => ({
      Mobile: "bg-gradient-to-br from-accent-900 to-accent-700",
      Desktop: "bg-gradient-to-br from-primary-700 to-primary-600",
      Tablet: "bg-gradient-to-br from-secondary-500 to-secondary-700",
      TV: "bg-gradient-to-br from-dark-800 to-dark-900",
    }),
    [],
  );

  const subscriberData = useMemo(() => {
    return mockAnalytics.viewsOverTime.map((item, i) => ({
      date: item.date,
      subscribers: Math.floor(40000 + i * 200 + ((i * 17) % 100)),
    }));
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="relative">
        {/* Decorative background */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-accent-700/20 to-primary-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-accent-700/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-accent-700 rounded-2xl shadow-lg">
              <IoPeople className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Audience Analytics
            </h1>
          </div>
          <p className="text-text-muted flex items-center gap-2 ml-16">
            <IoSparkles className="w-4 h-4 text-accent-700" />
            Understand who's watching your content and how they engage
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          icon={IoPeople}
          label="Total Audience"
          value="45.2K"
          subValue="+5.2% this month"
          gradient="bg-gradient-to-br from-primary-600 to-primary-500"
          delay={0}
        />
        <StatCard
          icon={IoMale}
          label="Male Viewers"
          value="62%"
          gradient="bg-gradient-to-br from-accent-700 to-accent-600"
          delay={100}
        />
        <StatCard
          icon={IoFemale}
          label="Female Viewers"
          value="35%"
          gradient="bg-gradient-to-br from-pink-500 to-pink-600"
          delay={200}
        />
        <StatCard
          icon={IoGlobe}
          label="Countries"
          value="45+"
          subValue="3 new this week"
          gradient="bg-gradient-to-br from-success-500 to-success-600"
          delay={300}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <div className="bg-white rounded-2xl border border-surface-300 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-surface-200">
            <div className="p-2.5 bg-primary-600 rounded-xl shadow-md">
              <IoStatsChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Age Distribution
              </h3>
              <p className="text-sm text-text-muted">Viewer age breakdown</p>
            </div>
          </div>
          <div className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.ageGroups || []}
                  layout="vertical"
                  margin={{ left: 0, right: 20 }}
                >
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#3a7d94" />
                      <stop offset="100%" stopColor="#3a7d94" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e0e3"
                    horizontal
                    vertical={false}
                  />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#81837D", fontSize: 12 }}
                  />
                  <YAxis
                    dataKey="range"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#221726", fontSize: 12, fontWeight: 500 }}
                    width={50}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(102, 40, 67, 0.05)" }}
                  />
                  <Bar
                    dataKey="percentage"
                    fill="url(#barGradient)"
                    radius={[0, 8, 8, 0]}
                    barSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Gender Split */}
        <div className="bg-white rounded-2xl border border-surface-300 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-surface-200">
            <div className="p-2.5 bg-secondary-600 rounded-xl shadow-md">
              <IoPeople className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Gender Distribution
              </h3>
              <p className="text-sm text-text-muted">
                Audience gender breakdown
              </p>
            </div>
          </div>
          <div className="p-6">
            <div className="h-56 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.gender || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="percentage"
                    nameKey="type"
                    stroke="none"
                    activeIndex={activeGenderIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, index) => setActiveGenderIndex(index)}
                    onMouseLeave={() => setActiveGenderIndex(null)}
                  >
                    {(data?.gender || []).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {(data?.gender || []).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors cursor-pointer"
                  onMouseEnter={() => setActiveGenderIndex(index)}
                  onMouseLeave={() => setActiveGenderIndex(null)}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[index] }}
                  />
                  <span className="text-sm text-text-secondary">
                    {item.type}:{" "}
                    <span className="font-bold text-text-primary">
                      {item.percentage}%
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white rounded-2xl border border-surface-300 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-surface-200">
            <div className="p-2.5 bg-gradient-to-br from-success-500 to-cyan-500 rounded-xl shadow-md">
              <IoEarth className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Top Countries
              </h3>
              <p className="text-sm text-text-muted">Geographic distribution</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {(data?.topCountries || []).slice(0, 5).map((country, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`
                        w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shadow-sm
                        ${
                          index === 0
                            ? "bg-gradient-to-br from-warning-400 to-warning-500 text-white"
                            : index === 1
                              ? "bg-gradient-to-br from-secondary-300 to-secondary-400 text-white"
                              : index === 2
                                ? "bg-gradient-to-br from-warning-600 to-warning-700 text-white"
                                : "bg-surface-200 text-text-muted"
                        }
                      `}
                    >
                      {index + 1}
                    </span>
                    <span className="font-semibold text-text-primary group-hover:text-primary-900 transition-colors">
                      {country.country}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-text-primary bg-surface-100 px-3 py-1 rounded-full">
                    {country.percentage}%
                  </span>
                </div>
                <div className="h-2.5 bg-surface-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${country.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-2xl border border-surface-300 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-surface-200">
            <div className="p-2.5 bg-accent-600 rounded-xl shadow-md">
              <IoDesktop className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Device Breakdown
              </h3>
              <p className="text-sm text-text-muted">
                How viewers watch your content
              </p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {(data?.devices || []).map((device, index) => {
                const Icon = deviceIcons[device.type] || IoDesktop;
                const gradient =
                  deviceGradients[device.type] ||
                  "bg-gradient-to-br from-primary-900 to-accent-700";
                return (
                  <div
                    key={index}
                    className="relative overflow-hidden p-5 bg-gradient-to-br from-surface-50 to-surface-100 rounded-2xl border border-surface-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-surface-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`p-3 rounded-xl ${gradient} shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-text-primary">
                          {device.type}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-text-primary">
                          {device.percentage}%
                        </span>
                        <span className="text-sm text-text-muted">
                          of views
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Subscriber Growth */}
      <div className="bg-white rounded-2xl border border-surface-300 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-surface-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-accent-700 rounded-xl shadow-md">
              <IoTrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Subscriber Growth
              </h3>
              <p className="text-sm text-text-muted">
                Last 30 days performance
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-success-100 rounded-xl">
            <IoTrendingUp className="w-4 h-4 text-success-600" />
            <span className="text-sm font-bold text-success-600">
              +12.5% growth
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={subscriberData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="subGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3a7d94" stopOpacity={0.4} />
                    <stop offset="50%" stopColor="#3a7d94" stopOpacity={0.1} />
                    <stop
                      offset="100%"
                      stopColor="#1e4d5e"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e0e3"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1e4d5e", fontSize: 12 }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#81837D", fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="bg-dark-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10">
                          <p className="text-sm text-white/70">
                            {new Date(
                              payload[0].payload.date,
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-xl font-bold">
                            {payload[0].value.toLocaleString()} subscribers
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="subscribers"
                  stroke="#662843"
                  strokeWidth={3}
                  fill="url(#subGradient)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    strokeWidth: 3,
                    stroke: "#fff",
                    fill: "#662843",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Audience);

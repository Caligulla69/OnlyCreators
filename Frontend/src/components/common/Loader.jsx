const Loader = ({
  size = "md",
  color = "primary",
  fullScreen = false,
  text = "",
}) => {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colors = {
    primary: "border-primary-600",
    secondary: "border-secondary-500",
    white: "border-white",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`
          ${sizes[size]}
          border-4 border-gray-200 rounded-full
          animate-spin
          ${colors[color]}
          border-t-transparent
        `}
      />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export const SkeletonLoader = ({ className = "", variant = "text" }) => {
  const variants = {
    text: "h-4 w-full",
    title: "h-8 w-3/4",
    avatar: "h-12 w-12 rounded-full",
    thumbnail: "h-24 w-40 rounded-lg",
    card: "h-48 w-full rounded-xl",
    chart: "h-64 w-full rounded-xl",
  };

  return (
    <div
      className={`
        bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200
        bg-[length:200%_100%] animate-pulse rounded
        ${variants[variant]} ${className}
      `}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-start justify-between mb-4">
      <div className="space-y-2">
        <SkeletonLoader className="h-4 w-24" />
        <SkeletonLoader className="h-8 w-32" />
      </div>
      <SkeletonLoader className="h-12 w-12 rounded-xl" />
    </div>
    <div className="flex items-center justify-between">
      <SkeletonLoader className="h-6 w-20 rounded-full" />
      <SkeletonLoader className="h-10 w-20" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-6 border-b border-gray-100">
      <SkeletonLoader className="h-6 w-48" />
    </div>
    <div className="divide-y divide-gray-100">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 flex items-center gap-4">
          <SkeletonLoader variant="thumbnail" className="w-24 h-14" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader className="h-4 w-3/4" />
            <SkeletonLoader className="h-3 w-1/2" />
          </div>
          <SkeletonLoader className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <SkeletonLoader className="h-6 w-40" />
      <SkeletonLoader className="h-10 w-32 rounded-lg" />
    </div>
    <SkeletonLoader variant="chart" />
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-2">
        <SkeletonLoader className="h-10 w-48" />
        <SkeletonLoader className="h-4 w-72" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonLoader className="h-10 w-36 rounded-xl" />
        <SkeletonLoader className="h-10 w-24 rounded-xl" />
      </div>
    </div>

    {/* Quick Insights */}
    <SkeletonLoader className="h-40 w-full rounded-2xl" />

    {/* Metric Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {[...Array(4)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <ChartSkeleton />
      </div>
      <ChartSkeleton />
    </div>

    {/* Bottom Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TableSkeleton rows={5} />
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <SkeletonLoader className="h-6 w-32 mb-4" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonLoader className="h-8 w-8 rounded-lg" />
              <SkeletonLoader variant="thumbnail" className="w-16 h-10" />
              <div className="flex-1 space-y-1">
                <SkeletonLoader className="h-4 w-full" />
                <SkeletonLoader className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Loader;

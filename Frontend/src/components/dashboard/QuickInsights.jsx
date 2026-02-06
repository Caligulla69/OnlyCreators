import { memo } from "react";
import { motion } from "framer-motion";
import {
  IoTrendingUp,
  IoFlash,
  IoRocket,
  IoSparkles,
  IoArrowUp,
  IoArrowDown,
} from "react-icons/io5";

const QuickInsights = ({ analytics }) => {
  const insights = [
    {
      icon: IoTrendingUp,
      bgGradient: "from-emerald-500 to-teal-500",
      lightBg: "bg-emerald-100 dark:bg-emerald-900/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      text: "Views up",
      value: `${analytics?.viewsChange > 0 ? "+" : ""}${analytics?.viewsChange || 12.5}%`,
      subtext: "this month",
      trend: "up",
      trendValue: "+2.5%",
    },
    {
      icon: IoFlash,
      bgGradient: "from-amber-500 to-orange-500",
      lightBg: "bg-amber-100 dark:bg-amber-900/40",
      iconColor: "text-amber-600 dark:text-amber-400",
      text: "Best day",
      value: "Tuesday",
      subtext: "2PM - 4PM",
      trend: null,
    },
    {
      icon: IoRocket,
      bgGradient: "from-violet-500 to-purple-500",
      lightBg: "bg-violet-100 dark:bg-violet-900/40",
      iconColor: "text-violet-600 dark:text-violet-400",
      text: "Top video",
      value: "215K",
      subtext: "views this week",
      trend: "up",
      trendValue: "+18%",
    },
    {
      icon: IoSparkles,
      bgGradient: "from-blue-500 to-indigo-500",
      lightBg: "bg-blue-100 dark:bg-blue-900/40",
      iconColor: "text-blue-600 dark:text-blue-400",
      text: "New subs",
      value: "+1.2K",
      subtext: "last 7 days",
      trend: "up",
      trendValue: "+8%",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden bg-primary-600 dark:bg-primary-800  rounded-3xl p-6 shadow-xl  "
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <IoSparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Quick Insights</h3>
              <p className="text-white/60 text-sm">
                Your performance at a glance
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white text-sm font-medium transition-all"
          >
            View All
          </motion.button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-5 transition-all duration-300 cursor-pointer border border-white/10 hover:border-white/20"
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300 blur-xl`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`inline-flex p-2.5 rounded-xl ${insight.lightBg} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-5 h-5 ${insight.iconColor}`} />
                    </div>
                    {insight.trend && (
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                          insight.trend === "up"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {insight.trend === "up" ? (
                          <IoArrowUp className="w-3 h-3" />
                        ) : (
                          <IoArrowDown className="w-3 h-3" />
                        )}
                        {insight.trendValue}
                      </div>
                    )}
                  </div>

                  <p className="text-white/70 text-xs font-medium mb-1 uppercase tracking-wider">
                    {insight.text}
                  </p>
                  <p className="text-white text-2xl font-bold mb-1">
                    {insight.value}
                  </p>
                  <p className="text-white/50 text-sm">{insight.subtext}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(QuickInsights);

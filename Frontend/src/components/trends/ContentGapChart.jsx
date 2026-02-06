import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Card from "../common/Card";
import Button from "../common/Button";
import { IoSparkles } from "react-icons/io5";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg">
        <p className="text-sm font-medium mb-1">
          {payload[0].payload.fullTopic}
        </p>
        <p className="text-lg font-bold">Opportunity: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const ContentGapChart = ({ trends = [] }) => {
  // Process trends into gap analysis data
  const gapData = trends
    .filter((t) => !t.covered)
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 6)
    .map((trend) => ({
      topic:
        trend.topic.length > 20
          ? trend.topic.substring(0, 20) + "..."
          : trend.topic,
      fullTopic: trend.topic,
      score: trend.opportunityScore,
      covered: trend.covered,
    }));

  return (
    <Card
      title="Content Gap Analysis"
      subtitle="Topics you haven't covered yet"
      headerAction={
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<IoSparkles className="w-4 h-4" />}
        >
          Get AI Suggestions
        </Button>
      }
    >
      {gapData.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={gapData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="topic"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#374151", fontSize: 12 }}
                width={150}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                {gapData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.score >= 80
                        ? "#10B981"
                        : entry.score >= 50
                          ? "#F59E0B"
                          : "#EF4444"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoSparkles className="w-8 h-8 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Great job! You're on top of trends
            </h3>
            <p className="text-gray-500 max-w-sm">
              You've covered all the major trending topics. Keep monitoring for
              new opportunities.
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success-500" />
            <span className="text-gray-600">High Opportunity (80+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-warning-500" />
            <span className="text-gray-600">Medium (50-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-error-500" />
            <span className="text-gray-600">Lower (&lt;50)</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContentGapChart;

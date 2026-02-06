import { IoCheckmark, IoClose, IoInformationCircle } from "react-icons/io5";
import Card from "../common/Card";

const recommendations = [
  {
    id: 1,
    category: "Video Length",
    current: "Average: 15 minutes",
    recommendation: "8-12 minutes performs best",
    impact: "+25% watch time",
    status: "warning",
  },
  {
    id: 2,
    category: "Thumbnails",
    current: "40% use custom thumbnails",
    recommendation: "Use faces in thumbnails",
    impact: "+200% CTR",
    status: "error",
  },
  {
    id: 3,
    category: "Titles",
    current: "Average 45 characters",
    recommendation: "Use questions or numbers",
    impact: "+35% engagement",
    status: "success",
  },
  {
    id: 4,
    category: "Descriptions",
    current: "60% have timestamps",
    recommendation: "Add timestamps to all videos",
    impact: "+30% search visibility",
    status: "warning",
  },
  {
    id: 5,
    category: "Upload Frequency",
    current: "2 videos per week",
    recommendation: "Maintain consistency",
    impact: "Stable growth",
    status: "success",
  },
];

const statusColors = {
  success: "bg-success-100 text-success-700 border-success-200",
  warning: "bg-warning-100 text-warning-700 border-warning-200",
  error: "bg-error-100 text-error-700 border-error-200",
};

const statusIcons = {
  success: <IoCheckmark className="w-4 h-4" />,
  warning: <IoInformationCircle className="w-4 h-4" />,
  error: <IoClose className="w-4 h-4" />,
};

const RecommendationCard = () => {
  return (
    <Card
      title="Content Quality Recommendations"
      subtitle="AI-powered suggestions to improve your content"
    >
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {/* Status Icon */}
            <div
              className={`p-2 rounded-lg border ${statusColors[rec.status]}`}
            >
              {statusIcons[rec.status]}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-900">{rec.category}</h4>
                <span className="text-sm font-medium text-success-600">
                  {rec.impact}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                Current: {rec.current}
              </p>
              <p className="text-sm text-gray-700">💡 {rec.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tags Suggestions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">
          Suggested Tags for Your Niche
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "react tutorial",
            "web development",
            "javascript",
            "coding tips",
            "programming",
            "frontend",
            "tech",
            "learn to code",
            "developer",
            "software engineering",
            "css",
            "html",
            "nodejs",
            "fullstack",
          ].map((tag, index) => (
            <button
              key={index}
              className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm rounded-full hover:bg-primary-100 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RecommendationCard;

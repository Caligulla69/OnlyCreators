// API import reserved for production use
// import api from "./api";
import mockTrends from "../data/mockTrends.json";
import mockInsights from "../data/mockInsights.json";

export const trendsService = {
  async getTrends(category = "all") {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // In production:
    // const response = await api.get('/trends', { params: { category } })
    // return response.data

    if (category === "all") {
      return mockTrends;
    }
    return mockTrends.filter((t) => t.category === category);
  },

  async getTrendDetails(trendId) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockTrends.find((t) => t.id === trendId) || null;
  },

  async getContentGaps() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockTrends.filter((t) => !t.covered);
  },

  async getInsights(category = "all") {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (category === "all") {
      return mockInsights;
    }
    return mockInsights.filter((i) => i.category === category);
  },

  async applyInsight(_insightId) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, message: "Insight applied successfully" };
  },

  async dismissInsight(_insightId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true };
  },

  async getRecommendations() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      postingTimes: [
        { day: "Tuesday", hour: "2 PM", score: 95 },
        { day: "Thursday", hour: "6 PM", score: 88 },
        { day: "Saturday", hour: "10 AM", score: 82 },
      ],
      contentTips: [
        { category: "Thumbnails", tip: "Use faces for 3x more clicks" },
        { category: "Titles", tip: "Questions get 25% more engagement" },
        { category: "Length", tip: "8-12 minutes is optimal" },
      ],
      suggestedTags: [
        "react tutorial",
        "web development",
        "javascript",
        "coding tips",
        "programming",
        "frontend",
        "tech",
        "learn to code",
      ],
    };
  },

  async bookmarkTrend(_trendId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true };
  },

  async searchTrends(query) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockTrends.filter(
      (t) =>
        t.topic.toLowerCase().includes(query.toLowerCase()) ||
        t.hashtags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase()),
        ),
    );
  },
};

export default trendsService;

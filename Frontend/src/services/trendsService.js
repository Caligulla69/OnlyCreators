import api from "./api";

export const trendsService = {
  async getTrends(category = "all") {
    try {
      const response = await api.get("/trends", {
        params: { category },
      });
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch trends:", error);
      throw error;
    }
  },

  async getTrendDetails(trendId) {
    try {
      const response = await api.get(`/trends/${trendId}`);
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch trend details:", error);
      throw error;
    }
  },

  async getContentGaps() {
    try {
      const response = await api.get("/trends/content-gaps");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch content gaps:", error);
      throw error;
    }
  },

  async getInsights(category = "all") {
    try {
      const response = await api.get("/trends/insights", {
        params: { category },
      });
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch insights:", error);
      throw error;
    }
  },

  async applyInsight(insightId) {
    try {
      const response = await api.post(`/trends/insights/${insightId}/apply`);
      return response.data;
    } catch (error) {
      console.error("Failed to apply insight:", error);
      throw error;
    }
  },

  async dismissInsight(insightId) {
    try {
      const response = await api.post(`/trends/insights/${insightId}/dismiss`);
      return response.data;
    } catch (error) {
      console.error("Failed to dismiss insight:", error);
      throw error;
    }
  },

  async getRecommendations() {
    try {
      const response = await api.get("/trends/recommendations");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      throw error;
    }
  },

  async bookmarkTrend(trendId) {
    try {
      const response = await api.post(`/trends/${trendId}/bookmark`);
      return response.data;
    } catch (error) {
      console.error("Failed to bookmark trend:", error);
      throw error;
    }
  },

  async searchTrends(query) {
    try {
      const response = await api.get("/trends/search", {
        params: { q: query },
      });
      return response.data.data;
    } catch (error) {
      console.error("Failed to search trends:", error);
      throw error;
    }
  },
};

export default trendsService;

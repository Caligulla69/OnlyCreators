import api from "./api";

export const analyticsService = {
  /**
   * Get overview analytics data
   * @param {string} dateRange - Date range filter (7d, 30d, 90d, 1y, all)
   * @returns {Promise<Object>} Analytics overview data
   */
  async getOverview(dateRange = "30d") {
    try {
      const response = await api.get("/analytics/overview", {
        params: { dateRange },
      });
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch analytics overview:", error);
      throw error;
    }
  },

  /**
   * Get video performance data
   * @param {Object} options - Query options
   * @param {string} options.sortBy - Sort field (views, likes, engagement)
   * @param {string} options.order - Sort order (asc, desc)
   * @param {number} options.limit - Number of results
   * @returns {Promise<Array>} Video performance data
   */
  async getVideos({ sortBy = "views", order = "desc", limit = 10 } = {}) {
    try {
      const response = await api.get("/analytics/videos", {
        params: { sortBy, order, limit },
      });
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      throw error;
    }
  },

  /**
   * Get single video analytics
   * @param {string} videoId - Video ID
   * @returns {Promise<Object>} Video analytics data
   */
  async getVideoAnalytics(videoId) {
    try {
      const response = await api.get(`/analytics/videos/${videoId}`);
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch video analytics:", error);
      throw error;
    }
  },

  /**
   * Get audience demographics data
   * @returns {Promise<Object>} Demographics data
   */
  async getDemographics() {
    try {
      const response = await api.get("/analytics/demographics");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch demographics:", error);
      throw error;
    }
  },

  /**
   * Get views over time data
   * @param {string} dateRange - Date range filter
   * @returns {Promise<Array>} Views time series data
   */
  async getViewsOverTime(dateRange = "30d") {
    try {
      const response = await api.get("/analytics/views-over-time", {
        params: { dateRange },
      });
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch views over time:", error);
      throw error;
    }
  },

  /**
   * Get engagement breakdown data
   * @returns {Promise<Object>} Engagement breakdown (likes, comments, shares)
   */
  async getEngagementBreakdown() {
    try {
      const response = await api.get("/analytics/engagement");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch engagement breakdown:", error);
      throw error;
    }
  },

  /**
   * Get peak hours heatmap data
   * @returns {Promise<Array>} 24x7 matrix of engagement levels
   */
  async getPeakHours() {
    try {
      const response = await api.get("/analytics/peak-hours");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch peak hours:", error);
      throw error;
    }
  },

  /**
   * Get real-time analytics
   * @returns {Promise<Object>} Real-time stats
   */
  async getRealTimeStats() {
    try {
      const response = await api.get("/analytics/realtime");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch real-time stats:", error);
      throw error;
    }
  },

  /**
   * Export analytics report
   * @param {string} format - Export format (csv, pdf, xlsx)
   * @param {string} dateRange - Date range for report
   * @returns {Promise<Object>} Export result
   */
  async exportReport(format = "csv", dateRange = "30d") {
    try {
      const response = await api.get("/analytics/export", {
        params: { format, dateRange },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to export report:", error);
      throw error;
    }
  },

  /**
   * Compare analytics between two periods
   * @param {string} period1 - First period (e.g., "2025-01-01:2025-01-15")
   * @param {string} period2 - Second period (e.g., "2025-01-16:2025-01-30")
   * @returns {Promise<Object>} Comparison data
   */
  async comparePeriods(period1, period2) {
    try {
      const response = await api.get("/analytics/compare", {
        params: { period1, period2 },
      });
      return response.data.data;
    } catch (error) {
      console.error("Failed to compare periods:", error);
      throw error;
    }
  },
};

export default analyticsService;

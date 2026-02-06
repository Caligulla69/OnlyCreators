// API import reserved for production use
// import api from "./api";
import mockAnalytics from "../data/mockAnalytics.json";
import mockVideos from "../data/mockVideos.json";

export const analyticsService = {
  /**
   * Get overview analytics data
   * @param {string} dateRange - Date range filter (7d, 30d, 90d, 1y, all)
   * @returns {Promise<Object>} Analytics overview data
   */
  async getOverview(_dateRange = "30d") {
    try {
      // In production, this would be:
      // const response = await api.get('/analytics/overview', { params: { dateRange: _dateRange } });
      // return response.data;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Generate sparkline data based on date range
      const generateSparkline = (base, variance) => {
        return Array.from({ length: 7 }, (_, i) =>
          Math.floor(base + Math.random() * variance + (i * variance) / 7),
        );
      };

      return {
        ...mockAnalytics,
        viewsSparkline: generateSparkline(100, 50),
        subscribersSparkline: generateSparkline(80, 30),
        engagementSparkline: generateSparkline(60, 20),
        watchTimeSparkline: generateSparkline(70, 40),
      };
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
      // In production:
      // const response = await api.get('/analytics/videos', { params: { sortBy, order, limit } });
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 400));

      let videos = [...mockVideos];

      // Sort videos
      videos.sort((a, b) => {
        const aVal = a[sortBy] || 0;
        const bVal = b[sortBy] || 0;
        return order === "desc" ? bVal - aVal : aVal - bVal;
      });

      return videos.slice(0, limit);
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
      // In production:
      // const response = await api.get(`/analytics/videos/${videoId}`);
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 300));

      const video = mockVideos.find((v) => v.id === videoId);
      if (!video) {
        throw new Error("Video not found");
      }

      return {
        ...video,
        hourlyViews: Array.from({ length: 24 }, () =>
          Math.floor(Math.random() * 1000),
        ),
        trafficSources: [
          { source: "YouTube Search", percentage: 45 },
          { source: "Suggested Videos", percentage: 30 },
          { source: "External", percentage: 15 },
          { source: "Direct", percentage: 10 },
        ],
        demographics: mockAnalytics.demographicData,
      };
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
      // In production:
      // const response = await api.get('/analytics/demographics');
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockAnalytics.demographicData;
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
  async getViewsOverTime(_dateRange = "30d") {
    try {
      // In production:
      // const response = await api.get('/analytics/views-over-time', { params: { dateRange: _dateRange } });
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 400));
      return mockAnalytics.viewsOverTime;
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
      // In production:
      // const response = await api.get('/analytics/engagement');
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockAnalytics.engagementBreakdown;
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
      // In production:
      // const response = await api.get('/analytics/peak-hours');
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockAnalytics.peakHours;
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
      // In production:
      // const response = await api.get('/analytics/realtime');
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 200));

      return {
        activeViewers: Math.floor(Math.random() * 500) + 100,
        viewsLastHour: Math.floor(Math.random() * 5000) + 1000,
        topVideo: mockVideos[0],
        recentComments: Math.floor(Math.random() * 50) + 10,
      };
    } catch (error) {
      console.error("Failed to fetch real-time stats:", error);
      throw error;
    }
  },

  /**
   * Export analytics report
   * @param {string} format - Export format (csv, pdf, xlsx)
   * @param {string} dateRange - Date range for report
   * @returns {Promise<Blob>} Report file blob
   */
  async exportReport(format = "csv", _dateRange = "30d") {
    try {
      // In production:
      // const response = await api.get('/analytics/export', {
      //   params: { format, dateRange: _dateRange },
      //   responseType: 'blob'
      // });
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo, return a mock success
      return {
        success: true,
        message: `Report exported as ${format.toUpperCase()}`,
      };
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
  async comparePeriods(_period1, _period2) {
    try {
      // In production:
      // const response = await api.get('/analytics/compare', { params: { period1: _period1, period2: _period2 } });
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 600));

      return {
        period1: {
          views: 1000000,
          subscribers: 42000,
          engagement: 6.5,
          watchTime: 7500,
        },
        period2: {
          views: 1247500,
          subscribers: 45200,
          engagement: 6.8,
          watchTime: 8547,
        },
        changes: {
          views: 24.75,
          subscribers: 7.62,
          engagement: 4.62,
          watchTime: 13.96,
        },
      };
    } catch (error) {
      console.error("Failed to compare periods:", error);
      throw error;
    }
  },
};

export default analyticsService;

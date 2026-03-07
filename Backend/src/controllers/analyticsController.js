const Analytics = require("../models/Analytics");
const Video = require("../models/Video");

/**
 * @desc    Get analytics overview (dashboard main data)
 * @route   GET /api/analytics/overview
 * @access  Private
 */
const getOverview = async (req, res, next) => {
  try {
    const dateRange = req.query.dateRange || "30d";
    const userId = req.user.id;

    // Find analytics for this user and date range
    let analytics = await Analytics.findOne({ userId, dateRange });

    // If no analytics found for this specific range, try the default 30d
    if (!analytics) {
      analytics = await Analytics.findOne({ userId, dateRange: "30d" });
    }

    // If still no analytics, return empty data
    if (!analytics) {
      return res.status(200).json({
        success: true,
        data: {
          totalViews: 0,
          viewsChange: 0,
          totalSubscribers: 0,
          subscribersChange: 0,
          engagementRate: 0,
          engagementChange: 0,
          watchTimeHours: 0,
          watchTimeChange: 0,
          averageViewDuration: "0:00",
          impressions: 0,
          impressionsChange: 0,
          clickThroughRate: 0,
          ctrChange: 0,
          viewsOverTime: [],
          engagementBreakdown: { likes: 0, comments: 0, shares: 0 },
          demographicData: {
            ageGroups: [],
            gender: [],
            topCountries: [],
            devices: [],
          },
          peakHours: [],
          viewsSparkline: [],
          subscribersSparkline: [],
          engagementSparkline: [],
          watchTimeSparkline: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      data: analytics.toOverviewJSON(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all videos with sorting and pagination
 * @route   GET /api/analytics/videos
 * @access  Private
 */
const getVideos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sortBy = "views", order = "desc", limit = 10 } = req.query;

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = order === "desc" ? -1 : 1;

    const videos = await Video.find({ userId })
      .sort(sortObj)
      .limit(parseInt(limit, 10));

    const formattedVideos = videos.map((video) => video.toVideoJSON());

    res.status(200).json({
      success: true,
      count: formattedVideos.length,
      data: formattedVideos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single video detailed analytics
 * @route   GET /api/analytics/videos/:videoId
 * @access  Private
 */
const getVideoAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { videoId } = req.params;

    const video = await Video.findOne({ userId, videoId });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found.",
      });
    }

    // Get demographics from analytics for this user
    const analytics = await Analytics.findOne({ userId });
    const demographicData = analytics ? analytics.demographicData : null;

    res.status(200).json({
      success: true,
      data: video.toDetailedJSON(demographicData),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get audience demographics data
 * @route   GET /api/analytics/demographics
 * @access  Private
 */
const getDemographics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const analytics = await Analytics.findOne({ userId });

    if (!analytics) {
      return res.status(200).json({
        success: true,
        data: {
          ageGroups: [],
          gender: [],
          topCountries: [],
          devices: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      data: analytics.demographicData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get views over time data
 * @route   GET /api/analytics/views-over-time
 * @access  Private
 */
const getViewsOverTime = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const dateRange = req.query.dateRange || "30d";

    let analytics = await Analytics.findOne({ userId, dateRange });
    if (!analytics) {
      analytics = await Analytics.findOne({ userId });
    }

    if (!analytics) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: analytics.viewsOverTime,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get engagement breakdown (likes, comments, shares percentages)
 * @route   GET /api/analytics/engagement
 * @access  Private
 */
const getEngagementBreakdown = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const analytics = await Analytics.findOne({ userId });

    if (!analytics) {
      return res.status(200).json({
        success: true,
        data: { likes: 0, comments: 0, shares: 0 },
      });
    }

    res.status(200).json({
      success: true,
      data: analytics.engagementBreakdown,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get peak hours heatmap data (24x7 matrix)
 * @route   GET /api/analytics/peak-hours
 * @access  Private
 */
const getPeakHours = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const analytics = await Analytics.findOne({ userId });

    if (!analytics) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: analytics.peakHours,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get real-time analytics (simulated)
 * @route   GET /api/analytics/realtime
 * @access  Private
 */
const getRealTimeStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get the top video for this user
    const topVideo = await Video.findOne({ userId }).sort({ views: -1 });

    const realtimeData = {
      activeViewers: Math.floor(Math.random() * 500) + 100,
      viewsLastHour: Math.floor(Math.random() * 5000) + 1000,
      topVideo: topVideo ? topVideo.toVideoJSON() : null,
      recentComments: Math.floor(Math.random() * 50) + 10,
    };

    res.status(200).json({
      success: true,
      data: realtimeData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Export analytics report (simulated)
 * @route   GET /api/analytics/export
 * @access  Private
 */
const exportReport = async (req, res, next) => {
  try {
    const { format = "csv" } = req.query;

    // In a real app, this would generate and return an actual file
    // For demo purposes, we return a success message
    res.status(200).json({
      success: true,
      message: `Report exported as ${format.toUpperCase()}`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Compare analytics between two periods
 * @route   GET /api/analytics/compare
 * @access  Private
 */
const comparePeriods = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get analytics for the user
    const analytics = await Analytics.findOne({ userId });

    if (!analytics) {
      return res.status(200).json({
        success: true,
        data: {
          period1: { views: 0, subscribers: 0, engagement: 0, watchTime: 0 },
          period2: { views: 0, subscribers: 0, engagement: 0, watchTime: 0 },
          changes: { views: 0, subscribers: 0, engagement: 0, watchTime: 0 },
        },
      });
    }

    // For demo, generate comparison data based on current analytics
    const period1 = {
      views: Math.floor(analytics.totalViews * 0.8),
      subscribers: Math.floor(analytics.totalSubscribers * 0.93),
      engagement: parseFloat((analytics.engagementRate * 0.95).toFixed(1)),
      watchTime: Math.floor(analytics.watchTimeHours * 0.88),
    };

    const period2 = {
      views: analytics.totalViews,
      subscribers: analytics.totalSubscribers,
      engagement: analytics.engagementRate,
      watchTime: analytics.watchTimeHours,
    };

    const changes = {
      views: parseFloat(
        (((period2.views - period1.views) / period1.views) * 100).toFixed(2)
      ),
      subscribers: parseFloat(
        (
          ((period2.subscribers - period1.subscribers) / period1.subscribers) *
          100
        ).toFixed(2)
      ),
      engagement: parseFloat(
        (
          ((period2.engagement - period1.engagement) / period1.engagement) *
          100
        ).toFixed(2)
      ),
      watchTime: parseFloat(
        (
          ((period2.watchTime - period1.watchTime) / period1.watchTime) *
          100
        ).toFixed(2)
      ),
    };

    res.status(200).json({
      success: true,
      data: {
        period1,
        period2,
        changes,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview,
  getVideos,
  getVideoAnalytics,
  getDemographics,
  getViewsOverTime,
  getEngagementBreakdown,
  getPeakHours,
  getRealTimeStats,
  exportReport,
  comparePeriods,
};

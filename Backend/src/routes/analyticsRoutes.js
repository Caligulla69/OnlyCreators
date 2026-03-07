const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
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
} = require("../controllers/analyticsController");

// All analytics routes require authentication
router.use(protect);

// Overview & main dashboard data
router.get("/overview", getOverview);

// Video analytics
router.get("/videos", getVideos);
router.get("/videos/:videoId", getVideoAnalytics);

// Audience demographics
router.get("/demographics", getDemographics);

// Views over time (time series)
router.get("/views-over-time", getViewsOverTime);

// Engagement breakdown
router.get("/engagement", getEngagementBreakdown);

// Peak hours heatmap
router.get("/peak-hours", getPeakHours);

// Real-time stats
router.get("/realtime", getRealTimeStats);

// Export report
router.get("/export", exportReport);

// Compare periods
router.get("/compare", comparePeriods);

module.exports = router;

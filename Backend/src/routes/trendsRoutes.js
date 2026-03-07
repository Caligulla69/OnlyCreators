const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getTrends,
  getTrendDetails,
  getContentGaps,
  getInsights,
  applyInsight,
  dismissInsight,
  getRecommendations,
  bookmarkTrend,
  searchTrends,
} = require("../controllers/trendsController");

// All trends routes require authentication
router.use(protect);

// Search trends (must be before :trendId to avoid conflict)
router.get("/search", searchTrends);

// Content gaps (uncovered trends)
router.get("/content-gaps", getContentGaps);

// Insights
router.get("/insights", getInsights);
router.post("/insights/:insightId/apply", applyInsight);
router.post("/insights/:insightId/dismiss", dismissInsight);

// Recommendations
router.get("/recommendations", getRecommendations);

// Trends CRUD
router.get("/", getTrends);
router.get("/:trendId", getTrendDetails);

// Bookmark a trend
router.post("/:trendId/bookmark", bookmarkTrend);

module.exports = router;

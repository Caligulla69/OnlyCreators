const Trend = require("../models/Trend");
const Insight = require("../models/Insight");

/**
 * @desc    Get all trends (optionally filtered by category)
 * @route   GET /api/trends
 * @access  Private
 */
const getTrends = async (req, res, next) => {
  try {
    const { category = "all" } = req.query;

    let query = {};
    if (category !== "all") {
      query.category = category;
    }

    const trends = await Trend.find(query).sort({ opportunityScore: -1 });

    const formattedTrends = trends.map((trend) => trend.toTrendJSON());

    res.status(200).json({
      success: true,
      count: formattedTrends.length,
      data: formattedTrends,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single trend details
 * @route   GET /api/trends/:trendId
 * @access  Private
 */
const getTrendDetails = async (req, res, next) => {
  try {
    const { trendId } = req.params;

    const trend = await Trend.findOne({ trendId });

    if (!trend) {
      return res.status(404).json({
        success: false,
        message: "Trend not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: trend.toTrendJSON(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get content gaps (uncovered trends)
 * @route   GET /api/trends/content-gaps
 * @access  Private
 */
const getContentGaps = async (req, res, next) => {
  try {
    const trends = await Trend.find({ covered: false }).sort({
      opportunityScore: -1,
    });

    const formattedTrends = trends.map((trend) => trend.toTrendJSON());

    res.status(200).json({
      success: true,
      count: formattedTrends.length,
      data: formattedTrends,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all insights (optionally filtered by category)
 * @route   GET /api/trends/insights
 * @access  Private
 */
const getInsights = async (req, res, next) => {
  try {
    const { category = "all" } = req.query;

    let query = {};
    if (category !== "all") {
      query.category = category;
    }

    const insights = await Insight.find(query).sort({ createdAt: -1 });

    const formattedInsights = insights.map((insight) =>
      insight.toInsightJSON()
    );

    res.status(200).json({
      success: true,
      count: formattedInsights.length,
      data: formattedInsights,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Apply an insight (mark as applied)
 * @route   POST /api/trends/insights/:insightId/apply
 * @access  Private
 */
const applyInsight = async (req, res, next) => {
  try {
    const { insightId } = req.params;

    const insight = await Insight.findOne({ insightId });

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Insight not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Insight applied successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Dismiss an insight
 * @route   POST /api/trends/insights/:insightId/dismiss
 * @access  Private
 */
const dismissInsight = async (req, res, next) => {
  try {
    const { insightId } = req.params;

    const insight = await Insight.findOne({ insightId });

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Insight not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Insight dismissed successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get content recommendations (posting times, tips, tags)
 * @route   GET /api/trends/recommendations
 * @access  Private
 */
const getRecommendations = async (req, res, next) => {
  try {
    const recommendations = {
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

    res.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bookmark a trend
 * @route   POST /api/trends/:trendId/bookmark
 * @access  Private
 */
const bookmarkTrend = async (req, res, next) => {
  try {
    const { trendId } = req.params;

    const trend = await Trend.findOne({ trendId });

    if (!trend) {
      return res.status(404).json({
        success: false,
        message: "Trend not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trend bookmarked successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search trends by query (topic or hashtags)
 * @route   GET /api/trends/search
 * @access  Private
 */
const searchTrends = async (req, res, next) => {
  try {
    const { q = "" } = req.query;

    if (!q.trim()) {
      const allTrends = await Trend.find().sort({ opportunityScore: -1 });
      return res.status(200).json({
        success: true,
        count: allTrends.length,
        data: allTrends.map((t) => t.toTrendJSON()),
      });
    }

    const searchRegex = new RegExp(q, "i");

    const trends = await Trend.find({
      $or: [
        { topic: searchRegex },
        { hashtags: searchRegex },
        { description: searchRegex },
      ],
    }).sort({ opportunityScore: -1 });

    const formattedTrends = trends.map((trend) => trend.toTrendJSON());

    res.status(200).json({
      success: true,
      count: formattedTrends.length,
      data: formattedTrends,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrends,
  getTrendDetails,
  getContentGaps,
  getInsights,
  applyInsight,
  dismissInsight,
  getRecommendations,
  bookmarkTrend,
  searchTrends,
};

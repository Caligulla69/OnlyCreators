const mongoose = require("mongoose");

const RelatedVideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    views: { type: String, required: true },
  },
  { _id: false }
);

const TrendSchema = new mongoose.Schema(
  {
    trendId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    topic: {
      type: String,
      required: [true, "Trend topic is required"],
      trim: true,
      maxlength: [200, "Topic cannot exceed 200 characters"],
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Technology",
        "Lifestyle",
        "Content Creation",
        "Gaming",
        "Education",
      ],
      default: "Technology",
    },
    strength: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    hashtags: {
      type: [String],
      default: [],
    },
    growthData: {
      type: [Number],
      default: [],
    },
    opportunityScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    searchVolume: {
      type: String,
      default: "0",
    },
    relatedVideos: {
      type: [RelatedVideoSchema],
      default: [],
    },
    description: {
      type: String,
      default: "",
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    covered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for faster queries
TrendSchema.index({ category: 1 });
TrendSchema.index({ strength: 1 });
TrendSchema.index({ opportunityScore: -1 });
TrendSchema.index({ covered: 1 });

// Return formatted trend JSON
TrendSchema.methods.toTrendJSON = function () {
  return {
    id: this.trendId,
    topic: this.topic,
    category: this.category,
    strength: this.strength,
    hashtags: this.hashtags,
    growthData: this.growthData,
    opportunityScore: this.opportunityScore,
    searchVolume: this.searchVolume,
    relatedVideos: this.relatedVideos,
    description: this.description,
    covered: this.covered,
  };
};

module.exports = mongoose.model("Trend", TrendSchema);

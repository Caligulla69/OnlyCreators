const mongoose = require("mongoose");

const InsightSchema = new mongoose.Schema(
  {
    insightId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Performance", "Audience", "Trends", "Optimization"],
      default: "Performance",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    icon: {
      type: String,
      default: "TrendingUp",
    },
    title: {
      type: String,
      required: [true, "Insight title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Insight message is required"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    actionable: {
      type: Boolean,
      default: true,
    },
    actions: {
      type: [String],
      default: [],
    },
    impact: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for faster queries
InsightSchema.index({ category: 1 });
InsightSchema.index({ priority: 1 });
InsightSchema.index({ createdAt: -1 });

// Return formatted insight JSON
InsightSchema.methods.toInsightJSON = function () {
  return {
    id: this.insightId,
    category: this.category,
    priority: this.priority,
    icon: this.icon,
    title: this.title,
    message: this.message,
    actionable: this.actionable,
    actions: this.actions,
    impact: this.impact,
    createdAt: this.createdAt.toISOString(),
  };
};

module.exports = mongoose.model("Insight", InsightSchema);

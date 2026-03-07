const mongoose = require("mongoose");

const ViewsOverTimeSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    views: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const EngagementBreakdownSchema = new mongoose.Schema(
  {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
  },
  { _id: false }
);

const AgeGroupSchema = new mongoose.Schema(
  {
    range: { type: String, required: true },
    percentage: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const GenderSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    percentage: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const CountrySchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    percentage: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const DeviceSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    percentage: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const DemographicDataSchema = new mongoose.Schema(
  {
    ageGroups: [AgeGroupSchema],
    gender: [GenderSchema],
    topCountries: [CountrySchema],
    devices: [DeviceSchema],
  },
  { _id: false }
);

const AnalyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // Overview metrics
    totalViews: {
      type: Number,
      default: 0,
    },
    viewsChange: {
      type: Number,
      default: 0,
    },
    totalSubscribers: {
      type: Number,
      default: 0,
    },
    subscribersChange: {
      type: Number,
      default: 0,
    },
    engagementRate: {
      type: Number,
      default: 0,
    },
    engagementChange: {
      type: Number,
      default: 0,
    },
    watchTimeHours: {
      type: Number,
      default: 0,
    },
    watchTimeChange: {
      type: Number,
      default: 0,
    },
    averageViewDuration: {
      type: String,
      default: "0:00",
    },
    impressions: {
      type: Number,
      default: 0,
    },
    impressionsChange: {
      type: Number,
      default: 0,
    },
    clickThroughRate: {
      type: Number,
      default: 0,
    },
    ctrChange: {
      type: Number,
      default: 0,
    },

    // Time series data
    viewsOverTime: [ViewsOverTimeSchema],

    // Engagement breakdown
    engagementBreakdown: EngagementBreakdownSchema,

    // Demographic data
    demographicData: DemographicDataSchema,

    // Peak hours heatmap - 24x7 matrix (24 hours x 7 days)
    peakHours: {
      type: [[Number]],
      default: [],
    },

    // Date range this analytics snapshot covers
    dateRange: {
      type: String,
      enum: ["7d", "30d", "90d", "1y", "all"],
      default: "30d",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index for faster lookups by user and date range
AnalyticsSchema.index({ userId: 1, dateRange: 1 });

// Virtual for generating sparkline data on the fly
AnalyticsSchema.methods.generateSparklines = function () {
  const generateSparkline = (base, variance) => {
    return Array.from({ length: 7 }, (_, i) =>
      Math.floor(base + Math.random() * variance + (i * variance) / 7)
    );
  };

  return {
    viewsSparkline: generateSparkline(100, 50),
    subscribersSparkline: generateSparkline(80, 30),
    engagementSparkline: generateSparkline(60, 20),
    watchTimeSparkline: generateSparkline(70, 40),
  };
};

// Return formatted analytics overview
AnalyticsSchema.methods.toOverviewJSON = function () {
  const sparklines = this.generateSparklines();

  return {
    totalViews: this.totalViews,
    viewsChange: this.viewsChange,
    totalSubscribers: this.totalSubscribers,
    subscribersChange: this.subscribersChange,
    engagementRate: this.engagementRate,
    engagementChange: this.engagementChange,
    watchTimeHours: this.watchTimeHours,
    watchTimeChange: this.watchTimeChange,
    averageViewDuration: this.averageViewDuration,
    impressions: this.impressions,
    impressionsChange: this.impressionsChange,
    clickThroughRate: this.clickThroughRate,
    ctrChange: this.ctrChange,
    viewsOverTime: this.viewsOverTime,
    engagementBreakdown: this.engagementBreakdown,
    demographicData: this.demographicData,
    peakHours: this.peakHours,
    ...sparklines,
  };
};

module.exports = mongoose.model("Analytics", AnalyticsSchema);

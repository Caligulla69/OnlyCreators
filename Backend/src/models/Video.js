const mongoose = require("mongoose");

const TrafficSourceSchema = new mongoose.Schema(
  {
    source: { type: String, required: true },
    percentage: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    videoId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Video title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    thumbnail: {
      type: String,
      default: "",
    },
    publishedAt: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: {
      type: Number,
      default: 0,
      min: 0,
    },
    shares: {
      type: Number,
      default: 0,
      min: 0,
    },
    engagementRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    watchTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    avgViewDuration: {
      type: String,
      default: "0:00",
    },
    status: {
      type: String,
      enum: ["published", "draft", "unlisted", "private", "scheduled"],
      default: "published",
    },
    trafficSources: {
      type: [TrafficSourceSchema],
      default: [
        { source: "YouTube Search", percentage: 45 },
        { source: "Suggested Videos", percentage: 30 },
        { source: "External", percentage: 15 },
        { source: "Direct", percentage: 10 },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index for user videos sorted by published date
VideoSchema.index({ userId: 1, publishedAt: -1 });
VideoSchema.index({ userId: 1, views: -1 });
VideoSchema.index({ userId: 1, engagementRate: -1 });

// Generate hourly views data dynamically for detailed analytics
VideoSchema.methods.generateHourlyViews = function () {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 1000));
};

// Return formatted video JSON
VideoSchema.methods.toVideoJSON = function () {
  return {
    id: this.videoId,
    title: this.title,
    thumbnail: this.thumbnail,
    publishedAt: this.publishedAt,
    views: this.views,
    likes: this.likes,
    comments: this.comments,
    shares: this.shares,
    engagementRate: this.engagementRate,
    watchTime: this.watchTime,
    avgViewDuration: this.avgViewDuration,
    status: this.status,
  };
};

// Return detailed video analytics JSON
VideoSchema.methods.toDetailedJSON = function (demographicData) {
  return {
    id: this.videoId,
    title: this.title,
    thumbnail: this.thumbnail,
    publishedAt: this.publishedAt,
    views: this.views,
    likes: this.likes,
    comments: this.comments,
    shares: this.shares,
    engagementRate: this.engagementRate,
    watchTime: this.watchTime,
    avgViewDuration: this.avgViewDuration,
    status: this.status,
    hourlyViews: this.generateHourlyViews(),
    trafficSources: this.trafficSources,
    demographics: demographicData || null,
  };
};

module.exports = mongoose.model("Video", VideoSchema);

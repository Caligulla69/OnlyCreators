import { useState, useEffect, useCallback } from "react";
import analyticsService from "../services/analyticsService";

export const useAnalytics = (dateRange = "30d") => {
  const [analytics, setAnalytics] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch overview analytics and videos in parallel from the backend API
      const [overviewData, videosData] = await Promise.all([
        analyticsService.getOverview(dateRange),
        analyticsService.getVideos({
          sortBy: "views",
          order: "desc",
          limit: 10,
        }),
      ]);

      setAnalytics(overviewData);
      setVideos(videosData);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError("Failed to fetch analytics data");
      console.error("Analytics fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const refreshData = useCallback(async () => {
    await fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    videos,
    isLoading,
    error,
    lastUpdated,
    refreshData,
  };
};

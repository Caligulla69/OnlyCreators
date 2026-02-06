import { useState, useEffect, useCallback } from "react";
import mockAnalytics from "../data/mockAnalytics.json";
import mockVideos from "../data/mockVideos.json";

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate sparkline data
      const generateSparkline = (base, variance) => {
        return Array.from({ length: 7 }, (_, i) =>
          Math.floor(base + Math.random() * variance + (i * variance) / 7),
        );
      };

      const enhancedAnalytics = {
        ...mockAnalytics,
        viewsSparkline: generateSparkline(100, 50),
        subscribersSparkline: generateSparkline(80, 30),
        engagementSparkline: generateSparkline(60, 20),
        watchTimeSparkline: generateSparkline(70, 40),
      };

      setAnalytics(enhancedAnalytics);
      setVideos(mockVideos);
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

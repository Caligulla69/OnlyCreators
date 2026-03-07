import { useState, useEffect } from "react";
import trendsService from "../services/trendsService";

export const useTrends = () => {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchTrends = async () => {
      setIsLoading(true);
      try {
        const data = await trendsService.getTrends(category);
        setTrends(data);
        setError(null);
      } catch {
        setError("Failed to fetch trends data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrends();
  }, [category]);

  return {
    trends,
    isLoading,
    error,
    category,
    setCategory,
  };
};

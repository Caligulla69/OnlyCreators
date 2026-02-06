import { useState, useEffect } from "react";
import mockTrends from "../data/mockTrends.json";

export const useTrends = () => {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchTrends = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        let filteredTrends = mockTrends;
        if (category !== "all") {
          filteredTrends = mockTrends.filter((t) => t.category === category);
        }

        setTrends(filteredTrends);
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

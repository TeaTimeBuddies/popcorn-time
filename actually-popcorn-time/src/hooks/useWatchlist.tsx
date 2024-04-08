import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../constants";

interface UseWatchlistReturn {
  isWatchlisted: boolean;
  toggleWatchlist: () => Promise<void>;
}

export const useWatchlist = (movieId: string): UseWatchlistReturn => {
  const [isWatchlisted, setIsWatchlisted] = useState<boolean>(false);

  const checkWatchlistStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}user/watchlist/check/${movieId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setIsWatchlisted(data.isWatchlisted);
    } catch (error) {
      console.error("Error checking watchlist status:", error);
    }
  }, [movieId]);

  useEffect(() => {
    checkWatchlistStatus();
  }, [checkWatchlistStatus]);

  const toggleWatchlist = async (): Promise<void> => {
    try {
      const method = isWatchlisted ? "DELETE" : "POST";
      const response = await fetch(`${API_URL}user/watchlist/${movieId}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setIsWatchlisted(!isWatchlisted);
      } else {
        console.error("Failed to toggle watchlist:", response.status);
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  return { isWatchlisted, toggleWatchlist };
};

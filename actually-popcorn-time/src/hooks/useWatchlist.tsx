import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../constants";

interface UseWatchlistReturn {
  isWatchlisted: boolean;
  toggleWatchlist: () => Promise<void>;
}

export const useWatchlist = (movieId: string): UseWatchlistReturn => {
  const [isWatchlisted, setIsWatchlisted] = useState<boolean>(false);
  const token = sessionStorage.getItem("token");
  const checkWatchlistStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}user/watchlist/check/${movieId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("token in useWatchlist", token);
      const data = await response.json();
      setIsWatchlisted(data.isWatchlisted);
      console.log("status for watchlist button", data.isWatchlisted);
    } catch (error) {
      console.error("Error checking watchlist status:", error);
    }
  }, [movieId, token]);

  useEffect(() => {
    checkWatchlistStatus();
  }, [checkWatchlistStatus]);

  const toggleWatchlist = async (): Promise<void> => {
    try {
      const method = isWatchlisted ? "DELETE" : "POST";
      await fetch(`${API_URL}user/watchlist/${movieId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsWatchlisted(!isWatchlisted);
      console.log("status for watchlist button adding/deleting", isWatchlisted);
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  return { isWatchlisted, toggleWatchlist };
};

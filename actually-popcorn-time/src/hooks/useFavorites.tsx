import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../constants";

interface UseFavoritesReturn {
  isFavorited: boolean;
  toggleFavorite: () => Promise<void>;
}

export const useFavorites = (movieId: string): UseFavoritesReturn => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const token = sessionStorage.getItem("token");
  const checkFavoriteStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}user/favorites/check/${movieId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("token in useFavorites", token);
      const data = await response.json();
      setIsFavorited(data.isFavorited);
      console.log("status for favorite button", data.isFavorited);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  }, [movieId, token]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const toggleFavorite = async (): Promise<void> => {
    try {
      const method = isFavorited ? "DELETE" : "POST";
      await fetch(`${API_URL}user/favorites/${movieId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsFavorited(!isFavorited);
      console.log("status for favorite button adding/deleting", isFavorited);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return { isFavorited, toggleFavorite };
};

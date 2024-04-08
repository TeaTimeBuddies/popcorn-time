import { useState, useEffect, useCallback } from "react";

interface UseFavoritesReturn {
  isFavorited: boolean;
  toggleFavorite: () => Promise<void>;
}

export const useFavorites = (movieId: string): UseFavoritesReturn => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const apiUrl: string = import.meta.env.VITE_API_URL;

  const checkFavoriteStatus = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}user/favorites/check/${movieId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setIsFavorited(data.isFavorited);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  }, [movieId, apiUrl]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const toggleFavorite = async (): Promise<void> => {
    try {
      const method = isFavorited ? "DELETE" : "POST";
      await fetch(`${apiUrl}user/favorites/${movieId}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
      });

      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return { isFavorited, toggleFavorite };
};

import React, { useEffect, useState } from "react";
import GeneralLayout from "../../layouts/GeneralLayout";

interface UserDashboardPageProps {
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  director: string[];
  genre: string[];
  stars: string[];
  year: number;
  image: string | undefined;
}

const TableHeaders = ["", "Title", "Director", "Year", "Genre", "Stars"];

const UserDashboardPage: React.FC<UserDashboardPageProps> = ({ name }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${apiUrl}user/favorites`);
        if (response.ok) {
          const data = await response.json();
          setFavoriteMovies(data);
        } else {
          console.error("Failed to fetch favorite movies");
        }
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };

    const fetchWatchlist = async () => {
      try {
        const response = await fetch(`${apiUrl}user/watchlist`);
        if (response.ok) {
          const data = await response.json();
          setWatchlistMovies(data);
        } else {
          console.error("Failed to fetch watchlist movies");
        }
      } catch (error) {
        console.error("Error fetching watchlist movies:", error);
      }
    };

    fetchFavorites();
    fetchWatchlist();
  }, []);

  return (
    <GeneralLayout>
      <div className="flex flex-col">
        <h1 className="text-5xl">Hello, {name}!</h1>

        <h2 className="mt-8 text-3xl">Favorite Movies</h2>
        <ul>
          {favoriteMovies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>

        <h2 className="mt-8 text-3xl">Watchlist Movies</h2>
        <ul>
          {watchlistMovies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </GeneralLayout>
  );
};

export default UserDashboardPage;

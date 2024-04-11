import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GeneralLayout from "../layouts/GeneralLayout";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import useFetchWithToken from "../hooks/useToken";

const UserDashboardPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const {
    data: fetchedMovies,
    error: favoriteError,
    isLoading: favoriteLoading,
  } = useFetchWithToken(`${apiUrl}user/favorites/${id}`);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  useEffect(() => {
    if (fetchedMovies) {
      console.error(favoriteError);
      const favoriteMovies = fetchedMovies.map((movie: any) => ({
        ...movie,
        id: movie.id,
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        stars: movie.stars,
        year: movie.year,
        image: movie.image,
      }));
      setFavoriteMovies(favoriteMovies);
    }

    if (favoriteError) {
      console.error(favoriteError);
    }
  }, [favoriteError, favoriteError]);

  const {
    data: fetchedWatchlist,
    error: watchlistError,
    isLoading: watchlistLoading,
  } = useFetchWithToken(`${apiUrl}user/watchlist/${id}`);
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  useEffect(() => {
    if (fetchedWatchlist) {
      console.error(watchlistError);
      const watchlistMovies = fetchedWatchlist.map((movie: any) => ({
        ...movie,
        id: movie.id,
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        stars: movie.stars,
        year: movie.year,
        image: movie.image,
      }));
      setWatchlistMovies(watchlistMovies);
    }

    if (watchlistError) {
      console.error(watchlistError);
    }
  }, [watchlistError, watchlistError]);

  return (
    <GeneralLayout title={"User Dashboard"}>
      {favoriteError && <div>Error occurred while fetching data</div>}
      {favoriteLoading && <div>Loading...</div>}
      <h2 className="mt-8 text-3xl">Favorite Movies</h2>
      <ul>
        {Array.isArray(favoriteMovies) &&
          favoriteMovies.map((movie: any) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
      </ul>
    </GeneralLayout>
  );
};
export default UserDashboardPage;

import React, { useEffect, useState } from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import useFetchWithToken from "../../hooks/useToken";
import { Movie } from "../../pages/MoviesPage";

interface UserDashboardPageProps {
  name: string;
}

const UserDashboardPage: React.FC<UserDashboardPageProps> = ({ name }) => {
  const token = sessionStorage.getItem("token");

  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userID = sessionStorage.getItem("user_id");
      const apiCall = `${API_URL}user/${userID}/favorites`;
      console.log(apiCall);
      const response = await fetch(`${apiCall}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (data) {
        const movies = data.map((movie: Movie) => ({
          ...movie,
          director: movie.director,
          genre: movie.genre,
          stars: movie.stars,
        }))

        setFavoriteMovies(movies);
      };
    };

    const fetchWatchlist = async () => {
        const userID = sessionStorage.getItem("user_id")
        const response = await fetch(`${API_URL}user/${userID}/watchlist`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
        });
        
        const data = await response.json();
        if (data) {
          const movies = data.map((movie: Movie) => ({
            ...movie,
            director: movie.director,
            genre: movie.genre,
            stars: movie.stars,
          }))

          setWatchlistMovies(movies);
        };
    };

    fetchFavorites();
    fetchWatchlist();
  }, []);

  console.log(favoriteMovies);

  return (
    <GeneralLayout>
      <div className="flex flex-col">
        <h1 className="text-5xl">Hello, {name}!</h1>
        <h2 className="mt-8 text-3xl">Favorite Movies</h2>
        {favoriteMovies ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Director</th>
                  <th>Genre</th>
                  <th>Stars</th>
                </tr>
              </thead>
              <tbody>
                {favoriteMovies.map((fav: Movie) => (
                  <tr key={fav.id}>
                    <td>{fav.title}</td>
                    <td>{fav.director}</td>
                    <td>{fav.genre}</td>
                    <td>{fav.stars}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : ( 
          // While favoriteMovies is null, show loading message
          <p>Movie Loading...</p>
        )}

        <h2 className="mt-8 text-3xl">Watchlist Movies</h2>
        {watchlistMovies ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Director</th>
                  <th>Genre</th>
                  <th>Stars</th>
                </tr>
              </thead>
              <tbody>
                {watchlistMovies.map((watch: Movie) => (
                  <tr key={watch.id}>
                    <td>{watch.title}</td>
                    <td>{watch.director}</td>
                    <td>{watch.genre}</td>
                    <td>{watch.stars}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : ( 
          // While favoriteMovies is null, show loading message
          <p>Movie Loading...</p>
        )}

      </div>
    </GeneralLayout>
  );
};

export default UserDashboardPage;

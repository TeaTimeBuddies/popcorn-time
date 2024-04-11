import { useEffect, useState } from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import { API_URL } from "../../constants";
import { Movie } from "../../pages/MoviesPage";
import Loader from "../../components/Loader";

const UserDashboardPage = () => {
  const token = sessionStorage.getItem("token");

  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const userID = sessionStorage.getItem("user_id");
      const apiCall = `${API_URL}user/${userID}/favorites`;
      console.log(apiCall);
      const response = await fetch(`${apiCall}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data) {
        const movies = data.map((movie: Movie) => ({
          ...movie,
          director: movie.director,
          genre: movie.genre,
          stars: movie.stars,
        }));

        setFavoriteMovies(movies);
        setLoading(false);
      }
    };

    const fetchWatchlist = async () => {
      setLoading(true);
      const userID = sessionStorage.getItem("user_id");
      const response = await fetch(`${API_URL}user/${userID}/watchlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data) {
        const movies = data.map((movie: Movie) => ({
          ...movie,
          director: movie.director,
          genre: movie.genre,
          stars: movie.stars,
        }));

        setWatchlistMovies(movies);
        setLoading(false);
      }
    };

    fetchFavorites();
    fetchWatchlist();
  }, []);

  console.log(favoriteMovies);
  console.log(watchlistMovies);

  return (
    <GeneralLayout title={`Welcome back, ${sessionStorage.getItem("name")}`}>
      <div className="flex flex-col">
        <h2 className="my-8 text-3xl text-white">Favorite Movies</h2>
        {loading ? (
          <Loader text="Loading movies" />
        ) : (
          <>
            {favoriteMovies.length == 0 ? (
              <div className="my-10 text-primary">
                No movies added to watchlist yet
              </div>
            ) : (
              <div
                id="card"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              >
                {favoriteMovies.map((fav: Movie) => (
                  <a href={`/details/${fav.id}`} className="text-action">
                    <div className="card glass w-48">
                      <figure>
                        <img src={fav.image} alt="car!" />
                      </figure>
                      <div className="card-body flex h-32 flex-col items-center justify-center">
                        <h2 className="card-title text-center">{fav.title}</h2>
                        <p>{fav.year}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}

        <h2 className="my-8 text-3xl text-white">Watchlist Movies</h2>
        {loading ? (
          <Loader text="Loading movies" />
        ) : (
          <>
            {watchlistMovies.length == 0 ? (
              <div className="my-10 text-primary">
                No movies added to watchlist yet
              </div>
            ) : (
              <div
                id="card"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              >
                {watchlistMovies.map((m: Movie) => (
                  <a href={`/details/${m.id}`} className="text-action">
                    <div className="card glass w-48">
                      <figure>
                        <img src={m.image} alt="car!" />
                      </figure>
                      <div className="card-body flex h-32 flex-col items-center justify-center">
                        <h2 className="card-title text-center">{m.title}</h2>
                        <p>{m.year}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </GeneralLayout>
  );
};

export default UserDashboardPage;

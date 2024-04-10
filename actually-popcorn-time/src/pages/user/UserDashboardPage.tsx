import React, { useEffect, useState } from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import useFetchWithToken from "../../hooks/useToken";

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

const UserDashboardPage: React.FC<UserDashboardPageProps> = ({ name }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return null;
  }

  // const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  // const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);

  // useEffect(() => {
  //   const fetchFavorites = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}user/favorites`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setFavoriteMovies(data);
  //       } else {
  //         console.error("Failed to fetch favorite movies");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching favorite movies:", error);
  //     }
  //   };

  //   const fetchWatchlist = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}user/watchlist`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setWatchlistMovies(data);
  //       } else {
  //         console.error("Failed to fetch watchlist movies");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching watchlist movies:", error);
  //     }
  //   };

  //   fetchFavorites();
  //   fetchWatchlist();
  // }, []);

  const {
    data: favoriteMovies,
    error: favoriteError,
    isLoading: favoriteLoading,
  } = useFetchWithToken(`${API_URL}user/favorites`);
  const {
    data: watchlistMovies,
    error: watchlistError,
    isLoading: watchlistLoading,
  } = useFetchWithToken(`${API_URL}user/watchlist`);

  if (favoriteLoading || watchlistLoading) {
    return <div>Loading...</div>;
  }

  if (favoriteError || watchlistError) {
    return <div>Error occurred while fetching data</div>;
  }

  //   return (
  //     <GeneralLayout>
  //       <div className="flex flex-col">
  //         <h1 className="text-5xl">Hello, {name}!</h1>

  //         <h2 className="mt-8 text-3xl">Favorite Movies</h2>
  //         <ul>
  //           {favoriteMovies.map((movie) => (
  //             <li key={movie.id}>{movie.title}</li>
  //           ))}
  //         </ul>

  //         <h2 className="mt-8 text-3xl">Watchlist Movies</h2>
  //         <ul>
  //           {watchlistMovies.map((movie) => (
  //             <li key={movie.id}>{movie.title}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     </GeneralLayout>
  //   );
  // };

  return (
    <GeneralLayout>
      <div className="flex flex-col">
        <h1 className="text-5xl">Hello, {name}!</h1>

        {/* <h2 className="mt-8 text-3xl">Favorite Movies</h2>
        <ul>
          {favoriteMovies.map((movie: Movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>

        <h2 className="mt-8 text-3xl">Watchlist Movies</h2>
        <ul>
          {watchlistMovies.map((movie: Movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul> */}

        <h2 className="mt-8 text-3xl">Favorite Movies</h2>
        <ul>
          {Array.isArray(favoriteMovies) &&
            favoriteMovies.map((movie: Movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
        </ul>

        <h2 className="mt-8 text-3xl">Watchlist Movies</h2>
        <ul>
          {Array.isArray(watchlistMovies) &&
            watchlistMovies.map((movie: Movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
        </ul>
      </div>
    </GeneralLayout>
  );
};

export default UserDashboardPage;

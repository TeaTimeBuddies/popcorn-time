import ActionButton from "../components/ActionButton";
import WatchlistActionButton from "../components/WatchlistButton";
import { useNavigate } from "react-router-dom";
import { Movie } from "../pages/MoviesPage";
import { API_URL } from "../constants";
import { useState, useEffect, useCallback } from "react";

type MovieDetailLayoutProps = {
  movie?: Movie;
  movieRating?: number;
  onClickReviews: () => void;
  openReview: () => void;
};

const MovieDetailLayout = ({
  movie,
  movieRating,
  onClickReviews,
  openReview,
}: MovieDetailLayoutProps) => {
  const navigate = useNavigate();

  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isWatchlisted, setIsWatchlisted] = useState<boolean>(false);
const token = sessionStorage.getItem("token");
const addMovieWatchlist = async (movieId: number) => {
  const response = await fetch(`${API_URL}user/watchlist`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movie_id: movieId,
        user_id: sessionStorage.getItem("user_id"),
      })
    }
  );

  console.log(response);
  
  if (response.ok){
    const data = await response.json();
    console.log(data);
    setIsWatchlisted(true)
  }

};

const removeMovieWatchlist = async (movieId: number) => {
  const response = await fetch(`${API_URL}user/watchlist/${movieId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response);

  if (response.ok){
    const data = await response.json();
    console.log(data);
    setIsWatchlisted(false)
  }

};

const addMovieFavorites = async (movieId: number) => {
  const response = await fetch(`${API_URL}user/favorites`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movie_id: movieId,
        user_id: sessionStorage.getItem("user_id"),
      })
    }
  );

  console.log(response);

  if (response.ok){
    const data = await response.json();
    console.log(data);
    setIsFavorited(true)
  }

};

const removeMovieFavorites = async (movieId: number) => {
  const response = await fetch(`${API_URL}user/favorites/${movieId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movie_id: movieId,
        user_id: sessionStorage.getItem("user_id"),
      })
    }
  );

  console.log(response);

  if (response.ok){
    const data = await response.json();
    console.log(data);
    setIsFavorited(false)
  }

};

const findIfFavorite = async (movieId: number) => {
  const response = await fetch(`${API_URL}user/favorites/check/${movieId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
      }),
    }
  );

  if (response.ok){
    const data = await response.json();
    console.log(data);
    setIsFavorited(data.isFavorited)
  }

};

const findIfWatchlist = async (movieId: number) => {
  const response = await fetch(`${API_URL}user/watchlist/check/${movieId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: sessionStorage.getItem("user_id"),
      }),
    }
  );

  if (response.ok){
    const data = await response.json();
    console.log(data);
    setIsWatchlisted(data.isWatchlisted)
  }

};

  useEffect(() => {
    if (movie) {
      findIfFavorite(movie.id);
      findIfWatchlist(movie.id);
    }
  }, []);


  return (
<div className="flex flex-col items-center justify-center max-w-screen-lg pt-10 text-white h-3/4 w-full mt-10">
  <div className="flex gap-1 font-sans">
    {/* Movie Image*/}
    <div className="relative w-96 h-auto">
          <img
            src={
              movie?.image ??
              "https://assets-prd.ignimgs.com/2024/01/24/dune2-insta-vert-montage-1638x2048-intl-1706086846940.jpg"
            }
            alt=""
            className="absolute inset-0 max-h-full max-w-full rounded-xl object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-auto p-6">
        {/* Movie Title */}
            <div className="flex flex-col items-start ">
        <div className="flex-auto p-6">
          <div className="flex justify-center">
            <div className="order-1 mt-2 w-full flex-none text-5xl font-medium text-primary mb-5">
              {movie?.title}
            </div>
          </div>

          {/* Movie Genres */}
          <div className="mb-5 mt-2 flex items-baseline pb-6">
            {movie?.genre.map((genre: string) => (
              <span
                key={genre}
                className="text-s me-2 rounded-full px-5 py-1.5 font-medium bg-primary text-white dark:bg-primary dark:text-white"
              >
                {genre}
              </span>
            ))}
          </div>
          {/* Movie Details */}
          <div className="mb-5 mt-2 flex flex-col gap-2 pb-6 text-white">
            <div className="flex items-center gap-2">
              <span className="font-bold"> RATING: </span>
              {/* Movie Ratings */}
              {movieRating ? (
                <div className="flex items-baseline text-white text-medium">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i + 1 <= movieRating ? (
                      // Filled Star
                      <svg
                        className="h-6 w-6 text-action dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ) : (
                      // Else, Empty Star
                      <svg
                        className="h-6 w-6 text-action dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-width="2"
                          d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                        />
                      </svg>
                    )
                  )}
                </div>
              ) : (
                <p>No Ratings Yet</p>
              )}
              <span className="text-action">{movieRating ? movieRating.toFixed(2): ""}</span>
            </div>
            <span><span className="font-bold">DIRECTOR: </span><span>{movie?.director}</span></span>
            <span><span className="font-bold">STARS: </span><span>{movie?.stars}</span></span>
          </div>
          {/* Favourite Button */}
          {movie && (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isFavorited) {
                        removeMovieFavorites(movie?.id)
                      } else {
                        addMovieFavorites(movie?.id)
                      }
                  }}
                    className="material-icons"
                    // aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    aria-label="Remove from favorites"
                  >
                    {/*isFavorited ? "favorite" : "favorite_border"*/}
                    {isFavorited ? "favorite" : "favorite_border"}
                  </button>
                </div>

              </div>

              {/* Watchlist Button */}
              <button
                type="button"
                className={`btn flex items-center gap-1`}
                onClick={() => {
                  if (isWatchlisted) {
                    removeMovieWatchlist(movie?.id)
                  } else {
                    addMovieWatchlist(movie?.id)
                  }
                }}
              >
                {"TO WATCHLIST"}
                <span className="material-symbols-outlined text-lg text-primary">
                  {isWatchlisted ? "remove" : "add"}
                </span>
              </button>

            </div>
          )}
          <div className=" flex items-center gap-6">
            {/* <button
             // className="bg-action btn-sm hover:primary border-4 text-primary font-bold py-2 px-4 border-primary hover:border-action mt-4"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"

             
              onClick={() => {
                onClickReviews();
              }}
            >Reviews</button> */}
            <ActionButton
              className="btn mt-6"
              buttonText="VIEW REVIEWS"
              // icon="play_arrow"
              onClick={() => {
                onClickReviews();
              }}
            ></ActionButton>
            <ActionButton
              className="btn mt-6"
              buttonText="WRITE REVIEW"
              // icon="stylus"
              onClick={openReview}
            ></ActionButton>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MovieDetailLayout;

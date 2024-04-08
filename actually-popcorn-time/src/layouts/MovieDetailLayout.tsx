import { ReactNode } from "react";
import NavBar from "../components/Navbar";

type MovieDetailLayoutProps = {
  movie?: JSON;
  movieRating?: number;
};

const MovieDetailLayout = ({ movie, movieRating }: MovieDetailLayoutProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div class="flex font-sans">
        {/* Movie Image */}
        <div class="relative w-56 flex-none">
          <img
            src="https://assets-prd.ignimgs.com/2024/01/24/dune2-insta-vert-montage-1638x2048-intl-1706086846940.jpg"
            alt=""
            class="absolute inset-0 h-full w-full rounded-lg object-cover"
            loading="lazy"
          />
        </div>

        {/* Movie Title */}
        <div class="flex-auto p-6">
          <div class="flex flex-wrap">
            <div class="order-1 mt-2 w-full flex-none text-3xl font-bold text-white">
              {movie.title}
            </div>
          </div>

          {/* Movie Genres */}
          <div class="mb-5 mt-2 flex items-baseline pb-6">
            {movie.genre.map((genre: string) => (
              <span
                key={genre}
                class="text-s me-2 rounded-full bg-gray-600 px-5 py-1.5 font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Movie Ratings */}
          {movieRating ? (
            <div class="flex items-baseline text-white">
              {Array.from({ length: 5 }).map((_, i) =>
                i + 1 <= movieRating ? (
                  // Filled Star
                  <svg
                    class="h-6 w-6 text-gray-800 dark:text-white"
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
                    class="h-6 w-6 text-gray-800 dark:text-white"
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
                ),
              )}
            </div>
          ) : (
            <p>No Ratings Yet</p>
          )}

          {/* Movie Details */}
          <div class="mb-5 mt-2 pb-6 text-white">
            <p>RATING: {movieRating?.toFixed(2)}</p>
            <p>DIRECTOR: {movie.director}</p>
            <p>STARS: {movie.stars}</p>
          </div>

          {/* Buttons */}
          <div class="mb-5 flex space-x-4 text-sm font-medium">
            <div class="flex flex-auto space-x-4">
              <button
                class="h-10 rounded-full border border-slate-200 px-6 font-semibold text-slate-900 text-white"
                type="button"
              >
                TO WATCHLIST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailLayout;

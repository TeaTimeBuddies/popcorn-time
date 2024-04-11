import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import useFetchWithToken from "../hooks/useToken";
import Loader from "../components/Loader";

export interface Movie {
  id: number;
  title: string;
  director: string[];
  genre: string[];
  stars: string[];
  year: number;
  image: string | undefined;
}

const TableHeaders = ["Title", "Director", "Year", "Genre", "Stars"];
const userId = Number(sessionStorage.getItem("userId"));

const MoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const {
    data: fetchedMovies,
    error,
    isLoading,
  } = useFetchWithToken(
    `${API_URL}movies?is_approved=true&per_page=${perPage}&page=${currentPage}`
  );

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (fetchedMovies) {
      const movies = fetchedMovies.data.map((movie: Movie) => ({
        ...movie,
        director: movie.director,
        genre: movie.genre,
        stars: movie.stars,
      }));
      setMovies(movies);

      const totalPages = fetchedMovies.meta ? fetchedMovies.meta.last_page : 1;
      setTotalPages(totalPages);

      const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
      setPageNumbers(pageNumbers);
    }
  }, [fetchedMovies]);

  const deleteMovie = (id: number) => {
    fetch(`${API_URL}movies/${id}`, {
      method: "DELETE",
    }).then(() => {
      setMovies(movies.filter((movie) => movie.id !== id));
    });
  };

  return (
    <UserLayout>
      {movies.length == 0 ? (
        <Loader text="Loading Movies" />
      ) : (
        <>
          <div className="max-w-5xl mx-auto">
            <table className="w-full table table-fixed">
              <thead>
                <tr>
                  {TableHeaders.map((header) => (
                    <th key={header} className="w-1/5">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {movies.map((m: Movie) => (
                  <tr key={m.id} className="hover:bg-primary cursor-pointer">
                    {/* <td></td> */}
                    <td className="font-medium text-action truncate max-w-xs">
                      <Link to={`/details/${m.id}`}>{m.title}</Link>
                    </td>
                    <td className="text-white truncate max-w-xs">
                      {Array.isArray(m.director) ? m.director.join(", ") : m.director}
                    </td>
                    <td className="text-white">{m.year}</td>
                    <td className="text-white">
                      {Array.isArray(m.genre) ? m.genre.join(", ") : m.genre}
                    </td>
                    <td className="text-white">
                      {Array.isArray(m.stars) ? m.stars.join(", ") : m.stars}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
          <div className="mt-5">
            <div className="join text-white btn-sm text-sm">
              {currentPage > 1 && (
                <button
                  className="btn join-item text-white btn-sm text-sm"
                  onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                >
                  Previous Page
                </button>
              )}
              {pageNumbers.map((number) => (
                <button
                  className="btn join-item text-white btn-sm text-sm"
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  disabled={number === currentPage}
                >
                  {number}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  className="btn join-item text-white btn-sm text-sm"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                >
                  Next Page
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </UserLayout>
  );
};

export default MoviesPage;

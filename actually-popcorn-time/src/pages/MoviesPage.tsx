import { useEffect, useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import useFetchWithToken from "../hooks/useToken";

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

const MoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  const {
    data: fetchedMovies,
    error,
    isLoading,
  } = useFetchWithToken(
    `${API_URL}movies?is_approved=true&per_page=${perPage}&page=${currentPage}`
  );

  // const MoviesPage = () => {
  //   const {
  //     data: fetchedMovies,
  //     error,
  //     isLoading,
  //   } = useFetchWithToken(`${API_URL}movies?is_approved=true`);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  // useEffect(() => {
  //   fetch(`${API_URL}movies?is_approved=true`)
  //     .then((res) => res.json())
  //     .then((fetchedMovies) => {
  //       const movies = fetchedMovies.map((movie: Movie) => ({
  //         ...movie,
  //         director: movie.director,
  //         genre: movie.genre,
  //         stars: movie.stars,
  //       }));
  //       setMovies(movies);
  //     });
  // }, []);

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

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    fetch(`${API_URL}movies/search/${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((fetchedMovies) => {
        const movies = fetchedMovies.map((movie: Movie) => ({
          ...movie,
          director: movie.director,
          genre: movie.genre,
          stars: movie.stars,
        }));
        setMovies(movies);
      });
  };

  return (
    <GeneralLayout>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="">
        <table className="table">
          <thead>
            <tr>
              {TableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movies.map((m: Movie) => (
              <tr key={m.id}>
                <td className="flex gap-1">
                  <button
                    className="btn btn-xs flex items-center p-1"
                    onClick={() => deleteMovie(m.id)}
                  >
                    <span className="material-symbols-outlined text-sm text-action">
                      delete
                    </span>
                  </button>
                </td>

                <td className="font-medium text-action">
                  <Link to={`/details/${m.id}`}>{m.title}</Link>
                </td>
                <td>
                  {Array.isArray(m.director)
                    ? m.director.join(", ")
                    : m.director}
                </td>
                <td>{m.year}</td>
                <td>{Array.isArray(m.genre) ? m.genre.join(", ") : m.genre}</td>
                <td>{Array.isArray(m.stars) ? m.stars.join(", ") : m.stars}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {currentPage > 1 && (
        <button onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}>
          Previous Page
        </button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          disabled={number === currentPage}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() =>
            setCurrentPage((page) => Math.min(page + 1, totalPages))
          }
        >
          Next Page
        </button>
      )}
    </GeneralLayout>
  );
};

export default MoviesPage;

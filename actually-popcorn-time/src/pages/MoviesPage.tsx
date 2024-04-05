import { useEffect, useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { Link } from "react-router-dom";

export interface Movie {
  id: number;
  title: string;
  director: string[];
  genre: string[];
  stars: string[];
  year: number;
}

const TableHeaders = ["", "Title", "Director", "Year", "Genre", "Stars"];

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}movies?is_approved=true`)
      .then((res) => res.json())
      .then((fetchedMovies) => {
        const movies = fetchedMovies.map((movie: any) => ({
          ...movie,
          director: movie.director,
          genre: movie.genre,
          stars: movie.stars,
        }));
        setMovies(movies);
      });
  }, []);

  const deleteMovie = (id: number) => {
    fetch(`${apiUrl}movies/${id}`, {
      method: "DELETE",
    }).then(() => {
      setMovies(movies.filter((movie) => movie.id !== id));
    });
  };

  return (
    <GeneralLayout title="Movie List">
      <div className="overflow-x-auto">
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
                    className="btn btn-xs p-1"
                    onClick={() => deleteMovie(m.id)}
                  >
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                  </button>
                </td>

                <td className="text-blue-500">
                  <Link to={`/details/${m.id}`}>{m.title}</Link>
                </td>
                <td>
      {Array.isArray(m.director) ? m.director.join(", ") : m.director}
    </td>
    <td>{m.year}</td>
    <td>{Array.isArray(m.genre) ? m.genre.join(", ") : m.genre}</td>
    <td>{Array.isArray(m.stars) ? m.stars.join(", ") : m.stars}</td>
  </tr>
))}
          </tbody>
        </table>
      </div>
    </GeneralLayout>
  );
};

export default MoviesPage;

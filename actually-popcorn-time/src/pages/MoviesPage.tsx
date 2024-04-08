import { useEffect, useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";

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
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${API_URL}movies?is_approved=true`)
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
  }, []);

  const deleteMovie = (id: number) => {
    fetch(`${API_URL}movies/${id}`, {
      method: "DELETE",
    }).then(() => {
      setMovies(movies.filter((movie) => movie.id !== id));
    });
  };

  return (
    <GeneralLayout>
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
    </GeneralLayout>
  );
};

export default MoviesPage;

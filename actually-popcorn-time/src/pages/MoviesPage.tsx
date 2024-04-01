import { useEffect, useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";

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

  useEffect(() => {
    fetch(`http://localhost:8888/api/movies`)
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
    fetch(`http://localhost:8888/api/movies/${id}`, {
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

                <td>{m.title}</td>
                <td>{m.director.join(", ")}</td>
                <td>{m.year}</td>
                <td>{m.genre.join(", ")}</td>
                <td>{m.stars.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GeneralLayout>
  );
};

export default MoviesPage;

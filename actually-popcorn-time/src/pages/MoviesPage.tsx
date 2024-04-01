import { useEffect, useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";

type Movie = {
  id: number;
  movieId: number;
  title: string;
  genre: string[];
  stars: string[];
  director: string[];
  year: number;
};

const TableHeaders = ["Title", "Director", "Year", "Genre", "Stars"];

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
            {movies.map((movie: Movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.director.join(", ")}</td>
                <td>{movie.year}</td>
                <td>{movie.genre.join(", ")}</td>
                <td>{movie.stars.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GeneralLayout>
  );
};

export default MoviesPage;

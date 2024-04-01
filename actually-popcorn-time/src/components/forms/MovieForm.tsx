import { useState } from "react";
import { Movie } from "../../pages/MoviesPage";
import { titleCase } from "../../utils/formatting";

const fields = ["title", "director", "year", "genre", "stars"];

type MovieFormProps = {
  onSave: () => void;
  movie: Movie;
};
const MovieForm = ({ onSave, movie }: MovieFormProps) => {
  const [title, setTitle] = useState<string>(movie.title);

  const [year, setYear] = useState<number>(movie.year);
  const [director, setDirector] = useState<string[]>(movie.director || []);
  const [genre, setGenre] = useState<string[]>(movie.genre || []);
  const [stars, setStars] = useState<string[]>(movie.stars || []);
  const [newMovie, setNewMovie] = useState<Movie>({
    id: 0,
    title: "",
    director: [],
    year: 0,
    genre: [],
    stars: [],
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      <input type="hidden" name="id" value={movie.id} />
      <div className="flex gap-3">
        {fields.map((field) => {
          let value;
          switch (field) {
            case "title":
              value = title;
              break;
            case "director":
              value = director.join(",");
              break;
            case "year":
              value = year.toString();
              break;
            case "genre":
              value = genre.join(",");
              break;
            case "stars":
              value = stars.join(",");
              break;
          }
          return (
            <div key={field}>
              <label>{titleCase(field)}: </label>
              <input
                className="input input-xs input-bordered"
                type="text"
                name={field}
                value={value}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            </div>
          );
        })}
      </div>
      <input className="btn btn-xs" type="submit" value="Submit" />
    </form>
  );
};

export default MovieForm;

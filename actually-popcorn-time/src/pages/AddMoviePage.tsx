import React, { useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";

export interface MovieForm {
  title: string;
  director: string;
  genre: string;
  stars: string;
  year: number;
  [key: string]: string | number;
}

const AddMoviePage: React.FC = () => {
  const [movie, setMovie] = useState<MovieForm>({
    title: "",
    director: "",
    genre: "",
    stars: "",
    year: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...movie,
          genre: movie.genre.split(",").map((g) => g.trim()),
          stars: movie.stars.split(",").map((s) => s.trim()),
          year: parseInt(movie.year.toString(), 10),
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add the movie.");
      }
      alert("Successfully added movie. Please wait for admin approval.");
      navigate("/movies");
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <GeneralLayout title="Adding Movie...">Adding Movie...</GeneralLayout>
    );
  }

  return (
    <GeneralLayout title="Add a New Movie">
      <form onSubmit={handleSubmit} className="form">
        <div className="mt-4 grid grid-cols-3 grid-rows-3 items-center gap-2">
          {error && <p className="error">{error}</p>}

          {Object.keys(movie).map((key) => (
            <div key={key} className="col-span-3">
              <label
                key={key}
                className="input input-bordered flex items-center gap-2"
              >
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()} :
                <input
                  name={key}
                  className="grow"
                  value={movie[key] as keyof MovieForm}
                  onChange={handleChange}
                />
              </label>
            </div>
          ))}

          <ActionButton
            className="col-span-1 col-start-2"
            buttonText="Add Movie"
            type="submit"
          ></ActionButton>
        </div>
      </form>
    </GeneralLayout>
  );
};

export default AddMoviePage;

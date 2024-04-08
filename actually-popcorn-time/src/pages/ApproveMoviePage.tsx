import { useEffect, useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { API_URL } from "../constants";

export interface Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  stars: string;
  year: number;
}

const AdminApprovalPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${API_URL}movies?is_approved=false`)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("There was an error!", error));
  }, []);

  const approveMovie = (id: number) => {
    fetch(`${API_URL}movies/approve/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setMovies(movies.filter((movie) => movie.id !== id));
        }
      })
      .catch((error) => console.error("There was an error!", error));
  };

  return (
    <GeneralLayout title="Admin: Approve Movies">
      <div>
        <h2>Unapproved Movies</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} -{" "}
              <button onClick={() => approveMovie(movie.id)}>Approve</button>
            </li>
          ))}
        </ul>
      </div>
    </GeneralLayout>
  );
};

export default AdminApprovalPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);

  // Check if the user is an admin
  const isAdmin = sessionStorage.getItem("is_admin");
  if (isAdmin !== "1") {
    navigate("/"); // Redirect to home page or any other page
    return null; // Return null or a different component to render
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    fetch(`${API_URL}movies?is_approved=false`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("There was an error!", error));
  }, []);

  const approveMovie = (id: number) => {
    const token = sessionStorage.getItem("token");
    fetch(`${API_URL}movies/approve/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setMovies(movies.filter((movie) => movie.id !== id));
        }
      })
      .catch((error) => console.error("There was an error!", error));
  };

  const rejectMovie = (id: number) => {
    const token = sessionStorage.getItem("token");
    fetch(`${API_URL}movies/reject/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          navigate("/movies/approve");
        }
      })
      .catch((error) => console.error("There was an error!", error));
  };

  const $admin = sessionStorage.getItem("is_admin");
  if ($admin == "1") {
    // If the user is an admin
    return (
      <GeneralLayout title="Admin: Approve Movies">
        <div>
          <h2>Unapproved Movies</h2>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                {movie.title} - {movie.director} - {movie.genre} - {movie.stars}{" "}
                - {movie.year}
                <button className="mx-2" onClick={() => approveMovie(movie.id)}>
                  Approve
                </button>
                <button onClick={() => rejectMovie(movie.id)}>Reject</button>
              </li>
            ))}
          </ul>
        </div>
      </GeneralLayout>
    );
  } else {
    // If user is not admin, redirect
    navigate("/");
  }
};

export default AdminApprovalPage;

import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralLayout from "../../layouts/GeneralLayout";
import { API_URL } from "../../constants";

export interface Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  stars: string;
  year: number;
  image: string;
  isApproved: boolean;
}

const AdminApprovalPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    fetch(`${API_URL}movies?is_approved=false`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(
          data.data.map((movie: any) => ({
            ...movie,
            isApproved: movie.is_approved,
          }))
        );
        console.log(data.data);
      })
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
          setMovies(movies.filter((movie) => movie.id !== id));
          navigate("/movies/approve");
        }
      })
      .catch((error) => console.error("There was an error!", error));
  };

  return (
    <GeneralLayout title="Admin: Approve Movies">
      <div className="flex w-4/5 justify-center overflow-x-auto text-primary">
        {movies.length === 0 ? (
          <div className="mt-10 text-primary">No movies to approve</div>
        ) : (
          <table className="table">
            {/* head */}
            <thead className="text-primary">
              <tr>
                <th>Title</th>
                <th>Directors</th>
                <th>Genres</th>
                <th>Starring</th>
                <th>Year</th>
                <th>Image</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m: Movie, index: Key) => (
                <tr key={index}>
                  <td>{m.title}</td>
                  <td>{m.director.toString()}</td>
                  <td>{m.genre.toString()}</td>
                  <td>{m.stars.toString()}</td>
                  <td>{m.year}</td>
                  <td>{m?.image}</td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        className="btn btn-xs"
                        onClick={() => approveMovie(m.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-xs"
                        onClick={() => rejectMovie(m.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </GeneralLayout>
  );
};

export default AdminApprovalPage;

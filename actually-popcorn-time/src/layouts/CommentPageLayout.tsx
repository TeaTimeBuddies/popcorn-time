import { useEffect, useState } from "react";
import { Rating } from "../pages/DetailsPage";
import { Movie } from "../pages/MoviesPage";
import useFetchWithToken from "../hooks/useToken";
import { API_URL } from "../constants";
import ActionButton from "../components/ActionButton";

export interface Comment {
  id: number;
  user_id: number;
  username: string;
  rating_id: string[];
  comment: string[];
}

type CommentLayoutProps = {
  ratings: Rating;
  comments: Comment[];
};

const chatColours = ["chat-bubble-secondary", "chat-bubble-accent"];

const CommentPageLayout = ({ ratings, comments }: CommentLayoutProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [newComment, setComment] = useState("");
  console.log("ratings", ratings);

  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
  } = useFetchWithToken(`${API_URL}movies/${ratings.movie_id}`);
  useEffect(() => {
    if (movieError) {
      console.error(movieError);
    }
  }, [movieError]);

  // Creates a new comment
  const store = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newComment) {
      alert("Please fill out both fields.");
      return;
    }

    const token = sessionStorage.getItem("token");

    const response = await fetch(`${apiUrl}comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating_id: ratings.id,
        comment: newComment,
        user_id: parseInt(sessionStorage.getItem("user_id") || "0", 10),
      }),
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      console.log("Comment added successfully");
      window.location.reload();
    }
  };

  return (
    <div className="w-11/12 py-10">
      <div className="chat chat-start">
        <div className="chat-header text-action">{ratings?.username}</div>
        <div className="chat-bubble chat-bubble-primary flex flex-col">
          <span> My rating for {movie?.title}:</span>
          <div className="flex">
            {[...Array(ratings?.rating)].map((_, index) => (
              <span key={index} className="material-symbols-outlined">
                kid_star
              </span>
            ))}
          </div>
          <span className="text-white">Thoughts : {ratings?.review}</span>
        </div>
      </div>

      {comments.map((c: Comment) => (
        <div key={c.id} className="chat chat-end">
          <div className="chat-header text-action">{c.username}</div>
          <div className="chat-bubble chat-bubble-accent flex flex-col">
            <div className="flex">
            </div>
            <span className="text-white">{c?.comment}</span>
          </div>
        </div>
      ))}
      <form onSubmit={store}>
        <label className="text-white">
          Write a Comment:
          <br />
          <textarea
            className="text-black"
            value={newComment}
            onChange={(e) => setComment(e.target.value)}
            required
            cols={50}
          />
        </label>
        <br />
        <ActionButton
          className="btn- btn btn-sm"
          type="submit"
          buttonText={"Submit Comment"}
        ></ActionButton>
      </form>
    </div>
  );
};

export default CommentPageLayout;

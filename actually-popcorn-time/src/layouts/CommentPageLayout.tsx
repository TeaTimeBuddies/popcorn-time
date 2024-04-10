import { useEffect, useState } from "react";
import { Rating } from "../pages/DetailsPage";

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

const CommentPageLayout = ({ ratings, comments }: CommentLayoutProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [newComment, setComment] = useState("");

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
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating_id: ratings.id,
        comment: newComment,
        user_id: parseInt(sessionStorage.getItem("user_id") || '0', 10), 
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
      <div className="flex w-full flex-col items-center rounded-3xl border-2 border-sky-500 bg-stone-200 pb-10">
        <div className="w-full px-12">
          <div className="mt-2 w-full flex-none pt-6 text-4xl font-bold text-primary text-sky-500">
            {ratings?.username}
          </div>
          <div className="mt-2 w-full flex-none text-2xl text-primary text-white">
            <div className="flex items-center gap-2">
              <span> RATING: </span> {ratings?.rating}
            </div>
          </div>
          <span className="text-white">{ratings?.review}</span>
        </div>
      </div>

      <form onSubmit={store}>
        <label>
          Comments:
          <br />
          <textarea
            value={newComment}
            onChange={(e) => setComment(e.target.value)}
            required
            cols={50}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {comments.map((c: Comment) => (
        <div className="my-5 flex w-full flex-col items-center rounded-3xl bg-stone-200 py-5">
          <div className="mt-2 w-full flex-none px-5 text-2xl text-primary text-white">
            <div className="flex-none items-center gap-2">
              <span>{c.username}</span>
            </div>
            <span className="text-white"> {c.comment} </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentPageLayout;

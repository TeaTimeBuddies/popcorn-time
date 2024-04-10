import { useState } from "react";
import { API_URL } from "../../constants";

type ReviewFormProps = {
  id: string;
};

const ReviewForm = ({ id }: ReviewFormProps) => {
  // Inserting new rating and review
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const userId = 1; // Hardcoded for now, will be replaced with session user id

  const store = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!review || !rating) {
      alert("Please fill out both fields.");
      return;
    }

    console.log({ review, rating });

    const token = sessionStorage.getItem("token");

    const response = await fetch(`${API_URL}ratings/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: parseInt(sessionStorage.getItem("user_id") || '0', 10), 
        review,
        rating,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating and review.");
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      {/* Inserting new rating and review */}
      <form onSubmit={store}>
        <label>
          Review:
          <br />
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            cols={50}
          />
        </label>
        <br />
        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Select...</option>
            {[...Array(5).keys()].map((value) => (
              <option key={value + 1} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default ReviewForm;

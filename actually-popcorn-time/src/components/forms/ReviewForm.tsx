import { useState } from "react";
import { API_URL } from "../../constants";
import ActionButton from "../ActionButton";

type ReviewFormProps = {
  id: string;
  onClose: () => void;
};

const ReviewForm = ({ id, onClose }: ReviewFormProps) => {
  // Inserting new rating and review
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const userId = 1; // Hardcoded for now, will be replaced with session user id
  const [loading, setLoading] = useState(false);

  const store = async (event: React.FormEvent) => {
    setLoading(true);
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: parseInt(sessionStorage.getItem("user_id") || "0", 10),
        review,
        rating,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating and review.");
    } else {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      {/* Inserting new rating and review */}

      <form onSubmit={store}>
        <div className="flex flex-col items-center gap-3">
          <textarea
            className="textarea textarea-bordered"
            placeholder="Leave a review"
            onChange={(e) => setReview(e.target.value)}
            value={review}
            required
            cols={50}
          ></textarea>
          <select
            className="select select-bordered w-full max-w-xs"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Select rating..
            </option>
            {[...Array(5).keys()].map((value) => (
              <option key={value + 1} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <ActionButton
              className="btn-sm col-span-2 col-start-2"
              buttonText="Add Review"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </ActionButton>
            <ActionButton
              className="btn-sm col-span-2 col-start-2 border-secondary bg-secondary"
              buttonText="Cancel"
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </ActionButton>
          </div>
        </div>
      </form>
    </>
  );
};
export default ReviewForm;

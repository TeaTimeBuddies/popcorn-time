import { useState } from "react";
import ActionButton from "../ActionButton";

type ReviewFormProps = {
  onClose: () => void;
};

const ReviewForm = ({ onClose }: ReviewFormProps) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [showModal, setShowModal] = useState(false);

  const store = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!review || !rating) {
      alert("Please fill out both fields.");
      return;
    }
    onClose();
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

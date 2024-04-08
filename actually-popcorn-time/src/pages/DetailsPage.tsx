import GeneralLayout from "../layouts/GeneralLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetailLayout from "../layouts/MovieDetailLayout";
import ReviewTable from "../components/tables/ReviewTable";
import ReviewForm from "../components/forms/ReviewForm";

export interface Rating {
  id: number;
  user_id: string;
  movie_id: string[];
  rating: number;
  review: string[];
  comments_count: number;
}

const DetailsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const userId = 1; // Hardcoded for now, will be replaced with session user id

  // Fetching movie details
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    // Fetch movie details
    fetch(`${apiUrl}movies/${id}`)
      .then((res) => res.json())
      .then((fetchedMovie) => {
        setMovie(fetchedMovie);
      });
  }, [apiUrl, id]);

  // Fetching movie ratings
  var [totalRatings, setTotalRating] = useState(0);
  const [ratings, setRatings] = useState<Rating[]>([]);
  useEffect(() => {
    // Fetch movie ratings
    fetch(`${apiUrl}ratings/${id}`)
      .then((res) => res.json())
      .then((fetchedRatings) => {
        const fetched_rating = fetchedRatings.map((rating: any) => ({
          ...rating,
        }));
        setRatings(fetched_rating); // Set Rating

        let total = 0;
        fetchedRatings.forEach((r: Rating) => {
          total += r.rating;
        });

        // Calculate average rating
        setTotalRating(total / fetchedRatings.length);
      });
  }, [apiUrl, id]);

  // Inserting new rating and review
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const store = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!review || !rating) {
      alert("Please fill out both fields.");
      return;
    }

    console.log({ review, rating });

    const response = await fetch(`${apiUrl}ratings/${id}`, {
      method: "post",
      body: JSON.stringify({
        // TODO: NEED TO INSERT SESSION USER ID, ELSE REDIRECT LOGIN
        review,
        rating,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating and review.");
    } else {
      window.location.reload();
    }
  };

  return (
    <GeneralLayout title={""}>
      {/* Displaying the movie details */}
      {movie ? (
        <>
          <MovieDetailLayout
            movie={movie}
            movieRating={totalRatings}
            onClickReviews={() => setShowReviews((prev) => !prev)}
            openReview={() => {
              setShowReviewForm((prev) => !prev);
            }}
          />
        </>
      ) : (
        // While movie is null, show loading message
        <p>Movie Loading...</p>
      )}
      {movie && showReviewForm && (
        <ReviewForm onClose={() => setShowReviewForm((prev) => !prev)} />
      )}

      {showReviews && movie && <ReviewTable ratings={ratings} movie={movie} />}
    </GeneralLayout>
  );
};

export default DetailsPage;

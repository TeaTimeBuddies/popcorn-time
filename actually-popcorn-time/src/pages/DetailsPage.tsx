import GeneralLayout from "../layouts/GeneralLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetailLayout from "../layouts/MovieDetailLayout";
import ReviewTable from "../components/tables/ReviewTable";
import ReviewForm from "../components/forms/ReviewForm";
import { API_URL } from "../constants";

export interface Rating {
  id: number;
  user_id: string;
  movie_id: string[];
  rating: number;
  review: string[];
  comments_count: number;
}

const DetailsPage = () => {
  const { id } = useParams();
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Fetching movie details
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    // Fetch movie details
    fetch(`${API_URL}movies/${id}`)
      .then((res) => res.json())
      .then((fetchedMovie) => {
        setMovie(fetchedMovie);
      });
  }, [id]);

  // Fetching movie ratings
  const [totalRatings, setTotalRating] = useState(0);
  const [ratings, setRatings] = useState<Rating[]>([]);
  useEffect(() => {
    // Fetch movie ratings
    fetch(`${API_URL}ratings/${id}`)
      .then((res) => res.json())
      .then((fetchedRatings) => {
        const fetched_rating = fetchedRatings.map((rating: Rating) => ({
          ...rating,
        }));
        setRatings(fetched_rating); // Set Rating

        let total = 0;
        fetchedRatings.forEach((r: Rating) => {
          total += r.rating;
        });

        // Calculate average ratingc
        setTotalRating(total / fetchedRatings.length);
      });
  }, [id]);

  if (!id) {
    return null;
  }

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
      {movie && showReviewForm && <ReviewForm id={id} />}

      {showReviews && movie && <ReviewTable ratings={ratings} movie={movie} />}
    </GeneralLayout>
  );
};

export default DetailsPage;

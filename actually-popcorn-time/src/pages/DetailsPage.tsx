import GeneralLayout from "../layouts/GeneralLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetailLayout from "../layouts/MovieDetailLayout";
import ReviewTable from "../components/tables/ReviewTable";
import ReviewForm from "../components/forms/ReviewForm";
import { API_URL } from "../constants";
import useFetchWithToken from "../hooks/useToken";

export interface Rating {
  id: number;
  user_id: string;
  movie_id: string[];
  rating: number;
  username: string;
  review: string[];
  comments_count: number;
}

const DetailsPage = () => {
  const { id } = useParams();
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Fetching movie details
  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
  } = useFetchWithToken(`${API_URL}movies/${id}`);
  useEffect(() => {
    if (movieError) {
      console.error(movieError);
    }
  }, [movieError]);

  // Fetching movie ratings
  const {
    data: fetchedRatings,
    error: ratingsError,
    isLoading: ratingsLoading,
  } = useFetchWithToken(`${API_URL}ratings/${id}`);
  const [totalRatings, setTotalRating] = useState(0);
  const [ratings, setRatings] = useState<Rating[]>([]);
  useEffect(() => {
    if (fetchedRatings) {
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
    }

    if (ratingsError) {
      console.error(ratingsError);
    }
  }, [fetchedRatings, ratingsError]);

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
      {movie && showReviewForm && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center ">
          <div className="rounded-md bg-app200 p-10 shadow-lg">
            <ReviewForm id={id} onClose={() => setShowReviewForm(false)} />
          </div>
        </div>
      )}

      {showReviews && movie && <ReviewTable ratings={ratings} movie={movie} />}
    </GeneralLayout>
  );
};

export default DetailsPage;

import GeneralLayout from "../layouts/GeneralLayout";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetailLayout from "../layouts/MovieDetailLayout";

export interface Rating {
  id: number;
  user_id: string;
  movie_id: string[];
  rating: number;
  review: string[];
  comments_count: number;
}

const RatingHeaders = ["Username", "Rating", "Review"];

const DetailsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();

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
          <MovieDetailLayout movie={movie} movieRating={totalRatings} />
          <div className="overflow-x-auto">
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
          </div>
        </>
      ) : (
        // While movie is null, show loading message
        <p>Movie Loading...</p>
      )}

      {/* Displaying the movie ratings */}
      {ratings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                {RatingHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((r: Rating) => (
                <tr key={r.id}>
                  <td>{r.user_id}</td>
                  {/* TODO: Change this to display username after users */}
                  <td>{r.rating}/5</td>
                  <td>{r.review}</td>
                  <td>
                    {/* This is the comments section for reviews */}
                    <Link to={`/comments/${r.id}`}>
                      <div className="flex items-center justify-center">
                        <p className="w-5 text-center">{r.comments_count}</p>
                        <svg
                          className="h-6 w-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"
                          />
                        </svg>
                      </div>
                    </Link>
                  </td>
                  {/* TODO: Display # of comments, inject comments into page */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : movie ? (
        <p>No Ratings Yet</p>
      ) : (
        <p>Ratings Loading...</p>
      )}
    </GeneralLayout>
  );
};

export default DetailsPage;

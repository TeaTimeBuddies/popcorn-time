import GeneralLayout from "../layouts/GeneralLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export interface Rating {
  id: number;
  user_id: string;
  movie_id: string[];
  rating: number;
  review: string[];
}

const RatingHeaders = ["user_id", "rating", "review"];

const DetailsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  
  // Fetching movie details
  const [movie, setMovie] = useState(null);
  useEffect(() => {  // Fetch movie details
    fetch(`${apiUrl}movies/${id}`)
      .then((res) => res.json())
      .then((fetchedMovie) => {
        setMovie(fetchedMovie);
      });
  }, [apiUrl, id]);
  
  // Fetching movie ratings
  var [totalRatings, setTotalRating] = useState(0);
  const [ratings, setRatings] = useState<Rating[]>([]);
  useEffect(() => {  // Fetch movie ratings
    fetch(`${apiUrl}ratings/${id}`)
      .then((res) => res.json())
      .then((fetchedRatings) => {
        const fetched_rating = fetchedRatings.map((rating: any) => ({
          ...rating,
        }));
        setRatings(fetched_rating);  // Set Rating
        
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
            method: 'post',
            body: JSON.stringify({ // TODO: NEED TO INSERT SESSION USER ID, ELSE REDIRECT LOGIN 
              review,
              rating,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

    if (!response.ok) {
      throw new Error("Failed to submit rating and review.");
    } else {
      window.location.reload();
    }
  };

  return (
    <GeneralLayout title={"Popcorn Time Movie Detail Page"}>
      {/* Displaying the movie details */}
      {movie ? (
        <div className="overflow-x-auto">
          {/* Movie details */}
          <h1>{movie.title}</h1>
          <p>Director: {movie.director}</p>
          <p>Year: {movie.year}</p>
          <p>genre: {movie.genre}</p>
          <p>stars: {movie.stars}</p>
          <p>Rating: {totalRatings.toFixed(2)}</p>

          {/* Inserting new rating and review */}
          <form onSubmit={store}>
            <label>
              Review:<br/>
              <textarea value={review} onChange={e => setReview(e.target.value)} required cols={50}/>
            </label><br/>
            <label>
              Rating:
              <select value={rating} onChange={e => setRating(e.target.value)} required>
                <option value="">Select...</option>
                {[...Array(5).keys()].map((value) => (
                  <option key={value+1} value={value+1}>
                    {value+1}
                  </option>
                ))}
              </select>
            </label><br/>
            <button type="submit">Submit</button>
          </form>
        </div>
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
                  <td>{r.user_id}</td>{/* TODO: Change this to display username after users */}
                  <td>{r.rating}/5</td>
                  <td>{r.review}</td>
                  <td><a>View More Comments</a></td>{/* TODO: Display # of comments, inject comments into page */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (<p>Ratings Loading...</p>)
      }
    </GeneralLayout>
  );
};

export default DetailsPage;

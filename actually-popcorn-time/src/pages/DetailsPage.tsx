import GeneralLayout from "../layouts/GeneralLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DetailsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}movies/${id}`)
      .then((res) => res.json())
      .then((fetchedMovie) => {
        setMovie(fetchedMovie);
      });
  }, [apiUrl, id]);

  useEffect(() => {
    fetch(`${apiUrl}ratings/${id}`)
      .then((res) => res.json())
      .then((fetchedRatings) => {
        setRatings(fetchedRatings);
      });
  }, [apiUrl, id]);

  return (
    <GeneralLayout title={"Popcorn Time Movie Detail Page"}>
      {/* Displaying the movie details */}
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>Director: {movie.director}</p>
          <p>Year: {movie.year}</p>
          <p>genre: {movie.genre}</p>
          <p>stars: {movie.stars}</p>
        </div>
      ) : (
        // While movie is null, show loading message
        <p>Movie Loading...</p>
      )}

      {/* Displaying the movie ratings */}
      {ratings ? (
        <div className="pt-10">
          <h1>Ratings</h1>
          <p>{ratings.review}</p>
        </div>
      ) : (
        // While movie is null, show loading message
        <p>Ratings Loading...</p>
      )}
    </GeneralLayout>
  );
};

export default DetailsPage;

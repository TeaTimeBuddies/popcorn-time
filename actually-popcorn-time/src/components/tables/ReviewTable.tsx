import { Link } from "react-router-dom";
import { Rating } from "../../pages/DetailsPage";
import { Movie } from "../../pages/MoviesPage";

type ReviewTableProps = {
  ratings: Rating[];
  movie?: Movie;
};

const RatingHeaders = ["Username", "Rating", "Review"];
const ReviewTable = ({ ratings, movie }: ReviewTableProps) => {
  return (
    <>
      {/* Displaying the movie ratings */}
      {ratings.length > 0 ? (
        <table className="table table-md text-primary">
          <thead className="text-primary">
            <tr>
              {RatingHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((r: Rating) => (
              <tr key={r.id} className="hover">
                <td>{r.username}</td>
                <td>{r.rating}/5</td>
                <td>{r.review}</td>
                <td>
                  {/* This is the comments section for reviews */}
                  <Link to={`/comments/${r.id}`}>
                    <div className="flex items-center justify-center">
                      <p className="w-5 text-center">{r.comments_count}</p>
                      <svg
                        className="h-6 w-6 text-primary"
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
      ) : movie ? (
        <div className="mt-10 text-primary">No ratings yet</div>
      ) : (
        <div className="flex gap-2">
          <span className="text-primary">Loading Ratings...</span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default ReviewTable;

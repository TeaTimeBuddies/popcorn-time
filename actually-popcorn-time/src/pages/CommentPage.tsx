import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import CommentPageLayout from "../layouts/CommentPageLayout";
import useFetchWithToken from "../hooks/useToken";

const CommentPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  // const [review, setReview] = useState(null);
  // const [comment, setComment] = useState(null);

  // useEffect(() => {
  //   fetch(`${apiUrl}ratings/index/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setReview(data[0]);
  //     });
  // }, [apiUrl, id]);

  // Fetching review details
  const { data: review, error: reviewError, isLoading: reviewLoading } = useFetchWithToken(`${apiUrl}ratings/index/${id}`);
  useEffect(() => {
    if (reviewError) {
      console.error(reviewError); // Log the error
    }
  }, [reviewError]);

  // useEffect(() => {
  //   fetch(`${apiUrl}comment/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const comments = data.map((comment: any) => ({
  //         ...comment,
  //         id: comment.id,
  //         user_id: comment.user_id,
  //         rating_id: comment.rating_id,
  //         comment: comment.comment,
  //       }));
  //       setComment(comments);
  //     });
  // }, [apiUrl, id]);

  // Fetching comments
  const { data: fetchedComments, error: commentsError, isLoading: commentsLoading } = useFetchWithToken(`${apiUrl}comment/${id}`);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (fetchedComments) {
      const comments = fetchedComments.map((comment: any) => ({
        ...comment,
        id: comment.id,
        user_id: comment.user_id,
        rating_id: comment.rating_id,
        comment: comment.comment,
      }));
      setComments(comments);
    }

    if (commentsError) {
      console.error(commentsError); // Log the error
    }
  }, [fetchedComments, commentsError]);

  return (
    <GeneralLayout title={"Comment Page"}>
      {reviewError || commentsError ? (
        <p>Error loading comments. Please try again later.</p>
      ) : review && comments ? (
        <CommentPageLayout ratings={review} comments={comments} />
      ) : (
        <p>Comment Loading...</p>
      )}
    </GeneralLayout>
  );
};

export default CommentPage;

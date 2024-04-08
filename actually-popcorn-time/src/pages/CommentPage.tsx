import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import CommentPageLayout from "../layouts/CommentPageLayout";

const CommentPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}ratings/index/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data[0]);
      });
  }, [apiUrl, id]);

  useEffect(() => {
    fetch(`${apiUrl}comment/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const comments = data.map((comment: any) => ({
          ...comment,
          id: comment.id,
          user_id: comment.user_id,
          rating_id: comment.rating_id,
          comment: comment.comment,
        }));
        setComment(comments);
      });
  }, [apiUrl, id]);

  return (
    <GeneralLayout title={"Comment Page"}>
      {review && comment ? (
        <>
          <CommentPageLayout ratings={review} comments={comment} />
        </>
      ) : (
        <p>Comment Loading...</p>
      )}
    </GeneralLayout>
  );
};

export default CommentPage;

import React, { useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { useNavigate } from "react-router-dom";
import MovieForm from "../components/forms/MovieForm";
import SuccessToast from "../components/SuccessToast";

const AddMoviePage: React.FC = () => {
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 5000);
  };

  return (
    <GeneralLayout title="Add a New Movie">
      <MovieForm onSuccess={handleSuccess} />
      {showSuccessToast && (
        <SuccessToast message="Successfully added movie. Please wait for admin approval.">
          <button
            className="btn btn-neutral btn-xs text-primary"
            onClick={() => {
              navigate("/movies");
            }}
          >
            Go to movie page
          </button>
        </SuccessToast>
      )}
    </GeneralLayout>
  );
};

export default AddMoviePage;

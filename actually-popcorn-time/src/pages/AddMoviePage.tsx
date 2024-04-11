import React, { useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import MovieForm from "../components/forms/MovieForm";
import Toast from "../components/Toast";

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
    <UserLayout title="Add a New Movie">
      <MovieForm onSuccess={handleSuccess} />
      {showSuccessToast && (
        <Toast
          toasts={[
            {
              message:
                "Successfully added movie. Please wait for admin approval.",
              children: (
                <button
                  className="btn btn-neutral btn-xs text-primary"
                  onClick={() => {
                    navigate("/movies");
                  }}
                >
                  Go to movie page
                </button>
              ),
            },
          ]}
        />
      )}
    </UserLayout>
  );
};

export default AddMoviePage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate
import GeneralLayout from "../layouts/GeneralLayout";
import RegisterForm from "../components/forms/RegisterForm";
import SuccessToast from "../components/Toast";
import Toast from "../components/Toast";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const apiUrl = `${import.meta.env.VITE_API_URL}signup`;

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const handleErrors = (errors: string) => {
    setError(errors);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return (
    <GeneralLayout>
      <RegisterForm onSuccess={handleSuccess} onErrors={handleErrors} />

      {success && (
        <Toast message="Registration sucessful. Please wait for admin approval.">
          <button
            className="btn btn-neutral btn-xs text-primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to login
          </button>
        </Toast>
      )}

      {error && <Toast status="error" message={error}></Toast>}
    </GeneralLayout>
  );
};

export default RegisterPage;

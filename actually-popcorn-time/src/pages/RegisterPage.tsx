import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralLayout from "../layouts/GeneralLayout";
import RegisterForm from "../components/forms/RegisterForm";
import Toast from "../components/Toast";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
        <Toast
          toasts={[
            {
              message:
                "Registration successful. Please wait for admin approval.",
              children: (
                <button
                  className="btn btn-neutral btn-xs text-primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to Main Page
                </button>
              ),
            },
          ]}
        />
      )}

      {error && <Toast toasts={[{ status: "error", message: error }]} />}
    </GeneralLayout>
  );
};

export default RegisterPage;

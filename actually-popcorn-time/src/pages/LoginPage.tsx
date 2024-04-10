import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralLayout from "../layouts/GeneralLayout";
import Toast from "../components/Toast";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleErrors = (errors: string[]) => {
    setErrors(errors);
    setTimeout(() => {
      setErrors([]);
    }, 5000);
  };

  return (
    <GeneralLayout>
      <LoginForm onErrors={handleErrors} />
      {success && (
        <Toast
          toasts={[
            {
              message: "Login Successful!",
              children: (
                <button
                  className="btn btn-neutral btn-xs text-primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to login
                </button>
              ),
            },
          ]}
        ></Toast>
      )}

      {errors.length > 0 && (
        <Toast
          toasts={errors.map((error) => ({ message: error, status: "error" }))}
        />
      )}
    </GeneralLayout>
  );
};

export default LoginPage;

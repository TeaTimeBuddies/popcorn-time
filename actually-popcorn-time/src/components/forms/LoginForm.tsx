import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";
import { useState } from "react";
import ActionButton from "../ActionButton";

type LoginFormProps = {
  onErrors: (errors: string[]) => void;
};

const LoginForm = ({ onErrors }: LoginFormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors([]);
    e.preventDefault();
    setLoading(true);
    if (email.trim() === "" || password.trim() === "") {
      setLoading(false);
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors, "Email and password are required"];
        onErrors(newErrors);
        return newErrors;
      });
    }

    try {
      const response = await fetch(`${API_URL}user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      if (data.status === "success") {
        setLoading(true);
        const user = data.user;
        const token = data.authorisation.token;
        sessionStorage.setItem("user_id", user.id);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("is_admin", user.is_admin.toString());
        sessionStorage.setItem("token", token);
        navigate("/user/dashboard");
      } else {
        throw new Error("Credentials are incorrect");
      }
    } catch (error) {
      setLoading(false);
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors, "Credentials are incorrect"];
        onErrors(newErrors);
        return newErrors;
      });
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4 grid grid-cols-4  items-center gap-2">
        <div className="col-span-4">
          <label className="input input-bordered flex items-center gap-2">
            Email:
            <input
              name="email"
              type="email"
              className="grow"
              value={email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="col-span-4">
          <label className="input input-bordered flex items-center gap-2">
            Password:
            <input
              name="password"
              type="password"
              className="grow"
              value={password}
              onChange={handleChange}
            />
          </label>
        </div>

        <ActionButton
          className="col-span-2 col-start-2"
          buttonText="Login"
          type="submit"
        >
          {loading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
        </ActionButton>
      </div>
    </form>
  );
};

export default LoginForm;

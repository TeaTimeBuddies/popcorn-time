import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralLayout from "../layouts/GeneralLayout";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email: ", email);
    console.log("Password: ", password);

    const response = await fetch(`${apiUrl}user`, {
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

    if (data.status === "success") {
      const user = data.user;
      sessionStorage.setItem("user_id", user.id);
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("is_admin", user.is_admin.toString());
      navigate("/");
    } else {
      console.error("User not found");
    }
  };

  return (
    <GeneralLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </GeneralLayout>
  );
};

export default LoginForm;

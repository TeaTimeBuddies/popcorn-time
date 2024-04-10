import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";
import { useState } from "react";
import ActionButton from "../ActionButton";

type RegisterFormProps = {
  onSuccess: () => void;
  onErrors: (errors: string) => void;
};

type Field = {
  name: string;
  inputType: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegisterForm = ({ onSuccess, onErrors }: RegisterFormProps) => {
  const fields: Field[] = [
    { name: "name", inputType: "text", handleChange: handleChange },
    { name: "email", inputType: "email", handleChange: handleChange },
    { name: "password", inputType: "password", handleChange: handleChange },
  ];

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setErrors(() => [
        "Email must be in correct format e.g. someone@example.com",
      ]);
      onErrors(errors.join("\n"));
      return;
    }



    fetch(`${API_URL}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        is_approved: false,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setErrors(["Failed to register user."]);
          console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setErrors([data.message]);
        } else {
          onSuccess();
        }
      })
      .catch((error: unknown) => {
        setErrors(() => [`There was an error processing your request`]);
        onErrors(errors.join("\n"));
        console.error("Registration error:", error);
      });
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4 grid grid-cols-4  items-center gap-2">
        {fields.map((f, index) => (
          <div key={index} className="col-span-4">
            <label
              key={index}
              className="input input-bordered flex items-center gap-2"
            >
              {f.name.charAt(0).toUpperCase() + f.name.slice(1).toLowerCase()} :
              <input
                name={f.name}
                type={f.inputType}
                className="grow"
                value={user[f.name as keyof typeof user]}
                onChange={f.handleChange}
              />
            </label>
          </div>
        ))}
        <ActionButton
          className="col-span-2 col-start-2"
          buttonText="Register"
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

export default RegisterForm;

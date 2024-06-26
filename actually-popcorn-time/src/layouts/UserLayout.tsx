import { ReactNode } from "react";
import NavBar from "../components/Navbar";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type UserLayoutProps = {
  title?: string;
  children?: ReactNode;
};

const UserLayout = ({ title, children }: UserLayoutProps) => {
  const navigate = useNavigate();
  const isUser = useUser();

  useEffect(() => {
    if (!isUser) {
      navigate("/404");
    }
  }, [isUser, navigate]);
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-app100">
      <NavBar />
      <div className="mt-20">
        {title && (
          <h1 className="text-center text-6xl text-action">{title}</h1>
        )}
        {children}
      </div>
    </div>
  );
}

export default UserLayout;

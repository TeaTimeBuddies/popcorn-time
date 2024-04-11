import { ReactNode } from "react";
import NavBar from "../components/Navbar";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type UserLayoutProps = {
  title?: string;
  children?: ReactNode;
  userId: number;
};

const UserLayout = ({ title, children, userId }: UserLayoutProps) => {
  const navigate = useNavigate();
  const { isUser } = useUser(userId);

  useEffect(() => {
    if (!isUser) {
      navigate("/404");
    }
  }, [isUser, navigate]);

  if (!isUser) {
    return null;
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-app100">
      <NavBar />
      <div className="mt-20">
        {title && (
          <h1 className="text-center text-6xl text-blue-500">{title}</h1>
        )}
        {children}
      </div>
    </div>
  );
};

export default UserLayout;

import { ReactNode, useEffect } from "react";
import NavBar from "../components/Navbar";
import { useAdmin } from "../hooks/useAdmin";
import { useNavigate } from "react-router-dom";

type AdminLayoutProps = {
  title?: string;
  children?: ReactNode;
};

const AdminLayout = ({ title, children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const isAdmin = useAdmin();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/Unauthorized");
    }});
  
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


export default AdminLayout;

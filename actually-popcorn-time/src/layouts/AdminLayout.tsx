import { ReactNode } from "react";
import NavBar from "../components/Navbar";
import { useAdmin } from "../hooks/useAdmin";
import { redirect } from "react-router-dom";

type AdminLayoutProps = {
  title?: string;
  children?: ReactNode;
  userId: number;
};

const AdminLayout = ({ title, children, userId }: AdminLayoutProps) => {
  const { isAdmin } = useAdmin(userId);
  if (!isAdmin) {
    return redirect("/404");
  } else {
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
  }
};

export default AdminLayout;

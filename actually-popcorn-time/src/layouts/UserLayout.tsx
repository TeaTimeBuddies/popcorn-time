import { ReactNode } from "react";
import NavBar from "../components/Navbar";
import { useUser } from "../hooks/useUser";
import { redirect } from 'react-router-dom';

type UserLayoutProps = {
    title?: string;
    children?: ReactNode;
    userId: number;
};

const UserLayout = ({ title, children, userId }: UserLayoutProps) => {

    const { isUser } = useUser(userId);
    if (!isUser) {
        return redirect("/404");
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

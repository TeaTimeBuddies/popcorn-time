import { ReactNode } from "react";
import NavBar from "../components/Navbar";

type GeneralLayoutProps = {
  title?: string;
  children?: ReactNode;
};

const GeneralLayout = ({ title, children }: GeneralLayoutProps) => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-app100">
      <NavBar />

      {title && <h1 className="text-center text-6xl text-blue-500">{title}</h1>}
      {children}
    </div>
  );
};

export default GeneralLayout;

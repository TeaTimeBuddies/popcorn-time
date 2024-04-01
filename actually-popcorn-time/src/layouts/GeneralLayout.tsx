import { ReactNode } from "react";
import NavBar from "../components/Navbar";

type GeneralLayoutProps = {
  title?: string;
  children?: ReactNode;
};

const GeneralLayout = ({ title = "Title", children }: GeneralLayoutProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <NavBar />

      <h1 className="text-center text-6xl text-blue-500">{title}</h1>
      {children}
    </div>
  );
};

export default GeneralLayout;

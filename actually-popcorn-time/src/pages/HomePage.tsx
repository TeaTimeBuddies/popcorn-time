import { ReactNode } from "react";

type HomePageProps = {
  title?: string;
  children?: ReactNode;
};

const HomePage = ({ title = "Title", children }: HomePageProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-center text-6xl text-blue-500">{title}</h1>
      <p>{children}</p>
    </div>
  );
};

export default HomePage;

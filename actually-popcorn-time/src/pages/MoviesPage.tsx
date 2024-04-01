import { ReactNode } from "react";

type MoviesPageProps = {
  title?: string;
  children?: ReactNode;
};

const MoviesPage = ({ title = "Title", children }: MoviesPageProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{children}</p>

      <span></span>
    </div>
  );
};

export default MoviesPage;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MoviesPage from "../pages/MoviesPage";
import DetailsPage from "../pages/DetailsPage";
import HomePage from "../pages/HomePage";
import AddMoviePage from "../pages/AddMoviePage"
import ApproveMoviePage from "../pages/ApproveMoviePage"

/**
 * The router configuration for the application.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage title={"Popcorn Time Home Page"}></HomePage>,
      },
      {
        path: "/movies",
        element: (
          <MoviesPage
            title={"This is the page that shows all the movies"}
          ></MoviesPage>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <DetailsPage
            title={"This is the page that shows all the movies"}
          ></DetailsPage>
        ),
      },
      {
        path: "/movies/add",
        element: (
          <AddMoviePage
            title={"This is the page where users add movies"}
          ></AddMoviePage>
        ),
      },
      {
        path: "/movies/approve",
        element: (
          <ApproveMoviePage
            title={"This is the page where admins approve movies"}
          ></ApproveMoviePage>
        ),
      },
    ],
  },
]);

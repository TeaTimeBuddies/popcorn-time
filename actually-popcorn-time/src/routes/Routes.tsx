import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MoviesPage from "../pages/MoviesPage";
import DetailsPage from "../pages/DetailsPage";
import HomePage from "../pages/HomePage";

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
    ],
  },
]);

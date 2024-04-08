import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MoviesPage from "../pages/MoviesPage";
import DetailsPage from "../pages/DetailsPage";
import CommentPage from "../pages/CommentPage";
import HomePage from "../pages/HomePage";
import AddMoviePage from "../pages/AddMoviePage";
import ApproveMoviePage from "../pages/ApproveMoviePage";
import LoginForm from "../pages/LoginPage";
import UserDashboardPage from "../pages/user/UserDashboardPage";
import RegisterPage from "../pages/RegisterPage";

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
        path: "/comments/:id",
        element: (
          <CommentPage
            title={
              "This is he page that shows user comments on review for a movie"
            }
          ></CommentPage>
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
      {
        path: "/login",
        element: (
          <LoginForm title={"This is the page where users login"}></LoginForm>
        ),
      },
      {
        path: "/register",
        element: (
          <RegisterPage
            title={"This is the page where users login"}
          ></RegisterPage>
        ),
      },

      {
        path: "/user/dashboard",
        element: (
          <UserDashboardPage
            title={"this is the user dashboard"}
          ></UserDashboardPage>
        ),
      },
    ],
  },
]);

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
        element: <HomePage></HomePage>,
      },
      {
        path: "/movies",
        element: <MoviesPage></MoviesPage>,
      },
      {
        path: "/details/:id",
        element: <DetailsPage></DetailsPage>,
      },
      {
        path: "/comments/:id",
        element: <CommentPage></CommentPage>,
      },
      {
        path: "/movies/add",
        element: <AddMoviePage></AddMoviePage>,
      },
      {
        path: "/movies/approve",
        element: <ApproveMoviePage></ApproveMoviePage>,
      },
      {
        path: "/login",
        element: <LoginForm></LoginForm>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },

      {
        path: "/user/dashboard",
        element: <UserDashboardPage name="User"></UserDashboardPage>,
      },
    ],
  },
]);

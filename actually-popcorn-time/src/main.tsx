import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes/Routes";
import { RouterProvider } from "react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

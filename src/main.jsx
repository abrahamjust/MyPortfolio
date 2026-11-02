import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Layout from "./components/Layout.jsx";
import Home from "./HomePage/Home.jsx";
import Contact from "./ContactPage/contactPage.jsx";
import Project from "./ProjectPage/ProjectPage.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,                // header, scroll and reveal for every page
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects/:slug", element: <Project /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
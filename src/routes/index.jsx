import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../components/home";
import Lyrics from "../components/lyrics";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "lrc",
    Component: Lyrics,
  },
]);
export default router;

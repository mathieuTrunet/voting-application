import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import AdministrationPage from "./pages/administrationPage.tsx";
import UserPage from "./pages/UserPage/userPage.tsx";

const router = createBrowserRouter([
  {
    path: "/administrator",
    element: <AdministrationPage />,
  },
  {
    path: "/user",
    element: <UserPage/>,
  },
  {
    path: "/",
    element: <App/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

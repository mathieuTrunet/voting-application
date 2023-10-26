import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import AdministrationPage from "./pages/administrationPage.jsx";
import UserPage from "./pages/UserPage/userPage.jsx";

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

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);
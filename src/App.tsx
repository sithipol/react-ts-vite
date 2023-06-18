// import React from "react";
// import LoginPage from "@/components/pages/LoginPage";
import "./App.css";
// import Hello from "./components/Hello";
import Navbars from "@/components/layouts/navbars/Navbars";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import UserList from "./components/pages/Users/List";
import UserCreate from "./components/pages/Users/Create";
import UserUpdate from "./components/pages/Users/Update";

// import Table from "./components/Tables/Table";
type Props = {};
const navigation = [
  { id: 1, name: "Home", to: "/" },
  { id: 2, name: "Service", to: "/service" },
  { id: 3, name: "Blog", to: "/blog" },
  { id: 4, name: "Contact", to: "/contact" },
];
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/create",
    element: <UserCreate />,
  },
  {
    path: "/update/:id",
    element: <UserUpdate />,
  },
]);

export default function App({}: Props) {
  return (
    <div className="bg-white">
      <Navbars />
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

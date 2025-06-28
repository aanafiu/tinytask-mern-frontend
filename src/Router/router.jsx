import { createBrowserRouter } from "react-router";

import HomeLayout from "../Layouts/HomeLayout";
import MainLayout from "../Layouts/MainLayout";
import Register from "../Components/AuthProvider/Register";
import Login from "../Components/AuthProvider/Login";
import AdminLogin from "../Components/Admin/AdminLogin";
import Admin from "../Components/Admin/Admin";
import AdminLayout from "../Layouts/AdminLayout";

import TaskLayout from "../Layouts/TaskLayout";
import Questions from "../Components/User/Questions/Questions";
import Packages from "../Components/Packages/Packages";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "../Components/AuthProvider/PrivateRoutes";
import PublicRoute from "../Components/AuthProvider/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path: "/home",
        element: <HomeLayout />,
      },
      {
        path: "/tasks",
        element: <PrivateRoute><TaskLayout /></PrivateRoute>,
        children: [
          {
            path: "",
            element: <Questions />,
            loader: () =>
              fetch(`https://tinytask-backend.vercel.app/all-questions`),
          },
          {
            path: ":category",
            element: <Questions />,
            loader: ({ params }) =>
              fetch(
                `https://tinytask-backend.vercel.app/all-questions?category=${params.category}`
              ),
          },
        ],
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
      },
      {
        path: "/packages",
        element: <Packages></Packages>,
      },
      {
  path: "stats",
  element: <div className="text-2xl font-bold mx-auto w-fit max-h-dvh text-Gold">Stats Page On Process</div>,
},{
  path:"contact",
  element: <div className="text-2xl font-bold mx-auto w-fit max-h-dvh text-Gold">Contact Page On Process</div>,
},
      {
        path: "/register",
        element: <PublicRoute><Register /></PublicRoute>,
      },
      {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminLogin />,
      },
      { path: "dashboard", element: <Admin></Admin> },
    ],
  },

  {
    path: "/test",
    element: <div className="text-2xl text-Gold">Hello World</div>,
  },
]);

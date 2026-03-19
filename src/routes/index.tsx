import { RouteObject } from "react-router-dom";
import Dashboard from "../app/dashbord/Dashboard";
import Product from "../app/product/index";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/product",
    element: <Product />,
  },
];

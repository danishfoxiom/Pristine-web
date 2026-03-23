import { RouteObject } from "react-router-dom";
import Dashboard from "../app/dashbord/Dashboard";
import Product from "../app/product/index";
import Patient from "../app/patient";
import PatientForm from "../app/patient/PatientForm";

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
    path: "/patient",
    element: <Patient />,
  },
  {
    path: "/patient/add",
    element: <PatientForm />,
  },
  {
    path: "/product",
    element: <Product />,
  },
];

import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FoodDetails from "./../pages/FoodDetails";
import ProtectedRoute from "./ProtectedRoute";
import AddFood from "./../pages/AddFood";
import AvailableFoods from "./../pages/AvailableFoods";
import ManageMyFoods from './../pages/ManageMyFoods';
import FoodRequestsTable from "../pages/FoodRequestsTable ";

const route = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    /* errorElement: <ErrorPage />, */
    children: [
      { index: true, Component: Home },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      { path: "available-foods", Component: AvailableFoods },
      {
        path: "add-food",
        element: (
          <ProtectedRoute>
            <AddFood />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-my-foods",
        element: (
          <ProtectedRoute>
            <ManageMyFoods />
          </ProtectedRoute>
        ),
      },
      {
        path: "food-requests-table",
        element: (
          <ProtectedRoute>
            <FoodRequestsTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "food-details/:id",
        loader: async ({ params }) => {
          const res = await fetch(
            `http://localhost:3000/food-details/${params.id}`
          );
          if (!res.ok)
            throw new Response("Food not found", { status: res.status });
          return res.json();
        },
        element: (
          <ProtectedRoute>
            <FoodDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default route;

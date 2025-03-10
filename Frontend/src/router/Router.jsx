import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

// import Requirements from "../pages/Content/Requirement";
import { AuthGuard, ProtectedRoute } from "../guards/Authguard";
import Dashboard from "../pages/Dashboard";
import { Chart } from "chart.js";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
          <AuthGuard>
            <Landing />
          </AuthGuard>
        ),
    },
    {
        path: "/login",
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
    },
    {
        path: "/register",
        element: (
          <AuthGuard>
            <Register />
          </AuthGuard>
        ),
    },

]);

export default router;
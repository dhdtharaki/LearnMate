import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Landing from "../pages/LandingPage";
import Home from "../pages/Home";

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
    {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
    },
    {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
    },

]);

export default router;
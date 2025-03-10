import { createBrowserRouter } from "react-router-dom";

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

]);

export default router;
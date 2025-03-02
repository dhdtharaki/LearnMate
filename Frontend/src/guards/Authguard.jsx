import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (userLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  return children;
};

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthRedirector = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL path

  useEffect(() => {
    if (!isLoading && !isAuthenticated && location.pathname !== "/") {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  return null;
};

export default AuthRedirector;

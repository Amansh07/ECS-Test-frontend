import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../auth/AuthService";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const user = await AuthService.getUser();
        if (!isMounted) return;

        setIsAuthenticated(!!user && !user.expired);
      } catch (error) {
        if (isMounted) setIsAuthenticated(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * While checking auth → render nothing / loader
   */
  if (isAuthenticated === null) {
    return null; // or a spinner
  }

  /**
   * Not authenticated → redirect to login
   */
  if (!isAuthenticated) {
    AuthService.signIn();
    return <Navigate to="/" replace />;
  }

  /**
   * Authenticated → render protected content
   */
  return children;
};

export default PrivateRoute;

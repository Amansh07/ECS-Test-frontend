import { Navigate, useLocation } from "react-router-dom";
import AuthService from "../auth/AuthService";

/**
 * Simple JWT-based private route
 */
const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const token = AuthService.getAccessToken();

  // Not logged in
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // OPTIONAL: Check JWT expiry
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      AuthService.logout();
      return (
        <Navigate
          to="/login"
          replace
          state={{ from: location }}
        />
      );
    }
  } catch (e) {
    // Invalid token format
    AuthService.logout();
    return <Navigate to="/login" replace />;
  }

  // Authenticated
  return children;
};

export default PrivateRoute;

import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "../auth/AuthService";

const PrivateRoute = ({ allowedRoles, blockedRoles }) => {
  const location = useLocation();
  const token = AuthService.getAccessToken();
  const role = localStorage.getItem("role");

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Block specific roles (like Admin)
  if (blockedRoles && blockedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Allow only specific roles (if provided)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

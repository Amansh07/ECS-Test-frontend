import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "../auth/AuthService";

const PrivateRoute = () => {
  const location = useLocation();
  const token = AuthService.getAccessToken();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default PrivateRoute;

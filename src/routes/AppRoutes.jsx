import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Registration from "../pages/registration/Registration";
import Login from "../pages/login/login";
import PrivateRoute from "./PrivateRoute";
import MemberManagementRoutes from "./MemberManagementRoutes";

const AppRoutes = () => {
  return (
    <Routes>
       <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Registration />} />
        <Route path="/registration" element={<Registration />} />
        {MemberManagementRoutes()}

        {/*
        <Route
          path="/fpo"
          element={
            <PrivateRoute>
              <FpoList />
            </PrivateRoute>
          }
        />
        */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;

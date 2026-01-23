import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Registration from "../pages/registration/Registration";
import Login from "../pages/login/Login";
import PrivateRoute from "./PrivateRoute";
import MemberManagementRoutes from "./MemberManagementRoutes";
import ProductionDetailsRoutes from "./ProductionDetailsRoutes";
import FpoServicesRoutes from "./FpoServicesRoutes";
import ComplianceRoutes from "./ComplianceRoutes";
import Dashboard from "../pages/dashboard/Dashboard";
import Homepage from "../pages/homepage/Homepage";

// Force HMR update
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/registration" element={<Registration />} />

        {MemberManagementRoutes()}
        {ProductionDetailsRoutes()}
        {ComplianceRoutes()}
        {FpoServicesRoutes()}

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

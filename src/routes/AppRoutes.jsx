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
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import ForgotPassword from "../pages/login/ForgotPassword";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Public main layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/registration" element={<Registration />} />

        {/* PROTECTED: Member Management ONLY */}
        <Route element={<PrivateRoute />}>
          {MemberManagementRoutes()}
        </Route>

        {/* Public */}
        {ProductionDetailsRoutes()}
        {ComplianceRoutes()}
        {FpoServicesRoutes()}
      </Route>
    </Routes>
  );
};

export default AppRoutes;

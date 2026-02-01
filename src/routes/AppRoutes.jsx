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
  const role = localStorage.getItem("role");
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
        <Route path="/" element={<Homepage />} />
        <Route path="/registration" element={<Registration />} />

        {/* PROTECTED: Role Admin */}
        <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route>

        {/* PROTECTED: Role Not an Admin */}
        <Route element={<PrivateRoute blockedRoles={["Admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {MemberManagementRoutes()}
          {ProductionDetailsRoutes()}
          {ComplianceRoutes()}
          {FpoServicesRoutes()}
        </Route>

      </Route>
    </Routes>
  );
};

export default AppRoutes;

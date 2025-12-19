import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Registration from "./pages/registration/Registration.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Registration />} />
        {/* Add more routes here that share the same layout */}
      </Route>
    </Routes>
  );
}

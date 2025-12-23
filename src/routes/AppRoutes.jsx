import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Registration from "../pages/registration/Registration";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Registration />} />
        <Route path="/registration" element={<Registration />} />

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

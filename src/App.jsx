import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Registration from "./pages/registration/Registration";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Registration />} />
        <Route path="/registration" element={<Registration />} />
      </Route>
    </Routes>
  );
}

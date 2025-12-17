import { Outlet } from "react-router-dom";
import Header from "../layouts/Header.jsx";
import LeftNav from "../layouts/LeftNav.jsx";
import Footer from "../layouts/Footer.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <LeftNav />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

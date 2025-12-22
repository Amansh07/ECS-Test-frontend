import { Outlet } from "react-router-dom";
import Header from "../layout/Header.jsx";
import LeftNav from "../layout/LeftNav.jsx";
import Footer from "../layout/Footer.jsx";


export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <LeftNav />
        <main id="main-content" className="flex-1 p-6 app-page-with-header"> 
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

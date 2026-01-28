import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import loginBackground from "../assets/loginBackground.jpg";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-grey-50 flex flex-col">
      <Header />

     <main
        className="flex items-center justify-end min-h-screen bg-cover bg-center bg-no-repeat pt-[50px]"
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

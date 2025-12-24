// import { Outlet } from "react-router-dom";
// import Header from "../layouts/Header.jsx";
// import LeftNav from "../layouts/LeftNav.jsx";
// import Footer from "../layouts/Footer.jsx";


// export default function MainLayout() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Header />

//       <div className="flex flex-1">
//         <LeftNav />
//         <main id="main-content" className="flex-1 p-6 app-page-with-header">
//           <Outlet />
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// import React from "react";
// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";
// import LeftNav from "./LeftNav";

// export default function MainLayout() {
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [collapsed, setCollapsed] = React.useState(false);

//   // Close mobile drawer when switching to desktop (lg)
//   React.useEffect(() => {
//     const mq = window.matchMedia("(min-width: 1024px)");
//     const handler = (e) => {
//       if (e.matches) setMobileOpen(false);
//     };
//     handler(mq);
//     mq.addEventListener("change", handler);
//     return () => mq.removeEventListener("change", handler);
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col bg-grey-50">
//       <Header />

//       {/* Mobile hamburger: below header, top-left */}
//       <button
//         type="button"
//         onClick={() => setMobileOpen(true)}
//         className={[
//           "lg:hidden",
//           "fixed left-3 top-16 z-50",              // positioning [web:128][web:129][web:127]
//           "h-10 w-10 rounded-md",
//           "bg-text-light border border-stroke-200 shadow-sm",
//           "flex items-center justify-center",
//           "transition hover:border-primary-300",
//         ].join(" ")}
//         aria-label="Open menu"
//       >
//         ☰
//       </button>

//       <div className="flex flex-1">
//         <LeftNav
//           mobileOpen={mobileOpen}
//           onCloseMobile={() => setMobileOpen(false)}
//           collapsed={collapsed}
//           onToggleCollapsed={() => setCollapsed((v) => !v)}
//         />

//         <main id="main-content" className="flex-1 p-4 lg:p-6 app-page-with-header">
//           <Outlet />
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// }
// MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LeftNav from "./LeftNav";
import { Button } from "../components/Buttons";

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)"); // lg
    const handler = (e) => {
      if (e.matches) setMobileOpen(false);
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="min-h-screen bg-grey-50">
      <Header />

      {/* CONTENT ZONE: exactly between fixed header and footer */}
      <div
        className={[
          "pt-[var(--app-header-h)] pb-[var(--app-footer-h)]",
          "h-screen overflow-hidden", // prevent body scroll; main will scroll [web:172]
        ].join(" ")}
      >
        {/* Mobile hamburger (below header, not overlapping) */}
        <Button
          type="button"
          onClick={() => setMobileOpen(true)}
          buttonClassName={[
            "lg:hidden",
            "fixed left-3 z-50",
            "top-[calc(var(--app-header-h)+var(--app-gutter))]", // positions below header [web:129][web:152]
            "h-10 w-10 rounded-md bg-text-light border border-stroke-200 shadow-sm",
            "flex items-center justify-center",
            "transition hover:border-primary-300",
          ].join(" ")}
          aria-label="Open menu"
        >
          ☰
        </Button>

        <div className="flex h-full">
          <LeftNav
            mobileOpen={mobileOpen}
            onCloseMobile={() => setMobileOpen(false)}
            collapsed={collapsed}
            onToggleCollapsed={() => setCollapsed((v) => !v)}
          />

          {/* Only main scrolls */}
          <main id="main-content" className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

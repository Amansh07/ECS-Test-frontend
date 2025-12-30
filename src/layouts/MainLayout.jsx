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
          {/* ☰ */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
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
  {/* Dynamic tabs only for member-management */}
  {window.location.pathname.startsWith("/member-management") && (
    <div className="mb-4">
      <div className="flex gap-4 relative">
        {/* Single line under tabs */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5C0D8]"></div>

        {[ 
          { title: "Farmers", path: "farmers" },
          { title: "Board Members", path: "board-members" },
          { title: "Resources", path: "resources" },
          { title: "Mentors", path: "mentors" },
        ].map((tab) => {
          const isActive = window.location.pathname.endsWith(tab.path);
          return (
            <div
              key={tab.path}
              onClick={() =>
                (window.location.href = `/member-management/${tab.path}`)
              }
              className={[
                "cursor-pointer rounded-tr-[8px] rounded-tl-[8px] z-10 h-[36px] flex items-center justify-center p-2",
                isActive
                  ? "bg-[#F8FFE5] border-b-2 border-[#4A6600]"
                  : "hover:border-b-2 hover:border-b-[#4A6600]",
              ].join(" ")}
            >
              <p className="text-[14px] font-medium">{tab.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  )}

  <Outlet />
</main>


        </div>
      </div>

      <Footer />
    </div>
  );
}

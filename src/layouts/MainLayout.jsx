// MainLayout.jsx
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LeftNav from "./LeftNav";
import { Button } from "../components/Buttons";

// TabsWithScroll Component
function TabsWithScroll({ location, navigate }) {
  const scrollContainerRef = React.useRef(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(false);

  const tabs = [
    { title: "Farmers", path: "farmers" },
    { title: "Board Members", path: "board-members" },
    { title: "Board Members (Company Act)", path: "board-members-company-act" },
    { title: "Resources", path: "resources" },
    { title: "Mentors", path: "mentors" },
  ];

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Scroll left by 200px
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // Scroll right by 200px
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Check scroll on mount and when tabs change
  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-white to-white/80 shadow-lg rounded-full p-2.5 hover:shadow-xl transition-all border border-grey-200"
          aria-label="Scroll left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A6600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      {/* Scrollable Tabs Container */}
      <div className="relative">
        {/* Single line under tabs - positioned relative to outer container */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-stroke-200 z-0"></div>

        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 relative overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab) => {
            const isActive = location.pathname.endsWith(tab.path);
            return (
              <div
                key={tab.path}
                onClick={() => navigate(`/member-management/${tab.path}`)}
                className={[
                  "cursor-pointer rounded-tr-[8px] rounded-tl-[8px] z-10 h-[36px] flex items-center justify-center px-4 whitespace-nowrap flex-shrink-0",
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

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-white to-white/80 shadow-lg rounded-full p-2.5 hover:shadow-xl transition-all border border-grey-200"
          aria-label="Scroll right"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A6600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
}


export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-white">
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
            {location.pathname.startsWith("/member-management") && (
              <div className="mb-4 mt-16 lg:mt-0">
                <TabsWithScroll location={location} navigate={navigate} />
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

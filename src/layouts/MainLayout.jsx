import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LeftNav from "./LeftNav";
import { Button } from "../components/Buttons";

/* ============================================================
   TabsWithScroll (NO DEFAULTS)
============================================================ */
function TabsWithScroll({ location, navigate, tabs, basePath }) {
  const scrollContainerRef = React.useRef(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <div className="relative">
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-white to-white/80 shadow-lg rounded-full p-2.5 border border-grey-200"
        >
          ◀
        </button>
      )}

      <div className="relative">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-stroke-200 z-0" />

        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {tabs.map((tab) => {
            const isActive = location.pathname.endsWith(tab.path);

            return (
              <div
                key={tab.path}
                onClick={() => navigate(`${basePath}/${tab.path}`)}
                className={[
                  "cursor-pointer rounded-tr-[8px] rounded-tl-[8px] z-10 h-[36px] flex items-center px-4 whitespace-nowrap",
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

      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-white to-white/80 shadow-lg rounded-full p-2.5 border border-grey-200"
        >
          ▶
        </button>
      )}
    </div>
  );
}

/* ============================================================
   MainLayout
============================================================ */
export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => e.matches && setMobileOpen(false);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ================= TAB CONFIGS ================= */
  const memberManagementTabs = [
    { title: "Farmers", path: "farmers" },
    { title: "Board Members", path: "board-members" },
    { title: "Board Members (Company Act)", path: "board-members-company-act" },
    { title: "Resources", path: "resources" },
    { title: "Mentors", path: "mentors" },
    { title: "FPO Land Details Update/View", path: "land-details" },
  ];

  const productionDetailsTabs = [
    { title: "Crop Production", path: "crop-production" },
    { title: "Commodity Production", path: "commodity-production" },
  ];

  const fpoServicesTabs = [
    { title: "Fertilizer Details", path: "fertilizer-details" },
    { title: "Insecticide/Pesticide Details", path: "insecticide-or-pesticide-details" },
    { title: "Machinery/Equipment Details", path: "machinery" },
    { title: "Infrastructure Details", path: "infrastructure-form" },
    { title: "Infrastructure", path: "infrastructure" },
  ];

  const complianceTabs = [
    { title: "Annual Turnover", path: "annual-turnover" },
    { title: "FPO Capital Update/View", path: "fpo-capital" },
    { title: "AGM Meeting Update/View", path: "agm-meeting" },
    { title: "Bank Details", path: "bank-details" },
    { title: "License Update", path: "license-update" },
  ];

  /* ================= ROUTE MATCH ================= */
  let tabsConfig = null;

  if (location.pathname.startsWith("/member-management") && location.pathname !== "/member-management" && location.pathname !== "/member-management/") {
    tabsConfig = {
      tabs: memberManagementTabs,
      basePath: "/member-management",
    };
  } else if (location.pathname.startsWith("/production-details") && location.pathname !== "/production-details" && location.pathname !== "/production-details/") {
    tabsConfig = {
      tabs: productionDetailsTabs,
      basePath: "/production-details",
    };
  } else if (location.pathname.startsWith("/fpo-services") && location.pathname !== "/fpo-services" && location.pathname !== "/fpo-services/") {
    tabsConfig = {
      tabs: fpoServicesTabs,
      basePath: "/fpo-services",
    };
  } else if (location.pathname.startsWith("/compliance") && location.pathname !== "/compliance" && location.pathname !== "/compliance/") {
    tabsConfig = {
      tabs: complianceTabs,
      basePath: "/compliance",
    };
  }


  const hideSidebarRoutes = ["/"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-[var(--app-header-h)] pb-[var(--app-footer-h)] h-screen overflow-hidden">
        {!shouldHideSidebar && (
          <Button
            type="button"
            onClick={() => setMobileOpen(true)}
            buttonClassName="lg:hidden fixed left-3 top-[calc(var(--app-header-h)+var(--app-gutter))] h-10 w-10 bg-text-light border border-stroke-200 shadow-sm"
          >
            ☰
          </Button>
        )}

        <div className="flex h-full">
          {!shouldHideSidebar && (
            <LeftNav
              mobileOpen={mobileOpen}
              onCloseMobile={() => setMobileOpen(false)}
              collapsed={collapsed}
              onToggleCollapsed={() => setCollapsed((v) => !v)}
            />
          )}

          <main className={`flex-1 overflow-y-auto ${location.pathname === '/' ? '' : 'p-4 lg:p-6'}`}>
            {tabsConfig && (
              <div className="mb-4 mt-16 lg:mt-0">
                <TabsWithScroll
                  location={location}
                  navigate={navigate}
                  tabs={tabsConfig.tabs}
                  basePath={tabsConfig.basePath}
                />
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

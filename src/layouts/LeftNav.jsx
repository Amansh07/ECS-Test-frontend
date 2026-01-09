import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../components/Buttons";
import memberManagement from "../assets/memberManagement.svg";
import fpograding from "../assets/fpograding.svg";
import FpoServices from "../assets/FpoServices.svg";
import complianceMenu from "../assets/ComplianceMenu.svg";
import ProductionDetailsMenu from "../assets/ProductionDetailsMenu.svg";

const navItems = [
  { to: "/registration", label: "Registration", icon: "📝" },
  { to: "/production-details", label: "Production Details", icon: "", src: ProductionDetailsMenu },
  { to: "/compliance/annual-turnover", label: "Compliance", icon: "", src: complianceMenu },
  { to: "/fpo-services", label: "FPO Services", icon: "", src: FpoServices },
  { to: "/member-management", label: "Member Management", icon: "", src: memberManagement },
  { to: "/fpograding", label: "FPO Grading", icon: "", src: fpograding },
];

const linkBase =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors";
const linkActive = "bg-primary-300 text-dark shadow-sm font-semibold";
const linkIdle = "text-gray-200 hover:bg-[#384d00] hover:text-white";

export default function LeftNav({
  mobileOpen,
  onCloseMobile,
  collapsed,
  onToggleCollapsed,
}) {
  return (
    <>
      {/* ---------- Mobile overlay (only between header & footer) ---------- */}
      <div
        className={[
          "fixed left-0 right-0 z-40 lg:hidden",
          "top-[var(--app-header-h)]",
          "h-[calc(100vh-var(--app-header-h)-var(--app-footer-h))]",
          "bg-gray-900/40 transition-opacity duration-300",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      {/* ---------- Desktop sidebar (sticky, collapsible) ---------- */}
      <aside
        className={[
          "hidden lg:flex lg:flex-col",
          "lg:h-[calc(100%)]", // Height relative to parent (which fits between header/footer) minus margin
          "lg:bg-primary-900",
          "lg:m-2", // 4px gap all around
          "transition-[width] duration-300 ease-in-out rounded-xl", // smooth minimize/expand [web:111], uniform radius
          collapsed ? "lg:w-20" : "lg:w-64",
        ].join(" ")}
      >
        {/* Header row inside sidebar */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-[#384d00]">
          <div className="flex items-center gap-2 min-w-0">
            {/* <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
              <span className="text-primary-900 font-semibold">◻◻</span>
            </div> */}
            {/* <span className={["font-medium truncate", collapsed ? "hidden" : ""].join(" ")}>
              FPO Shakti
            </span> */}
          </div>

          {/* Minimize/Expand button (desktop) */}
          <Button
            type="button"
            onClick={onToggleCollapsed}
            buttonClassName="h-10 w-10 rounded-md text-gray-200 bg-grey-700 hover:bg-grey-800 hover:text-white flex items-center justify-center"
            aria-label={collapsed ? "Expand sidebar" : "Minimize sidebar"}
            title={collapsed ? "Expand" : "Minimize"}
          >
            {collapsed ? "➡" : "⬅"}
          </Button>
        </div>

        {/* Nav list */}
        <nav className="p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  linkBase,
                  isActive ? linkActive : linkIdle,
                  collapsed ? "justify-center px-2" : "",
                ].join(" ")
              }
              title={collapsed ? item.label : undefined}
            >
              <span className="text-lg">{item.icon ? item.icon : <img src={item.src} alt={item.src} />}</span>
              <span className={collapsed ? "hidden" : ""}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ---------- Mobile drawer (full width, with X close) ---------- */}
      <aside
        className={[
          "lg:hidden fixed inset-0 z-[60] w-full bg-[#253300]",
          "h-full", // Full screen height
          "overflow-y-auto",
          "transform transition-transform duration-300 ease-in-out", // slide [web:111][web:123]
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar"
      >
        {/* Mobile top row with close button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#384d00]">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center">
              <span className="text-primary-900 font-semibold">◻◻</span>
            </div>
            <span className="font-medium text-white">Menu</span>
          </div>

          {/* X close (mobile) */}
          <Button
            type="button"
            onClick={onCloseMobile}
            buttonClassName="h-10 w-10 rounded-md text-gray-200 hover:bg-[#384d00] hover:text-white flex items-center justify-center"
            aria-label="Close menu"
            title="Close"
          >
            ✕
          </Button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile} // close drawer after clicking
              className={({ isActive }) =>
                [linkBase, isActive ? linkActive : linkIdle].join(" ")
              }
            >
              <span className="text-lg">{item.icon ? item.icon : <img src={item.src} alt={item.src} />}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

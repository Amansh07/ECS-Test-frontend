import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/registration", label: "Registration", icon: "📝" },
  { to: "/production", label: "Production Details", icon: "🌾" },
  { to: "/compliance", label: "Compliance", icon: "✅" },
  { to: "/services", label: "FPO Services", icon: "🧰" },
  { to: "/members", label: "Member Management", icon: "👥" },
];

const linkBase =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors";
const linkActive = "bg-primary-400 text-white shadow-sm font-semibold";
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
          "lg:sticky lg:top-[var(--app-header-h)]",
          "lg:h-[calc(100vh-var(--app-header-h)-var(--app-footer-h))]",
          "lg:border-r lg:border-[#384d00] bg-[#253300]",
          "transition-[width] duration-300 ease-in-out rounded-r-xl", // smooth minimize/expand [web:111]
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
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="h-10 w-10 rounded-md text-gray-200 bg-grey-700 hover:bg-grey-800 hover:text-white flex items-center justify-center"
            aria-label={collapsed ? "Expand sidebar" : "Minimize sidebar"}
            title={collapsed ? "Expand" : "Minimize"}
          >
            {collapsed ? "➡" : "⬅"}
          </button>
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
              <span className="text-lg">{item.icon}</span>
              <span className={collapsed ? "hidden" : ""}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ---------- Mobile drawer (full width, with X close) ---------- */}
      <aside
        className={[
          "lg:hidden fixed left-0 z-50 w-full bg-[#253300]",
          "top-[var(--app-header-h)]",
          "h-[calc(100vh-var(--app-header-h)-var(--app-footer-h))]",
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
          <button
            type="button"
            onClick={onCloseMobile}
            className="h-10 w-10 rounded-md text-gray-200 hover:bg-[#384d00] hover:text-white flex items-center justify-center"
            aria-label="Close menu"
            title="Close"
          >
            ✕
          </button>
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
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./header.css";
import { Button } from "../components/Buttons";

export default function Header() {
  const [open, setOpen] = useState(false);
   const location = useLocation();

  const hideBreadcrumb =
    location.pathname === "/login" || location.pathname === "/forgot-password";

  return (
    <header className="fpo-header" style={{ zIndex: open ? 100 : undefined }}>
      {/* Top Black Bar */}
      <div className="flex justify-end items-center px-4 md:px-6 py-1 text-[10px] md:text-xs gap-3 bg-[#000000] text-primary-700 font-medium tracking-wide border-b border-white/10">
        <a href="#main-content" className="hover:underline hover:text-primary-500 transition-colors">Skip to Main Content</a>
        <span className="opacity-50">|</span>
        <div className="flex gap-2 items-center">
          <button className="hover:text-primary-500 transition-colors font-bold" aria-label="Decrease font size">A-</button>
          <button className="hover:text-primary-500 transition-colors font-bold" aria-label="Reset font size">A</button>
          <button className="hover:text-primary-500 transition-colors font-bold" aria-label="Increase font size">A+</button>
        </div>
        <span className="opacity-50">|</span>
        <button aria-label="Toggle Theme" className="hover:text-primary-500 transition-colors flex items-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        </button>
      </div>

      {/* Main green bar */}
      <div className="fpo-header-top bg-primary-800">
        <div className="fpo-header-left">
          {/* Logo block */}
          <div className="fpo-logo-block">
            {/* Replace with actual logo <img> if you have one */}
            <div className="fpo-logo-icon" />
            <span className="fpo-logo-text">FPO Shakti</span>
          </div>

        </div>

        {/* Center nav (desktop) */}
        <nav className="fpo-nav-desktop">
          <a href="/" className="fpo-nav-link">Home</a>
          <a href="/services" className="fpo-nav-link">Services</a>
          <a href="/about" className="fpo-nav-link">About</a>
          <a href="/resources" className="fpo-nav-link">Resources</a>
          <a href="/gallery" className="fpo-nav-link">Gallery</a>
        </nav>

        {/* Right side: skip link, search, profile, hamburger */}
        <div className="fpo-header-right">

          <div className="fpo-search-wrapper">
            <input
              type="text"
              className="fpo-search-input"
              placeholder="Search for"
            />
            <Button buttonClassName="fpo-search-button" aria-label="Search" />
          </div>

          <Button buttonClassName="fpo-profile-avatar" aria-label="Profile">
            U
          </Button>

          {/* Mobile hamburger */}
          <Button
            type="button"
            buttonClassName="fpo-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <span className="fpo-menu-bar" />
            <span className="fpo-menu-bar" />
            <span className="fpo-menu-bar" />
          </Button>
        </div>
      </div>

      {/* Breadcrumb area */}
      {!hideBreadcrumb && (<div className="fpo-breadcrumb-bar">
        <nav className="fpo-breadcrumb" aria-label="Breadcrumb">
          <a href="/" className="fpo-breadcrumb-link">Home</a>
          <span className="fpo-breadcrumb-sep">/</span>
          <a href="/signup" className="fpo-breadcrumb-link">Sign up</a>
          <span className="fpo-breadcrumb-sep">/</span>
          <a href="/registration" className="fpo-breadcrumb-link">Register</a>
          <span className="fpo-breadcrumb-sep">/</span>
          <span className="fpo-breadcrumb-current">FPC - Companies Act</span>
        </nav>
      </div>)}

      {/* Mobile nav dropdown */}
      {open && (
        <nav className="fpo-nav-mobile">
          <a href="/" className="fpo-nav-mobile-link">Home</a>
          <a href="/services" className="fpo-nav-mobile-link">Services</a>
          <a href="/about" className="fpo-nav-mobile-link">About</a>
          <a href="/resources" className="fpo-nav-mobile-link">Resources</a>
          <a href="/gallery" className="fpo-nav-mobile-link">Gallery</a>
        </nav>
      )}
    </header>
  );
}

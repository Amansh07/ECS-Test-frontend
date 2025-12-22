import { useState } from "react";
import "./header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fpo-header">
      {/* Main green bar */}
      <div className="fpo-header-top">
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
            <button className="fpo-search-button" aria-label="Search" />
          </div>

          <button className="fpo-profile-avatar" aria-label="Profile">
            U
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="fpo-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <span className="fpo-menu-bar" />
            <span className="fpo-menu-bar" />
            <span className="fpo-menu-bar" />
          </button>
        </div>
      </div>

      {/* Breadcrumb area */}
      <div className="fpo-breadcrumb-bar">
        <nav className="fpo-breadcrumb" aria-label="Breadcrumb">
          <a href="/" className="fpo-breadcrumb-link">Home</a>
          <span className="fpo-breadcrumb-sep">/</span>
          <a href="/signup" className="fpo-breadcrumb-link">Sign up</a>
          <span className="fpo-breadcrumb-sep">/</span>
          <a href="/registration" className="fpo-breadcrumb-link">Register</a>
          <span className="fpo-breadcrumb-sep">/</span>
          <span className="fpo-breadcrumb-current">FPC - Companies Act</span>
        </nav>
      </div>

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

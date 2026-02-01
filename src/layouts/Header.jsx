import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./header.css";
import { Button } from "../components/Buttons";
import companyLogo from "../assets/logo1.png";
import companyLogo2 from "../assets/government-of-india.jpg";
// import indianEmblem from "../assets/logo2.png";
import indianEmblem from "../assets/Emblem_of_India.svg";
import Breadcrumb from "../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import AuthService from "../auth/AuthService";
import { MdOutlineGTranslate } from "react-icons/md";


export default function Header() {
	const token = AuthService.getAccessToken();
	const isLoggedIn = !!token;

	const location = useLocation();
	const isRegistrationPage = location.pathname === "/registration";
	const isLoginPage = location.pathname === "/login";

	const langRef = useRef(null);
	const [showLang, setShowLang] = useState(false);
	const [language, setLanguage] = useState("EN");

	const handleLangChange = (lang) => {
		setLanguage(lang);
		setShowLang(false); // close dropdown after select
	};


	useEffect(() => {
		const handleClickOutside = (event) => {
			if (langRef.current && !langRef.current.contains(event.target)) {
				setShowLang(false);
			}
		};

		if (showLang) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showLang]);


	const [open, setOpen] = useState(false);
	const [showNotification, setShowNotification] = useState(false);

	// const hideRoutes = ["/registration", "/login", "/forgot-password"];
	// const hideBreadcrumb = hideRoutes.includes(location.pathname);
	// const hideDashboard = hideRoutes.includes(location.pathname);
	// const hideLogout = hideRoutes.includes(location.pathname);
	// const hideProfile = hideRoutes.includes(location.pathname);
	// const hideNotification = hideRoutes.includes(location.pathname);

	const hideRoutes = ["/registration", "/login", "/forgot-password"];
	const hideBreadcrumb = hideRoutes.includes(location.pathname);


	const headerRef = useRef(null);

	const navigate = useNavigate();

	const handleLogout = () => {
		AuthService.logout();     // clears tokens
		navigate("/login", { replace: true }); // optional, since logout already redirects
		localStorage.removeItem("role");
	};

	useEffect(() => {
		function updateHeaderHeight() {
			if (!headerRef.current) return;
			const height = headerRef.current.offsetHeight;
			document.documentElement.style.setProperty('--app-header-h', `${height}px`);
		}

		updateHeaderHeight();
		window.addEventListener('resize', updateHeaderHeight);
		return () => window.removeEventListener('resize', updateHeaderHeight);
	}, [location.pathname, hideBreadcrumb, open]);

	{/* Notification messages (scroll up animation)
  const notifications = [
    "New user registration approved",
    "Payment received from Mukesh Ambani",
    "System maintenance scheduled",
    "2 new applications pending review",
    "Backup completed successfully"
  ];*/
	}

	return (
		<>
			<header ref={headerRef} className="fpo-header" style={{ zIndex: open ? 100 : undefined }}>
				{/*<header className="fpo-header" style={{ zIndex: open ? 100 : undefined }}>*/}
				{/* Top Black Bar */}
				<div className="flex justify-end items-center px-4 md:px-6 py-1 text-[10px] md:text-xs gap-3 bg-[#000000] text-primary-700 font-medium tracking-wide border-b border-white/10">

					<a
						href="#main-content"
						className="hover:underline hover:text-primary-500 transition-colors"
					>
						Skip to Main Content
					</a>

					<span className="opacity-50">|</span>

					{/* Language Switcher */}
					<div className="relative" ref={langRef}>
						<button
							onClick={() => setShowLang((prev) => !prev)}
							className="flex items-center gap-1 hover:text-primary-500 transition-colors"
							aria-label="Change Language"
						>
							<MdOutlineGTranslate size={14} />
							<span className="font-bold">{language}</span>
						</button>

						{showLang && (
							<div className="absolute right-0 mt-1 bg-black border border-white/10 rounded shadow-lg z-50 min-w-[120px]">
								<button
									className="block w-full px-3 py-1 text-left hover:text-primary-500 transition-colors"
									onClick={() => handleLangChange("EN")}
								>
									EN - English
								</button>

								<button
									className="block w-full px-3 py-1 text-left hover:text-primary-500 transition-colors"
									onClick={() => handleLangChange("HI")}
								>
									HI - Hindi
								</button>

							</div>
						)}
					</div>

					<span className="opacity-50">|</span>

					<div className="flex gap-2 items-center">
						<button className="hover:text-primary-500 font-bold">A-</button>
						<button className="hover:text-primary-500 font-bold">A</button>
						<button className="hover:text-primary-500 font-bold">A+</button>
					</div>

					<span className="opacity-50">|</span>

					<button className="hover:text-primary-500 flex items-center">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
						</svg>
					</button>
				</div>



				{/* Main green bar */}
				{<div className="fpo-header-top bg-primary-800">
					<div className="fpo-header-left">
						{/* Logo block */}
						<div className="fpo-logo-block flex gap-[10px]">
							{/* <img src={companyLogo} width={"54"} height={"48"} className="cursor-pointer" alt="CompanyLogo" /> */}
							{/* <img src={companyLogo} width={"54"} height={"48"} className="cursor-pointer" alt="CompanyLogo" /> */}
							<img src={companyLogo2} width={"54"} height={"48"} className="cursor-pointer" alt="CompanyLogo" />
							{/* <div className="fpo-logo-icon" /> */}
							{/* <img src={indianEmblem} width={"30"} height={"30"} className="cursor-pointer" alt="indian Emblem logo" /> */}
							<span className="fpo-logo-text">FPO Shakti</span>
						</div>
					</div>

					{/* Center nav (desktop) 
			<nav className="fpo-nav-desktop">
			  <a href="/" className="fpo-nav-link">Home</a>
			  <a href="/services" className="fpo-nav-link">Services</a>
			  <a href="/about" className="fpo-nav-link">About</a>
			  <a href="/resources" className="fpo-nav-link">Resources</a>
			  <a href="/gallery" className="fpo-nav-link">Gallery</a>
			</nav>*/}

					{/* Right side: skip link, search, profile, hamburger */}

					<div className="fpo-header-right">

						{/* ================= NOT LOGGED IN ================= */}
						{/* ================= NOT LOGGED IN ================= */}
						{!isLoggedIn && (
							<>
								{/* REGISTRATION PAGE → ONLY LOGIN */}
								{isRegistrationPage && (
									<button
										onClick={() => navigate("/login")}
										className="h-[32px] w-[92px] border bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-semibold"
									>
										Login
									</button>
								)}

								{/* HOME PAGE (/) → ONLY LOGIN */}
								{location.pathname === "/" && (
									<button
										onClick={() => navigate("/login")}
										className="h-[32px] w-[92px] border bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-semibold"
									>
										Login
									</button>
								)}

								{/* OTHER PUBLIC PAGES → LOGIN + SIGNUP */}
								{!isRegistrationPage && !isLoginPage && location.pathname !== "/" && (
									<>
										<button
											onClick={() => navigate("/login")}
											className="h-[32px] w-[92px] border bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-semibold"
										>
											Login
										</button>

										<button
											onClick={() => navigate("/registration")}
											className="h-[32px] w-[102px] border bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-semibold"
										>
											Signup
										</button>
									</>
								)}



								{/* LOGIN PAGE → NO BUTTONS */}
								{isLoginPage && null}
							</>
						)}


						{/* ================= LOGGED IN ================= */}
						{isLoggedIn && (
							<>
								<button
									onClick={() => navigate("/dashboard")}
									className="h-[32px] w-[92px] border bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-semibold"
								>
									Dashboard
								</button>

								<button
									onClick={handleLogout}
									className="h-[32px] w-[102px] border bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-semibold"
								>
									Logout
								</button>

								<Button
									buttonClassName="fpo-profile-avatar hover:bg-green-800"
									aria-label="Profile"
								>
									G
								</Button>

								<Button
									variant="ghost"
									size="sm"
									className="notification-btn"
									onClick={() => setShowNotification(!showNotification)}
								>
									<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
										<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
										<path d="M13.73 21a2 2 0 0 1-3.46 0" />
									</svg>
								</Button>
							</>
						)}

						{/* Notification Popup */}
						{isLoggedIn && showNotification && (
							<div className="notification-popup">
								<div className="popup-header">
									<h4>Notifications</h4>
									<span className="notification-badge">5</span>
									<button
										className="close-btn"
										onClick={() => setShowNotification(false)}
									>
										<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
											<path d="M18 6L6 18M6 6l12 12" />
										</svg>
									</button>
								</div>

								<div
									className="popup-content"
									style={{ color: "#000000", backgroundColor: "#ffffff" }}
								>
									<div style={{ padding: "10px", color: "#111111", fontSize: "15px" }}>
										New User Registration Approved
									</div>
									<div style={{ padding: "10px", color: "#111111", fontSize: "15px" }}>
										Payment received from Sri Mukesh Ambani
									</div>
									<div style={{ padding: "10px", color: "#111111", fontSize: "15px" }}>
										2 new applications pending review
									</div>
									<div style={{ padding: "10px", color: "#111111", fontSize: "15px" }}>
										System maintenance scheduled
									</div>
									<div style={{ padding: "10px", color: "#111111", fontSize: "15px" }}>
										Backup completed successfully
									</div>
								</div>
							</div>
						)}


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
				</div>}

				{/* Breadcrumb area */}
				{!hideBreadcrumb && (
					<div className="fpo-breadcrumb-bar">
						<Breadcrumb />
						{/*<nav className="fpo-breadcrumb" aria-label="Breadcrumb">
			  <a href="/" className="fpo-breadcrumb-link">Home</a>
			  <span className="fpo-breadcrumb-sep">/</span>
			  <a href="/signup" className="fpo-breadcrumb-link">Sign up</a>
			  <span className="fpo-breadcrumb-sep">/</span>
			  <a href="/registration" className="fpo-breadcrumb-link">Register</a>
			  <span className="fpo-breadcrumb-sep">/</span>
			  <span className="fpo-breadcrumb-current">FPC - Companies Act</span>
			</nav>*/}
					</div>)}

				{/* Mobile nav dropdown */}
				{open && (
					<nav className="fpo-nav-mobile">
						<a href="/" className="fpo-nav-mobile-link">Home</a>
						<a href="/services" className="fpo-nav-mobile-link">Services</a>
						<a href="/about" className="fpo-nav-mobile-link">About</a>
						<a href="/employees" className="fpo-nav-mobile-link">Employees</a>
						<a href="/gallery" className="fpo-nav-mobile-link">Gallery</a>
					</nav>
				)}
			</header>
		</>
	);
}

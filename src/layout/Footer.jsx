import "./footer.css";

export default function Footer() {
  return (
    <footer className="register-footer">
		<div className="footer-left">
		  <span>© {new Date().getFullYear()} FPO Shakti. All rights reserved.</span>
		</div>
		<div className="footer-links">
		  <a href="/terms" className="footer-link">
			Terms &amp; Conditions
		  </a>
		  <span className="footer-separator">|</span>
		  <a href="/privacy" className="footer-link">
			Privacy Policy
		  </a>
		</div>
	</footer>
  );
}

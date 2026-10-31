import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link nav-logo">
        MeDemy
      </Link>

      <div
        className={menuOpen ? "nav-menu open" : "nav-menu"}
        onClick={() => setMenuOpen(false)}
      >
        <div className="nav-links">
          <Link to="/about-us" className="nav-link">
            About Us
          </Link>
          <Link to="/courses" className="nav-link">
            Courses
          </Link>
          <Link to="/instructors" className="nav-link">
            Instructors
          </Link>
          <Link to="/contact-us" className="nav-link">
            Contact Us
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="nav-login">
            Log In
          </Link>
          <Link to="/register" className="nav-cta">
            Get Started
          </Link>
        </div>
      </div>

      <button
        className="nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <X size={26} color="#fff" />
        ) : (
          <Menu size={26} color="#fff" />
        )}
      </button>
    </nav>
  );
}

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <Link
        to="/"
        className="nav-link"
        style={{ color: "#fff", fontSize: "22px", margin: 0 }}
      >
        MeDemy
      </Link>

      <div style={{ display: "flex", gap: "30px" }}>
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

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link
          to="/login"
          style={{
            background: "transparent",
            color: "#fff",
            padding: "10px 22px",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          Log In
        </Link>
        <Link
          to="/register"
          style={{
            background: "#fff",
            color: "#007bff",
            padding: "10px 22px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          Get Started
        </Link>
      </div>
    </nav>
  );

}

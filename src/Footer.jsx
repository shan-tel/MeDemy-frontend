import { Link } from "react-router-dom";
import myBackground from "./assets/login-bg.png";

export default function Footer() {
  const columns = [
    {
      title: "Learn",
      links: [
        { label: "Courses", to: "/courses" },
        { label: "Instructors", to: "/instructors" },
        { label: "Quizzes" },
        { label: "Certificates" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us" },
        { label: "Log In", to: "/login" },
        { label: "Register", to: "/register" },
        { label: "Contact Us" },
      ],
    },
    {
      title: "Reach Us",
      links: [
        { label: "medemy@gmail.com" },
        { label: "Instagram" },
        { label: "LinkedIn" },
        { label: "WhatsApp" },
      ],
    },
  ];

  const socials = ["Instagram", "LinkedIn", "Twitter/X", "WhatsApp"];

  const linkStyle = {
    color: "#2c4a6b",
    textDecoration: "none",
    fontSize: "15px",
  };

  return (
    <footer
      style={{
        backgroundImage: `url(${myBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "clamp(16px, 4vw, 40px)",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "24px",
          padding: "clamp(24px, 6vw, 50px)",
          boxShadow: "0 8px 32px rgba(0, 123, 255, 0.2)",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "40px",
            fontWeight: "800",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#0b2a4a",
          }}
        >
          MeDemy
        </h2>
        <p
          style={{
            margin: "12px 0 0 0",
            fontSize: "15px",
            color: "#3b5878",
            maxWidth: "420px",
            lineHeight: "1.6",
          }}
        >
          Structured courses, instant quiz feedback, and progress you can
          actually see.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "50px",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  color: "#0056b3",
                  fontSize: "13px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  margin: "0 0 18px 0",
                }}
              >
                {col.title}
              </h4>
              {col.links.map((link) => (
                <p key={link.label} style={{ margin: "0 0 12px 0" }}>
                  {link.to ? (
                    <Link to={link.to} style={linkStyle}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href="#" style={linkStyle}>
                      {link.label}
                    </a>
                  )}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "50px",
            paddingTop: "25px",
            borderTop: "1px solid rgba(255, 255, 255, 0.5)",
            color: "#3b5878",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span style={{ fontFamily: "monospace", fontSize: "13px" }}>
            © 2026 MeDemy. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {socials.map((name) => (
              <a
                key={name}
                href="#"
                style={{
                  color: "#3b5878",
                  textDecoration: "none",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

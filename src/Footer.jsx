import { Link } from "react-router-dom";

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
        { label: "hello@medemy.com" },
        { label: "Instagram" },
        { label: "LinkedIn" },
        { label: "WhatsApp" },
      ],
    },
  ];

  const linkStyle = {
    color: "#9a97b0",
    textDecoration: "none",
    fontSize: "15px",
  };
  return (
    <footer
      style={{
        backgroundColor: "#4441db",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        color: "#fff",
        padding: "60px 60px 30px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "40px",
          fontWeight: "800",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        MeDemy
      </h2>
      <p
        style={{
          margin: "12px 0 0 0",
          fontSize: "15px",
          color: "#9a97b0",
          maxWidth: "420px",
          lineHeight: "1.6",
        }}
      >
        Structured courses, instant quiz feedback, and progress you can actually
        see.
      </p>
      <div
        style={{
          display: "flex",
          gap: "80px",
          justifyContent: "space-between",
          marginTop: "50px",
        }}
      >
        {columns.map((col) => (
          <div key={col.title}>
            <h4
              style={{
                color: "#ffd84d",
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
    </footer>
  );
}

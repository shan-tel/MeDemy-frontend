import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import myBackground from "./assets/login-bg.png";
import presly from "./assets/presly.png"

export default function Instructors() {
  const instructors = [
    {
      id: 1,
      name: "Dr. Amina Bello",
      initials: "AB",
      role: "Computer Science",
      courses: 2,
      students: 1200,
    },
    {
      id: 2,
      name: "Gentle Okhai",
      initials: "GO",
      role: "Web Development",
      courses: 7,
      students: 1950,
      photo: presly,
    },
    {
      id: 3,
      name: "Prof. Grace Eze",
      initials: "GE",
      role: "Algorithms and Theory",
      courses: 1,
      students: 1800,
    },
    {
      id: 4,
      name: "Chidi Nwosu",
      initials: "CN",
      role: "Backend Engineering",
      courses: 1,
      students: 720,
    },
    {
      id: 5,
      name: "Ngozi Adeyemi",
      initials: "NA",
      role: "Product Design",
      courses: 1,
      students: 640,
    },
    {
      id: 6,
      name: "Ibrahim Musa",
      initials: "IM",
      role: "Data Science",
      courses: 1,
      students: 510,
    },
  ];

  return (
    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
      <div
        style={{
          backgroundImage: `url(${myBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Navbar />
        <div
          style={{
            padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px, 7vw, 44px)",
              width: "100%",
              color: "#fff",
              textShadow: "0px 2px 6px rgba(0,0,0,0.4)",
            }}
          >
            Meet Our Instructors
          </h1>
          <p
            style={{
              margin: "45px auto 0",
              maxWidth: "520px",
              fontSize: "18px",
              color: "#fff",
              textShadow: "0px 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            Learn from people who have built the things they teach.
          </p>
        </div>
      </div>

      <section style={{ padding: "60px 40px", background: "#f4f8fc" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "30px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {instructors.map((person) => (
            <div
              key={person.id}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "30px 20px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7fb2ff, #007bff)",
                  color: "#fff",
                  fontSize: "30px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 18px",
                  overflow: "hidden",
                }}
              >
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  person.initials
                )}
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "19px",
                  fontWeight: "700",
                  color: "#0b2a4a",
                }}
              >
                {person.name}
              </h3>
              <p
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#6b7c93",
                }}
              >
                {person.role}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "22px",
                  paddingTop: "18px",
                  borderTop: "1px solid #e6edf5",
                }}
              >
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "18px",
                      color: "#007bff",
                    }}
                  >
                    {person.courses}
                  </strong>
                  <span style={{ fontSize: "13px", color: "#6b7c93" }}>
                    Courses
                  </span>
                </div>
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "18px",
                      color: "#007bff",
                    }}
                  >
                    {person.students.toLocaleString()}
                  </strong>
                  <span style={{ fontSize: "13px", color: "#6b7c93" }}>
                    Students
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

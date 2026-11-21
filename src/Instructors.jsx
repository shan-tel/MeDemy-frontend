import { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import myBackground from "./assets/login-bg.png";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/users/instructors",
        );
        if (response.ok) {
          const data = await response.json();
          setInstructors(data);
        } else {
          console.error("Failed to load instructors catalog");
        }
      } catch (error) {
        console.error("Network error connecting to FastAPI:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  // Helper to generate initials if the instructor has no profile picture yet
  const getInitials = (name) => {
    if (!name) return "IN";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter instructors by name, official title, or any course they teach
  const filteredInstructors = instructors.filter((person) => {
    const query = searchQuery.toLowerCase();
    const matchesName = person.full_name.toLowerCase().includes(query);
    const matchesTitle = (person.official_title || "")
      .toLowerCase()
      .includes(query);
    const matchesCourse = (person.course_titles || []).some((title) =>
      title.toLowerCase().includes(query),
    );
    return matchesName || matchesTitle || matchesCourse;
  });

  return (
    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
      {/* HERO & SEARCH BAR */}
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
              margin: "20px auto 30px",
              maxWidth: "520px",
              fontSize: "18px",
              color: "#fff",
              textShadow: "0px 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            Learn from people who have built the things they teach.
          </p>

          {/* GLASSMORPHISM SEARCH BAR */}
          <div style={{ maxWidth: "480px", margin: "0 auto" }}>
            <input
              type="text"
              placeholder="Search by instructor name, specialty, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: "30px",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                background: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#fff",
                fontSize: "15px",
                outline: "none",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </div>

      {/* INSTRUCTORS HORIZONTAL SCROLL SECTION */}
      <section style={{ padding: "60px 40px", background: "#f4f8fc" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {isLoading ? (
            <p
              style={{
                textAlign: "center",
                color: "#6b7c93",
                fontSize: "16px",
              }}
            >
              Loading instructors...
            </p>
          ) : filteredInstructors.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#6b7c93",
                fontSize: "16px",
              }}
            >
              {searchQuery
                ? `No instructors found matching "${searchQuery}".`
                : "No instructors registered yet."}
            </p>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  overflowX: "auto",
                  paddingBottom: "20px",
                  scrollBehavior: "smooth",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#007bff #e6edf5",
                }}
              >
                {filteredInstructors.map((person) => (
                  <div
                    key={person.id}
                    style={{
                      minWidth: "280px",
                      maxWidth: "280px",
                      flexShrink: 0,
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
                        fontSize: "28px",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 18px",
                        overflow: "hidden",
                      }}
                    >
                      {person.profile_picture ? (
                        <img
                          src={person.profile_picture}
                          alt={person.full_name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        getInitials(person.full_name)
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
                      {person.full_name}
                    </h3>
                    <p
                      style={{
                        margin: "6px 0 0 0",
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#6b7c93",
                      }}
                    >
                      {person.official_title}
                    </p>

                    {/* COURSES TAUGHT TAGS */}
                    {person.course_titles.length > 0 && (
                      <div
                        style={{
                          marginTop: "14px",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "6px",
                        }}
                      >
                        {person.course_titles
                          .slice(0, 2)
                          .map((courseTitle, idx) => (
                            <span
                              key={idx}
                              style={{
                                fontSize: "11px",
                                background: "#eaf2ff",
                                color: "#007bff",
                                padding: "4px 10px",
                                borderRadius: "12px",
                                fontWeight: "600",
                              }}
                            >
                              {courseTitle}
                            </span>
                          ))}
                      </div>
                    )}

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
                          {person.courses_count}
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
                          {person.students_count.toLocaleString()}
                        </strong>
                        <span style={{ fontSize: "13px", color: "#6b7c93" }}>
                          Students
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: "#6b7c93",
                  marginTop: "10px",
                }}
              >
                ← Scroll horizontally to see more instructors →
              </p>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

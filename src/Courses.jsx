import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import myBackground from "./assets/login-bg.png";
import pythonImg from "./assets/pythonbegin.png";

export default function Courses() {
 const courses = [
   {
     id: 1,
     title: "Intro to Python",
     instructor: "Dr. Amina Bello",
     level: "Beginner",
     lessons: 24,
     hours: 8,
     image: pythonImg,
   },
   {
     id: 2,
     title: "Web Development with React",
     instructor: "Tunde Okafor",
     level: "Intermediate",
     lessons: 32,
     hours: 12,
     image: "/courses/react.jpg",
   },
   {
     id: 3,
     title: "Data Structures and Algorithms",
     instructor: "Prof. Grace Eze",
     level: "Intermediate",
     lessons: 40,
     hours: 16,
     image: "/courses/dsa.jpg",
   },
   {
     id: 4,
     title: "Backend with FastAPI",
     instructor: "Chidi Nwosu",
     level: "Intermediate",
     lessons: 28,
     hours: 10,
     image: "/courses/fastapi.jpg",
   },
   {
     id: 5,
     title: "Database Design with SQL",
     instructor: "Dr. Amina Bello",
     level: "Beginner",
     lessons: 20,
     hours: 7,
     image: "/courses/sql.jpg",
   },
   {
     id: 6,
     title: "UI/UX Design Basics",
     instructor: "Ngozi Adeyemi",
     level: "Beginner",
     lessons: 18,
     hours: 6,
     image: "/courses/uiux.jpg",
   },
   {
     id: 7,
     title: "Intro to Java",
     instructor: "MOG. Gentle Okhai",
     level: "Beginner",
     lessons: 18,
     hours: 6,
     image: "/courses/introtojava.jpg",
   },
   {
     id: 8,
     title: "Intro to JavaScript",
     instructor: "Chairman Gentle Okhai",
     level: "Beginner",
     lessons: 12,
     hours: 5,
     image: "/courses/introtojavascript.jpg",
   },
   {
     id: 9,
     title: "Video Editing",
     instructor: "Tuoyo",
     level: "Beginner",
     lessons: 14,
     hours: 9,
     image: "/courses/videoediting.jpg",
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
              color: "#fff",
              textShadow: "0px 2px 6px rgba(0,0,0,0.4)",
              fontSize: "clamp(28px, 7vw, 44px)",
            }}
          >
            Explore Our Courses
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
            Pick a course and learn at your own pace, with quizzes along the
            way.
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
          {courses.map((course) => (
            <div
              key={course.id}
              style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  height: "180px",
                  backgroundImage: `url(${course.image}), linear-gradient(135deg, #cfe3ff, #7fb2ff)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "19px",
                    fontWeight: "700",
                    color: "#0b2a4a",
                  }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#6b7c93",
                  }}
                >
                  {course.instructor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { Link } from "react-router-dom";
import myBackground from "./assets/login-bg.png";
import heroImage from "./assets/girllearning.png";
import { UserPlus, BookOpen, Rocket, Target, Zap, TrendingUp } from "lucide-react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function LandingPage() {
  return (
    <div
      style={{
        fontFamily: "Plus Jakarta Sans, sans-serif",
      }}
    >
      <div
        style={{
          borderRadius: "24px",
          overflow: "hidden",
          backgroundImage: `url(${myBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Navbar />

        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "left",
            padding: "0 20px",
          }}
        >
          <div style={{ textAlign: "left", maxWidth: "520px" }}>
            <h2
              style={{
                fontSize: "42px",
                maxWidth: "700px",
                padding: "10px",
                color: "#fff",
                textShadow: "0px 2px 6px rgba(0,0,0,0.4)",
              }}
            >
              Learn Anything, Anywhere, On Your Own Schedule
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#fff",
                maxWidth: "550px",
                padding: "29px",
                marginTop: "15px",
                textShadow: "0px 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              MeDemy gives you structured courses, quizzes, and progress
              tracking — built for students who want to actually finish what
              they start.
            </p>
            <Link
              to="/register"
              style={{
                marginTop: "30px",
                background: "#fff",
                color: "#007bff",
                padding: "14px 30px",
                borderRadius: "10px",
                textDecoration: "none",

                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              Get Started — It's Free
            </Link>
          </div>
          <img
            src={heroImage}
            alt="Student learning on a laptop"
            style={{
              maxWidth: "810px",
              width: "100%",
              borderRadius: "16px",
              alignItems: "flex-end",
            }}
          />
        </section>
        <section
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "40px 40px",
            background: "#e8f0f5c5",
            borderBottom: "1px solid #eaeaea",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "36px", color: "#007bff", margin: "0" }}>
              270+
            </h3>
            <p
              style={{ color: "#555", margin: "5px 0 0 0", fontWeight: "600" }}
            >
              Active Courses
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "36px", color: "#007bff", margin: "0" }}>
              10k+
            </h3>
            <p
              style={{ color: "#555", margin: "5px 0 0 0", fontWeight: "600" }}
            >
              Enrolled Students
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "36px", color: "#007bff", margin: "0" }}>
              4.8
            </h3>
            <p
              style={{ color: "#555", margin: "5px 0 0 0", fontWeight: "600" }}
            >
              Average Rating
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "36px", color: "#007bff", margin: "0" }}>
              50+
            </h3>
            <p
              style={{ color: "#555", margin: "5px 0 0 0", fontWeight: "600" }}
            >
              Expert Instructors
            </p>
          </div>
        </section>

        <section
          style={{
            padding: "100px 60px",
            textAlign: "center",
            background: "#ffffff",
          }}
        >
          <h2
            style={{ fontSize: "32px", color: "#0B3D2E", margin: "0 0 15px 0" }}
          >
            How It Works
          </h2>
          <p style={{ color: "#555", marginBottom: "70px" }}>
            Three steps between you and your first certificate.
          </p>

          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "28px",
                left: "15%",
                right: "15%",
                height: "2px",
                background: "#d8dde3",
                zIndex: 0,
              }}
            />

            {[
              {
                Icon: UserPlus,
                title: "Create an Account",
                text: "Sign up in seconds and choose whether you're here to learn or teach.",
              },
              {
                Icon: BookOpen,
                title: "Choose a Course",
                text: "Browse our extensive library and pick a course that matches your goals.",
              },
              {
                Icon: Rocket,
                title: "Start Learning",
                text: "Track your progress, take quizzes, and earn certificates as you go.",
              },
            ].map((step, i) => (
              <div key={i} style={{ flex: 1, position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "#007bff",
                    color: "#fff",
                    fontSize: "22px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 25px",
                    boxShadow: "0 6px 18px rgba(0,123,255,0.35)",
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    padding: "30px",
                    background: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "#e8f0fe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 15px",
                    }}
                  >
                    <step.Icon size={26} color="#007bff" />
                  </div>
                  <h3
                    style={{
                      fontSize: "19px",
                      color: "#000",
                      marginBottom: "10px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: "#555",
                      lineHeight: "1.5",
                      margin: 0,
                      fontSize: "15px",
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          style={{
            padding: "100px 60px",
            background: "#f4f8fc79",
            display: "flex",
            alignItems: "center",
            gap: "60px",
          }}
        >
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "32px",
                color: "#0B3D2E",
                margin: "0 0 20px 0",
              }}
            >
              About MeDemy
            </h2>
            <p
              style={{
                fontSize: "17px",
                color: "#444",
                lineHeight: "1.7",
                marginBottom: "35px",
              }}
            >
              MeDemy is a learning platform built for students who want
              structure without rigidity — bite-sized course sections, instant
              quiz feedback, and a dashboard that actually shows you what you've
              finished and what's left.
            </p>

            {[
              {
                Icon: Target,
                text: "Clear, structured course paths — no guessing what to learn next",
              },
              {
                Icon: Zap,
                text: "Instant quiz feedback, so you know where you stand immediately",
              },
              {
                Icon: TrendingUp,
                text: "A dashboard that tracks real progress, not just completion percentages",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    minWidth: "32px",
                    borderRadius: "50%",
                    background: "#007bff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <item.Icon size={16} color="#fff" />
                </div>
                <p
                  style={{
                    color: "#333",
                    fontSize: "15px",
                    margin: "6px 0 0 0",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: "20px",
              padding: "40px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
              borderLeft: "5px solid #007bff",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                color: "#222",
                fontStyle: "italic",
                lineHeight: "1.6",
              }}
            >
              "I finally finished a course I started — the quizzes kept me
              honest about what I actually understood."
            </p>
            <p
              style={{ marginTop: "20px", fontWeight: "700", color: "#007bff" }}
            >
              — A MeDemy Student
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

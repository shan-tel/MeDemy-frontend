import { useState } from "react";
import myBackground from "./assets/login-bg.png";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./login.jsx";
import { Link } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import Courses from "./Courses.jsx";
import Instructors from "./Instructors.jsx";


function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  

  const handlelogin = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!fullname.trim().includes(" ")) {
      setNameError("Please enter your first and last name.");
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 6 || !hasNumber || !hasSpecialChar) {
      setPasswordError("Must be 6+ chars with a number and special character.");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullname,
          username: username,
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Success! Backend says:", data);
        setFullname("");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        console.error("FastAPI rejected the data. Check your backend logic.");
      }
    } catch (error) {
      console.error("Network error! Is FastAPI running?", error);
    }
  };
 
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${myBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "3px solid #000000",
        borderRadius: "16px",
        boxShadow: "10px 10px 0px #007bff",
      }}
    >
      <form
        onSubmit={handlelogin}
        noValidate
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px",
          gap: "0px",
          padding: "40px",
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "24px",
        }}
      >
        <h2
          style={{
            margin: "0 0 10px 0",
            fontSize: "28px",
            fontWeight: "700",
            color: "#ffffff",
            fontFamily: "Times New Roman",
          }}
        >
          MeDemy Registration
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            position: "relative",
            marginBottom: "22px",
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            style={{
              padding: "14px",
              border: "2px solid #000",
              background: "rgba(0,123,255,0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0,123, 255, 0.3)",
              borderTop: "1px solid rgba(222, 225, 230, 0.8)",
              borderLeft: "1px solid rgba(222, 225, 230, 0.5)",
              borderRadius: "8px",
              outline: "none",
              fontSize: "15px",
              backgroundColor: "rgba(255, 255, 255, 0)",
              color: "#479ba7",
              fontWeight: "550",
            }}
          />

          {nameError && <div className="error-bubble">{nameError}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "14px",
              border: "2px solid #000",
              background: "rgba(0,123,255,0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0,123, 255, 0.3)",
              borderTop: "1px solid rgba(222, 225, 230, 0.8)",
              borderLeft: "1px solid rgba(222, 225, 230, 0.5)",
              borderRadius: "8px",
              outline: "none",
              fontSize: "15px",
              backgroundColor: "rgba(255, 255, 255, 0)",
              color: "#479ba7",
              fontWeight: "550",
            }}
          />
          <p
            style={{
              color: "red",
              fontSize: "12px",
              fontWeight: "500",
              margin: "0 0 0 5px",
            }}
          >
            {"\u00A0"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            position: "relative",
            marginBottom: "22px",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "14px",
              backdropFilter: "blur(10px)",
              background: "rgba(0,123,255,0.25)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0,123, 255, 0.3)",
              borderTop: "1px solid rgba(222, 225, 230, 0.8)",
              borderLeft: "1px solid rgba(222, 225, 230, 0.5)",
              borderRadius: "8px",
              outline: "none",
              fontSize: "15px",
              backgroundColor: "rgba(255, 255, 255, 0)",
              color: "#479ba7",
              fontWeight: "550",
            }}
          />

          {emailError && <div className="error-bubble">{emailError}</div>}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            position: "relative",
            marginBottom: "22px",
          }}
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "14px",
              background: "rgba(0,123,255,0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0,123, 255, 0.3)",
              borderTop: "1px solid rgba(222, 225, 230, 0.8)",
              borderLeft: "1px solid rgba(222, 225, 230, 0.5)",
              borderRadius: "8px",
              outline: "none",
              fontSize: "15px",
              backgroundColor: "rgba(255, 255, 255, 0)",
              color: "#479ba7",
              fontWeight: "550",
            }}
          />

          {passwordError && <div className="error-bubble">{passwordError}</div>}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              position: "relative",
              marginTop: "22px",
              marginBottom: "12px",
            }}
          >
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                padding: "14px",
                background: "rgba(0,123,255,0.25)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(0,123, 255, 0.3)",
                borderTop: "1px solid rgba(222, 225, 230, 0.8)",
                borderLeft: "1px solid rgba(222, 225, 230, 0.5)",
                borderRadius: "8px",
                outline: "none",
                fontSize: "15px",
                color: "#ffffff",
                fontWeight: "550",
                cursor: "pointer",
                appearance: "none",
              }}
            >
              <option value="student" style={{ color: "#000" }}>
                Student
              </option>
              <option value="instructor" style={{ color: "#000" }}>
                Instructor
              </option>
              <option value="admin" style={{ color: "#000" }}>
                Admin
              </option>
            </select>

            <span
              style={{
                position: "absolute",
                right: "15px",
                top: "10px",
                color: "#ffffff",
                fontSize: "14px",
                pointerEvents: "none",
              }}
            >
              ▼
            </span>
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: "11px",
            width: "200px",
            alignSelf: "center",
            marginTop: "10px",
            cursor: "pointer",
            background: "rgba(0,123,255,0.25)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(0,123, 255, 0.3)",
            borderTop: "1px solid rgba(222, 225, 230, 0.8)",
            borderLeft: "1px solid rgba(222, 225, 230, 0.5)",
            fontFamily: "Times New Roman",
            color: "#ffffff",
            borderRadius: "14px",
            boxShadow: "0 8px 32px 0 rgba(0, 123, 255, 0.3)",
            fontWeight: "bold",
            fontSize: "19px",
            letterSpacing: "1px",
            textShadow: "0px 1px 2px rgba(0, 0, 0, 0.4)",
          }}
        >
          Register
        </button>
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
            color: "#000",
            fontWeight: "500",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#007bff",
              textDecoration: "underline",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Log In.
          </Link>
        </p>
      </form>
    </div>
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/instructors" element={<Instructors />} />
    </Routes>
  );
}
import { useState } from "react";
import myBackground from "./assets/login-bg.png";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleloginsubmit = async (e) => {
      e.preventDefault();
      setUsernameError("");
      setPasswordError("");

      let isValid = true;

      if (username.trim().length < 3) {
        setUsernameError("Username must be at least 3 characters.");
        isValid = false;
      }
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (password.length < 6 || !hasNumber || !hasSpecialChar) {
        setPasswordError(
          "Must be 6+ chars with a number and special character.",
        );
        isValid = false;
      }
      if (!isValid) {
        return;
      }

      // Send form-encoded credentials to FastAPI
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      try {
        const response = await fetch("http://127.0.0.1:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user_role", data.role);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("full_name", data.full_name);

          if (data.role === "instructor" || data.role === "teacher") {
            navigate("/instructor-dashboard");
          } else {
            navigate("/courses");
          }
        } else {
          setPasswordError(data.detail || "Invalid username or password.");
        }
      } catch (error) {
        console.error("Login error:", error);
        setPasswordError("Could not connect to the server.");
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
          onSubmit={handleloginsubmit}
          noValidate
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "450px",
            minHeight: "300px",
            gap: "15px",
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
            MeDemy Login
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              position: "relative",
            }}
          >
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
            {usernameError && <div className="error-bubble">{usernameError}</div>}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              position: "relative",
            }}
          >
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            />{" "}
            {passwordError && (
              <div className="error-bubble">{passwordError}</div>
            )}
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
            Log In
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "15px",
              fontSize: "14px",
              color: "#000",
              fontWeight: "500",
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#007bff",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                Register.
              </Link>
            </span>
            <Link
              to="/forgot-password"
              style={{
                color: "#007bff",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              Forgot Password?
            </Link>
          </div>
        </form>{" "}
      </div>
    );
}

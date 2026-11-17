import { useState } from "react";
import { useNavigate } from "react-router-dom";
import myBackground from "./assets/login-bg.png";
import "./App.css";

export default function InstructorOnboarding() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create a temporary URL to show the image preview
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault();

    console.log("Ready to send to FastAPI:", { title, file });

    // TEMPORARY: Once we connect this to FastAPI, we will uncomment this navigation
    // alert("Profile updated! Sending to Dashboard...");
    // navigate("/instructor-dashboard");
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
        onSubmit={handleOnboardingSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "450px",
          gap: "20px",
          padding: "40px",
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: "0 0 5px 0",
            fontSize: "28px",
            fontWeight: "700",
            color: "#ffffff",
            fontFamily: "Times New Roman",
          }}
        >
          Complete Your Profile
        </h2>
        <p style={{ color: "#fff", margin: "0 0 15px 0", fontSize: "15px" }}>
          Set up your instructor presence before accessing your dashboard.
        </p>

        {/* IMAGE PREVIEW BUBBLE */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "3px solid rgba(255, 255, 255, 0.8)",
              background: preview ? `url(${preview})` : "rgba(0,123,255,0.25)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            {!preview && (
              <span
                style={{ color: "#fff", fontSize: "14px", fontWeight: "bold" }}
              >
                No Image
              </span>
            )}
          </div>
        </div>

        {/* FILE UPLOAD INPUT */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              color: "#fff",
              fontWeight: "bold",
              marginBottom: "8px",
              fontSize: "14px",
              textAlign: "left",
            }}
          >
            Profile Picture (DP)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              padding: "10px",
              background: "rgba(0,123,255,0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              borderRadius: "8px",
              color: "#ffffff",
              cursor: "pointer",
            }}
          />
        </div>

        {/* OFFICIAL TITLE INPUT */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              color: "#fff",
              fontWeight: "bold",
              marginBottom: "8px",
              fontSize: "14px",
              textAlign: "left",
            }}
          >
            Official Title
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Frontend Engineer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
              color: "#ffffff",
              fontWeight: "550",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "11px",
            width: "100%",
            marginTop: "15px",
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
          }}
        >
          Save & Enter Dashboard
        </button>
      </form>
    </div>
  );
}

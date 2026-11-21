import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myBackground from "./assets/login-bg.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

const createEmptyQuestion = () => ({
  question_text: "",
  options: ["", "", "", ""],
  correct_answer: 0, // index 0-3
  marks: 5,
});

const createEmptySection = () => ({
  title: "",
  content: "",
  quiz: [],
});

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Course Builder State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [passMark, setPassMark] = useState(50);
  const [sections, setSections] = useState([createEmptySection()]);
  const [courseQuiz, setCourseQuiz] = useState([]);

  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("user_role");
  const fullName = localStorage.getItem("full_name") || "Instructor";

  useEffect(() => {
    if (!token || (role !== "instructor" && role !== "teacher")) {
      navigate("/login");
      return;
    }

    const fetchMyCourses = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/courses/my-courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [token, role, navigate]);

  // --- Section Helpers ---
  const addSection = () => setSections([...sections, createEmptySection()]);

  const removeSection = (sIdx) => {
    setSections(sections.filter((_, idx) => idx !== sIdx));
  };

  const updateSectionField = (sIdx, field, value) => {
    const updated = [...sections];
    updated[sIdx][field] = value;
    setSections(updated);
  };

  // --- Section Quiz Helpers ---
  const addSectionQuestion = (sIdx) => {
    const updated = [...sections];
    updated[sIdx].quiz.push(createEmptyQuestion());
    setSections(updated);
  };

  const removeSectionQuestion = (sIdx, qIdx) => {
    const updated = [...sections];
    updated[sIdx].quiz = updated[sIdx].quiz.filter((_, idx) => idx !== qIdx);
    setSections(updated);
  };

  const updateSectionQuestion = (sIdx, qIdx, field, value) => {
    const updated = [...sections];
    updated[sIdx].quiz[qIdx][field] = value;
    setSections(updated);
  };

  const updateSectionOption = (sIdx, qIdx, oIdx, value) => {
    const updated = [...sections];
    updated[sIdx].quiz[qIdx].options[oIdx] = value;
    setSections(updated);
  };

  // --- Final Course Quiz Helpers ---
  const addCourseQuestion = () => {
    setCourseQuiz([...courseQuiz, createEmptyQuestion()]);
  };

  const removeCourseQuestion = (qIdx) => {
    setCourseQuiz(courseQuiz.filter((_, idx) => idx !== qIdx));
  };

  const updateCourseQuestion = (qIdx, field, value) => {
    const updated = [...courseQuiz];
    updated[qIdx][field] = value;
    setCourseQuiz(updated);
  };

  const updateCourseOption = (qIdx, oIdx, value) => {
    const updated = [...courseQuiz];
    updated[qIdx].options[oIdx] = value;
    setCourseQuiz(updated);
  };

  // --- Live Marking Scheme Calculation ---
  const sectionQuizMarks = sections.reduce(
    (sum, sec) =>
      sum + sec.quiz.reduce((qSum, q) => qSum + Number(q.marks || 0), 0),
    0,
  );
  const finalQuizMarks = courseQuiz.reduce(
    (sum, q) => sum + Number(q.marks || 0),
    0,
  );
  const totalMarks = sectionQuizMarks + finalQuizMarks;

  // --- Submit Full Course ---
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!title.trim() || !description.trim()) {
      setError("Please fill in the course title and description.");
      return;
    }

    const payload = {
      title,
      description,
      pass_mark: Number(passMark),
      total_marks: totalMarks,
      sections,
      course_quiz: courseQuiz,
    };

    setSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/courses/full", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setCourses((prev) => [data, ...prev]);
        setTitle("");
        setDescription("");
        setPassMark(50);
        setSections([createEmptySection()]);
        setCourseQuiz([]);
        setSuccessMsg(
          "Course, sections, quizzes, and marking scheme published!",
        );
      } else {
        setError(data.detail || "Failed to publish course.");
      }
    } catch (err) {
      console.error("Error creating course:", err);
      setError("Could not connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const glassCard = {
    padding: "28px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.78)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(0, 123, 255, 0.25)",
    boxShadow: "0 8px 32px rgba(0, 123, 255, 0.15)",
    marginBottom: "28px",
  };

  const inputStyle = {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(0, 123, 255, 0.4)",
    background: "#ffffff",
    color: "#0a2540",
    fontWeight: "500",
    fontSize: "15px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${myBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "Plus Jakarta Sans, sans-serif",
      }}
    >
      {/* Navbar sits at the very top with no background covering it */}
      <div style={{ position: "relative", zIndex: 1000 }}>
        <Navbar />
      </div>

      {/* Main full-page workspace with top clearance for Navbar */}
      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "100px 24px 60px",
          boxSizing: "border-box",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            ...glassCard,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "28px", color: "#0a2540" }}>
              Welcome, {fullName}
            </h1>
            <p style={{ margin: "6px 0 0", color: "#334e68" }}>
              Build full courses with sections, quizzes, answer keys, and
              marking schemes.
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "5px 10px",
              borderRadius: "10px",
              border: "2px solid rgba(0, 17, 255, 0.4)",
              background: "rgba(0, 4, 255, 0.15)",
              color: "#0030b3",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
        </div>

        {/* Full Course Builder Form */}
        <form onSubmit={handleCreateCourse}>
          {/* 1. Course Details & Marking Scheme */}
          <div style={glassCard}>
            <h2 style={{ margin: "0 0 18px", color: "#0a2540" }}>
              1. Course Details & Marking Scheme
            </h2>

            {error && (
              <div
                style={{
                  color: "#d93025",
                  fontWeight: "600",
                  marginBottom: "14px",
                }}
              >
                {error}
              </div>
            )}
            {successMsg && (
              <div
                style={{
                  color: "#188038",
                  fontWeight: "600",
                  marginBottom: "14px",
                }}
              >
                {successMsg}
              </div>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <input
                type="text"
                placeholder="Course Title (e.g., Full-Stack FastAPI & React)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
              />
              <textarea
                placeholder="Course Description & Learning Outcomes..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...inputStyle, resize: "vertical" }}
              />

              {/* Marking Scheme Summary Bar */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(0, 123, 255, 0.08)",
                  border: "1px solid rgba(0, 123, 255, 0.2)",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#0a2540",
                    }}
                  >
                    Pass Mark (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={passMark}
                    onChange={(e) => setPassMark(e.target.value)}
                    style={{ ...inputStyle, marginTop: "6px" }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#334e68" }}>
                    Section Quizzes
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#0056b3",
                      marginTop: "6px",
                    }}
                  >
                    {sectionQuizMarks} pts
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#334e68" }}>
                    Final Course Quiz
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#0056b3",
                      marginTop: "6px",
                    }}
                  >
                    {finalQuizMarks} pts
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#334e68" }}>
                    Total Course Marks
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#0a2540",
                      marginTop: "6px",
                    }}
                  >
                    {totalMarks} pts
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Course Sections & Section Quizzes */}
          <div style={glassCard}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <h2 style={{ margin: 0, color: "#0a2540" }}>
                2. Course Sections & Section Quizzes
              </h2>
              <button
                type="button"
                onClick={addSection}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid #007bff",
                  background: "rgba(0, 123, 255, 0.1)",
                  color: "#0056b3",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                + Add Section
              </button>
            </div>

            {sections.map((section, sIdx) => (
              <div
                key={sIdx}
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.85)",
                  border: "1px solid rgba(0, 123, 255, 0.25)",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <strong style={{ color: "#0056b3", fontSize: "17px" }}>
                    Section {sIdx + 1}
                  </strong>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(sIdx)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#d93025",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Remove Section
                    </button>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Section Title (e.g., Module 1: Authentication)"
                    value={section.title}
                    onChange={(e) =>
                      updateSectionField(sIdx, "title", e.target.value)
                    }
                    style={inputStyle}
                  />
                  <textarea
                    placeholder="Section Lesson Content / Notes..."
                    rows={3}
                    value={section.content}
                    onChange={(e) =>
                      updateSectionField(sIdx, "content", e.target.value)
                    }
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                {/* Section Quiz Area */}
                <div
                  style={{
                    marginTop: "18px",
                    paddingTop: "14px",
                    borderTop: "1px dashed rgba(0,123,255,0.3)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <span style={{ fontWeight: "600", color: "#0a2540" }}>
                      Section {sIdx + 1} Quiz ({section.quiz.length} questions)
                    </span>
                    <button
                      type="button"
                      onClick={() => addSectionQuestion(sIdx)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "8px",
                        border: "1px solid #007bff",
                        background: "rgba(0, 123, 255, 0.1)",
                        color: "#0056b3",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      + Add Question
                    </button>
                  </div>

                  {section.quiz.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        background: "rgba(240, 247, 255, 0.9)",
                        border: "1px solid rgba(0, 123, 255, 0.2)",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <strong style={{ fontSize: "14px", color: "#0a2540" }}>
                          Question {qIdx + 1}
                        </strong>
                        <button
                          type="button"
                          onClick={() => removeSectionQuestion(sIdx, qIdx)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#d93025",
                            cursor: "pointer",
                            fontSize: "13px",
                          }}
                        >
                          Delete
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Enter question..."
                        value={q.question_text}
                        onChange={(e) =>
                          updateSectionQuestion(
                            sIdx,
                            qIdx,
                            "question_text",
                            e.target.value,
                          )
                        }
                        style={{ ...inputStyle, marginBottom: "10px" }}
                      />

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        {q.options.map((opt, oIdx) => (
                          <input
                            key={oIdx}
                            type="text"
                            placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                            value={opt}
                            onChange={(e) =>
                              updateSectionOption(
                                sIdx,
                                qIdx,
                                oIdx,
                                e.target.value,
                              )
                            }
                            style={inputStyle}
                          />
                        ))}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: "160px" }}>
                          <label
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#0a2540",
                            }}
                          >
                            Correct Answer
                          </label>
                          <select
                            value={q.correct_answer}
                            onChange={(e) =>
                              updateSectionQuestion(
                                sIdx,
                                qIdx,
                                "correct_answer",
                                Number(e.target.value),
                              )
                            }
                            style={{ ...inputStyle, marginTop: "4px" }}
                          >
                            <option value={0}>Option A</option>
                            <option value={1}>Option B</option>
                            <option value={2}>Option C</option>
                            <option value={3}>Option D</option>
                          </select>
                        </div>
                        <div style={{ width: "130px" }}>
                          <label
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#0a2540",
                            }}
                          >
                            Marks
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={q.marks}
                            onChange={(e) =>
                              updateSectionQuestion(
                                sIdx,
                                qIdx,
                                "marks",
                                Number(e.target.value),
                              )
                            }
                            style={{ ...inputStyle, marginTop: "4px" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3. Final Course Quiz */}
          <div style={glassCard}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <h2 style={{ margin: 0, color: "#0a2540" }}>
                3. Final Course Quiz ({courseQuiz.length} questions)
              </h2>
              <button
                type="button"
                onClick={addCourseQuestion}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid #007bff",
                  background: "rgba(0, 123, 255, 0.1)",
                  color: "#0056b3",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                + Add Final Question
              </button>
            </div>

            {courseQuiz.length === 0 ? (
              <p style={{ color: "#334e68", margin: 0 }}>
                No final exam questions added yet. Click &ldquo;+ Add Final
                Question&rdquo; to build one.
              </p>
            ) : (
              courseQuiz.map((q, qIdx) => (
                <div
                  key={qIdx}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "rgba(240, 247, 255, 0.9)",
                    border: "1px solid rgba(0, 123, 255, 0.25)",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <strong style={{ color: "#0056b3" }}>
                      Final Question {qIdx + 1}
                    </strong>
                    <button
                      type="button"
                      onClick={() => removeCourseQuestion(qIdx)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#d93025",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Enter final exam question..."
                    value={q.question_text}
                    onChange={(e) =>
                      updateCourseQuestion(
                        qIdx,
                        "question_text",
                        e.target.value,
                      )
                    }
                    style={{ ...inputStyle, marginBottom: "10px" }}
                  />

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {q.options.map((opt, oIdx) => (
                      <input
                        key={oIdx}
                        type="text"
                        placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                        value={opt}
                        onChange={(e) =>
                          updateCourseOption(qIdx, oIdx, e.target.value)
                        }
                        style={inputStyle}
                      />
                    ))}
                  </div>

                  <div
                    style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
                  >
                    <div style={{ flex: 1, minWidth: "160px" }}>
                      <label
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#0a2540",
                        }}
                      >
                        Correct Answer
                      </label>
                      <select
                        value={q.correct_answer}
                        onChange={(e) =>
                          updateCourseQuestion(
                            qIdx,
                            "correct_answer",
                            Number(e.target.value),
                          )
                        }
                        style={{ ...inputStyle, marginTop: "4px" }}
                      >
                        <option value={0}>Option A</option>
                        <option value={1}>Option B</option>
                        <option value={2}>Option C</option>
                        <option value={3}>Option D</option>
                      </select>
                    </div>
                    <div style={{ width: "130px" }}>
                      <label
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#0a2540",
                        }}
                      >
                        Marks
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={q.marks}
                        onChange={(e) =>
                          updateCourseQuestion(
                            qIdx,
                            "marks",
                            Number(e.target.value),
                          )
                        }
                        style={{ ...inputStyle, marginTop: "4px" }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid #007bff",
              background: "rgba(0, 68, 255, 0.82)",
              color: "#fbfdff",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: submitting ? "not-allowed" : "pointer",
              boxShadow: "0 8px 24px rgba(0, 217, 255, 0.35)",
              marginBottom: "45px",
            }}
          >
            {submitting
              ? "Publishing Full Course..."
              : "Publish Complete Course"}
          </button>
        </form>

        {/* Published Courses List */}
        <h2
          style={{
            fontSize: "22px",
            color: "#ffffff",
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
            marginBottom: "16px",
          }}
        >
          Your Published Courses ({courses.length})
        </h2>

        {loading ? (
          <div style={glassCard}>Loading your courses...</div>
        ) : courses.length === 0 ? (
          <div style={{ ...glassCard, textAlign: "center", color: "#334e68" }}>
            You haven&apos;t published any courses yet.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {courses.map((course) => (
              <div key={course.id} style={{ ...glassCard, marginBottom: 0 }}>
                <h3 style={{ margin: "0 0 10px", color: "#0056b3" }}>
                  {course.title}
                </h3>
                <p style={{ margin: 0, color: "#334e68", lineHeight: "1.5" }}>
                  {course.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

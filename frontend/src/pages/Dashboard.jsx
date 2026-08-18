import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API_BASE from "../config";

const API = `${API_BASE}/api/profile`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    // Try to load stored user info immediately
    try {
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      if (stored.name) setUser(stored);
    } catch (_) {}

    // Fetch live stats from profile API
    fetch(API, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setStats(data);
        }
      })
      .catch(() => {});
  }, [navigate]);

 /*  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }; */

  return (
    <div style={styles.page}>
    <Navbar />
      <div style={styles.container}>
  <h2 className="page-title">Dashboard</h2>

  <h2>
    Welcome{user ? `, ${user.name}` : ""} 🎉
  </h2>
        {/* Stats Cards */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Questions Seen</h3>
            <p style={styles.cardValue}>
              {stats ? `${stats.questions.seen} / ${stats.questions.total}` : "—"}
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>DSA Seen</h3>
            <p style={styles.cardValue}>
              {stats ? `${stats.dsa.seen} / ${stats.dsa.total}` : "—"}
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>DSA Solved</h3>
            <p style={{ ...styles.cardValue, color: "#16a34a" }}>
              {stats ? `${stats.dsa.solved} / ${stats.dsa.total}` : "—"}
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>MCQ Solved</h3>
            <p style={{ ...styles.cardValue, color: "#0ea5e9" }}>
              {stats ? `${stats.mcq.solved} / ${stats.mcq.total}` : "—"}
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>SRS Cards</h3>
            <p style={{ ...styles.cardValue, color: "#8b5cf6" }}>
              {user?.srsStats ? `${user.srsStats.totalCards}` : "—"}
            </p>
          </div>
        </div>

        {/* Interview Questions */}
        <div style={styles.section}>
          <h3 style={{ margin: "0 0 8px" }}>📚 Interview Questions</h3>
          <p style={{ margin: "0 0 16px", color: "#555", fontSize: 14 }}>
            100 curated questions across JavaScript, React, Node.js, CSS, HTML, Data Structures, Algorithms, System Design, Behavioral, and Database.
          </p>
          <Link to="/questions" style={styles.linkBtn("#11998e", "#38ef7d")}>
            Open Interview Questions →
          </Link>
        </div>

        {/* DSA Problems */}
        <div style={styles.section}>
          <h3 style={{ margin: "0 0 8px" }}>🧠 DSA Problems</h3>
          <p style={{ margin: "0 0 16px", color: "#555", fontSize: 14 }}>
            50 curated DSA problems covering Arrays, Strings, Linked Lists, Trees, Graphs, DP, and more — with full solutions and complexity analysis.
          </p>
          <Link to="/dsa" style={styles.linkBtn("#6366f1", "#8b5cf6")}>
            Open DSA Problems →
          </Link>
        </div>

        {/* MCQ Quiz */}
        <div style={styles.section}>
          <h3 style={{ margin: "0 0 8px" }}>🎯 MCQ Quiz</h3>
          <p style={{ margin: "0 0 16px", color: "#555", fontSize: 14 }}>
            50 multiple-choice questions across 10 categories (Arrays, Strings, Trees, Graphs, DP, Sorting, Linked Lists, Stacks, Hashing, System Design) with detailed explanations.
          </p>
          <Link to="/quiz" style={styles.linkBtn("#0ea5e9", "#06b6d4")}>
            Start MCQ Quiz →
          </Link>
        </div>

        {/* Spaced Repetition System */}
        <div style={styles.section}>
          <h3 style={{ margin: "0 0 8px" }}>🔁 Spaced Repetition System (SRS)</h3>
          <p style={{ margin: "0 0 16px", color: "#555", fontSize: 14 }}>
            Intelligently review interview questions scheduled by the SuperMemo SM-2 algorithm. Rate recall quality (0-5) to optimize long-term memory retention.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/srs-practice" style={styles.linkBtn("#667eea", "#764ba2")}>
              Practice Due Cards →
            </Link>
            <Link to="/srs-stats" style={styles.linkBtn("#9f7aea", "#b794f4")}>
              View SRS Stats →
            </Link>
          </div>
        </div>

        {/* Profile shortcut */}
        <div style={styles.section}>
          <h3 style={{ margin: "0 0 8px" }}>👤 Your Profile</h3>
          <p style={{ margin: "0 0 16px", color: "#555", fontSize: 14 }}>
            View your progress across all question types and track how many you've seen and solved.
          </p>
          <Link to="/profile" style={styles.linkBtn("#f97316", "#fb923c")}>
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { margin: 0, fontFamily: "Arial, sans-serif", backgroundColor: "#f4f6f8", minHeight: "100vh" },
  navbar: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileBtn: {
    color: "white",
    textDecoration: "none",
    padding: "7px 14px",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 5,
    fontSize: 13,
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
    borderRadius: 5,
    fontSize: 14,
  },
  container: { padding: "20px" },
  cards: { display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" },
  card: {
    flex: 1,
    minWidth: "150px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  cardTitle: { margin: 0, color: "#555", fontSize: "14px" },
  cardValue: { fontSize: "22px", fontWeight: "bold", margin: "8px 0 0" },
  section: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  linkBtn: (c1, c2) => ({
    display: "inline-block",
    padding: "10px 22px",
    background: `linear-gradient(135deg, ${c1}, ${c2})`,
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "14px",
    boxShadow: `0 2px 8px ${c1}44`,
  }),
};

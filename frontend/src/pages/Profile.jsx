import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API_BASE from "../config";

const API = `${API_BASE}/api/profile`;

const CATEGORY_COLORS = {
  JavaScript: "#f7df1e", React: "#61dafb", "Node.js": "#68a063",
  CSS: "#264de4", HTML: "#e44d26", "Data Structures": "#8b5cf6",
  Algorithms: "#ec4899", "System Design": "#f97316",
  Behavioral: "#0ea5e9", Database: "#14b8a6",
};

const MCQ_COLORS = {
  Arrays: "#3b82f6", Strings: "#8b5cf6", Trees: "#10b981", 
  Graphs: "#06b6d4", "Dynamic Programming": "#6366f1", 
  "Sorting & Searching": "#f59e0b", "Linked Lists": "#ec4899",
  "Stacks & Queues": "#f97316", Hashing: "#14b8a6", "System Design": "#f97316",
};

const TOPIC_COLORS = {
  Arrays: "#3b82f6", Strings: "#8b5cf6", "Linked Lists": "#ec4899",
  "Stacks & Queues": "#f97316", Trees: "#10b981", Graphs: "#06b6d4",
  "Dynamic Programming": "#6366f1", "Sorting & Searching": "#f59e0b",
  Recursion: "#84cc16", Hashing: "#14b8a6", Heaps: "#a855f7",
  "Two Pointers": "#ef4444", "Sliding Window": "#0ea5e9",
  Backtracking: "#d946ef", Greedy: "#22c55e",
};

function ProgressBar({ seen, solved, total, color }) {
  const seenPct   = total ? Math.round((seen / total) * 100) : 0;
  const solvedPct = solved != null && total ? Math.round((solved / total) * 100) : null;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4, color: "#64748b" }}>
        <span>{solved != null ? `${solved} solved / ${seen} seen` : `${seen} seen`} of {total}</span>
        <span>{seenPct}%</span>
      </div>
      <div style={{ background: "#e2e8f0", borderRadius: 99, height: 8, overflow: "hidden" }}>
        {/* Seen bar (behind) */}
        <div style={{
          width: `${seenPct}%`, height: "100%",
          background: color + "55", borderRadius: 99,
          position: "relative",
        }}>
          {/* Solved overlay */}
          {solvedPct != null && (
            <div style={{
              width: `${total ? (solved / seen) * 100 : 0}%`,
              height: "100%", background: color, borderRadius: 99,
            }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    fetch(API, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setData(d);
        else setError("Could not load profile.");
      })
      .catch(() => setError("Server unreachable."))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <Centered msg="Loading profile…" />;
  if (error)   return <Centered msg={error} color="#ef4444" />;

  const { user, questions, dsa, mcq } = data;
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });

  const qPct  = questions.total ? Math.round((questions.seen  / questions.total) * 100) : 0;
  const dsaPct = dsa.total      ? Math.round((dsa.solved / dsa.total) * 100) : 0;
  const mcqPct = mcq.total      ? Math.round((mcq.solved / mcq.total) * 100) : 0;

  return (
    <div style={styles.page}>
      <Navbar />
    <h2 className="page-title">My Profile</h2>
      <div style={styles.container}>
        {/* User Info Card */}
        <div style={styles.card}>
          <div style={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ margin: "0 0 4px" }}>{user.name}</h2>
            <p style={{ margin: "0 0 4px", color: "#64748b", fontSize: 14 }}>📧 {user.email}</p>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>🗓️ Member since {memberSince}</p>
          </div>
        </div>

        {/* Overview Stats */}
        <div style={styles.statsGrid}>
          <StatCard icon="📚" label="Questions Seen"   value={`${questions.seen} / ${questions.total}`} sub={`${qPct}% complete`} color="#11998e" />
          <StatCard icon="🧠" label="DSA Seen"         value={`${dsa.seen} / ${dsa.total}`}             sub={`${dsa.total - dsa.seen} remaining`} color="#6366f1" />
          <StatCard icon="✅" label="DSA Solved"       value={`${dsa.solved} / ${dsa.total}`}           sub={`${dsaPct}% solved`} color="#16a34a" />
          <StatCard icon="🎯" label="MCQ Solved"       value={`${mcq.solved} / ${mcq.total}`}           sub={`${mcqPct}% solved`} color="#0ea5e9" />
        </div>

        {/* Interview Questions Breakdown */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>📚 Interview Questions by Category</h3>
          <div style={styles.breakdownGrid}>
            {Object.entries(questions.categoryStats)
              .sort((a, b) => b[1].seen - a[1].seen)
              .map(([cat, stat]) => (
                <div key={cat} style={styles.breakdownItem}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{
                      display: "inline-block",
                      width: 10, height: 10, borderRadius: "50%",
                      background: CATEGORY_COLORS[cat] || "#888",
                      marginRight: 6, flexShrink: 0, marginTop: 3,
                    }} />
                    <span style={{ flex: 1, fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{cat}</span>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{stat.seen}/{stat.total}</span>
                  </div>
                  <ProgressBar seen={stat.seen} total={stat.total} color={CATEGORY_COLORS[cat] || "#6366f1"} />
                </div>
              ))}
          </div>
        </div>

        {/* DSA Breakdown */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🧠 DSA Problems by Topic</h3>
          <div style={styles.breakdownGrid}>
            {Object.entries(dsa.topicStats)
              .sort((a, b) => b[1].solved - a[1].solved)
              .map(([topic, stat]) => (
                <div key={topic} style={styles.breakdownItem}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{
                      display: "inline-block",
                      width: 10, height: 10, borderRadius: "50%",
                      background: TOPIC_COLORS[topic] || "#6366f1",
                      marginRight: 6, flexShrink: 0, marginTop: 3,
                    }} />
                    <span style={{ flex: 1, fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{topic}</span>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{stat.solved}✅ {stat.seen}👁️/{stat.total}</span>
                  </div>
                  <ProgressBar
                    seen={stat.seen}
                    solved={stat.solved}
                    total={stat.total}
                    color={TOPIC_COLORS[topic] || "#6366f1"}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* MCQ Breakdown */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🎯 MCQ Quiz by Category</h3>
          <div style={styles.breakdownGrid}>
            {Object.entries(mcq.categoryStats)
              .sort((a, b) => b[1].solved - a[1].solved)
              .map(([category, stat]) => (
                <div key={category} style={styles.breakdownItem}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{
                      display: "inline-block",
                      width: 10, height: 10, borderRadius: "50%",
                      background: MCQ_COLORS[category] || "#6366f1",
                      marginRight: 6, flexShrink: 0, marginTop: 3,
                    }} />
                    <span style={{ flex: 1, fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{category}</span>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{stat.solved}✅ {stat.attempted}👁️/{stat.total}</span>
                  </div>
                  <ProgressBar
                    seen={stat.attempted}
                    solved={stat.solved}
                    total={stat.total}
                    color={MCQ_COLORS[category] || "#6366f1"}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Overall progress summary */}
        <div style={{ ...styles.card, background: "linear-gradient(135deg, #1e293b, #334155)", color: "white" }}>
          <h3 style={{ margin: "0 0 16px", color: "white" }}>🏆 Overall Progress</h3>
          <div style={styles.overallGrid}>
            <div style={styles.overallStat}>
              <div style={styles.overallNum}>{questions.seen + dsa.seen + mcq.attempted}</div>
              <div style={styles.overallLabel}>Total Items Seen</div>
            </div>
            <div style={styles.overallStat}>
              <div style={{ ...styles.overallNum, color: "#4ade80" }}>{dsa.solved + mcq.solved}</div>
              <div style={styles.overallLabel}>Problems Solved</div>
            </div>
            <div style={styles.overallStat}>
              <div style={{ ...styles.overallNum, color: "#60a5fa" }}>
                {questions.total + dsa.total + mcq.total - questions.seen - dsa.seen - mcq.attempted}
              </div>
              <div style={styles.overallLabel}>Still To Explore</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{ ...styles.statCard, borderTop: `3px solid ${color}` }}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 13, color: "#64748b", marginTop: 4, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function Centered({ msg, color }) {
  return (
    <div style={{ textAlign: "center", marginTop: 80, fontSize: 18, color: color || "#555" }}>
      {msg}
    </div>
  );
}

const styles = {
  page: { margin: 0, fontFamily: "Arial, sans-serif", backgroundColor: "#f1f5f9", minHeight: "100vh" },
  navbar: {
    backgroundColor: "#1e293b", color: "white",
    padding: "14px 20px", display: "flex",
    justifyContent: "space-between", alignItems: "center",
  },
  navLink: {
    color: "rgba(255,255,255,0.8)", textDecoration: "none",
    fontSize: 14, padding: "5px 10px",
    borderRadius: 5, border: "1px solid rgba(255,255,255,0.2)",
  },
  container: { maxWidth: 820, margin: "0 auto", padding: 20 },
  card: {
    background: "white", borderRadius: 12,
    padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: 20, display: "block",
  },
  avatar: {
    width: 60, height: 60, borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white", fontSize: 28, fontWeight: 800,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    marginRight: 18, verticalAlign: "middle",
    flexShrink: 0,
  },
  statsGrid: { display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" },
  statCard: {
    flex: 1, minWidth: 160, background: "white",
    borderRadius: 12, padding: "18px 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  sectionTitle: { margin: "0 0 18px", fontSize: 16, color: "#1e293b" },
  breakdownGrid: { display: "flex", flexDirection: "column", gap: 16 },
  breakdownItem: { display: "flex", flexDirection: "column" },
  overallGrid: { display: "flex", gap: 20, flexWrap: "wrap" },
  overallStat: { flex: 1, textAlign: "center" },
  overallNum: { fontSize: 32, fontWeight: 800, color: "white" },
  overallLabel: { fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 },
};

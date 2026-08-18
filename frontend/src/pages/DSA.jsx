import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API_BASE from "../config";

const API_DSA = `${API_BASE}/api/dsa`;

const TOPICS = [
  "All",
  "Arrays",
  "Strings",
  "Linked Lists",
  "Stacks & Queues",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Sorting & Searching",
  "Recursion",
  "Hashing",
  "Two Pointers",
  "Sliding Window",
  "Backtracking",
  "Greedy",
  "Bit Manipulation",
];

const DIFFICULTY_COLORS = {
  Easy:   { bg: "#dcfce7", text: "#15803d", border: "#86efac" },
  Medium: { bg: "#fef9c3", text: "#a16207", border: "#fde047" },
  Hard:   { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5" },
};

const TOPIC_COLORS = {
  Arrays: "#3b82f6",
  Strings: "#8b5cf6",
  "Linked Lists": "#ec4899",
  "Stacks & Queues": "#f97316",
  Trees: "#10b981",
  Graphs: "#06b6d4",
  "Dynamic Programming": "#6366f1",
  "Sorting & Searching": "#f59e0b",
  Recursion: "#84cc16",
  Hashing: "#14b8a6",
  Heaps: "#a855f7",
  "Two Pointers": "#ef4444",
  "Sliding Window": "#0ea5e9",
  Backtracking: "#d946ef",
  Greedy: "#22c55e",
};

export default function DSA() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [problems, setProblems]         = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [showSolution, setShowSolution] = useState(false);

  const [searchInput, setSearchInput]   = useState("");
  const [searchError, setSearchError]   = useState("");

  const [activeTopic, setActiveTopic]         = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");

  const [seenSet, setSeenSet]     = useState(new Set());
  const [solvedSet, setSolvedSet] = useState(new Set());

  // ── Fetch all DSA problems ────────────────────────────────────
  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    const load = async () => {
      try {
        const res  = await fetch(API_DSA, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (res.ok) {
          setProblems(data.problems);
          setFiltered(data.problems);
        } else {
          setError("Could not load DSA problems.");
        }
      } catch {
        setError("Server unreachable. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    // Load user progress from profile
    const loadProgress = async () => {
      try {
        const res  = await fetch(`${API_BASE}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.dsa) {
          setSeenSet(new Set(data.dsa.seen ? [] : [])); // reset
          // We'll rely on backend; track locally for instant UI
        }
      } catch (_) {}
    };

    // Also load local progress from localStorage for instant UI
    try {
      const localSeen   = JSON.parse(localStorage.getItem("dsaSeen")   || "[]");
      const localSolved = JSON.parse(localStorage.getItem("dsaSolved") || "[]");
      setSeenSet(new Set(localSeen));
      setSolvedSet(new Set(localSolved));
    } catch (_) {}

    load();
    loadProgress();
  }, [navigate, token]);

  // ── Re-apply filters ──────────────────────────────────────────
  useEffect(() => {
    let result = [...problems];
    if (activeTopic !== "All")       result = result.filter((p) => p.topic === activeTopic);
    if (activeDifficulty !== "All")  result = result.filter((p) => p.difficulty === activeDifficulty);
    setFiltered(result);
    setCurrentIndex(0);
    setShowSolution(false);
    setSearchError("");
  }, [activeTopic, activeDifficulty, problems]);

  // ── Mark seen when viewing a card ────────────────────────────
  const markSeen = useCallback(async (dsaNumber) => {
    if (seenSet.has(dsaNumber)) return;
    const newSet = new Set(seenSet).add(dsaNumber);
    setSeenSet(newSet);
    localStorage.setItem("dsaSeen", JSON.stringify([...newSet]));
    try {
      await fetch(`${API_DSA}/seen/${dsaNumber}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (_) {}
  }, [seenSet, token]);

  // ── Toggle solved ─────────────────────────────────────────────
  const toggleSolved = useCallback(async (dsaNumber) => {
    const isSolved = solvedSet.has(dsaNumber);
    const newSolved = new Set(solvedSet);
    if (isSolved) {
      newSolved.delete(dsaNumber);
      try {
        await fetch(`${API_DSA}/solved/${dsaNumber}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (_) {}
    } else {
      newSolved.add(dsaNumber);
      const newSeen = new Set(seenSet).add(dsaNumber);
      setSeenSet(newSeen);
      localStorage.setItem("dsaSeen", JSON.stringify([...newSeen]));
      try {
        await fetch(`${API_DSA}/solved/${dsaNumber}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (_) {}
    }
    setSolvedSet(newSolved);
    localStorage.setItem("dsaSolved", JSON.stringify([...newSolved]));
  }, [solvedSet, seenSet, token]);

  // ── Navigate to problem by number ────────────────────────────
  const handleSearch = useCallback(() => {
    const raw = searchInput.trim();
    if (!raw) { setSearchError("Enter a problem number or topic."); return; }
    setSearchError("");
    const num = parseInt(raw, 10);
    if (!isNaN(num)) {
      const idx = filtered.findIndex((p) => p.dsaNumber === num);
      if (idx !== -1) { setCurrentIndex(idx); setShowSolution(false); return; }
    }
    const lower = raw.toLowerCase();
    const idx = filtered.findIndex(
      (p) => p.title.toLowerCase().includes(lower) || p.topic.toLowerCase().includes(lower)
    );
    if (idx !== -1) { setCurrentIndex(idx); setShowSolution(false); }
    else setSearchError(`No problem found matching "${raw}".`);
  }, [searchInput, filtered]);

  const goTo = (idx) => {
    if (idx < 0 || idx >= filtered.length) return;
    setCurrentIndex(idx);
    setShowSolution(false);
    markSeen(filtered[idx].dsaNumber);
  };

  // Mark seen when card loads
  useEffect(() => {
    if (filtered.length > 0) markSeen(filtered[currentIndex]?.dsaNumber);
  }, [currentIndex, filtered, markSeen]);

  if (loading) return <CenteredMsg msg="Loading DSA Problems…" />;
  if (error)   return <CenteredMsg msg={error} color="#ef4444" />;
  if (!filtered.length) return <CenteredMsg msg="No problems match your filters." />;

  const problem = filtered[currentIndex];
  const dc = DIFFICULTY_COLORS[problem.difficulty];

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <Navbar />
<h2 className="page-title">DSA Practice</h2>
      <div style={styles.container}>
        {/* Stats bar */}
        <div style={styles.statsBar}>
          <span>📋 Total: <b>{problems.length}</b></span>
          <span>👁️ Seen: <b>{seenSet.size}</b></span>
          <span style={{ color: "#16a34a" }}>✅ Solved: <b>{solvedSet.size}</b></span>
          <span>🔍 Filtered: <b>{filtered.length}</b></span>
        </div>

        {/* Search */}
        <div style={styles.searchRow}>
          <input
            style={styles.searchInput}
            placeholder="Search by problem # or title/topic…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button style={styles.searchBtn} onClick={handleSearch}>Search</button>
          {searchError && <span style={{ color: "#ef4444", fontSize: 13 }}>{searchError}</span>}
        </div>

        {/* Topic Filter */}
        <div style={styles.filterRow}>
          {TOPICS.map((t) => (
            <button
              key={t}
              style={{
                ...styles.filterBtn,
                background: activeTopic === t ? "#6366f1" : "#e2e8f0",
                color: activeTopic === t ? "white" : "#334155",
              }}
              onClick={() => setActiveTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div style={styles.filterRow}>
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <button
              key={d}
              style={{
                ...styles.filterBtn,
                background: activeDifficulty === d
                  ? (d === "All" ? "#334155" : DIFFICULTY_COLORS[d]?.bg || "#334155")
                  : "#e2e8f0",
                color: activeDifficulty === d
                  ? (d === "All" ? "white" : DIFFICULTY_COLORS[d]?.text || "white")
                  : "#334155",
              }}
              onClick={() => setActiveDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Problem Card */}
        <div style={styles.card}>
          {/* Card Header */}
          <div style={styles.cardHeader}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>#{problem.dsaNumber}</span>
              <span style={{
                background: TOPIC_COLORS[problem.topic] || "#6366f1",
                color: "white",
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
              }}>{problem.topic}</span>
              <span style={{
                background: dc.bg, color: dc.text, border: `1px solid ${dc.border}`,
                padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              }}>{problem.difficulty}</span>
              {seenSet.has(problem.dsaNumber) && (
                <span style={{ fontSize: 12, color: "#64748b" }}>👁️ Seen</span>
              )}
            </div>

            {/* Solved toggle */}
            <button
              onClick={() => toggleSolved(problem.dsaNumber)}
              style={{
                ...styles.solvedBtn,
                background: solvedSet.has(problem.dsaNumber) ? "#16a34a" : "transparent",
                color: solvedSet.has(problem.dsaNumber) ? "white" : "#16a34a",
                border: "2px solid #16a34a",
              }}
            >
              {solvedSet.has(problem.dsaNumber) ? "✅ Solved" : "Mark Solved"}
            </button>
          </div>

          {/* Title & Problem */}
          <h2 style={styles.title}>{problem.title}</h2>
          <div style={styles.problemBox}>
            <p style={styles.problemText}>{problem.problem}</p>
          </div>

          {/* Approach */}
          <div style={styles.approachBox}>
            <strong>💡 Approach</strong>
            <p style={{ margin: "6px 0 0", color: "#374151", fontSize: 14 }}>{problem.approach}</p>
          </div>

          {/* Complexity */}
          <div style={styles.complexityRow}>
            <span>⏱️ Time: <code>{problem.timeComplexity}</code></span>
            <span>💾 Space: <code>{problem.spaceComplexity}</code></span>
          </div>

          {/* Solution toggle */}
          <button style={styles.solutionToggle} onClick={() => setShowSolution((s) => !s)}>
            {showSolution ? "🙈 Hide Solution" : "🔑 Show Solution"}
          </button>

          {showSolution && (
            <pre style={styles.codeBlock}>{problem.solution}</pre>
          )}

          {/* Tags */}
          {problem.tags?.length > 0 && (
            <div style={styles.tagsRow}>
              {problem.tags.map((tag) => (
                <span key={tag} style={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={styles.navRow}>
          <button style={styles.navBtn} onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}>
            ← Previous
          </button>
          <span style={{ fontSize: 14, color: "#64748b" }}>
            {currentIndex + 1} / {filtered.length}
          </span>
          <button style={styles.navBtn} onClick={() => goTo(currentIndex + 1)} disabled={currentIndex === filtered.length - 1}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function CenteredMsg({ msg, color }) {
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
  statsBar: {
    display: "flex", gap: 20, background: "white",
    padding: "10px 18px", borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    marginBottom: 16, flexWrap: "wrap", fontSize: 14,
  },
  searchRow: { display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" },
  searchInput: {
    flex: 1, minWidth: 220, padding: "9px 14px",
    border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14,
  },
  searchBtn: {
    padding: "9px 18px", background: "#6366f1", color: "white",
    border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600,
  },
  filterRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  filterBtn: {
    padding: "5px 12px", borderRadius: 20, border: "none",
    cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.15s",
  },
  card: {
    background: "white", borderRadius: 12,
    padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: 16,
  },
  cardHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 14,
  },
  solvedBtn: {
    padding: "6px 16px", borderRadius: 8,
    cursor: "pointer", fontWeight: 700, fontSize: 13,
    transition: "all 0.2s",
  },
  title: { margin: "0 0 14px", fontSize: 20, color: "#1e293b" },
  problemBox: {
    background: "#f8fafc", border: "1px solid #e2e8f0",
    borderRadius: 8, padding: "14px 16px", marginBottom: 14,
  },
  problemText: { margin: 0, color: "#374151", lineHeight: 1.7, fontSize: 14 },
  approachBox: {
    background: "#fefce8", border: "1px solid #fde68a",
    borderRadius: 8, padding: "12px 16px", marginBottom: 14,
  },
  complexityRow: {
    display: "flex", gap: 20, fontSize: 13, color: "#64748b",
    marginBottom: 14, flexWrap: "wrap",
  },
  solutionToggle: {
    padding: "9px 20px", background: "#6366f1", color: "white",
    border: "none", borderRadius: 8, cursor: "pointer",
    fontWeight: 700, fontSize: 14, marginBottom: 14,
  },
  codeBlock: {
    background: "#0f172a", color: "#e2e8f0",
    padding: 20, borderRadius: 10, overflowX: "auto",
    fontSize: 13, lineHeight: 1.6, margin: "0 0 14px",
    fontFamily: "'Courier New', monospace",
  },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  tag: {
    background: "#ede9fe", color: "#5b21b6",
    padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
  },
  navRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "10px 0",
  },
  navBtn: {
    padding: "10px 22px", background: "#6366f1", color: "white",
    border: "none", borderRadius: 8, cursor: "pointer",
    fontWeight: 700, fontSize: 14,
    opacity: 1, transition: "opacity 0.2s",
  },
};

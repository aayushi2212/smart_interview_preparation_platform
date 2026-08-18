import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API_BASE from "../config";

const API = `${API_BASE}/api/questions`;

const CATEGORIES = [
  "All",
  "JavaScript",
  "React",
  "Node.js",
  "CSS",
  "HTML",
  "Data Structures",
  "Algorithms",
  "System Design",
  "Behavioral",
  "Database",
];

const DIFFICULTY_COLORS = {
  Easy: { bg: "#dcfce7", text: "#15803d", border: "#86efac" },
  Medium: { bg: "#fef9c3", text: "#a16207", border: "#fde047" },
  Hard: { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5" },
};

const CATEGORY_COLORS = {
  JavaScript: "#f7df1e",
  React: "#61dafb",
  "Node.js": "#68a063",
  CSS: "#264de4",
  HTML: "#e44d26",
  "Data Structures": "#8b5cf6",
  Algorithms: "#ec4899",
  "System Design": "#f97316",
  Behavioral: "#0ea5e9",
  Database: "#14b8a6",
};

export default function Questions() {
  const navigate = useNavigate();

  const [questions, setQuestions]       = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [showAnswer, setShowAnswer]     = useState(false);

  // Search state
  const [searchInput, setSearchInput]   = useState("");
  const [searchError, setSearchError]   = useState("");

  // Filter state
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");

  // Seen tracking
  const [seenSet, setSeenSet] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("questionsSeen") || "[]")); }
    catch { return new Set(); }
  });

  const markSeen = useCallback(async (question) => {
    if (!question) return;
    const { questionNumber, _id: questionId } = question;
    if (seenSet.has(questionNumber)) return;
    const newSet = new Set(seenSet).add(questionNumber);
    setSeenSet(newSet);
    localStorage.setItem("questionsSeen", JSON.stringify([...newSet]));
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API}/seen/${questionNumber}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetch(`${API_BASE}/api/srs/create-card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ questionId })
      });
    } catch (_) {}
  }, [seenSet]);

  // ── Fetch all questions once ──────────────────────────────────
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(API, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (res.ok) {
          setQuestions(data.questions);
          setFiltered(data.questions);
        } else {
          setError("Could not load questions.");
        }
      } catch {
        setError("Server unreachable. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  // ── Re-apply category/difficulty filters ─────────────────────
  useEffect(() => {
    let result = [...questions];
    if (activeCategory !== "All")
      result = result.filter((q) => q.category === activeCategory);
    if (activeDifficulty !== "All")
      result = result.filter((q) => q.difficulty === activeDifficulty);
    setFiltered(result);
    setCurrentIndex(0);
    setShowAnswer(false);
    setSearchError("");
  }, [activeCategory, activeDifficulty, questions]);

  // ── Search handler ────────────────────────────────────────────
  const handleSearch = useCallback(() => {
    const raw = searchInput.trim();
    if (!raw) { setSearchError("Enter a question number or topic."); return; }
    setSearchError("");

    // Try number first
    const num = parseInt(raw, 10);
    if (!isNaN(num)) {
      const idx = filtered.findIndex((q) => q.questionNumber === num);
      if (idx !== -1) {
        setCurrentIndex(idx);
        setShowAnswer(false);
      } else {
        setSearchError(`Question #${num} not found in current filter.`);
      }
      return;
    }

    // Topic / keyword search
    const lower = raw.toLowerCase();
    const idx = filtered.findIndex(
      (q) =>
        q.question.toLowerCase().includes(lower) ||
        q.category.toLowerCase().includes(lower) ||
        q.tags.some((t) => t.toLowerCase().includes(lower))
    );
    if (idx !== -1) {
      setCurrentIndex(idx);
      setShowAnswer(false);
    } else {
      setSearchError(`No match for "${raw}" in current filter.`);
    }
  }, [searchInput, filtered]);

  const handleSearchKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Mark seen when card changes
  useEffect(() => {
    if (filtered.length > 0 && filtered[currentIndex]) {
      markSeen(filtered[currentIndex]);
    }
  }, [currentIndex, filtered, markSeen]);

  // ── Navigation ────────────────────────────────────────────────
  const goTo = (idx) => {
    setCurrentIndex(idx);
    setShowAnswer(false);
    setSearchError("");
  };

  const prev = () => { if (currentIndex > 0) goTo(currentIndex - 1); };
  const next = () => { if (currentIndex < filtered.length - 1) goTo(currentIndex + 1); };

  /* const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }; */

  // ── Current question ──────────────────────────────────────────
  const q = filtered[currentIndex];
  const diffStyle = q ? DIFFICULTY_COLORS[q.difficulty] : {};

  // ── Render ────────────────────────────────────────────────────
  return (
    <div style={s.page}>
      <Navbar />

      <div style={s.wrapper}>
        {/* ── Page title ──────────────────────────────────────── */}
        <div style={s.pageHeader}>
          <h2 className="page-title">Interview Questions</h2>
          <p style={s.pageSubtitle}>
            {loading ? "Loading…" : `${filtered.length} questions`}
          </p>
        </div>

        {/* ── Search bar ──────────────────────────────────────── */}
        <div style={s.searchRow}>
          <div style={s.searchBox}>
            <span style={s.searchIcon}>🔍</span>
            <input
              style={s.searchInput}
              type="text"
              placeholder="Search by number (e.g. 12) or topic (e.g. closure, React)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKey}
            />
            {searchInput && (
              <button
                style={s.clearBtn}
                onClick={() => { setSearchInput(""); setSearchError(""); }}
                title="Clear"
              >✕</button>
            )}
          </div>
          <button style={s.searchBtn} onClick={handleSearch}>Search</button>
        </div>
        {searchError && <p style={s.searchError}>{searchError}</p>}

        {/* ── Filters ─────────────────────────────────────────── */}
        <div style={s.filtersArea}>
          <div style={s.filterGroup}>
            <span style={s.filterLabel}>Category:</span>
            <div style={s.chips}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  style={{
                    ...s.chip,
                    ...(activeCategory === cat ? s.chipActive : {}),
                    ...(cat !== "All" && activeCategory === cat
                      ? { borderColor: CATEGORY_COLORS[cat], background: CATEGORY_COLORS[cat] + "22" }
                      : {}),
                  }}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div style={s.filterGroup}>
            <span style={s.filterLabel}>Difficulty:</span>
            <div style={s.chips}>
              {["All", "Easy", "Medium", "Hard"].map((d) => (
                <button
                  key={d}
                  style={{
                    ...s.chip,
                    ...(activeDifficulty === d ? s.chipActive : {}),
                    ...(d !== "All" && activeDifficulty === d
                      ? { borderColor: DIFFICULTY_COLORS[d].border, background: DIFFICULTY_COLORS[d].bg, color: DIFFICULTY_COLORS[d].text }
                      : {}),
                  }}
                  onClick={() => setActiveDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main card ───────────────────────────────────────── */}
        {loading ? (
          <div style={s.centerMsg}>
            <div style={s.spinner} />
            <p style={{ color: "#64748b", marginTop: 16 }}>Loading questions…</p>
          </div>
        ) : error ? (
          <div style={s.errorCard}>{error}</div>
        ) : filtered.length === 0 ? (
          <div style={s.emptyCard}>
            <p style={{ fontSize: 40 }}>🤔</p>
            <p>No questions match the current filter.</p>
            <button style={s.resetBtn} onClick={() => { setActiveCategory("All"); setActiveDifficulty("All"); }}>
              Reset filters
            </button>
          </div>
        ) : (
          <>
            {/* Question card */}
            <div style={s.card}>
              {/* Card header */}
              <div style={s.cardHeader}>
                <div style={s.questionMeta}>
                  <span style={s.qNumber}>#{q.questionNumber}</span>
                  <span style={{ ...s.diffBadge, background: diffStyle.bg, color: diffStyle.text, border: `1px solid ${diffStyle.border}` }}>
                    {q.difficulty}
                  </span>
                  <span style={{
                    ...s.catBadge,
                    background: (CATEGORY_COLORS[q.category] || "#94a3b8") + "22",
                    color: (CATEGORY_COLORS[q.category] || "#94a3b8"),
                    border: `1px solid ${(CATEGORY_COLORS[q.category] || "#94a3b8")}55`,
                  }}>
                    {q.category}
                  </span>
                </div>
                <span style={s.counter}>{currentIndex + 1} / {filtered.length}</span>
              </div>

              {/* Question text */}
              <div style={s.questionSection}>
                <p style={s.questionText}>{q.question}</p>
              </div>

              {/* Tags */}
              {q.tags && q.tags.length > 0 && (
                <div style={s.tagsRow}>
                  {q.tags.map((tag) => (
                    <span key={tag} style={s.tag}>{tag}</span>
                  ))}
                </div>
              )}

              {/* Reveal answer button */}
              <button
                style={{ ...s.revealBtn, ...(showAnswer ? s.revealBtnActive : {}) }}
                onClick={() => setShowAnswer((prev) => !prev)}
              >
                {showAnswer ? "Hide Answer ▲" : "Show Answer ▼"}
              </button>

              {/* Answer */}
              {showAnswer && (
                <div style={s.answerSection}>
                  <div style={s.answerLabel}>Answer</div>
                  <p style={s.answerText}>{q.answer}</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div style={s.navRow}>
              <button style={{ ...s.navBtn, opacity: currentIndex === 0 ? 0.4 : 1 }} onClick={prev} disabled={currentIndex === 0}>
                ← Previous
              </button>

              {/* Compact dot navigator */}
              <div style={s.dotRow}>
                {filtered.slice(Math.max(0, currentIndex - 3), Math.min(filtered.length, currentIndex + 4)).map((_, i) => {
                  const realIdx = Math.max(0, currentIndex - 3) + i;
                  return (
                    <button
                      key={realIdx}
                      style={{
                        ...s.dot,
                        ...(realIdx === currentIndex ? s.dotActive : {}),
                      }}
                      onClick={() => goTo(realIdx)}
                      title={`Q${filtered[realIdx]?.questionNumber}`}
                    />
                  );
                })}
              </div>

              <button style={{ ...s.navBtn, opacity: currentIndex === filtered.length - 1 ? 0.4 : 1 }} onClick={next} disabled={currentIndex === filtered.length - 1}>
                Next →
              </button>
            </div>

            {/* Jump to number */}
            <div style={s.jumpRow}>
              <span style={s.jumpLabel}>Jump to:</span>
              <input
                style={s.jumpInput}
                type="number"
                min={1}
                max={filtered.length}
                value={currentIndex + 1}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10) - 1;
                  if (v >= 0 && v < filtered.length) goTo(v);
                }}
              />
              <span style={s.jumpLabel}>of {filtered.length}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────────
const s = {
  page: {
    margin: 0,
    minHeight: "100vh",
    backgroundColor: "#f0fdf4",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  navbar: {
    backgroundColor: "#1e293b",
    padding: "14px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
  },
  navLeft: { display: "flex", alignItems: "center", gap: 28 },
  navLogo: { color: "#38ef7d", fontWeight: 700, fontSize: 18, letterSpacing: 0.5 },
  navLink: { color: "#cbd5e1", textDecoration: "none", fontSize: 14, fontWeight: 500 },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
  },
  wrapper: { maxWidth: 820, margin: "0 auto", padding: "32px 20px 60px" },
  pageHeader: { marginBottom: 24 },
  pageTitle: { margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a" },
  pageSubtitle: { margin: "4px 0 0", color: "#64748b", fontSize: 14 },

  // Search
  searchRow: { display: "flex", gap: 10, marginBottom: 8 },
  searchBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    background: "white",
    border: "1.5px solid #d1fae5",
    borderRadius: 10,
    padding: "0 12px",
    boxShadow: "0 1px 4px rgba(17,153,142,0.07)",
  },
  searchIcon: { fontSize: 16, marginRight: 8, color: "#11998e" },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 14,
    padding: "12px 0",
    background: "transparent",
    color: "#1e293b",
  },
  clearBtn: {
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "#94a3b8",
    fontSize: 14,
    padding: "0 4px",
  },
  searchBtn: {
    padding: "0 22px",
    background: "linear-gradient(135deg, #11998e, #38ef7d)",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 8px rgba(17,153,142,0.25)",
  },
  searchError: { color: "#dc2626", fontSize: 13, margin: "0 0 12px", fontWeight: 500 },

  // Filters
  filtersArea: { marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 },
  filterGroup: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
  filterLabel: { color: "#64748b", fontSize: 13, fontWeight: 600, minWidth: 72 },
  chips: { display: "flex", gap: 6, flexWrap: "wrap" },
  chip: {
    padding: "5px 12px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 20,
    background: "white",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 500,
    color: "#475569",
    transition: "all 0.15s",
  },
  chipActive: {
    borderColor: "#11998e",
    background: "#f0fdf4",
    color: "#11998e",
    fontWeight: 700,
  },

  // Card
  card: {
    background: "white",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(17,153,142,0.10)",
    border: "1.5px solid #d1fae5",
    overflow: "hidden",
    marginBottom: 20,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #f0fdf4",
    background: "#f8fffc",
  },
  questionMeta: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
  qNumber: {
    fontWeight: 800,
    fontSize: 13,
    color: "#11998e",
    background: "#dcfce7",
    padding: "3px 10px",
    borderRadius: 20,
    letterSpacing: 0.5,
  },
  diffBadge: {
    fontSize: 12,
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 20,
  },
  catBadge: {
    fontSize: 12,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 20,
  },
  counter: { fontSize: 13, color: "#94a3b8", fontWeight: 500 },

  questionSection: { padding: "24px 24px 12px" },
  questionText: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.6,
  },

  tagsRow: { display: "flex", gap: 6, flexWrap: "wrap", padding: "0 24px 16px" },
  tag: {
    fontSize: 11,
    padding: "3px 9px",
    background: "#f1f5f9",
    color: "#64748b",
    borderRadius: 20,
    border: "1px solid #e2e8f0",
    fontWeight: 500,
  },

  revealBtn: {
    display: "block",
    width: "calc(100% - 48px)",
    margin: "0 24px 20px",
    padding: "12px",
    background: "#f0fdf4",
    color: "#11998e",
    border: "2px dashed #86efac",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.15s",
    textAlign: "center",
  },
  revealBtnActive: {
    background: "#dcfce7",
    borderStyle: "solid",
    borderColor: "#11998e",
  },

  answerSection: {
    margin: "0 24px 24px",
    background: "#f8fffc",
    border: "1.5px solid #d1fae5",
    borderRadius: 12,
    padding: "20px",
  },
  answerLabel: {
    fontSize: 11,
    fontWeight: 800,
    color: "#11998e",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  answerText: {
    margin: 0,
    fontSize: 15,
    color: "#1e293b",
    lineHeight: 1.75,
  },

  // Navigation
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  navBtn: {
    padding: "10px 22px",
    background: "white",
    color: "#11998e",
    border: "2px solid #11998e",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    transition: "all 0.15s",
    minWidth: 110,
  },
  dotRow: { display: "flex", gap: 6, alignItems: "center" },
  dot: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: "#cbd5e1",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.15s",
  },
  dotActive: {
    background: "#11998e",
    transform: "scale(1.4)",
  },

  // Jump
  jumpRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 4,
  },
  jumpLabel: { fontSize: 13, color: "#94a3b8" },
  jumpInput: {
    width: 56,
    padding: "6px 8px",
    border: "1.5px solid #d1fae5",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    color: "#0f172a",
    outline: "none",
  },

  // States
  centerMsg: { textAlign: "center", padding: "60px 20px", display: "flex", flexDirection: "column", alignItems: "center" },
  spinner: {
    width: 36,
    height: 36,
    border: "4px solid #d1fae5",
    borderTop: "4px solid #11998e",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  errorCard: {
    background: "#fee2e2",
    color: "#b91c1c",
    borderRadius: 12,
    padding: "24px",
    textAlign: "center",
    fontWeight: 600,
    border: "1px solid #fca5a5",
  },
  emptyCard: {
    textAlign: "center",
    padding: "48px 24px",
    background: "white",
    borderRadius: 16,
    border: "1.5px dashed #d1fae5",
    color: "#64748b",
    fontSize: 15,
  },
  resetBtn: {
    marginTop: 12,
    padding: "8px 20px",
    background: "#11998e",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },
};

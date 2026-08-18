import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Smart Interview Prep</h2>

      <div style={styles.menu}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/questions" style={styles.link}>Questions</Link>
        <Link to="/dsa" style={styles.link}>DSA</Link>
        <Link to="/quiz" style={styles.link}>Quiz</Link>
        <Link to="/srs-practice" style={styles.link}>SRS Practice</Link>
        <Link to="/srs-stats" style={styles.link}>SRS Stats</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "#1e293b",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },

  logo: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "bold",
  },

  menu: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    padding: "8px 12px",
    borderRadius: "5px",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
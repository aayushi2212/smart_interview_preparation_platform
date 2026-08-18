import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE from "../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h2 className="page-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={styles.linkText}>
          <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
        </p>
        <p style={styles.linkText}>
          No account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #11998e, #38ef7d)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  title: { marginBottom: "20px", color: "#333" },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#11998e",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    marginTop: "8px",
  },
  linkText: { marginTop: "10px", fontSize: "14px", color: "#555" },
  link: { color: "#11998e", textDecoration: "none", fontWeight: "bold" },
};

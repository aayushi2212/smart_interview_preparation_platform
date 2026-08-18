import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE from "../config";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.status === 201) {
        alert("Registration successful! Please login.");
        navigate("/login");
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
        <h2 className="page-title">Create Account</h2>
        <form onSubmit={handleRegister}>
          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p style={styles.linkText}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
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
    background: "#667eea",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    marginTop: "8px",
  },
  linkText: { marginTop: "10px", fontSize: "14px", color: "#555" },
  link: { color: "#667eea", textDecoration: "none", fontWeight: "bold" },
};

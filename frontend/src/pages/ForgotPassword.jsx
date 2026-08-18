import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE from "../config";

// STEP 1: Enter Email
function StepEmail({ onNext }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",                                                                                                                                                                                                                                                                                                                                  
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("OTP sent to your email!");
        onNext(email);
      } else {
        alert(data.message || "Email not found.");
      }
    } catch {
      alert("Could not connect to server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 style={styles.title}>Forgot Password</h2>
      <p style={styles.subtitle}>Enter your email to receive a reset OTP.</p>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button style={{ ...styles.button, background: "#6366f1" }} type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </>
  );
}

// STEP 2: Enter OTP
function StepOTP({ email, onNext }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        onNext(otp);
      } else {
        alert(data.message || "Invalid OTP.");
      }
    } catch {
      alert("Could not connect to server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 style={styles.title}>Enter OTP</h2>
      <p style={styles.subtitle}>We sent an OTP to <strong>{email}</strong></p>
      <form onSubmit={handleVerify}>
        <input
          style={{ ...styles.input, letterSpacing: "8px", textAlign: "center", fontSize: "20px" }}
          type="text"
          placeholder="- - - -"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />
        <button style={{ ...styles.button, background: "#6366f1" }} type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </>
  );
}

// STEP 3: New Password
function StepNewPassword({ email, otp, onDone }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Password reset successfully!");
        onDone();
      } else {
        alert(data.message || "Reset failed.");
      }
    } catch {
      alert("Could not connect to server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 style={styles.title}>New Password</h2>
      <p style={styles.subtitle}>Set a new password for your account.</p>
      <form onSubmit={handleReset}>
        <input
          style={styles.input}
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Confirm New Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          minLength={6}
          required
        />
        <button style={{ ...styles.button, background: "#10b981" }} type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </>
  );
}

// Progress Steps Indicator
function StepIndicator({ current }) {
  const steps = ["Email", "OTP", "New Password"];
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
      {steps.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{
            width: "28px", height: "28px", borderRadius: "50%",
            background: i <= current ? "#6366f1" : "#e2e8f0",
            color: i <= current ? "white" : "#aaa",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: "bold",
          }}>
            {i + 1}
          </div>
          <span style={{ fontSize: "11px", color: i <= current ? "#6366f1" : "#aaa" }}>{label}</span>
          {i < 2 && <div style={{ width: "20px", height: "2px", background: i < current ? "#6366f1" : "#e2e8f0" }} />}
        </div>
      ))}
    </div>
  );
}

// Main ForgotPassword component
export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <StepIndicator current={step} />

        {step === 0 && (
          <StepEmail onNext={(e) => { setEmail(e); setStep(1); }} />
        )}
        {step === 1 && (
          <StepOTP email={email} onNext={(o) => { setOtp(o); setStep(2); }} />
        )}
        {step === 2 && (
          <StepNewPassword email={email} otp={otp} onDone={() => navigate("/login")} />
        )}

        <p style={{ marginTop: "16px", fontSize: "14px" }}>
          <Link to="/login" style={{ color: "#6366f1", textDecoration: "none" }}>← Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #6366f1, #a855f7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "340px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  title: { margin: "0 0 8px", color: "#1e293b" },
  subtitle: { color: "#64748b", fontSize: "14px", marginBottom: "16px" },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "11px",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "15px",
    marginTop: "8px",
    fontWeight: "600",
  },
};

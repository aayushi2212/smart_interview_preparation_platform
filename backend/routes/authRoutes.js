const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const OtpToken = require("../models/OtpToken");
const { sendOTPEmail } = require("../utils/mailer");

const router = express.Router();

// ── REGISTER ──────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ── LOGIN ─────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
      console.error("REGISTER ERROR:", err); // add this line
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ── FORGOT PASSWORD - Send OTP ─────────────────────────────
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No account found with this email" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing OTP for this email, then save fresh one
    await OtpToken.deleteMany({ email });
    await OtpToken.create({ email, otp });

    // Send OTP via email
    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ message: "Failed to send OTP. Please try again.", error: err.message });
  }
});

// ── VERIFY OTP ─────────────────────────────────────────────
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const record = await OtpToken.findOne({ email });
    if (!record) return res.status(400).json({ message: "OTP has expired or was never requested. Please request a new one." });
    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ── RESET PASSWORD ─────────────────────────────────────────
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword)
      return res.status(400).json({ message: "All fields are required" });

    const record = await OtpToken.findOne({ email });
    if (!record) return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });

    // Delete OTP after successful use
    await OtpToken.deleteMany({ email });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const DSAQuestion = require("../models/DSAQuestion");
const User = require("../models/User");

const router = express.Router();

// Middleware: optionally decode user from token (non-blocking)
function getUser(req, res, next) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    try {
      req.userId = jwt.verify(auth.slice(7), process.env.JWT_SECRET).id;
    } catch (_) {}
  }
  next();
}

// GET /api/dsa — get all problems (with optional filters)
router.get("/", getUser, async (req, res) => {
  try {
    const filter = {};
    if (req.query.topic) filter.topic = req.query.topic;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;

    const problems = await DSAQuestion.find(filter).sort({ dsaNumber: 1 });
    res.json({ total: problems.length, problems });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/dsa/seen/:dsaNumber — mark a DSA problem as seen
router.post("/seen/:dsaNumber", getUser, async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Login required" });
    const num = Number(req.params.dsaNumber);
    await User.findByIdAndUpdate(req.userId, { $addToSet: { seenDSA: num } });
    res.json({ message: "Marked as seen" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/dsa/solved/:dsaNumber — mark a DSA problem as solved
router.post("/solved/:dsaNumber", getUser, async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Login required" });
    const num = Number(req.params.dsaNumber);
    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { solvedDSA: num, seenDSA: num },
    });
    res.json({ message: "Marked as solved" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/dsa/solved/:dsaNumber — unmark a DSA problem as solved
router.delete("/solved/:dsaNumber", getUser, async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Login required" });
    const num = Number(req.params.dsaNumber);
    await User.findByIdAndUpdate(req.userId, { $pull: { solvedDSA: num } });
    res.json({ message: "Unmarked as solved" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/dsa/:id — get a single problem by dsaNumber
router.get("/:id", getUser, async (req, res) => {
  try {
    const problem = await DSAQuestion.findOne({ dsaNumber: req.params.id });
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

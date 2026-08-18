const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const InterviewQuestion = require("../models/InterviewQuestion");
const DSAQuestion = require("../models/DSAQuestion");
const MCQQuestion = require("../models/MCQQuestion");

const router = express.Router();

// GET /api/profile - Fetch user profile with stats
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ===== INTERVIEW QUESTIONS STATS =====
    const totalQuestions = await InterviewQuestion.countDocuments();
    const seenQuestionsCount = user.seenQuestions.length;

    // Category-wise breakdown
    const allQuestions = await InterviewQuestion.find().select("questionNumber category");
    const categoryStats = {};

    allQuestions.forEach((q) => {
      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { seen: 0, total: 0 };
      }
      categoryStats[q.category].total += 1;

      if (user.seenQuestions.includes(q.questionNumber)) {
        categoryStats[q.category].seen += 1;
      }
    });

    const questions = {
      seen: seenQuestionsCount,
      total: totalQuestions,
      categoryStats: categoryStats,
    };

    // ===== DSA STATS =====
    const totalDSA = await DSAQuestion.countDocuments();
    const seenDSACount = user.seenDSA.length;
    const solvedDSACount = user.solvedDSA.length;

    // Topic-wise breakdown
    const allDSA = await DSAQuestion.find().select("dsaNumber topic");
    const topicStats = {};

    allDSA.forEach((d) => {
      if (!topicStats[d.topic]) {
        topicStats[d.topic] = { seen: 0, solved: 0, total: 0 };
      }
      topicStats[d.topic].total += 1;

      if (user.seenDSA.includes(d.dsaNumber)) {
        topicStats[d.topic].seen += 1;
      }

      if (user.solvedDSA.includes(d.dsaNumber)) {
        topicStats[d.topic].solved += 1;
      }
    });

    const dsa = {
      seen: seenDSACount,
      solved: solvedDSACount,
      total: totalDSA,
      topicStats: topicStats,
    };

    // ===== MCQ STATS =====
    const totalMCQ = await MCQQuestion.countDocuments();
    const attemptedMCQCount = user.mcqAttempted.length;
    const solvedMCQCount = user.mcqSolved.length;

    // Category-wise breakdown
    const allMCQ = await MCQQuestion.find().select("questionId category");
    const mcqCategoryStats = {};

    allMCQ.forEach((m) => {
      if (!mcqCategoryStats[m.category]) {
        mcqCategoryStats[m.category] = { attempted: 0, solved: 0, total: 0 };
      }
      mcqCategoryStats[m.category].total += 1;

      if (user.mcqAttempted.includes(m.questionId)) {
        mcqCategoryStats[m.category].attempted += 1;
      }

      if (user.mcqSolved.includes(m.questionId)) {
        mcqCategoryStats[m.category].solved += 1;
      }
    });

    const mcq = {
      attempted: attemptedMCQCount,
      solved: solvedMCQCount,
      total: totalMCQ,
      categoryStats: mcqCategoryStats,
    };

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        srsStats: user.srsStats,
      },
      questions: questions,
      dsa: dsa,
      mcq: mcq,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

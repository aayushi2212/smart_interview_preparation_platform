const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const MCQQuestion = require("../models/MCQQuestion");

const router = express.Router();

// GET /api/mcq/all - Get all MCQ questions
router.get("/all", async (req, res) => {
  try {
    const questions = await MCQQuestion.find().select(
      "questionId category topic difficulty question options correctAnswerIndex explanation"
    );
    res.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Error fetching MCQ questions:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// GET /api/mcq/meta/categories - Get all available categories
router.get("/meta/categories", async (req, res) => {
  try {
    const categories = await MCQQuestion.distinct("category");
    const categoryObj = {};

    for (const cat of categories) {
      const count = await MCQQuestion.countDocuments({ category: cat });
      categoryObj[cat] = count;
    }

    res.json({
      success: true,
      categories: categoryObj,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// GET /api/mcq/category/:category - Get questions by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await MCQQuestion.find({ category }).select(
      "questionId category topic difficulty question options correctAnswerIndex explanation"
    );

    res.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Error fetching questions by category:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// GET /api/mcq/difficulty/:difficulty - Get questions by difficulty
router.get("/difficulty/:difficulty", async (req, res) => {
  try {
    const { difficulty } = req.params;
    const questions = await MCQQuestion.find({ difficulty }).select(
      "questionId category topic difficulty question options correctAnswerIndex explanation"
    );

    res.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Error fetching questions by difficulty:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// POST /api/mcq/submit-answer/:questionId - Submit answer and get result
router.post("/submit-answer/:questionId", authMiddleware, async (req, res) => {
  try {
    const { questionId } = req.params;
    const { selectedAnswerIndex } = req.body;
    const userId = req.user.id;

    // Find the question
    const question = await MCQQuestion.findOne({
      questionId: parseInt(questionId),
    });

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    // Check if answer is correct
    const isCorrect = selectedAnswerIndex === question.correctAnswerIndex;

    // Get selected and correct option text
    const userSelected = question.options[selectedAnswerIndex]?.text || "Unknown";
    const correctAnswer = question.options[question.correctAnswerIndex]?.text || "Unknown";

    // Update user progress
    const user = await User.findById(userId);

    if (user) {
      // Add to attempted (if not already)
      if (!user.mcqAttempted.includes(questionId)) {
        user.mcqAttempted.push(questionId);
      }

      // Add to solved (if correct and not already)
      if (isCorrect && !user.mcqSolved.includes(questionId)) {
        user.mcqSolved.push(questionId);
      }

      await user.save();
    }

    res.json({
      success: true,
      isCorrect,
      userSelected,
      correctAnswer,
      explanation: question.explanation,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
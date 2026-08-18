const mongoose = require("mongoose");

const interviewQuestionSchema = new mongoose.Schema(
  {
    questionNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InterviewQuestion", interviewQuestionSchema);

const mongoose = require("mongoose");

const dsaQuestionSchema = new mongoose.Schema(
  {
    dsaNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    problem: {
      type: String,
      required: true,
      trim: true,
    },
    solution: {
      type: String,
      required: true,
      trim: true,
    },
    approach: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      enum: [
          "Arrays",
          "Strings",
          "Linked Lists",
          "Stacks & Queues",
          "Trees",
          "Graphs",
          "Dynamic Programming",
          "Sorting & Searching",
          "Recursion",
          "Hashing",
          "Heaps",
          "Two Pointers",
          "Sliding Window",
          "Backtracking",
          "Greedy",
          "Bit Manipulation",
          "Math",
          "Matrix",
          "Design",
          "Advanced Graphs"
        ],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },
    timeComplexity: { type: String, required: true },
    spaceComplexity: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DSAQuestion", dsaQuestionSchema);

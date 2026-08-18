const mongoose = require("mongoose");

const srsCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewQuestion",
      required: true
    },
    category: String,
    difficulty: String, // 'easy', 'medium', 'hard'

    // SRS-specific fields
    interval: {
      type: Number,
      default: 1 // days until next review
    },
    easinessFactor: {
      type: Number,
      default: 2.5 // SuperMemo formula
    },
    repetitions: {
      type: Number,
      default: 0 // how many times reviewed
    },
    nextReviewDate: {
      type: Date,
      default: Date.now // when to show again
    },
    lastReviewDate: {
      type: Date,
      default: null
    },

    // Tracking performance
    quality: {
      type: Number,
      default: 0 // 0-5: how well user knows it
    },
    reviews: [
      {
        date: Date,
        quality: Number, // 0-5 score
        timeSpent: Number, // seconds
        userAnswer: String
      }
    ],

    status: {
      type: String,
      enum: ["new", "learning", "review", "suspended"],
      default: "new"
    },
    suspended: {
      type: Boolean,
      default: false
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SRSCard", srsCardSchema);
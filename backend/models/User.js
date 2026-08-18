const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Interview Questions progress
    seenQuestions: { type: [Number], default: [] },       // questionNumbers seen

    // DSA progress
    seenDSA: { type: [Number], default: [] },             // dsaNumbers seen
    solvedDSA: { type: [Number], default: [] },           // dsaNumbers marked solved

    // MCQ progress
    mcqAttempted: { type: [Number], default: [] },        // questionIds attempted
    mcqSolved: { type: [Number], default: [] },           // questionIds solved correctly

    // Spaced Repetition System (SRS) Stats
    srsStats: {
      totalCards: { type: Number, default: 0 },
      newCards: { type: Number, default: 0 },
      learningCards: { type: Number, default: 0 },
      reviewCards: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
      averageEasinessFactor: { type: Number, default: 2.5 }
    },

    // Daily SRS targets
    srsTargets: {
      newCardsPerDay: { type: Number, default: 10 },
      reviewsPerDay: { type: Number, default: 50 }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
const mongoose = require('mongoose');

const mcqQuestionSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: [
      'Arrays',
      'Strings',
      'Trees',
      'Graphs',
      'Dynamic Programming',
      'Sorting & Searching',
      'Linked Lists',
      'Stacks & Queues',
      'Hashing',
      'System Design'
    ],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [
    {
      text: String,
      isCorrect: Boolean
    }
  ],
  correctAnswerIndex: {
    type: Number,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  topic: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MCQQuestion', mcqQuestionSchema);

// routes/srs.js
const express = require('express');
const router = express.Router();
const SRSCard = require('../models/SRSCard');
const User = require('../models/User');
const InterviewQuestion = require('../models/InterviewQuestion');
const { calculateNextReview, getCardStatus } = require('../utils/srsAlgorithm');
const auth = require('../middleware/authMiddleware');  // CORRECTED PATH

// 1. CREATE SRS CARD (when user attempts a question)
router.post('/create-card', auth, async (req, res) => {
  try {
    const { questionId } = req.body;
    const userId = req.user.id;

    // Check if card already exists
    let srsCard = await SRSCard.findOne({ userId, questionId });

    if (!srsCard) {
      const question = await InterviewQuestion.findById(questionId);
      
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }

      srsCard = new SRSCard({
        userId,
        questionId,
        category: question.category,
        difficulty: question.difficulty
      });

      await srsCard.save();

      // Update user SRS stats
      await User.findByIdAndUpdate(userId, {
        $inc: { 'srsStats.totalCards': 1, 'srsStats.newCards': 1 }
      });
    }

    res.json(srsCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. SUBMIT ANSWER & UPDATE SRS
router.post('/submit-review', auth, async (req, res) => {
  try {
    const { cardId, quality, timeSpent, userAnswer } = req.body;
    const userId = req.user.id;

    // Validate quality (0-5)
    if (quality < 0 || quality > 5) {
      return res.status(400).json({ error: 'Quality must be 0-5' });
    }

    const srsCard = await SRSCard.findById(cardId);
    
    if (!srsCard || srsCard.userId.toString() !== userId) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Calculate next review using SM-2
    const nextReview = calculateNextReview(srsCard, quality);

    // Update card
    srsCard.easinessFactor = nextReview.easinessFactor;
    srsCard.repetitions = nextReview.repetitions;
    srsCard.interval = nextReview.interval;
    srsCard.nextReviewDate = nextReview.nextReviewDate;
    srsCard.quality = quality;
    srsCard.lastReviewDate = new Date();
    srsCard.status = quality < 3 ? 'learning' : 'review';

    // Add review record
    srsCard.reviews.push({
      date: new Date(),
      quality,
      timeSpent,
      userAnswer
    });

    await srsCard.save();

    // Update user stats
    await updateUserSRSStats(userId);

    res.json({
      success: true,
      card: srsCard,
      nextReviewDate: nextReview.nextReviewDate,
      message: quality < 3 ? 'Keep practicing!' : 'Great! See you in ' + nextReview.interval + ' days'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2b. COMPATIBILITY ENDPOINT FOR FRONTEND (POST /review/:cardId)
router.post('/review/:cardId', auth, async (req, res) => {
  try {
    const { quality, timeSpent, userAnswer } = req.body;
    const cardId = req.params.cardId;
    const userId = req.user.id;

    // Validate quality (0-5)
    if (quality < 0 || quality > 5) {
      return res.status(400).json({ error: 'Quality must be 0-5' });
    }

    const srsCard = await SRSCard.findById(cardId);
    
    if (!srsCard || srsCard.userId.toString() !== userId) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Calculate next review using SM-2
    const nextReview = calculateNextReview(srsCard, quality);

    // Update card
    srsCard.easinessFactor = nextReview.easinessFactor;
    srsCard.repetitions = nextReview.repetitions;
    srsCard.interval = nextReview.interval;
    srsCard.nextReviewDate = nextReview.nextReviewDate;
    srsCard.quality = quality;
    srsCard.lastReviewDate = new Date();
    srsCard.status = quality < 3 ? 'learning' : 'review';

    // Add review record
    srsCard.reviews.push({
      date: new Date(),
      quality,
      timeSpent: timeSpent || 0,
      userAnswer
    });

    await srsCard.save();

    // Update user stats
    await updateUserSRSStats(userId);

    res.json({
      success: true,
      card: srsCard,
      nextReviewDate: nextReview.nextReviewDate,
      message: quality < 3 ? 'Keep practicing!' : 'Great! See you in ' + nextReview.interval + ' days'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 3. GET DUE CARDS (cards ready for review today)
router.get('/due-cards', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const dueCards = await SRSCard.find({
      userId,
      nextReviewDate: { $lte: new Date() },
      suspended: false,
      status: { $in: ['new', 'learning', 'review'] }
    })
      .populate('questionId')
      .sort({ nextReviewDate: 1 })
      .limit(50);

    // Get stats
    const newCards = await SRSCard.countDocuments({ 
      userId, 
      status: 'new', 
      suspended: false 
    });

    const learningCards = await SRSCard.countDocuments({ 
      userId, 
      status: 'learning', 
      suspended: false 
    });

    const reviewCards = await SRSCard.countDocuments({ 
      userId, 
      status: 'review', 
      suspended: false 
    });

    res.json({
      cards: dueCards,
      stats: {
        newCards,
        learningCards,
        reviewCards,
        total: newCards + learningCards + reviewCards
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET CARDS BY STATUS
router.get('/cards-by-status', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const newCards = await SRSCard.countDocuments({ 
      userId, 
      status: 'new', 
      suspended: false 
    });

    const learningCards = await SRSCard.countDocuments({ 
      userId, 
      status: 'learning', 
      suspended: false 
    });

    const reviewCards = await SRSCard.countDocuments({ 
      userId, 
      status: 'review', 
      suspended: false 
    });

    res.json({
      newCards,
      learningCards,
      reviewCards,
      total: newCards + learningCards + reviewCards
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. GET ALL SRS STATS
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const newCards = await SRSCard.countDocuments({ 
      userId, 
      status: 'new', 
      suspended: false 
    });

    const learningCards = await SRSCard.countDocuments({ 
      userId, 
      status: 'learning', 
      suspended: false 
    });

    const reviewCards = await SRSCard.countDocuments({ 
      userId, 
      status: 'review', 
      suspended: false 
    });

    const allCards = await SRSCard.find({ userId });
    const totalReviews = allCards.reduce((sum, card) => sum + card.reviews.length, 0);
    
    const avgEF = allCards.length > 0 
      ? (allCards.reduce((sum, card) => sum + card.easinessFactor, 0) / allCards.length).toFixed(2)
      : 2.5;

    res.json({
      totalCards: allCards.length,
      newCards,
      learningCards,
      reviewCards,
      totalReviews,
      averageEasinessFactor: avgEF
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. GET CARD STATISTICS (individual card)
router.get('/stats/:cardId', auth, async (req, res) => {
  try {
    const srsCard = await SRSCard.findById(req.params.cardId);

    if (!srsCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json({
      repetitions: srsCard.repetitions,
      easinessFactor: srsCard.easinessFactor,
      interval: srsCard.interval,
      nextReviewDate: srsCard.nextReviewDate,
      lastReviewDate: srsCard.lastReviewDate,
      reviewHistory: srsCard.reviews,
      successRate: srsCard.reviews.length > 0 
        ? (srsCard.reviews.filter(r => r.quality >= 3).length / srsCard.reviews.length * 100).toFixed(2) + '%'
        : 'No reviews yet'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. SUSPEND/RESUME CARD
router.post('/toggle-suspend/:cardId', auth, async (req, res) => {
  try {
    const srsCard = await SRSCard.findById(req.params.cardId);
    
    if (!srsCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    srsCard.suspended = !srsCard.suspended;
    await srsCard.save();

    res.json(srsCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to update user SRS stats
async function updateUserSRSStats(userId) {
  const totalCards = await SRSCard.countDocuments({ userId });
  const newCards = await SRSCard.countDocuments({ userId, status: 'new' });
  const learningCards = await SRSCard.countDocuments({ userId, status: 'learning' });
  const reviewCards = await SRSCard.countDocuments({ userId, status: 'review' });

  const allCards = await SRSCard.find({ userId });
  const avgEF = allCards.length > 0 
    ? (allCards.reduce((sum, card) => sum + card.easinessFactor, 0) / allCards.length).toFixed(2)
    : 2.5;

  await User.findByIdAndUpdate(userId, {
    'srsStats.totalCards': totalCards,
    'srsStats.newCards': newCards,
    'srsStats.learningCards': learningCards,
    'srsStats.reviewCards': reviewCards,
    'srsStats.averageEasinessFactor': avgEF
  });
}

module.exports = router;
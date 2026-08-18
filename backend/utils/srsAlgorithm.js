// utils/srsAlgorithm.js

/**
 * SuperMemo SM-2 Algorithm
 * quality: 0-5 scale
 *   5 = perfect response
 *   4 = correct with serious difficulty
 *   3 = correct after some difficulty
 *   2 = incorrect, but correct answer remembered
 *   1 = incorrect, correct answer known
 *   0 = complete blackout, wrong answer
 */

function calculateNextReview(srsCard, quality) {
  let { easinessFactor, repetitions, interval } = srsCard;

  // Validate quality input
  if (quality < 0 || quality > 5) {
    throw new Error('Quality must be between 0-5');
  }

  // Step 1: Update easiness factor
  easinessFactor = Math.max(
    1.3,
    easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Step 2: Determine if answer was successful (quality >= 3)
  if (quality < 3) {
    // Failed - reset
    repetitions = 0;
    interval = 1;
  } else {
    // Successful
    repetitions++;
    
    if (repetitions === 1) {
      interval = 1;  // 1 day
    } else if (repetitions === 2) {
      interval = 3;  // 3 days
    } else {
      // interval = previous_interval * easinessFactor
      interval = Math.round(interval * easinessFactor);
    }
  }

  // Step 3: Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    easinessFactor: parseFloat(easinessFactor.toFixed(2)),
    repetitions,
    interval,
    nextReviewDate,
    quality
  };
}

/**
 * Determine card status based on last review and quality
 */
function getCardStatus(srsCard) {
  const { repetitions, quality, lastReviewDate } = srsCard;

  if (repetitions === 0) {
    return 'new';
  }

  if (quality < 3) {
    return 'learning'; // Failed, needs relearning
  }

  return 'review'; // Ready for review
}

module.exports = {
  calculateNextReview,
  getCardStatus
};
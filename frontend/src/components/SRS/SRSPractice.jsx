import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import './SRSPractice.css';
import API_BASE from '../../config';

function SRSPractice() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ newCards: 0, learningCards: 0, reviewCards: 0 });

  useEffect(() => {
    fetchDueCards();
  }, []);

  const fetchDueCards = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/srs/due-cards`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setCards(data.cards || []);
        setStats(data.stats || { newCards: 0, learningCards: 0, reviewCards: 0 });
        if (data.cards && data.cards.length > 0) {
          setCurrentCard(data.cards[0]);
        } else {
          setCurrentCard(null);
        }
      } else {
        setError(data.error || 'Failed to fetch due cards');
      }
    } catch (err) {
      console.error('Error fetching cards:', err);
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (qualityScore) => {
    if (!currentCard) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/srs/review/${currentCard._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          quality: qualityScore,
          userAnswer
        })
      });

      const data = await response.json();
      if (response.ok) {
        // Move to next card
        const nextCards = cards.slice(1);
        setCards(nextCards);
        setUserAnswer('');
        
        if (nextCards.length > 0) {
          setCurrentCard(nextCards[0]);
        } else {
          setCurrentCard(null);
          alert('Great! You completed all due cards today! 🎉');
          fetchDueCards();
        }
      } else {
        alert(data.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Network error submitting answer');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="srs-container">
          <div className="loading-state">Loading Spaced Repetition Cards...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="srs-container">
          <div className="error-state" style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>
            <h3>Error</h3>
            <p>{error}</p>
            <button className="btn-primary" onClick={fetchDueCards} style={{ marginTop: '20px' }}>Retry</button>
          </div>
        </div>
      </>
    );
  }

  if (!currentCard) {
    return (
      <>
        <Navbar />
        <div className="srs-container" style={{ textAlign: 'center', marginTop: '60px' }}>
          <h2>No cards due today! 🎉</h2>
          <p style={{ color: '#555', margin: '20px 0' }}>You've reviewed all active cards or haven't viewed any interview questions yet.</p>
          <p style={{ color: '#777', fontSize: '14px', marginBottom: '30px' }}>Browse the <b>Interview Questions</b> tab to automatically enqueue cards for review.</p>
          <button className="btn-primary" onClick={() => window.history.back()}>Go Back</button>
        </div>
      </>
    );
  }

  // Safely extract question fields from populated questionId reference
  const questionInfo = currentCard.questionId || {};
  const questionText = questionInfo.question || 'No question text available.';
  const questionNum = questionInfo.questionNumber || 'N/A';
  const category = questionInfo.category || 'General';
  const difficulty = questionInfo.difficulty || 'Medium';

  return (
    <>
      <Navbar />
      <div className="srs-container">
        <div className="srs-header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="page-title" style={{ margin: 0 }}>Spaced Repetition Practice</h2>
          <button className="btn-back" onClick={() => window.history.back()} style={{
            padding: '8px 16px',
            background: '#e2e8f0',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>Back</button>
        </div>

        <div className="srs-stats">
          <h3>Today's Progress</h3>
          <p>New Cards: <strong>{stats.newCards}</strong> | Learning: <strong>{stats.learningCards}</strong> | Review: <strong>{stats.reviewCards}</strong></p>
          <p>Remaining cards for this session: <strong>{cards.length}</strong></p>
        </div>

        <div className="srs-card">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ fontSize: '13px', color: '#888' }}>Question #{questionNum}</span>
            <span className="badge category" style={{
              background: '#ede9fe',
              color: '#6b21a8',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600'
            }}>{category}</span>
            <span className="badge difficulty" style={{
              background: difficulty === 'Easy' ? '#dcfce7' : difficulty === 'Hard' ? '#fee2e2' : '#fef9c3',
              color: difficulty === 'Easy' ? '#15803d' : difficulty === 'Hard' ? '#b91c1c' : '#a16207',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600'
            }}>{difficulty}</span>
          </div>

          <p className="question-text">{questionText}</p>

          <div className="user-answer-section">
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Your Recall Notes / Answer Draft:</label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Try to recall the answer from memory or write down bullet points. This will help strengthen recall!"
              rows="6"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '12px' }}>How well did you remember this question?</label>
            <div className="quality-buttons">
              <button
                className="quality-btn q0"
                onClick={() => submitAnswer(0)}
                title="Complete blackout, no memory at all"
              >
                ❌ Blackout (0)
              </button>
              <button
                className="quality-btn q1"
                onClick={() => submitAnswer(1)}
                title="Incorrect, but the correct answer felt familiar"
              >
                😕 Wrong (1)
              </button>
              <button
                className="quality-btn q2"
                onClick={() => submitAnswer(2)}
                title="Incorrect, but recalled the answer with a hint"
              >
                🤔 Struggled (2)
              </button>
              <button
                className="quality-btn q3"
                onClick={() => submitAnswer(3)}
                title="Correct, but required significant effort"
              >
                👍 Correct (3)
              </button>
              <button
                className="quality-btn q4"
                onClick={() => submitAnswer(4)}
                title="Correct with minor hesitation/effort"
              >
                ✨ Good (4)
              </button>
              <button
                className="quality-btn q5"
                onClick={() => submitAnswer(5)}
                title="Perfect recall, immediate response"
              >
                🔥 Perfect (5)
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SRSPractice;
import React, { useState, useEffect } from 'react';
import './styles/QuizPage.css';
import Navbar from "../components/Navbar";
import API_BASE from "../config";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState({});
  const [doneQuestions, setDoneQuestions] = useState(new Set());
  const [quizStats, setQuizStats] = useState({
    correct: 0,
    incorrect: 0,
    attempted: 0
  });
  const [difficulty, setDifficulty] = useState('All');
  const userId = localStorage.getItem('userId');

  // Fetch categories on mount
  useEffect(() => {
    console.log('📡 Fetching categories...');
    fetch(`${API_BASE}/api/mcq/meta/categories`)
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ Categories loaded:', data);
        if (data.success) {
          setCategories(data.categories);
        }
      })
      .catch((err) => console.error('❌ Error fetching categories:', err));
  }, []);

  // Fetch questions when category or difficulty changes
  useEffect(() => {
    if (Object.keys(categories).length === 0) return;

    console.log(`📡 Fetching questions for category: ${category}, difficulty: ${difficulty}`);
    setLoading(true);

    let endpoint = `${API_BASE}/api/mcq/all`;
    if (category !== 'All') endpoint = `${API_BASE}/api/mcq/category/${category}`;
    if (difficulty !== 'All') endpoint = `${API_BASE}/api/mcq/difficulty/${difficulty}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ Questions loaded:', data);
        if (data.success && data.data) {
          setQuestions(data.data);
          setCurrentQuestionIndex(0);
          setSelectedAnswer(null);
          setShowResult(false);
          setResult(null);
          setDoneQuestions(new Set());
        }
      })
      .catch((err) => console.error('❌ Error fetching questions:', err))
      .finally(() => setLoading(false));
  }, [category, difficulty, categories]);

  // Handle answer selection
  const handleAnswerSelect = (index) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  // Handle "See Answer" - shows answer without marking as attempted
  const handleSeeAnswer = () => {
    if (!questions[currentQuestionIndex]) return;

    const currentQuestion = questions[currentQuestionIndex];
    setResult({
      isCorrect: null,
      userSelected: 'You peeked at the answer',
      correctAnswer: currentQuestion.options[currentQuestion.correctAnswerIndex]?.text,
      explanation: currentQuestion.explanation,
    });
    setShowResult(true);
    setSelectedAnswer(currentQuestion.correctAnswerIndex);
  };

  // Handle answer submission
  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) {
      alert('Please select an answer');
      return;
    }

    try {
      const questionId = questions[currentQuestionIndex].questionId;
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE}/api/mcq/submit-answer/${questionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          selectedAnswerIndex: selectedAnswer,
          userId
        })
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
        setShowResult(true);

        const newDone = new Set(doneQuestions);
        newDone.add(currentQuestionIndex);
        setDoneQuestions(newDone);

        setQuizStats({
          ...quizStats,
          attempted: quizStats.attempted + 1,
          correct: quizStats.correct + (data.isCorrect ? 1 : 0),
          incorrect: quizStats.incorrect + (data.isCorrect ? 0 : 1)
        });
      } else {
        alert('Error: ' + (data.message || 'Failed to submit answer'));
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Error submitting answer. Please try again.');
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setResult(null);
    } else {
      alert('Quiz completed!');
      resetQuiz();
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setResult(null);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setResult(null);
    setQuizStats({ correct: 0, incorrect: 0, attempted: 0 });
    setDoneQuestions(new Set());
    setCategory('All');
    setDifficulty('All');
  };

  if (loading) {
    return <div className="quiz-container loading">Loading questions...</div>;
  }

  if (!questions.length) {
    return (
      <div className="quiz-container">
        <div className="no-questions">
          <p>No questions available for the selected filters.</p>
          <button onClick={() => setCategory('All')} className="btn btn-primary">
            View All Questions
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const accuracy = quizStats.attempted > 0 
    ? ((quizStats.correct / quizStats.attempted) * 100).toFixed(2)
    : 0;
  const isDone = doneQuestions.has(currentQuestionIndex);

  return (
    <>
      <Navbar />

    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="page-title">MCQ Quiz</h2>
        <div className="quiz-stats">
          <div className="stat">
            <span className="stat-label">Correct</span>
            <span className="stat-value correct">{quizStats.correct}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Incorrect</span>
            <span className="stat-value incorrect">{quizStats.incorrect}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Done</span>
            <span className="stat-value" style={{ color: '#10b981' }}>{doneQuestions.size}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{accuracy}%</span>
          </div>
        </div>
      </div>

      <div className="quiz-filters">
        <div className="filter-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="All">All Levels</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <button onClick={resetQuiz} className="btn btn-secondary">
          Reset Quiz
        </button>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="progress-text">
          Question {currentQuestionIndex + 1} of {questions.length}
          {isDone && ' ✅ Done'}
        </p>
      </div>

      <div className="question-card">
        <div className={`difficulty-badge ${currentQuestion.difficulty.toLowerCase()}`}>
          {currentQuestion.difficulty}
        </div>

        <div className="question-meta">
          <span className="category">{currentQuestion.category}</span>
          <span className="topic">{currentQuestion.topic}</span>
        </div>

        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="options-container">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswerIndex;
            
            let optionClass = 'option';
            if (showResult) {
              if (isCorrect) {
                optionClass += ' correct';
              } else if (isSelected && !isCorrect) {
                optionClass += ' incorrect';
              }
            } else if (isSelected) {
              optionClass += ' selected';
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option.text}</span>
                {showResult && isCorrect && <span className="check-mark">✓</span>}
                {showResult && isSelected && !isCorrect && (
                  <span className="cross-mark">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {showResult && result && (
          <div className={`result-section ${result.isCorrect === null ? 'peeked' : (result.isCorrect ? 'correct' : 'incorrect')}`}>
            <div className="result-header">
              <h3 className="result-title">
                {result.isCorrect === null && '👀 Answer Revealed'}
                {result.isCorrect === true && '✓ Correct!'}
                {result.isCorrect === false && '✗ Incorrect'}
              </h3>
            </div>

            <div className="result-details">
              <div className="result-info">
                {result.isCorrect !== null && (
                  <p>
                    <strong>Your Answer:</strong> {result.userSelected}
                  </p>
                )}
                <p>
                  <strong>Correct Answer:</strong> {result.correctAnswer}
                </p>
              </div>

              <div className="explanation">
                <h4>Explanation:</h4>
                <p>{result.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="quiz-navigation">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="btn btn-outline"
        >
          ← Previous
        </button>

        {!showResult ? (
          <>
            <button onClick={handleSeeAnswer} className="btn btn-info" style={{ background: '#06b6d4' }}>
              👁️ See Answer
            </button>
            <button onClick={handleSubmitAnswer} className="btn btn-primary">
              Submit Answer
            </button>
          </>
        ) : (
          <button onClick={handleNextQuestion} className="btn btn-primary">
            {currentQuestionIndex === questions.length - 1
              ? 'Finish Quiz'
              : 'Next Question →'}
          </button>
        )}
      </div>

      <div className="quiz-tips">
        <p>💡 Tip: Click "See Answer" to peek, or "Submit Answer" to mark your response.</p>
      </div>
    </div>
    </>
  );
};

export default QuizPage;

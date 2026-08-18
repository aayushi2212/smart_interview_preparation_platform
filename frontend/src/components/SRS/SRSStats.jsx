import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import './SRSPractice.css';
import API_BASE from '../../config';

function SRSStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/srs/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      } else {
        setError(data.error || 'Failed to fetch statistics');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Server connection error');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="srs-container">
          <div className="loading-state">Loading Spaced Repetition Stats...</div>
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
            <button className="btn-primary" onClick={fetchStats} style={{ marginTop: '20px' }}>Retry</button>
          </div>
        </div>
      </>
    );
  }

  if (!stats) {
    return (
      <>
        <Navbar />
        <div className="srs-container">
          <div className="error-state" style={{ textAlign: 'center', marginTop: '40px' }}>No stats data available</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="srs-container">
        <div className="srs-header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="page-title" style={{ margin: 0 }}>SRS Learning Statistics</h2>
          <button className="btn-back" onClick={() => window.history.back()} style={{
            padding: '8px 16px',
            background: '#e2e8f0',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>Back</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Cards</h3>
            <p className="stat-value">{stats.totalCards}</p>
          </div>

          <div className="stat-card">
            <h3>New Cards</h3>
            <p className="stat-value new">{stats.newCards}</p>
          </div>

          <div className="stat-card">
            <h3>Learning Cards</h3>
            <p className="stat-value learning">{stats.learningCards}</p>
          </div>

          <div className="stat-card">
            <h3>Review Cards</h3>
            <p className="stat-value review">{stats.reviewCards}</p>
          </div>

          <div className="stat-card">
            <h3>Total Reviews</h3>
            <p className="stat-value">{stats.totalReviews}</p>
          </div>

          <div className="stat-card">
            <h3>Avg Easiness</h3>
            <p className="stat-value" style={{ color: '#8b5cf6' }}>{Number(stats.averageEasinessFactor || 2.5).toFixed(2)}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button className="btn-primary" onClick={() => window.location.href = '/srs-practice'}>
            Start Practicing Due Cards
          </button>
        </div>
      </div>
    </>
  );
}

export default SRSStats;
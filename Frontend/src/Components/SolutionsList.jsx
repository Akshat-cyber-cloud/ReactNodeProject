import React, { useState, useEffect } from 'react';
import './SolutionsList.css';
import { useSocket } from '../context/SocketContext';

const BASE_URL = import.meta.env.VITE_API_URL;

const SolutionsList = ({ isOpen, onClose }) => {
  const { startChat } = useSocket();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'under-review', 'accepted', 'rejected'

  useEffect(() => {
    if (isOpen) {
      fetchSolutions();
    }
  }, [isOpen]);

  const fetchSolutions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/solutions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch solutions');
      }

      setSolutions(data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredSolutions = filter === 'all'
    ? solutions
    : solutions.filter(sol => sol.status.toLowerCase().replace(' ', '-') === filter);

  if (!isOpen) return null;

  return (
    <div className="solutions-overlay" onClick={onClose}>
      <div className="solutions-content" onClick={(e) => e.stopPropagation()}>
        <div className="solutions-header">
          <h2>View Solutions</h2>
          <button className="solutions-close" onClick={onClose}>×</button>
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading solutions...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchSolutions} className="retry-btn">Retry</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="solutions-filters">
              <button
                className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setFilter('all')}
              >
                All ({solutions.length})
              </button>
              <button
                className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setFilter('pending')}
              >
                Pending ({solutions.filter(s => s.status === 'Pending').length})
              </button>
              <button
                className={filter === 'under-review' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setFilter('under-review')}
              >
                Under Review ({solutions.filter(s => s.status === 'Under Review').length})
              </button>
              <button
                className={filter === 'accepted' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setFilter('accepted')}
              >
                Accepted ({solutions.filter(s => s.status === 'Accepted').length})
              </button>
            </div>

            {filteredSolutions.length === 0 ? (
              <div className="empty-state">
                <p>No solutions available.</p>
                <p className="empty-subtitle">
                  {filter === 'all'
                    ? 'Startups will post solutions here once they respond to your challenges.'
                    : `No solutions with status "${filter}".`}
                </p>
              </div>
            ) : (
              <div className="solutions-list">
                {filteredSolutions.map((sol) => (
                  <div key={sol._id} className="solution-card">
                    <div className="solution-header">
                      <h3>{sol.title}</h3>
                      <span className={`status-badge status-${sol.status.toLowerCase().replace(' ', '-')}`}>
                        {sol.status}
                      </span>
                    </div>

                    <div className="solution-meta">
                      <span className="startup-name">🚀 {sol.startupName}</span>
                      <span className="founder-name">👤 {sol.founderName}</span>
                      {sol.industry && (
                        <span className="industry-tag">{sol.industry}</span>
                      )}
                      <span className="solution-type">{sol.solutionType}</span>
                    </div>

                    <p className="solution-description">{sol.description}</p>

                    {sol.keyFeatures && (
                      <div className="solution-section">
                        <strong>Key Features:</strong>
                        <p>{sol.keyFeatures}</p>
                      </div>
                    )}

                    <div className="solution-footer">
                      <div className="solution-details">
                        {sol.pricing && (
                          <span className="detail-item">💰 Pricing: {sol.pricing}</span>
                        )}
                        {sol.website && (
                          <a
                            href={sol.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detail-item website-link"
                          >
                            🌐 Website
                          </a>
                        )}
                        <span className="detail-item">
                          📅 Posted: {new Date(sol.createdAt).toLocaleDateString()}
                        </span>

                        {/* Chat Button */}
                        <button
                          className="ml-auto bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold hover:bg-blue-200 transition flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (startChat) startChat({ id: sol.startupId, name: sol.startupName, type: 'startup' });
                          }}
                        >
                          💬 Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SolutionsList;


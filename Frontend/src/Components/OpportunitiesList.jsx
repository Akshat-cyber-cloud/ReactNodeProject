import React, { useState, useEffect } from 'react';
import PostSolutionModal from './PostSolutionModal';
import { useSocket } from '../context/SocketContext';
import './OpportunitiesList.css';
const BASE_URL = import.meta.env.VITE_API_URL;


const OpportunitiesList = ({ isOpen, onClose }) => {
  const { startChat } = useSocket();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchOpportunities();
    }
  }, [isOpen]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/opportunities`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch opportunities');
      }

      setOpportunities(data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePostSolution = (opportunityId) => {
    setSelectedOpportunity(opportunityId);
    setShowSolutionModal(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="opportunities-overlay" onClick={onClose}>
        <div className="opportunities-content" onClick={(e) => e.stopPropagation()}>
          <div className="opportunities-header">
            <h2>Explore Opportunities</h2>
            <button className="opportunities-close" onClick={onClose}>×</button>
          </div>

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading opportunities...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={fetchOpportunities} className="retry-btn">Retry</button>
            </div>
          )}

          {!loading && !error && (
            <>
              {opportunities.length === 0 ? (
                <div className="empty-state">
                  <p>No opportunities available at the moment.</p>
                  <p className="empty-subtitle">Check back later for new corporate challenges!</p>
                </div>
              ) : (
                <div className="opportunities-list">
                  {opportunities.map((opp) => (
                    <div key={opp._id} className="opportunity-card">
                      <div className="opportunity-header">
                        <h3>{opp.title}</h3>
                        <span className="opportunity-badge">{opp.status}</span>
                      </div>

                      <div className="opportunity-meta">
                        <span className="corporate-name">🏢 {opp.corporateName}</span>
                        {opp.industry && (
                          <span className="industry-tag">{opp.industry}</span>
                        )}
                      </div>

                      <p className="opportunity-description">{opp.description}</p>

                      {opp.requirements && (
                        <div className="opportunity-section">
                          <strong>Requirements:</strong>
                          <p>{opp.requirements}</p>
                        </div>
                      )}

                      <div className="opportunity-footer">
                        <div className="opportunity-details">
                          {opp.budget && (
                            <span className="detail-item">💰 Budget: {opp.budget}</span>
                          )}
                          {opp.deadline && (
                            <span className="detail-item">
                              📅 Deadline: {new Date(opp.deadline).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded text-sm font-bold"
                            onClick={(e) => {
                              e.stopPropagation();
                              startChat({ id: opp.corporateId, name: opp.corporateName, type: 'corporate' });
                            }}
                          >
                            💬 Message
                          </button>
                          <button
                            className="post-solution-btn"
                            onClick={() => handlePostSolution(opp._id)}
                          >
                            Post Solution
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

      {showSolutionModal && (
        <PostSolutionModal
          isOpen={showSolutionModal}
          onClose={() => {
            setShowSolutionModal(false);
            setSelectedOpportunity(null);
          }}
          opportunityId={selectedOpportunity}
        />
      )}
    </>
  );
};

export default OpportunitiesList;


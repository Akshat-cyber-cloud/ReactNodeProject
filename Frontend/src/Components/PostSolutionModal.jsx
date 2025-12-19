import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './PostSolutionModal.css';

const PostSolutionModal = ({ isOpen, onClose, opportunityId = null }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    solutionType: 'Product',
    industry: '',
    keyFeatures: '',
    pricing: '',
    website: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/solutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          opportunityId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post solution');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({
          title: '',
          description: '',
          solutionType: 'Product',
          industry: '',
          keyFeatures: '',
          pricing: '',
          website: '',
        });
        setSuccess(false);
      }, 1500);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Post Your Solution</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Solution posted successfully! 🎉</div>}

        <form onSubmit={handleSubmit} className="solution-form">
          <div className="form-group">
            <label>Solution Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., AI-Powered Analytics Platform"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe your solution in detail..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Solution Type *</label>
              <select
                name="solutionType"
                value={formData.solutionType}
                onChange={handleChange}
                required
              >
                <option value="Product">Product</option>
                <option value="Service">Service</option>
                <option value="Technology">Technology</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g., Healthcare, Finance"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Key Features</label>
            <textarea
              name="keyFeatures"
              value={formData.keyFeatures}
              onChange={handleChange}
              rows="3"
              placeholder="List the main features of your solution..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Pricing</label>
              <input
                type="text"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                placeholder="e.g., $99/month, Custom pricing"
              />
            </div>

            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Posting...' : 'Post Solution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostSolutionModal;


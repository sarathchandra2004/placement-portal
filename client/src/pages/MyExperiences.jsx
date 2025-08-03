import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiCalendar, FiBookOpen } from 'react-icons/fi';
import { api } from '../utils/api'; // Your existing API import
import './MyExperiences.css';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const MyExperiences = () => {
  const [userExperiences, setUserExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyExperiences = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Remove /api from the path since VITE_API_BASE_URL already includes it
        const res = await api.get('/experiences/mine');
        setUserExperiences(res.data);
      } catch (err) {
        console.error('Error fetching user experiences:', err);
        setError('Failed to load experiences. Please try again.');
        
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyExperiences();
  }, [navigate]);

  const handleDelete = async (experienceId, companyName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete your experience at ${companyName}?`
    );
    if (!confirmDelete) return;

    try {
      // Remove /api from the path
      await api.delete(`/experiences/${experienceId}`);
      setUserExperiences((prev) =>
        prev.filter((exp) => exp._id !== experienceId)
      );
    } catch (err) {
      console.error('Error deleting experience:', err);
      alert('Failed to delete experience. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="card fade-in">
        <div className="p-6">
          <div className="text-center py-10">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-500">Loading your experiences...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card fade-in">
        <div className="p-6">
          <div className="text-center py-10">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Something went wrong
            </h4>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card fade-in">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">My Shared Experiences</h3>
          <a href="/add-experience" className="btn btn-primary flex items-center gap-2">
            <FiEdit />
            Share New Experience
          </a>
        </div>

        {userExperiences.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📝</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              No experiences shared yet
            </h4>
            <p className="text-gray-600 mb-4">
              Start sharing your placement or internship experiences to help other students.
            </p>
            <a href="/add-experience" className="btn btn-primary">
              Share Your First Experience
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {userExperiences.map((experience) => (
              <div key={experience._id} className="experience-card">
                <div className="experience-header">
                  <div>
                    <h4 className="experience-company">{experience.company}</h4>
                    <p className="experience-role">{experience.role}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span className="experience-package">{experience.package} LPA</span>
                    <button
                      className="edit-button"
                      onClick={() => navigate(`/edit-experience/${experience._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(experience._id, experience.company)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="experience-meta">
                  <span className="badge badge-primary">{experience.type}</span>
                  <span className="badge badge-secondary">{experience.department}</span>
                  {experience.cgpa && (
                    <span className="badge badge-warning">CGPA: {experience.cgpa}</span>
                  )}
                </div>

                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiCalendar size={14} />
                    <span>Shared on {formatDate(experience.createdAt)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <FiBookOpen size={14} />
                    <span>
                      {experience.rounds} rounds •{' '}
                      {experience.questions?.length || 0} questions shared
                    </span>
                  </div>
                </div>

                {experience.questionTags?.length > 0 && (
                  <div className="experience-tags">
                    {experience.questionTags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="badge">
                        {tag}
                      </span>
                    ))}
                    {experience.questionTags.length > 2 && (
                      <span className="badge">
                        +{experience.questionTags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyExperiences;
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../utils/api'
import { FiArrowLeft } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './ExperienceDetails.css'

const ExperienceDetails = () => {
  const { id } = useParams()
  const [experience, setExperience] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperience()
  }, [id])

  const fetchExperience = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/experiences/${id}`)
      setExperience(response.data)
    } catch (error) {
      console.error('Error fetching experience:', error)
      toast.error('Failed to load experience details')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  // Function to get user profile link
  const getUserProfileLink = (userId, userName) => {
    // Option 1: If you have userId available
    if (userId) {
      return `/profile/${userId}`
    }
    // Option 2: If you only have userName and want to use that as identifier
    if (userName) {
      return `/profile/user/${encodeURIComponent(userName)}`
    }
    // Fallback: return null if no identifier available
    return null
  }

  if (loading) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!experience) {
    return (
      <div className="details-not-found">
        <h2>Experience not found</h2>
        <p>The experience you're looking for doesn't exist.</p>
        <Link to="/experiences" className="btn primary">
          Back to Experiences
        </Link>
      </div>
    )
  }

  const profileLink = getUserProfileLink(experience.userId || experience.studentId, experience.studentName)

  return (
    <div className="experience-details">
      <header className="details-header">
        <Link to="/experiences" className="btn secondary back-btn">
          <FiArrowLeft /> Back
        </Link>
        <h1>
          {experience.company || 'Company'} - {experience.role || 'Role'}
        </h1>
        <p className="shared-by">
          Shared by{' '}
          {profileLink ? (
            <Link 
              to={profileLink} 
              className="user-profile-link"
              style={{
                color: '#4e54c8',
                textDecoration: 'none',
                fontWeight: '600',
                borderBottom: '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderBottom = '1px solid #4e54c8'
                e.target.style.color = '#3d43a8'
              }}
              onMouseLeave={(e) => {
                e.target.style.borderBottom = '1px solid transparent'
                e.target.style.color = '#4e54c8'
              }}
            >
              {experience.studentName || 'Anonymous'}
            </Link>
          ) : (
            <span>{experience.studentName || 'Anonymous'}</span>
          )}
        </p>
      </header>

      <main className="details-card">
        <section className="details-top">
          <div>
            <h2>{experience.company}</h2>
            <p className="role">{experience.role}</p>
            <p className="author">
              by{' '}
              {profileLink ? (
                <Link 
                  to={profileLink} 
                  className="user-profile-link"
                  style={{
                    color: '#4e54c8',
                    textDecoration: 'none',
                    fontWeight: '600',
                    borderBottom: '1px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderBottom = '1px solid #4e54c8'
                    e.target.style.color = '#3d43a8'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderBottom = '1px solid transparent'
                    e.target.style.color = '#4e54c8'
                  }}
                >
                  {experience.studentName}
                </Link>
              ) : (
                <span>{experience.studentName}</span>
              )}
            </p>
          </div>
          <div className="package-block">
            <span className="package">
              {experience.package ? `₹ ${experience.package} LPA` : 'N/A'}
            </span>
            <span className="badge">{experience.type || 'N/A'}</span>
            {experience.gotSelected ? (
              <span className="selected-badge success">Selected</span>
            ) : (
              <span className="selected-badge danger">Not Selected</span>
            )}
          </div>
        </section>

        <section className="info-grid">
          <div><strong>Name:</strong> 
            {profileLink ? (
              <Link 
                to={profileLink} 
                className="user-profile-link"
                style={{
                  color: '#4e54c8',
                  textDecoration: 'none',
                  fontWeight: '600',
                  marginLeft: '8px',
                  borderBottom: '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderBottom = '1px solid #4e54c8'
                  e.target.style.color = '#3d43a8'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderBottom = '1px solid transparent'
                  e.target.style.color = '#4e54c8'
                }}
              >
                {experience.studentName}
              </Link>
            ) : (
              <span style={{ marginLeft: '8px' }}>{experience.studentName}</span>
            )}
          </div>
          <div><strong>Company:</strong> {experience.company}</div>
          <div><strong>Role:</strong> {experience.role}</div>
          <div><strong>LPA:</strong> {experience.package ? `₹ ${experience.package} LPA` : 'N/A'}</div>
          {experience.department && <div><strong>Department:</strong> {experience.department}</div>}
        </section>

        {experience.timeline && (
          <section className="details-section">
            <h3>Additional Information</h3>
            <p>{experience.timeline}</p>
          </section>
        )}

        {experience.questions?.length > 0 && (
          <section className="details-section">
            <h3>Interview Questions</h3>
            {experience.questions.map((q, i) => (
              <div key={i} className="question-card">
                {i + 1}. {q}
              </div>
            ))}
          </section>
        )}

        {experience.questionTags?.length > 0 && (
          <section className="details-section">
            <h3>Question Categories</h3>
            <div className="tags">
              {experience.questionTags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </section>
        )}

        {experience.resources?.length > 0 && (
          <section className="details-section">
            <h3>Preparation Resources</h3>
            <ul>
              {experience.resources.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </section>
        )}

        <footer className="details-footer">
          <span>Shared on {formatDate(experience.createdAt)}</span>
          <span>ID: {experience._id}</span>
        </footer>
      </main>

      <div className="details-actions">
        <Link to="/experiences" className="btn secondary"><FiArrowLeft /> Back</Link>
        <Link to="/add-experience" className="btn primary">Share Your Experience</Link>
      </div>
    </div>
  )
}

export default ExperienceDetails
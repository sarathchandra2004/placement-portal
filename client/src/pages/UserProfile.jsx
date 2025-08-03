import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../utils/api'
import { FiArrowLeft, FiUser, FiBookOpen, FiCalendar } from 'react-icons/fi'
import toast from 'react-hot-toast'

const UserProfile = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProfile()
  }, [id])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/users/${id}`)
      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
      toast.error('Failed to load user profile')
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

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px' 
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        maxWidth: '600px',
        margin: '0 auto' 
      }}>
        <h2>User not found</h2>
        <p>The user profile you're looking for doesn't exist.</p>
        <Link 
          to="/experiences" 
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#4e54c8',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            marginTop: '20px'
          }}
        >
          Back to Experiences
        </Link>
      </div>
    )
  }

  const { user, experiences, experienceCount } = userData

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <Link 
          to="/experiences" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            textDecoration: 'none',
            marginBottom: '20px',
            fontSize: '16px'
          }}
        >
          <FiArrowLeft /> Back to Experiences
        </Link>
      </div>

      {/* Profile Card */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold'
          }}>
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', color: '#333' }}>
              {user.name || 'Anonymous User'}
            </h1>
            <p style={{ margin: '0', color: '#666', fontSize: '16px' }}>
              <FiUser style={{ marginRight: '6px' }} />
              {user.email || 'Email not available'}
            </p>
            {user.department && (
              <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '16px' }}>
                {user.department}
              </p>
            )}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <FiBookOpen size={24} color="#4e54c8" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
              {experienceCount}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>
              Experience{experienceCount !== 1 ? 's' : ''} Shared
            </div>
          </div>
          
          <div style={{
            background: '#f8f9fa',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <FiCalendar size={24} color="#4e54c8" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '14px', color: '#666' }}>
              Member since
            </div>
            <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
              {formatDate(user.createdAt || user.joinedAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Experiences Section */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginTop: '0', marginBottom: '20px', color: '#333' }}>
          Shared Experiences ({experienceCount})
        </h2>

        {experiences.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No experiences shared yet.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {experiences.map((exp) => (
              <Link
                key={exp._id}
                to={`/experiences/${exp._id}`}
                style={{
                  display: 'block',
                  padding: '20px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease',
                  background: '#fafafa'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#4e54c8'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e0e0e0'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'start',
                  marginBottom: '8px'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', color: '#333' }}>
                      {exp.company} - {exp.role}
                    </h3>
                    <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                      {exp.type} • {formatDate(exp.createdAt)}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {exp.package && (
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        color: '#4e54c8' 
                      }}>
                        ₹{exp.package} LPA
                      </div>
                    )}
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: exp.gotSelected ? '#d4edda' : '#f8d7da',
                      color: exp.gotSelected ? '#155724' : '#721c24'
                    }}>
                      {exp.gotSelected ? 'Selected' : 'Not Selected'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
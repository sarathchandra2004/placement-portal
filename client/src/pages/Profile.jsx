import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'
import { FiUser, FiMail, FiBookOpen, FiCalendar, FiEdit } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './Profile.css'  // Import the CSS I provided

const Profile = () => {
  const { user } = useAuth()
  const [userExperiences, setUserExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserExperiences()
    }
  }, [user])

  const fetchUserExperiences = async () => {
    try {
      setLoading(true)
      const response = await api.get('/experiences')
      const userExp = response.data.filter(exp => exp.userId === user.id)
      setUserExperiences(userExp)
    } catch (error) {
      console.error('Error fetching user experiences:', error)
      toast.error('Failed to load your experiences')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!user) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header fade-in">
        <div className="container">
          <h1>My Profile</h1>
          <p>Manage your account and view your shared experiences</p>
        </div>
      </div>

      <div className="container">
        <div className="max-w-4xl mx-auto">
          
          {/* Profile Header */}
          <div className="profile-header fade-in">
            <div className="profile-avatar">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            
            <div className="profile-info">
              {user.department && (
                <div className="profile-info-item">
                  <div className="profile-info-label">Department</div>
                  <div className="profile-info-value">{user.department}</div>
                </div>
              )}
              {user.graduationYear && (
                <div className="profile-info-item">
                  <div className="profile-info-label">Graduation Year</div>
                  <div className="profile-info-value">{user.graduationYear}</div>
                </div>
              )}
              <div className="profile-info-item">
                <div className="profile-info-label">Member Since</div>
                <div className="profile-info-value">
                  {formatDate(user.createdAt || new Date())}
                </div>
              </div>
              <div className="profile-info-item">
                <div className="profile-info-label">Experiences Shared</div>
                <div className="profile-info-value">{userExperiences.length}</div>
              </div>
            </div>
          </div>

          {/* User's Experiences */}
          <div className="card fade-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">My Shared Experiences</h3>
                <a href="/add-experience" className="btn btn-primary">
                  <FiEdit /> Share New Experience
                </a>
              </div>

              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                </div>
              ) : userExperiences.length === 0 ? (
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
                    <div key={experience._id} className="experience-card fade-in">
                      <div className="experience-header">
                        <div>
                          <h4 className="experience-company">{experience.company}</h4>
                          <p className="experience-role">{experience.role}</p>
                        </div>
                        <span className="experience-package">
                          {experience.package} LPA
                        </span>
                      </div>

                      <div className="experience-meta">
                        <span className="badge badge-primary">{experience.type}</span>
                        <span className="badge badge-secondary">{experience.department}</span>
                        {experience.cgpa && (
                          <span className="badge badge-warning">
                            CGPA: {experience.cgpa}
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-1 mb-1">
                          <FiCalendar className="text-xs" />
                          <span>Shared on {formatDate(experience.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiBookOpen className="text-xs" />
                          <span>{experience.rounds} rounds • {experience.questions?.length || 0} questions shared</span>
                        </div>
                      </div>

                      {experience.questionTags && experience.questionTags.length > 0 && (
                        <div className="experience-tags">
                          {experience.questionTags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="badge badge-secondary text-xs">
                              {tag}
                            </span>
                          ))}
                          {experience.questionTags.length > 3 && (
                            <span className="badge badge-secondary text-xs">
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

          {/* Account Information */}
          <div className="card mt-6 fade-in">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Account Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Full Name</label>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-gray-400" />
                    <span className="text-gray-900">{user.name}</span>
                  </div>
                </div>

                <div>
                  <label className="form-label">Email Address</label>
                  <div className="flex items-center gap-2">
                    <FiMail className="text-gray-400" />
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                </div>

                {user.department && (
                  <div>
                    <label className="form-label">Department</label>
                    <div className="flex items-center gap-2">
                      <FiBookOpen className="text-gray-400" />
                      <span className="text-gray-900">{user.department}</span>
                    </div>
                  </div>
                )}

                {user.graduationYear && (
                  <div>
                    <label className="form-label">Graduation Year</label>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400" />
                      <span className="text-gray-900">{user.graduationYear}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Account Status</h4>
                    <p className="text-sm text-gray-600">
                      {user.isVerified ? 'Verified Account' : 'Unverified Account'}
                    </p>
                  </div>
                  <span className={`badge ${user.isVerified ? 'badge-success' : 'badge-warning'}`}>
                    {user.isVerified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile

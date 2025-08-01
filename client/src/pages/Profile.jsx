import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'
import { FiUser, FiMail, FiBookOpen, FiCalendar, FiEdit } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './Profile.css'  // Import the CSS I provided
import MyExperiences from './MyExperiences'

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

          <MyExperiences/>

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

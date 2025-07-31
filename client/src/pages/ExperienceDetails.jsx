import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../utils/api'
import { FiArrowLeft, FiCalendar, FiMapPin, FiDollarSign, FiStar, FiCheck, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDifficultyColor = (rating) => {
    const colors = {
      1: 'text-green-600 bg-green-100',
      2: 'text-blue-600 bg-blue-100',
      3: 'text-yellow-600 bg-yellow-100',
      4: 'text-orange-600 bg-orange-100',
      5: 'text-red-600 bg-red-100'
    }
    return colors[rating] || colors[3]
  }

  const getDifficultyText = (rating) => {
    const texts = {
      1: 'Very Easy',
      2: 'Easy',
      3: 'Moderate',
      4: 'Difficult',
      5: 'Very Difficult'
    }
    return texts[rating] || 'Moderate'
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (!experience) {
    return (
      <div className="container">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Experience not found</h2>
          <p className="text-gray-600 mb-4">The experience you're looking for doesn't exist.</p>
          <Link to="/experiences" className="btn btn-primary">
            Back to Experiences
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div className="flex items-center gap-4">
            <Link to="/experiences" className="btn btn-secondary">
              <FiArrowLeft /> Back to Experiences
            </Link>
            <div>
              <h1>{experience.company || 'Company Name Not Available'} - {experience.role || 'Role Not Available'}</h1>
              <p className="text-muted">Shared by {experience.studentName || 'Anonymous'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Main Experience Card */}
          <div className="card mb-6">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {experience.company || 'Company Name Not Available'}
                  </h2>
                  <p className="text-xl text-gray-600 mb-1">{experience.role || 'Role Not Available'}</p>
                  <p className="text-gray-500">by {experience.studentName || 'Anonymous'}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {experience.package ? `${experience.package} LPA` : 'Package Not Available'}
                  </div>
                  <span className="badge badge-primary">
                    {experience.type || 'Type Not Available'}
                  </span>
                </div>
              </div>

                             {/* Essential Information */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                 <div>
                   <span className="text-gray-600">Name:</span>
                   <span className="ml-2 font-medium">{experience.studentName || 'Not Available'}</span>
                 </div>
                 <div>
                   <span className="text-gray-600">LPA:</span>
                   <span className="ml-2 font-medium text-green-600">{experience.package ? `${experience.package} LPA` : 'Not Available'}</span>
                 </div>
                 <div>
                   <span className="text-gray-600">Company:</span>
                   <span className="ml-2 font-medium">{experience.company || 'Not Available'}</span>
                 </div>
                 <div>
                   <span className="text-gray-600">Title:</span>
                   <span className="ml-2 font-medium">{experience.role || 'Not Available'}</span>
                 </div>
                 {experience.department && (
                   <div>
                     <span className="text-gray-600">Department:</span>
                     <span className="ml-2 font-medium">{experience.department}</span>
                   </div>
                 )}
                 {experience.type && (
                   <div>
                     <span className="text-gray-600">Type:</span>
                     <span className="ml-2 font-medium">{experience.type}</span>
                   </div>
                 )}
               </div>

              {/* Additional Information */}
              {experience.timeline && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
                  <p className="text-gray-700 leading-relaxed">{experience.timeline}</p>
                </div>
              )}

              {/* Interview Questions */}
              {experience.questions && experience.questions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Interview Questions</h3>
                  <div className="space-y-2">
                    {experience.questions.map((question, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium text-gray-900">{index + 1}.</span>
                        <span className="ml-2 text-gray-700">{question}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Question Tags */}
              {experience.questionTags && experience.questionTags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Question Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.questionTags.map((tag, index) => (
                      <span key={index} className="badge badge-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {experience.resources && experience.resources.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Preparation Resources</h3>
                  <div className="space-y-2">
                    {experience.resources.map((resource, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-700">{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="border-t pt-4 mt-6">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Shared on {formatDate(experience.createdAt)}</span>
                  <span>Experience ID: {experience._id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Link to="/experiences" className="btn btn-secondary">
              <FiArrowLeft /> Back to Experiences
            </Link>
            <Link to="/add-experience" className="btn btn-primary">
              Share Your Experience
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceDetails 
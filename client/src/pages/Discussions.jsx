import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'
import { FiSearch, FiMessageSquare, FiSend, FiUser, FiTrash2, FiMoreVertical } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './Discussions.css'

const Discussions = () => {
  const [selectedCompany, setSelectedCompany] = useState('')
  const [discussions, setDiscussions] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [fetchError, setFetchError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const { isAuthenticated, user } = useAuth()

  const popularCompanies = [
    'Google', 'Qualcomm', 'Amazon', 'Apple', 'Meta', 'Netflix',
    'Adobe', 'Oracle', 'Blakrock', 'Axxela', 'Cisco', 'MSCI',
    'UBS', 'Uber', 'Texas Instruments', 'Celigo', 'Typeface', 'Junglee Games', 'Microsoft'
  ]

  useEffect(() => {
    if (selectedCompany && selectedCompany.trim()) {
      fetchDiscussions()
    } else {
      // Clear discussions when no company is selected
      setDiscussions([])
      setFetchError(null)
    }
  }, [selectedCompany])

  const fetchDiscussions = async () => {
    try {
      setLoading(true)
      setFetchError(null)
      
      // Ensure company name is properly trimmed and encoded
      const companyName = selectedCompany.trim()
      if (!companyName) {
        setDiscussions([])
        return
      }

      const response = await api.get(`/discussions/${encodeURIComponent(companyName)}`)
      
      // Handle both array and object responses
      if (response.data) {
        const discussionsData = Array.isArray(response.data) ? response.data : response.data.discussions || []
        setDiscussions(discussionsData)
      } else {
        setDiscussions([])
      }
    } catch (error) {
      console.error('Error fetching discussions:', error)
      
      // Handle different types of errors
      if (error.response?.status === 404) {
        // Company not found - this is normal for new companies
        setDiscussions([])
        setFetchError(null) // Don't show error for 404
      } else if (error.response?.status === 500) {
        setFetchError('Server error occurred. Please try again.')
        toast.error('Server error occurred')
      } else if (error.code === 'ERR_NETWORK') {
        setFetchError('Network error. Please check your connection.')
        toast.error('Network error')
      } else {
        setFetchError('Failed to load discussions')
        toast.error('Failed to load discussions')
      }
      setDiscussions([])
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedCompany.trim()) return

    try {
      setSending(true)
      
      const companyName = selectedCompany.trim()
      await api.post(`/discussions/${encodeURIComponent(companyName)}`, {
        message: newMessage.trim()
      })

      setNewMessage('')
      // Refresh discussions after sending message
      await fetchDiscussions()
      toast.success('Message sent successfully!')
    } catch (error) {
      console.error('Error sending message:', error)
      
      if (error.response?.status === 401) {
        toast.error('Please sign in to send messages')
      } else if (error.response?.status === 400) {
        toast.error('Invalid message. Please check your input.')
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } finally {
      setSending(false)
    }
  }

  const handleDeleteDiscussion = async (discussionId) => {
    try {
      setDeletingId(discussionId)
      
      await api.delete(`/discussions/${discussionId}`)
      
      // Remove the deleted discussion from the state
      setDiscussions(prev => prev.filter(d => d._id !== discussionId))
      
      toast.success('Discussion deleted successfully!')
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting discussion:', error)
      
      if (error.response?.status === 401) {
        toast.error('You are not authorized to delete this discussion')
      } else if (error.response?.status === 403) {
        toast.error('You can only delete your own discussions')
      } else if (error.response?.status === 404) {
        toast.error('Discussion not found')
      } else {
        toast.error('Failed to delete discussion')
      }
    } finally {
      setDeletingId(null)
    }
  }

  const canDeleteDiscussion = (discussion) => {
    if (!user || !isAuthenticated) return false
    
    // Check if current user is the author of the discussion
    return discussion.userId?._id === user._id || 
           discussion.userId?.id === user.id || 
           discussion.userId === user._id ||
           discussion.authorId === user._id
  }

  const toggleDropdown = (discussionId) => {
    setDropdownOpen(prev => prev === discussionId ? null : discussionId)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(null)
    }
    
    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownOpen])

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return 'Invalid date'
    }
  }

  // Handle company selection
  const handleCompanySelect = (company) => {
    setSelectedCompany(company)
    setFetchError(null)
  }

  // Handle manual company input
  const handleCompanyInput = (e) => {
    setSelectedCompany(e.target.value)
    setFetchError(null)
  }

  return (
    <div className="discussions-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Company Discussions</h1>
          <p>Join discussions about specific companies and get real-time updates</p>
        </div>
      </div>

      <div className="container">
        <div className="discussions-wrapper">
          {/* Company Selection */}
          <div className="card mb-6">
            <div className="card-body">
              <h2 className="section-title">Select a Company</h2>

              {/* Search Input */}
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  value={selectedCompany}
                  onChange={handleCompanyInput}
                  className="form-input"
                  placeholder="Search or type company name..."
                />
              </div>

              {/* Popular Companies */}
              <div className="popular-companies">
                <h3 className="popular-title">Popular Companies</h3>
                <div className="company-list">
                  {popularCompanies.map((company) => (
                    <button
                      key={company}
                      onClick={() => handleCompanySelect(company)}
                      className={`company-btn ${selectedCompany === company ? 'active' : ''}`}
                    >
                      {company}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Discussions */}
          {selectedCompany && selectedCompany.trim() && (
            <div className="card">
              <div className="card-body">
                <div className="section-header">
                  <FiMessageSquare className="section-icon" />
                  <h2>{selectedCompany.trim()} Discussions</h2>
                </div>

                {/* Error Message */}
                {fetchError && (
                  <div className="error-message" style={{ 
                    color: '#dc3545', 
                    background: '#f8d7da', 
                    padding: '10px', 
                    borderRadius: '4px', 
                    marginBottom: '20px' 
                  }}>
                    {fetchError}
                  </div>
                )}

                {/* Message Input */}
                {isAuthenticated ? (
                  <form onSubmit={handleSendMessage} className="message-form">
                    <div className="message-box">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="form-textarea"
                        placeholder={`Share your thoughts, questions, or updates about ${selectedCompany.trim()}...`}
                        rows="3"
                        maxLength="500"
                      />
                      <button
                        type="submit"
                        disabled={sending || !newMessage.trim() || !selectedCompany.trim()}
                        className="btn-primary"
                      >
                        {sending ? <div className="spinner"></div> : <FiSend />}
                      </button>
                    </div>
                    <div className="char-count">
                      {newMessage.length}/500 characters
                    </div>
                  </form>
                ) : (
                  <div className="login-prompt">
                    <p>
                      Please <a href="/login">sign in</a> to participate in discussions.
                    </p>
                  </div>
                )}

                {/* Messages */}
                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                  </div>
                ) : fetchError ? (
                  <div className="empty-state">
                    <div className="emoji">⚠️</div>
                    <h3>Unable to load discussions</h3>
                    <p>There was an error loading discussions for {selectedCompany.trim()}.</p>
                    <button 
                      onClick={fetchDiscussions}
                      className="btn-primary"
                      style={{ marginTop: '10px' }}
                    >
                      Try Again
                    </button>
                  </div>
                ) : discussions.length === 0 ? (
                  <div className="empty-state">
                    <div className="emoji">💬</div>
                    <h3>No discussions yet</h3>
                    <p>Be the first to start a discussion about {selectedCompany.trim()}!</p>
                  </div>
                ) : (
                  <div className="discussion-list">
                    {discussions.map((discussion) => (
                      <div key={discussion._id || discussion.id} className="discussion-card">
                        <div className="discussion-header">
                          <div className="author-info">
                            <div className="avatar">
                              <FiUser />
                            </div>
                            <span>{discussion.userId?.name || discussion.author || 'Anonymous'}</span>
                          </div>
                          <div className="discussion-actions">
                            <span className="time">{formatDate(discussion.createdAt || discussion.timestamp)}</span>
                            {canDeleteDiscussion(discussion) && (
                              <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                                <button
                                  className="dropdown-toggle"
                                  onClick={() => toggleDropdown(discussion._id || discussion.id)}
                                >
                                  <FiMoreVertical />
                                </button>
                                {dropdownOpen === (discussion._id || discussion.id) && (
                                  <div className="dropdown-menu">
                                    <button
                                      className="dropdown-item delete-item"
                                      onClick={() => setShowDeleteConfirm(discussion._id || discussion.id)}
                                    >
                                      <FiTrash2 />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="discussion-message">
                          {discussion.message || discussion.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                  <div className="modal-overlay">
                    <div className="modal">
                      <div className="modal-header">
                        <h3>Delete Discussion</h3>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure you want to delete this discussion? This action cannot be undone.</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn-secondary"
                          onClick={() => setShowDeleteConfirm(null)}
                          disabled={deletingId === showDeleteConfirm}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => handleDeleteDiscussion(showDeleteConfirm)}
                          disabled={deletingId === showDeleteConfirm}
                        >
                          {deletingId === showDeleteConfirm ? (
                            <div className="spinner"></div>
                          ) : (
                            <>
                              <FiTrash2 />
                              Delete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* No Company Selected */}
          {!selectedCompany?.trim() && (
            <div className="empty-state">
              <div className="emoji">🏢</div>
              <h3>Select a Company</h3>
              <p>
                Choose a company from the list above or search for a specific company to view discussions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Discussions
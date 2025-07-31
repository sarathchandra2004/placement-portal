import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'
import { FiSearch, FiMessageSquare, FiSend, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './Discussions.css'

const Discussions = () => {
  const [selectedCompany, setSelectedCompany] = useState('')
  const [discussions, setDiscussions] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const { isAuthenticated } = useAuth()

  const popularCompanies = [
    'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix',
    'Adobe', 'Oracle', 'Intel', 'IBM', 'Cisco', 'Salesforce',
    'Twitter', 'Uber', 'Airbnb', 'Spotify', 'Slack', 'Zoom'
  ]

  useEffect(() => {
    if (selectedCompany) {
      fetchDiscussions()
    }
  }, [selectedCompany])

  const fetchDiscussions = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/discussions/${encodeURIComponent(selectedCompany)}`)
      setDiscussions(response.data)
    } catch (error) {
      console.error('Error fetching discussions:', error)
      toast.error('Failed to load discussions')
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      setSending(true)
      await api.post(`/discussions/${encodeURIComponent(selectedCompany)}`, {
        message: newMessage.trim()
      })

      setNewMessage('')
      fetchDiscussions()
      toast.success('Message sent successfully!')
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
                  onChange={(e) => setSelectedCompany(e.target.value)}
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
                      onClick={() => setSelectedCompany(company)}
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
          {selectedCompany && (
            <div className="card">
              <div className="card-body">
                <div className="section-header">
                  <FiMessageSquare className="section-icon" />
                  <h2>{selectedCompany} Discussions</h2>
                </div>

                {/* Message Input */}
                {isAuthenticated ? (
                  <form onSubmit={handleSendMessage} className="message-form">
                    <div className="message-box">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="form-textarea"
                        placeholder="Share your thoughts, questions, or updates about this company..."
                        rows="3"
                        maxLength="500"
                      />
                      <button
                        type="submit"
                        disabled={sending || !newMessage.trim()}
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
                ) : discussions.length === 0 ? (
                  <div className="empty-state">
                    <div className="emoji">💬</div>
                    <h3>No discussions yet</h3>
                    <p>Be the first to start a discussion about {selectedCompany}!</p>
                  </div>
                ) : (
                  <div className="discussion-list">
                    {discussions.map((discussion) => (
                      <div key={discussion._id} className="discussion-card">
                        <div className="discussion-header">
                          <div className="author-info">
                            <div className="avatar">
                              <FiUser />
                            </div>
                            <span>{discussion.userId?.name || 'Anonymous'}</span>
                          </div>
                          <span className="time">{formatDate(discussion.createdAt)}</span>
                        </div>
                        <div className="discussion-message">
                          {discussion.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* No Company Selected */}
          {!selectedCompany && (
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

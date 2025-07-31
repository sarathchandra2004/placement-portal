import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'
import { FiSearch, FiMessageSquare, FiSend, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'

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
      fetchDiscussions() // Refresh discussions
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
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Company Discussions</h1>
          <p>Join discussions about specific companies and get real-time updates</p>
        </div>
      </div>

      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Company Selection */}
          <div className="card mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Select a Company</h2>
              
              {/* Search Input */}
              <div className="mb-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="form-input pl-10"
                    placeholder="Search or type company name..."
                  />
                </div>
              </div>

              {/* Popular Companies */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {popularCompanies.map((company) => (
                    <button
                      key={company}
                      onClick={() => setSelectedCompany(company)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCompany === company
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
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
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FiMessageSquare className="text-blue-600" />
                  <h2 className="text-xl font-semibold">
                    {selectedCompany} Discussions
                  </h2>
                </div>

                {/* Message Input */}
                {isAuthenticated ? (
                  <form onSubmit={handleSendMessage} className="mb-6">
                    <div className="flex gap-2">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="form-input form-textarea flex-1"
                        placeholder="Share your thoughts, questions, or updates about this company..."
                        rows="3"
                        maxLength="500"
                      />
                      <button
                        type="submit"
                        disabled={sending || !newMessage.trim()}
                        className="btn btn-primary self-end"
                      >
                        {sending ? (
                          <div className="spinner w-4 h-4"></div>
                        ) : (
                          <FiSend />
                        )}
                      </button>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {newMessage.length}/500 characters
                    </div>
                  </form>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800">
                      Please <a href="/login" className="font-medium underline">sign in</a> to participate in discussions.
                    </p>
                  </div>
                )}

                {/* Messages */}
                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                  </div>
                ) : discussions.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-4">💬</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No discussions yet
                    </h3>
                    <p className="text-gray-600">
                      Be the first to start a discussion about {selectedCompany}!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {discussions.map((discussion) => (
                      <div key={discussion._id} className="discussion-card">
                        <div className="discussion-header">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                              <FiUser className="text-white text-sm" />
                            </div>
                            <span className="discussion-author">
                              {discussion.userId?.name || 'Anonymous'}
                            </span>
                          </div>
                          <span className="discussion-time">
                            {formatDate(discussion.createdAt)}
                          </span>
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
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select a Company
              </h3>
              <p className="text-gray-600">
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
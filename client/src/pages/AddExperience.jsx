import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { FiPlus, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

const AddExperience = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    company: '',
    role: '',
    package: '',
    type: '',
    department: '',
    cgpa: '',
    cgpaMatters: false,
    rounds: '',
    questions: [''],
    questionTags: [''],
    preparationDuration: '',
    resources: [''],
    timeline: '',
    difficultyRating: 3,
    wouldRecommend: true
  })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Biotechnology',
    'Other'
  ]

  const types = ['internship', 'placement']

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleArrayChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Clean up empty array items
      const cleanedData = {
        ...formData,
        questions: formData.questions.filter(q => q.trim() !== ''),
        questionTags: formData.questionTags.filter(t => t.trim() !== ''),
        resources: formData.resources.filter(r => r.trim() !== ''),
        package: parseFloat(formData.package),
        cgpa: parseFloat(formData.cgpa),
        rounds: parseInt(formData.rounds),
        difficultyRating: parseInt(formData.difficultyRating)
      }

      await api.post('/experiences', cleanedData)
      toast.success('Experience shared successfully!')
      navigate('/experiences')
    } catch (error) {
      console.error('Error creating experience:', error)
      toast.error('Failed to share experience')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Share Your Experience</h1>
          <p>Help other students by sharing your placement or internship experience</p>
        </div>
      </div>

      <div className="container">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Experience Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role/Position</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Software Engineer, Data Analyst"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Package (LPA)</label>
                  <input
                    type="number"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter package in LPA"
                    step="0.1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select type</option>
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">CGPA</label>
                  <input
                    type="number"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your CGPA"
                    step="0.01"
                    min="0"
                    max="10"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Number of Rounds</label>
                  <input
                    type="number"
                    name="rounds"
                    value={formData.rounds}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Number of interview rounds"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="cgpaMatters"
                    checked={formData.cgpaMatters}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label>CGPA mattered in selection</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="wouldRecommend"
                    checked={formData.wouldRecommend}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label>Would recommend this company</label>
                </div>
              </div>

              {/* Difficulty Rating */}
              <div className="form-group mt-6">
                <label className="form-label">Interview Difficulty (1-5)</label>
                <select
                  name="difficultyRating"
                  value={formData.difficultyRating}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="1">1 - Very Easy</option>
                  <option value="2">2 - Easy</option>
                  <option value="3">3 - Moderate</option>
                  <option value="4">4 - Difficult</option>
                  <option value="5">5 - Very Difficult</option>
                </select>
              </div>

              {/* Timeline */}
              <div className="form-group">
                <label className="form-label">Interview Timeline</label>
                <textarea
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  placeholder="Describe the interview timeline and process"
                  rows="3"
                />
              </div>

              {/* Preparation Duration */}
              <div className="form-group">
                <label className="form-label">Preparation Duration</label>
                <input
                  type="text"
                  name="preparationDuration"
                  value={formData.preparationDuration}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., 2 months, 6 weeks"
                />
              </div>

              {/* Interview Questions */}
              <div className="form-group">
                <label className="form-label">Interview Questions</label>
                {formData.questions.map((question, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => handleArrayChange(index, 'questions', e.target.value)}
                      className="form-input flex-1"
                      placeholder="Enter interview question"
                    />
                    {formData.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('questions', index)}
                        className="btn btn-danger"
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('questions')}
                  className="btn btn-secondary"
                >
                  <FiPlus /> Add Question
                </button>
              </div>

              {/* Question Tags */}
              <div className="form-group">
                <label className="form-label">Question Tags</label>
                {formData.questionTags.map((tag, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayChange(index, 'questionTags', e.target.value)}
                      className="form-input flex-1"
                      placeholder="e.g., DSA, System Design, Behavioral"
                    />
                    {formData.questionTags.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('questionTags', index)}
                        className="btn btn-danger"
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('questionTags')}
                  className="btn btn-secondary"
                >
                  <FiPlus /> Add Tag
                </button>
              </div>

              {/* Resources */}
              <div className="form-group">
                <label className="form-label">Preparation Resources</label>
                {formData.resources.map((resource, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={resource}
                      onChange={(e) => handleArrayChange(index, 'resources', e.target.value)}
                      className="form-input flex-1"
                      placeholder="e.g., LeetCode, GeeksforGeeks, Book name"
                    />
                    {formData.resources.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('resources', index)}
                        className="btn btn-danger"
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('resources')}
                  className="btn btn-secondary"
                >
                  <FiPlus /> Add Resource
                </button>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => navigate('/experiences')}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Sharing...' : 'Share Experience'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddExperience 
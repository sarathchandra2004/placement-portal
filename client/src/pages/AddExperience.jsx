import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { FiPlus, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './AddExperience.css'

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
    wouldRecommend: true,
    gotSelected: false
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

      // Remove /api from the path since VITE_API_BASE_URL already includes it
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
    <div className="add-experience">
      <div className="page-header">
        <div className="container">
          <h1>Share Your Experience</h1>
          <p>Help other students by sharing your placement or internship experience</p>
        </div>
      </div>

      <div className="container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="form-card">
            <h2 className="form-title">Experience Details</h2>
            
            <div className="required-note">
              <span className="required-asterisk">*</span> indicates required fields
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="required-label">
                  Your Name <span className="required-asterisk">*</span>
                </label>
                <input 
                  type="text" 
                  name="studentName" 
                  value={formData.studentName} 
                  onChange={handleChange} 
                  required 
                  className="required-field"
                />
              </div>

              <div className="form-group">
                <label className="required-label">
                  Company <span className="required-asterisk">*</span>
                </label>
                <input 
                  type="text" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  required 
                  className="required-field"
                />
              </div>

              <div className="form-group">
                <label className="required-label">
                  Role/Position <span className="required-asterisk">*</span>
                </label>
                <input 
                  type="text" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                  required 
                  className="required-field"
                />
              </div>

              <div className="form-group">
                <label className="required-label">
                  Package (LPA) <span className="required-asterisk">*</span>
                </label>
                <input 
                  type="number" 
                  name="package" 
                  value={formData.package} 
                  onChange={handleChange} 
                  step="0.1" 
                  required 
                  className="required-field"
                />
              </div>

              <div className="form-group">
                <label className="required-label">
                  Type <span className="required-asterisk">*</span>
                </label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  required
                  className="required-field"
                >
                  <option value="">Select type</option>
                  {types.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="optional-label">
                  Department <span className="optional-text">(optional)</span>
                </label>
                <select name="department" value={formData.department} onChange={handleChange}>
                  <option value="">Select department</option>
                  {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="optional-label">
                  CGPA <span className="optional-text">(optional)</span>
                </label>
                <input 
                  type="number" 
                  name="cgpa" 
                  value={formData.cgpa} 
                  onChange={handleChange} 
                  step="0.01" 
                  min="0" 
                  max="10" 
                  placeholder="e.g., 8.5"
                />
              </div>

              <div className="form-group">
                <label className="optional-label">
                  Number of Rounds <span className="optional-text">(optional)</span>
                </label>
                <input 
                  type="number" 
                  name="rounds" 
                  value={formData.rounds} 
                  onChange={handleChange} 
                  min="1" 
                  placeholder="e.g., 3"
                />
              </div>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="cgpaMatters" 
                  checked={formData.cgpaMatters} 
                  onChange={handleChange} 
                /> 
                <span>CGPA mattered in selection</span>
              </label>
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="wouldRecommend" 
                  checked={formData.wouldRecommend} 
                  onChange={handleChange} 
                /> 
                <span>Would recommend this company</span>
              </label>
            </div>

            <div className="form-group">
              <label className="optional-label">
                Interview Difficulty for preparation (1-5) <span className="optional-text">(optional)</span>
              </label>
              <select
                name="difficultyRating"
                value={formData.difficultyRating}
                onChange={handleChange}
              >
                <option value="1">1 - Very Easy: Arre bas naam likha aur ho gaya</option>
                <option value="2">2 - Easy: Thoda padha, zyada phone chalaya</option>
                <option value="3">3 - Moderate: Engineering semester exam vibes (One night wonders)</option>
                <option value="4">4 - Difficult: RCB ka IPL jeetna jitna mushkil (Luck is important)</option>
                <option value="5">5 - Very Difficult: "Yeh humse na ho payega", bhagwaan bharose</option>
              </select>
            </div>
            
            {['questions', 'questionTags', 'resources'].map((field) => (
              <div key={field} className="form-group">
                <label className="optional-label">
                  {field === 'questions' ? 'Interview Questions' : 
                   field === 'questionTags' ? 'Question Tags (Ex: Trees, System Design, OS.. etc)' : 
                   'Preparation Resources'} 
                  <span className="optional-text">(optional)</span>
                </label>
                {formData[field].map((item, index) => (
                  <div key={index} className="dynamic-input">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayChange(index, field, e.target.value)}
                      placeholder={`Enter ${field.slice(0, -1)}`}
                    />
                    {formData[field].length > 1 && (
                      <button type="button" onClick={() => removeArrayItem(field, index)} className="btn-danger">
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem(field)} className="btn-secondary">
                  <FiPlus /> Add {field.slice(0, -1)}
                </button>
              </div>
            ))}

            <div className="form-group">
              <label className="optional-label">
                Interview Guidance/ Additional Tips <span className="optional-text">(optional)</span>
              </label>
              <textarea 
                name="timeline" 
                value={formData.timeline} 
                onChange={handleChange} 
                rows="3" 
                placeholder="Share any additional tips or guidance for the interview process..."
              />
            </div>

            <div className="form-group">
              <label className="optional-label">
                Preparation Strategy <span className="optional-text">(optional)</span>
              </label>
              <input 
                type="text" 
                name="preparationDuration" 
                value={formData.preparationDuration} 
                onChange={handleChange} 
                placeholder="e.g., 2 months of consistent practice, focused on DSA..."
              />
            </div>

            <div className="highlight-box">
              <label className="highlight-label">
                <input
                  type="checkbox"
                  name="gotSelected"
                  checked={formData.gotSelected}
                  onChange={handleChange}
                />
                <span className="highlight-text">I got selected in this company</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate('/experiences')} className="btn-secondary">Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Sharing...' : 'Share Experience'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddExperience
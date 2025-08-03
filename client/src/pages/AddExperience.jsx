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

            <div className="form-grid">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Role/Position</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Package (LPA)</label>
                <input type="number" name="package" value={formData.package} onChange={handleChange} step="0.1" required />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">Select type</option>
                  {types.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Department</label>
                <select name="department" value={formData.department} onChange={handleChange} required>
                  <option value="">Select department</option>
                  {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>CGPA</label>
                <input type="number" name="cgpa" value={formData.cgpa} onChange={handleChange} step="0.01" min="0" max="10" />
              </div>

              <div className="form-group">
                <label>Number of Rounds</label>
                <input type="number" name="rounds" value={formData.rounds} onChange={handleChange} min="1" required />
              </div>
            </div>

            <div className="checkbox-group">
              <label><input type="checkbox" name="cgpaMatters" checked={formData.cgpaMatters} onChange={handleChange} /> CGPA mattered in selection</label>
              <label><input type="checkbox" name="wouldRecommend" checked={formData.wouldRecommend} onChange={handleChange} /> Would recommend this company</label>
            </div>

            <div className="form-group">
              <label>Interview Difficulty for preparation (1-5)</label>
              <select
                name="difficultyRating"
                value={formData.difficultyRating}
                onChange={handleChange}
              >
                <option value="1">1 - Very Easy: Arre bas naam likha aur ho gaya </option>
                <option value="2">2 - Easy: Thoda padha, zyada phone chalaya</option>
                <option value="3">3 - Moderate: Engineering semester exam vibes (One night wonders)</option>
                <option value="4">4 - Difficult: RCB ka IPL jeetna jitna mushkil (Luck is important)</option>
                <option value="5">5 - Very Difficult: "Yeh humse na ho payega", bhagwaan bharose </option>
              </select>
            </div>
            
            {['questions', 'questionTags', 'resources'].map((field) => (
              <div key={field} className="form-group">
                <label>{field === 'questions' ? 'Interview Questions' : field === 'questionTags' ? 'Question Tags (Ex: Trees, System Design, OS.. etc)' : 'Preparation Resources'}</label>
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
              <label>Interview Guidance/ Additional Tips</label>
              <textarea name="timeline" value={formData.timeline} onChange={handleChange} rows="3" />
            </div>

            <div className="form-group">
              <label>Preparation Strategy</label>
              <input type="text" name="preparationDuration" value={formData.preparationDuration} onChange={handleChange} />
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
              <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Sharing...' : 'Share Experience'}</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddExperience
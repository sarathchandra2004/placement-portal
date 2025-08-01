import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus, FiX } from 'react-icons/fi';
import { api } from '../utils/api';
import './AddExperience.css';

const EditExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/experiences/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data;

        // Normalize empty arrays
        setFormData({
          ...data,
          questions: data.questions?.length ? data.questions : [''],
          questionTags: data.questionTags?.length ? data.questionTags : [''],
          resources: data.resources?.length ? data.resources : ['']
        });
      } catch (err) {
        console.error('Failed to fetch experience:', err);
        toast.error('Error loading experience');
      }
    };

    fetchExperience();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      };

      await api.put(`/experiences/${id}`, cleanedData);
      toast.success('Experience updated successfully!');
      navigate('/profile');
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-experience">
      <div className="page-header">
        <div className="container">
          <h1>Edit Your Experience</h1>
          <p>Update your placement or internship details to keep it fresh and helpful.</p>
        </div>
      </div>

      <div className="container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="form-card">
            <h2 className="form-title">Experience Details</h2>

            {/* Form fields same as AddExperience */}
            <div className="form-grid">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} />
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
                <input type="number" name="package" value={formData.package} onChange={handleChange} step="0.1" />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">Select type</option>
                  <option value="internship">Internship</option>
                  <option value="placement">Placement</option>
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>CGPA</label>
                <input type="number" name="cgpa" value={formData.cgpa} onChange={handleChange} step="0.01" />
              </div>
              <div className="form-group">
                <label>Number of Rounds</label>
                <input type="number" name="rounds" value={formData.rounds} onChange={handleChange} />
              </div>
            </div>

            <div className="checkbox-group">
              <label><input type="checkbox" name="cgpaMatters" checked={formData.cgpaMatters} onChange={handleChange} /> CGPA mattered in selection</label>
              <label><input type="checkbox" name="wouldRecommend" checked={formData.wouldRecommend} onChange={handleChange} /> Would recommend this company</label>
            </div>

            <div className="form-group">
              <label>Interview Difficulty (1-5)</label>
              <select name="difficultyRating" value={formData.difficultyRating} onChange={handleChange}>
                <option value="1">1 - Very Easy</option>
                <option value="2">2 - Easy</option>
                <option value="3">3 - Moderate</option>
                <option value="4">4 - Difficult</option>
                <option value="5">5 - Very Difficult</option>
              </select>
            </div>

            {['questions', 'questionTags', 'resources'].map((field) => (
              <div key={field} className="form-group">
                <label>{field === 'questions' ? 'Interview Questions' : field === 'questionTags' ? 'Question Tags' : 'Preparation Resources'}</label>
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
              <label>Additional Timeline / Tips</label>
              <textarea name="timeline" value={formData.timeline} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Preparation Strategy</label>
              <input type="text" name="preparationDuration" value={formData.preparationDuration} onChange={handleChange} />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate('/profile')} className="btn-secondary">Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Updating...' : 'Update Experience'}
              </button>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExperience;

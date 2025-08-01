import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import { FiSearch, FiFilter, FiDollarSign } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './Experiences.css'   // <-- Import the new CSS file

const Experiences = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [pendingFilters, setPendingFilters] = useState({
    company: '',
    department: '',
    type: '',
    minLPA: '',
    maxLPA: '',
    gotSelected: ''
  })
  const resultsRef = useRef(null)

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

  useEffect(() => {
    fetchExperiences({})
  }, [])

  const fetchExperiences = async (activeFilters) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
      const response = await api.get(`/experiences?${params.toString()}`)
      setExperiences(response.data)
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' })
      }
      if (value !== '') {
        params.append(key, value === 'true' ? true : value === 'false' ? false : value)
      }

    } catch (error) {
      console.error('Error fetching experiences:', error)
      toast.error('Failed to load experiences')
    } finally {
      setLoading(false)
    }
  }

  const handlePendingFilterChange = (e) => {
    const { name, value } = e.target
    setPendingFilters(prev => ({ ...prev, [name]: value }))
  }

  const applyFilters = (e) => {
    e.preventDefault()
    fetchExperiences(pendingFilters)
  }

  const clearFilters = (e) => {
    e.preventDefault()
    const cleared = { company: '', department: '', type: '', minLPA: '', maxLPA: '' }
    setPendingFilters(cleared)
    fetchExperiences(cleared)
  }

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <div className="experiences-page">
      {/* Header */}
      <div className="experiences-header">
        <div className="header-content">
          <h1>Placement Experiences</h1>
          <p>Learn from students who cracked internships and placements</p>
        </div>
      </div>

      <div className="experiences-container">
        {/* Filters */}
        <div className="filters-card">
          <div className="filters-header">
            <FiFilter className="filter-icon" />
            <h3>Filters</h3>
          </div>

          <div className="filters-grid">
            <div>
              <label>Company</label>
              <div className="input-icon">
                <FiSearch />
                <input
                  type="text"
                  name="company"
                  value={pendingFilters.company}
                  onChange={handlePendingFilterChange}
                  placeholder="Search company"
                />
              </div>
            </div>

            <div>
              <label>Department</label>
              <select name="department" value={pendingFilters.department} onChange={handlePendingFilterChange}>
                <option value="">All Departments</option>
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>

            <div>
              <label>Type</label>
              <select name="type" value={pendingFilters.type} onChange={handlePendingFilterChange}>
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Min Package (LPA)</label>
              <div className="input-icon">

                <input
                  type="number"
                  name="minLPA"
                  value={pendingFilters.minLPA}
                  onChange={handlePendingFilterChange}
                  placeholder="Min LPA"
                />
              </div>
            </div>

            <div>
              <label>Max Package (LPA)</label>
              <div className="input-icon">

                <input
                  type="number"
                  name="maxLPA"
                  value={pendingFilters.maxLPA}
                  onChange={handlePendingFilterChange}
                  placeholder="Max LPA"
                />
              </div>
            </div>
            <div>
              <label>Selection Status</label>
              <select name="gotSelected" value={pendingFilters.gotSelected} onChange={handlePendingFilterChange}>
                <option value="">All</option>
                <option value="true">Selected</option>
                <option value="false">Not Selected</option>
              </select>
            </div>

          </div>

          <div className="filters-actions">
            <button className="btn-clear" onClick={clearFilters}>Clear Filters</button>
            <button className="btn-apply" onClick={applyFilters}>Apply Filters</button>
          </div>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="results-header">
          <h2>{experiences.length} Experience{experiences.length !== 1 ? 's' : ''} Found</h2>
        </div>

        {/* Experience Cards */}
        {experiences.length === 0 ? (
          <div className="no-results">
            <div className="emoji">📝</div>
            <h3>No experiences found</h3>
            <p>Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {experiences.map((experience) => (
              <Link key={experience._id} to={`/experiences/${experience._id}`} className="experience-card">
                <div>
                  <div className="card-header">
                    <div>
                      <h3>{experience.company || 'Company Not Available'}</h3>
                      <p>{experience.role || 'Role Not Available'}</p>
                      {experience.studentName && <span>by {experience.studentName}</span>}
                    </div>
                    <div className="card-tags">
                      <span className="package-badge">
                        {experience.package ? `${experience.package} LPA` : 'N/A'}
                      </span>
                      <span className={`selected-badge ${experience.gotSelected ? 'success' : 'danger'}`}>
                        {experience.gotSelected ? 'Selected' : 'Not Selected'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Experiences

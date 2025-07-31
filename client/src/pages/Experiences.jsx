import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import { FiSearch, FiFilter, FiMapPin, FiDollarSign, FiCalendar } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Experiences = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [pendingFilters, setPendingFilters] = useState({
    company: '',
    department: '',
    type: '',
    minLPA: '',
    maxLPA: ''
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
    // fetch all on initial load
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
      // smooth scroll after results load
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' })
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
    setPendingFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const applyFilters = (e) => {
    e.preventDefault()
    fetchExperiences(pendingFilters) // always use the pendingFilters directly
  }

  const clearFilters = (e) => {
    e.preventDefault()
    const cleared = {
      company: '',
      department: '',
      type: '',
      minLPA: '',
      maxLPA: ''
    }
    setPendingFilters(cleared)
    fetchExperiences(cleared)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 mb-10 shadow-md">
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-4xl font-bold mb-3">Placement Experiences</h1>
          <p className="text-lg opacity-90">
            Learn from students who cracked internships and placements
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Filters */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6 border-b pb-3">
            <FiFilter className="text-blue-500 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-600">Company</label>
              <div className="relative mt-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  value={pendingFilters.company}
                  onChange={handlePendingFilterChange}
                  className="w-full rounded-lg border border-gray-300 pl-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Search company"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Department</label>
              <select
                name="department"
                value={pendingFilters.department}
                onChange={handlePendingFilterChange}
                className="w-full rounded-lg border border-gray-300 py-2 px-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Type</label>
              <select
                name="type"
                value={pendingFilters.type}
                onChange={handlePendingFilterChange}
                className="w-full rounded-lg border border-gray-300 py-2 px-3 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Min Package (LPA)</label>
              <div className="relative mt-1">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="minLPA"
                  value={pendingFilters.minLPA}
                  onChange={handlePendingFilterChange}
                  className="w-full rounded-lg border border-gray-300 pl-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Min LPA"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Max Package (LPA)</label>
              <div className="relative mt-1">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="maxLPA"
                  value={pendingFilters.maxLPA}
                  onChange={handlePendingFilterChange}
                  className="w-full rounded-lg border border-gray-300 pl-10 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Max LPA"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={clearFilters}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
            >
              Clear Filters
            </button>
            <button
              onClick={applyFilters}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {experiences.length} Experience{experiences.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {/* Experience Cards */}
        {experiences.length === 0 ? (
          <div className="text-center py-20 bg-white shadow rounded-xl">
            <div className="text-gray-400 text-7xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No experiences found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience) => (
              <Link 
                key={experience._id} 
                to={`/experiences/${experience._id}`}
                className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{experience.company || 'Company Not Available'}</h3>
                      <p className="text-gray-600">{experience.role || 'Role Not Available'}</p>
                      {experience.studentName && (
                        <p className="text-sm text-gray-500">by {experience.studentName}</p>
                      )}
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {experience.package ? `${experience.package} LPA` : 'N/A'}
                    </span>
                  </div>
                  {/* rest of the card */}
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

import { Link } from 'react-router-dom'
import { FiBookOpen, FiMessageSquare, FiTrendingUp, FiUsers } from 'react-icons/fi'
// import './Home.css'

const Home = () => {
  const heroStyles = {
    background: 'linear-gradient(120deg, #f8fafc, #eef2ff)',
    color: '#1e293b',
    textAlign: 'center',
    padding: '6rem 2rem',
    position: 'relative',
    borderBottom: '1px solid #e5e7eb'
  }

  const heroBeforeStyles = {
    content: '""',
    position: 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(79,70,229,0.15), transparent 70%)',
    borderRadius: '50%',
    zIndex: 0
  }

  const heroContainerStyles = {
    position: 'relative',
    maxWidth: '900px',
    margin: '0 auto',
    zIndex: 1
  }

  const heroH1Styles = {
    fontSize: '2.75rem',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '1.25rem',
    lineHeight: '1.2',
    letterSpacing: '-0.5px'
  }

  const heroPStyles = {
    fontSize: '1.2rem',
    color: '#374151',
    maxWidth: '680px',
    margin: '0 auto 2.5rem',
    lineHeight: '1.6'
  }

  const heroFlexStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  }

  const btnBaseStyles = {
    padding: '0.85rem 2rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.25s ease',
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer'
  }

  const btnPrimaryStyles = {
    ...btnBaseStyles,
    background: '#4f46e5',
    color: 'white',
    boxShadow: '0 4px 14px rgba(79,70,229,0.3)'
  }

  const btnSecondaryStyles = {
    ...btnBaseStyles,
    background: '#f9fafb',
    color: '#1e293b',
    border: '1px solid #e5e7eb'
  }

  const handlePrimaryHover = (e) => {
    e.target.style.background = '#4338ca'
    e.target.style.transform = 'translateY(-2px)'
    e.target.style.boxShadow = '0 6px 18px rgba(79,70,229,0.35)'
  }

  const handlePrimaryLeave = (e) => {
    e.target.style.background = '#4f46e5'
    e.target.style.transform = 'translateY(0)'
    e.target.style.boxShadow = '0 4px 14px rgba(79,70,229,0.3)'
  }

  const handleSecondaryHover = (e) => {
    e.target.style.background = '#f3f4f6'
    e.target.style.transform = 'translateY(-2px)'
    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
  }

  const handleSecondaryLeave = (e) => {
    e.target.style.background = '#f9fafb'
    e.target.style.transform = 'translateY(0)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={heroStyles}>
        {/* Pseudo-element effect using an actual div */}
        <div style={heroBeforeStyles}></div>
        
        <div style={heroContainerStyles}>
          <h1 style={heroH1Styles}>Your Gateway to Placement Success</h1>
          <p style={heroPStyles}>
            Connect with fellow students, share placement experiences, and get insights 
            from those who've been there. Join our community to navigate your career journey.
          </p>
          <div style={heroFlexStyles}>
            <Link 
              to="/experiences" 
              style={btnPrimaryStyles}
              onMouseEnter={handlePrimaryHover}
              onMouseLeave={handlePrimaryLeave}
            >
              Browse Experiences
            </Link>
            <Link 
              to="/register" 
              style={btnSecondaryStyles}
              onMouseEnter={handleSecondaryHover}
              onMouseLeave={handleSecondaryLeave}
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Placement Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive resources and community support 
              to help you ace your placement interviews and land your dream job.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiBookOpen />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experience Sharing</h3>
              <p className="text-gray-600">
                Read detailed placement experiences from students who've successfully 
                cracked interviews at top companies.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiMessageSquare />
              </div>
              <h3 className="text-xl font-semibold mb-2">Company Discussions</h3>
              <p className="text-gray-600">
                Join company-specific discussions to get real-time updates, 
                tips, and insights about your target companies.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiTrendingUp />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interview Preparation</h3>
              <p className="text-gray-600">
                Access interview questions, preparation strategies, and resources 
                shared by successful candidates.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FiUsers />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Connect with peers, mentors, and alumni who can guide you 
                through your placement journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Growing Community
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of students who are already benefiting from our platform
            </p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h3>50+</h3>
              <p>Experiences Shared</p>
            </div>
            <div className="stat-item">
              <h3>20+</h3>
              <p>Companies Covered</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Active Students</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Success Rate of Finding what you want</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community today and get access to valuable insights, 
            experiences, and support from fellow students.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/experiences" className="btn btn-secondary">
              Explore Experiences
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
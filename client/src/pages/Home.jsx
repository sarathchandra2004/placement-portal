import { Link } from 'react-router-dom'
import { FiBookOpen, FiMessageSquare, FiTrendingUp, FiUsers } from 'react-icons/fi'
import './Home.css'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Your Gateway to Placement Success</h1>
          <p>
            Connect with fellow students, share placement experiences, and get insights 
            from those who've been there. Join our community to navigate your career journey.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/experiences" className="btn btn-primary">
              Browse Experiences
            </Link>
            <Link to="/register" className="btn btn-secondary">
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
              <h3>500+</h3>
              <p>Experiences Shared</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Companies Covered</p>
            </div>
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Active Students</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Success Rate</p>
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
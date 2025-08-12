import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiLogOut, FiPlus, FiHome, FiBookOpen, FiMessageSquare, FiMenu, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
        <div className="logo-icon">
          <FiBookOpen size={20} />
        </div>
        <span className="logo-text">Placement Portal</span>
      </Link>

      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Navigation Links */}
      <div className={`nav-content ${isMobileMenuOpen ? 'nav-content--mobile-open' : ''}`}>
        <div className="nav-links">
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>
            <FiHome className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/experiences" className="nav-link" onClick={closeMobileMenu}>
            <FiBookOpen className="nav-icon" />
            <span>Experiences</span>
          </Link>
          <Link to="/discussions" className="nav-link" onClick={closeMobileMenu}>
            <FiMessageSquare className="nav-icon" />
            <span>Discussions</span>
          </Link>
        </div>

        {/* Auth Section */}
        <div className="auth-section">
          {isAuthenticated ? (
            <>
              <Link 
                to="/add-experience" 
                className="share-btn"
                onClick={closeMobileMenu}
              >
                <FiPlus className="btn-icon" />
                <span>Share Experience</span>
              </Link>

              <div
                className="profile-container"
                onMouseEnter={() => !isMobileMenuOpen && setIsDropdownOpen(true)}
                onMouseLeave={() => !isMobileMenuOpen && setIsDropdownOpen(false)}
                onClick={() => isMobileMenuOpen && setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="profile-circle">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className={`profile-dropdown ${isDropdownOpen ? 'profile-dropdown--open' : ''}`}>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => {
                      setIsDropdownOpen(false)
                      closeMobileMenu()
                    }}
                  >
                    <FiUser className="dropdown-icon" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item dropdown-item--button"
                  >
                    <FiLogOut className="dropdown-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-link" onClick={closeMobileMenu}>
                Login
              </Link>
              <Link to="/register" className="signup-btn" onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  )
}

export default Navbar
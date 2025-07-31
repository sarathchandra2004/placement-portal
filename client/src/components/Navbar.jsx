import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiLogOut, FiPlus, FiHome, FiBookOpen, FiMessageSquare } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const navStyle = {
    background: 'linear-gradient(90deg, #4e54c8, #8f94fb)',
    padding: '12px 40px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  }

  const iconBox = {
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '8px',
    padding: '6px',
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const linksContainer = {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'rgba(255,255,255,0.9)',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  }

  const linkHover = {
    color: '#fff',
    transform: 'scale(1.05)',
  }

  const btnStyle = {
    background: '#ff6b6b',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }

  const profileCircle = {
    background: 'rgba(255,255,255,0.3)',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#fff',
  }

  const dropdown = {
    position: 'absolute',
    right: 0,
    marginTop: '12px',
    width: '180px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    display: 'none',
    flexDirection: 'column',
    zIndex: 999,
  }

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <Link to="/" style={logoStyle}>
        <div style={iconBox}>
          <FiBookOpen color="#fff" size={20} />
        </div>
        Placement Portal
      </Link>

      {/* Navigation Links */}
      <div style={linksContainer}>
        <Link
          to="/"
          style={linkStyle}
          onMouseEnter={e => Object.assign(e.target.style, linkHover)}
          onMouseLeave={e => Object.assign(e.target.style, linkStyle)}
        >
          <FiHome style={{ marginRight: '6px' }} />
          Home
        </Link>
        <Link
          to="/experiences"
          style={linkStyle}
          onMouseEnter={e => Object.assign(e.target.style, linkHover)}
          onMouseLeave={e => Object.assign(e.target.style, linkStyle)}
        >
          <FiBookOpen style={{ marginRight: '6px' }} />
          Experiences
        </Link>
        <Link
          to="/discussions"
          style={linkStyle}
          onMouseEnter={e => Object.assign(e.target.style, linkHover)}
          onMouseLeave={e => Object.assign(e.target.style, linkStyle)}
        >
          <FiMessageSquare style={{ marginRight: '6px' }} />
          Discussions
        </Link>
      </div>

      {/* Auth Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
        {isAuthenticated ? (
          <>
            <Link to="/add-experience" style={btnStyle}>
              <FiPlus style={{ marginRight: '6px' }} />
              Share Experience
            </Link>

            <div
              style={{ position: 'relative' }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.dropdown').style.display = 'flex'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.dropdown').style.display = 'none'
              }}
            >
              <div style={profileCircle}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="dropdown" style={dropdown}>
                <Link
                  to="/profile"
                  style={{
                    padding: '12px 16px',
                    textDecoration: 'none',
                    color: '#333',
                    fontWeight: '500',
                  }}
                  onMouseEnter={e => (e.target.style.background = '#f3f3f3')}
                  onMouseLeave={e => (e.target.style.background = 'transparent')}
                >
                  <FiUser style={{ marginRight: '8px' }} />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '12px 16px',
                    border: 'none',
                    background: 'none',
                    textAlign: 'left',
                    color: '#333',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.target.style.background = '#f3f3f3')}
                  onMouseLeave={e => (e.target.style.background = 'transparent')}
                >
                  <FiLogOut style={{ marginRight: '8px' }} />
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={linkStyle}
              onMouseEnter={e => Object.assign(e.target.style, linkHover)}
              onMouseLeave={e => Object.assign(e.target.style, linkStyle)}
            >
              Login
            </Link>
            <Link to="/register" style={btnStyle}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar

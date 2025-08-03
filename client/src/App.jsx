import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Experiences from './pages/Experiences'
// import AddExperience from './pages/AddExperience'
// import ExperienceDetails from './pages/ExperienceDetails'
// import Discussions from './pages/Discussions'
// import Profile from './pages/Profile'
// import ProtectedRoute from './components/ProtectedRoute'
// import EditExperience from './pages/EditExperience'
// import UserProfile from './pages/UserProfile'
import './styles/App.css'

function App() {
  console.log('App component is rendering') // Debug log
  
  const { user } = useAuth()
  console.log('User from context:', user) // Debug log

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <div style={{padding: '20px', background: 'lightblue'}}>
          <h2>MAIN CONTENT TEST - This should be visible</h2>
          <p>Current URL: {window.location.pathname}</p>
        </div>
        <Routes>
          <Route path="/" element={<div style={{padding: '20px', background: 'lightgreen'}}>HOME ROUTE TEST</div>} />
          <Route path="/login" element={<div style={{padding: '20px', background: 'lightcoral'}}>LOGIN ROUTE TEST</div>} />
          <Route path="*" element={<div style={{padding: '20px', background: 'lightyellow'}}>404 - Route not found</div>} />
        </Routes>
      </main>
      <div
        style={{
          background: "#ffffffcc",
          backdropFilter: "blur(12px)",
          color: "#333",
          padding: "18px 15px",
          textAlign: "center",
          borderTop: "2px solid #6c63ff",
          marginTop: "40px",
          fontFamily: "'Poppins', sans-serif",
          boxShadow: "0 -3px 10px rgba(0,0,0,0.1)"
        }}
      >
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "500",
            margin: "0"
          }}
        >
          Made with <span style={{ color: "red", fontSize: "1.2rem" }}>❤️</span> by{" "}
          <a
            href="https://www.linkedin.com/in/yerraguntla-sarath-chandra-037835259/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: "700",
              background: "linear-gradient(90deg, #6c63ff, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textDecoration: "none"
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Sarath Chandra
          </a>
        </p>
      </div>
    </div>
  )
}

export default App
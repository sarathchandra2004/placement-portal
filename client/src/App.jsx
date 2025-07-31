import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Experiences from './pages/Experiences'
import AddExperience from './pages/AddExperience'
import ExperienceDetails from './pages/ExperienceDetails'
import Discussions from './pages/Discussions'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

import './styles/App.css'


function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experiences/:id" element={<ExperienceDetails />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route
            path="/add-experience"
            element={
              <ProtectedRoute>
                <AddExperience />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
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
          <span
            style={{
              fontWeight: "700",
              background: "linear-gradient(90deg, #6c63ff, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Sarath Chandra
          </span>
        </p>
      </div>

    </div>
  )
}

export default App 
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
    </div>
  )
}

export default App 
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddExperience from './pages/AddExperience';
import ExperienceDetails from './pages/ExperienceDetails';
import Discussions from './pages/Discussions';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-experience"
          element={
            <ProtectedRoute>
              <AddExperience />
            </ProtectedRoute>
          }
        />
        <Route path="/experiences/:id" element={<ExperienceDetails />} />
        <Route path="/discussions/:company" element={<Discussions />} />
      </Routes>
    </>
  );
}

export default App;

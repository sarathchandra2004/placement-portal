import { useState } from 'react';
import api from '../../utils/api';

const Register = () => {
  const [form, setForm] = useState({
    email: '', password: '', name: '', department: '', graduationYear: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      alert('Registration successful');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input name="name" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="department" placeholder="Department" onChange={handleChange} required />
      <input name="graduationYear" type="number" placeholder="Graduation Year" onChange={handleChange} required />
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Register;

import React, { useState } from 'react';
import './AuthPage.css';
import logo from '../assets/logo.png';
import lunivaLogo from '../assets/luniva.png';
import { useNavigate } from 'react-router-dom';

const AuthPage = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        if (isLogin) {
          // Save token & user info
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          navigate('/dashboard');
        } else {
          alert('Signup successful! Please login.');
          setIsLogin(true);
          setFormData({ fullName: '', email: '', password: '' });
        }
      }
    } catch {
      setError('Server error, please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <img src={logo} alt="Logo" className="auth-logo" />
        <img src={lunivaLogo} alt="LUNIVA" className="auth-luniva" />
      </header>

      <div className="auth-box">
        <h2>{isLogin ? 'Login to LUNIVA' : 'Signup for LUNIVA'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Signup')}
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

        <p
          onClick={() => {
            setError('');
            setIsLogin(!isLogin);
            setFormData({ fullName: '', email: '', password: '' });
          }}
          className="toggle-text"
          style={{ cursor: 'pointer', color: '#FFD700', marginTop: 15 }}
        >
          {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

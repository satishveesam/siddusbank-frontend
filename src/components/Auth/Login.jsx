import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

     
      <div className="bank-logo-box">
        <div className="logo-wrapper">
          <div className="logo-icon-container">
            <i className="fas fa-landmark logo-icon"></i>
          </div>
          <div className="logo-text-container">
            <span className="logo-text">SiddusBank</span>
          </div>
        </div>
      </div>

      <div className="login-card">
        <h2>Internet Banking</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer ID / Username</label>
            <div className="input-group">
              <i className="fas fa-user input-icon"></i>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your Customer ID"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="input-group">
              <i className="fas fa-lock input-icon"></i>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className="register-link">
          <p>First Time User?</p>
          <Link to="/register">Register Now</Link>
        </div>
        
        <div className="security-message">
          <i className="fas fa-shield-alt"></i>
          <span>Your transactions are safe, just like your secrets</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
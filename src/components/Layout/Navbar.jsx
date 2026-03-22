import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard">
            <span className="brand-icon">🏦</span>
            <span className="brand-name">SiddusBank</span>
          </Link>
        </div>
        
        <div className="navbar-menu">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/accounts" className="nav-link">My Accounts</Link>
          <Link to="/accounts/create" className="nav-link">Open Account</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </div>
        
        <div className="navbar-user">
          <div className="user-info">
            <span className="user-name">Welcome, {user?.fullName || user?.username}</span>
            <span className="user-id">Cust ID: {user?.id?.toString().padStart(8, '0')}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <i className="logout-icon">🚪</i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
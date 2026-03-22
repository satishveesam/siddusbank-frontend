import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import accountService from '../../services/account.service';
import { formatIndianCurrency } from '../../utils/currency';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLoginTip, setShowLoginTip] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await accountService.getAllAccounts();
      setAccounts(data);
      const total = data.reduce((sum, account) => sum + (account.balance || 0), 0);
      setTotalBalance(total);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      
      <div className="welcome-banner">
        <div className="banner-content">
          <h1>Welcome to SiddusBank</h1>
          <p>Your trusted banking partner since 2024</p>
          <div className="cust-id-badge">
            Cust ID: {user?.id?.toString().padStart(8, '0')}
          </div>
        </div>
        <div className="banner-security">
          <span className="security-badge">🔒 Secure Banking</span>
          <span className="security-badge">✓ Your transactions are safe</span>
        </div>
      </div>

      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Balance</h3>
            <p className="stat-value">{formatIndianCurrency(totalBalance)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Total Accounts</h3>
            <p className="stat-value">{accounts.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Active Accounts</h3>
            <p className="stat-value">{accounts.filter(acc => acc.active).length}</p>
          </div>
        </div>
      </div>

      
      <div className="features-section">
        <h2>Features & Benefits</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Safety & Security</h3>
            <p>Your transactions are safe, just like your secrets. Advanced encryption and 24/7 monitoring.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Fixed Deposit</h3>
            <p>Open fixed deposits instantly with competitive interest rates starting at 7.5% p.a.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Go Mobile+ App</h3>
            <p>Download the SiddusBank Go Mobile+ App for seamless banking on the go.</p>
            <button className="download-btn">Download Now →</button>
          </div>
        </div>
      </div>

      
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => window.location.href='/accounts/create'}>
            <span className="action-icon">➕</span>
            Open New Account
          </button>
          <button className="action-btn" onClick={() => window.location.href='/accounts'}>
            <span className="action-icon">👁️</span>
            View Accounts
          </button>
          <button className="action-btn" onClick={() => window.location.href='/profile'}>
            <span className="action-icon">👤</span>
            Update Profile
          </button>
        </div>
      </div>

      
      <div className="notifications-section">
        <h2>Important Notifications</h2>
        <div className="notifications-list">
          <div className="notification-item">
            <span className="notification-icon">📢</span>
            <div>
              <strong>UPI Services</strong>
              <p>Now avail UPI services with SiddusBank. Register now!</p>
            </div>
          </div>
          <div className="notification-item">
            <span className="notification-icon">💰</span>
            <div>
              <strong>New FD Rates</strong>
              <p>Fixed deposit rates increased up to 8.5% for senior citizens.</p>
            </div>
          </div>
          <div className="notification-item">
            <span className="notification-icon">🔒</span>
            <div>
              <strong>Security Update</strong>
              <p>Enable two-factor authentication for enhanced security.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
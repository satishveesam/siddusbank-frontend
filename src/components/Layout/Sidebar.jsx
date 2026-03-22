import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaMoneyBill, FaPlus, FaHistory, FaUser, FaUserCircle } from 'react-icons/fa';
import './Layout.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaHome /> },
    { path: '/accounts', name: 'My Accounts', icon: <FaMoneyBill /> },
    { path: '/accounts/create', name: 'Open Account', icon: <FaPlus /> },
    { path: '/profile', name: 'Profile', icon: <FaUserCircle /> },
  ];

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
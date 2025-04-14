import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../ui/Icon';
import './Sidebar.scss';

const Sidebar = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/books', label: 'All Books', icon: 'book' },
  ];

  const protectedItems = currentUser ? [
    { path: '/cart', label: 'My Cart', icon: 'cart' },
    { path: '/orders', label: 'My Orders', icon: 'receipt' },
    { path: '/profile', label: 'My Profile', icon: 'user' },
  ] : [];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      {currentUser && (
        <div className="user-profile">
          <div className="avatar">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <h4>{currentUser.name}</h4>
            <p>{currentUser.email}</p>
          </div>
        </div>
      )}
      
      <nav className="sidebar-nav">
        <ul>
          {[...navItems, ...protectedItems].map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <Icon name={item.icon} className="nav-icon" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <Link to="/contact" className="help-link">
          <Icon name="help-circle" />
          Need help?
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
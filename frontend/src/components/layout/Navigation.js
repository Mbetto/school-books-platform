import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import './Navigation.scss';

const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/books', label: 'Books' },
  ];

  const authItems = currentUser
    ? [
        { path: '/profile', label: 'Profile' },
        { path: '/orders', label: 'Orders' },
        { action: logout, label: 'Logout' }
      ]
    : [
        { path: '/login', label: 'Login' },
        { path: '/register', label: 'Register' }
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">SchoolBooks</Link>
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="main-nav">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={isActive(item.path) ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="auth-nav">
            {authItems.map((item, index) => (
              <li key={index}>
                {item.path ? (
                  <Link 
                    to={item.path} 
                    className={isActive(item.path) ? 'active' : ''}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Button 
                    variant="text" 
                    onClick={() => {
                      item.action();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <Icon name={isMobileMenuOpen ? 'close' : 'menu'} />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
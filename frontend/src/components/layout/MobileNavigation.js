/**
 * Mobile navigation component that appears at bottom of screen on mobile devices
 * Provides quick access to main navigation items
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon,
  Book as BookIcon,
  Info as AboutIcon,
  Mail as ContactIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';
import './MobileNavigation.scss';

const MobileNavigation = () => {
  const location = useLocation();

  // Check if current path matches nav item
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="mobile-navigation">
      <ul className="mobile-navigation__list">
        <li className="mobile-navigation__item">
          <Link 
            to="/" 
            className={`mobile-navigation__link ${isActive('/') ? 'active' : ''}`}
          >
            <HomeIcon className="mobile-navigation__icon" />
            <span className="mobile-navigation__label">Home</span>
          </Link>
        </li>
        <li className="mobile-navigation__item">
          <Link 
            to="/books" 
            className={`mobile-navigation__link ${isActive('/books') ? 'active' : ''}`}
          >
            <BookIcon className="mobile-navigation__icon" />
            <span className="mobile-navigation__label">Books</span>
          </Link>
        </li>
        <li className="mobile-navigation__item">
          <Link 
            to="/about" 
            className={`mobile-navigation__link ${isActive('/about') ? 'active' : ''}`}
          >
            <AboutIcon className="mobile-navigation__icon" />
            <span className="mobile-navigation__label">About</span>
          </Link>
        </li>
        <li className="mobile-navigation__item">
          <Link 
            to="/contact" 
            className={`mobile-navigation__link ${isActive('/contact') ? 'active' : ''}`}
          >
            <ContactIcon className="mobile-navigation__icon" />
            <span className="mobile-navigation__label">Contact</span>
          </Link>
        </li>
        <li className="mobile-navigation__item">
          <Link 
            to="/account" 
            className={`mobile-navigation__link ${isActive('/account') ? 'active' : ''}`}
          >
            <AccountIcon className="mobile-navigation__icon" />
            <span className="mobile-navigation__label">Account</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;
import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary',
  className = '' 
}) => {
  const sizeMap = {
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  };

  const colorMap = {
    primary: '#007bff',
    secondary: '#6c757d',
    light: '#f8f9fa',
    dark: '#343a40'
  };

  return (
    <div className={`loading-spinner ${className}`}>
      <div 
        className="spinner" 
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          borderColor: colorMap[color],
          borderTopColor: 'transparent'
        }}
      ></div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'light', 'dark']),
  className: PropTypes.string
};

export default LoadingSpinner;
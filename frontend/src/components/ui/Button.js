import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import './Button.scss';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  type = 'button',
  className = '',
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
        button 
        button--${variant} 
        button--${size} 
        ${loading ? 'button--loading' : ''} 
        ${fullWidth ? 'button--full-width' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="small" />}
      {icon && iconPosition === 'left' && (
        <span className="button__icon button__icon--left">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="button__icon button__icon--right">{icon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

export default Button;
import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../Spinner';
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
        btn 
        btn--${variant} 
        btn--${size} 
        ${loading ? 'btn--loading' : ''} 
        ${fullWidth ? 'btn--full-width' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className="btn__spinner">
          <Spinner size={size === 'large' ? 'medium' : 'small'} />
        </span>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="btn__icon btn__icon--left">{icon}</span>
      )}
      <span className="btn__content">{children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="btn__icon btn__icon--right">{icon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    'primary', 
    'secondary', 
    'tertiary',
    'danger', 
    'success',
    'outline',
    'ghost'
  ]),
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
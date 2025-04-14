import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  icon,
  helperText,
  disabled = false,
  ...props
}) => {
  return (
    <div className={`input-group ${className} ${error ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${icon ? 'with-icon' : ''}`}
          disabled={disabled}
          {...props}
        />
      </div>
      
      {helperText && !error && (
        <p className="helper-text">{helperText}</p>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
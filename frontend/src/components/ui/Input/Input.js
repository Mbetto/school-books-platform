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
  success,
  ...props
}) => {
  const inputId = `${name}-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`input ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      
      <div className={`
        input__wrapper
        ${error ? 'input__wrapper--error' : ''}
        ${success ? 'input__wrapper--success' : ''}
        ${disabled ? 'input__wrapper--disabled' : ''}
      `}>
        {icon && <span className="input__icon">{icon}</span>}
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input__field"
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
      </div>
      
      {helperText && !error && (
        <p className="input__helper-text">{helperText}</p>
      )}
      
      {error && (
        <p id={`${inputId}-error`} className="input__error-message">
          {error}
        </p>
      )}
      
      {success && !error && (
        <p className="input__success-message">{success}</p>
      )}
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
  success: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
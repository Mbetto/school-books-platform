import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../Icon';
import './Alert.scss';

const Alert = ({ 
  message, 
  type = 'info', 
  onClose, 
  icon,
  className = '',
  dismissible = true,
  autoDismiss = false,
  autoDismissTimeout = 5000
}) => {
  const alertRef = React.useRef();

  React.useEffect(() => {
    if (autoDismiss && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoDismissTimeout);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, autoDismissTimeout, onClose]);

  return (
    <div 
      ref={alertRef}
      className={`alert alert--${type} ${className}`}
      role="alert"
      aria-live="assertive"
    >
      {icon && <span className="alert__icon">{icon}</span>}
      <span className="alert__message">{message}</span>
      {dismissible && onClose && (
        <button 
          className="alert__close" 
          onClick={onClose}
          aria-label="Dismiss alert"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func,
  icon: PropTypes.node,
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  autoDismiss: PropTypes.bool,
  autoDismissTimeout: PropTypes.number,
};

export default Alert;
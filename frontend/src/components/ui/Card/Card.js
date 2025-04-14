import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

const Card = ({ 
  title, 
  children, 
  className = '',
  variant = 'default',
  header,
  footer,
  hoverable = false,
  ...props
}) => {
  return (
    <div 
      className={`
        card 
        card--${variant} 
        ${hoverable ? 'card--hoverable' : ''} 
        ${className}
      `}
      {...props}
    >
      {(header || title) && (
        <div className="card__header">
          {header || <h3 className="card__title">{title}</h3>}
        </div>
      )}
      <div className="card__body">
        {children}
      </div>
      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'flat']),
  header: PropTypes.node,
  footer: PropTypes.node,
  hoverable: PropTypes.bool,
};

export default Card;
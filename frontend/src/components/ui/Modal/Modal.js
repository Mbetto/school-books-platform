import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'; // Updated import path
import { Icon } from '../Icon';
import './Modal.scss';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = '',
  size = 'medium',
  preventScroll = true,
  ariaLabel,
  overlayClassName = ''
}) => {
  const modalRef = useRef();
  const lastFocusedElement = useRef(null);
  
  // Only use click outside handler if closeOnOverlayClick is true
  useOnClickOutside(modalRef, closeOnOverlayClick ? onClose : () => {});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      // Save last focused element
      lastFocusedElement.current = document.activeElement;
      
      // Prevent body scroll
      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }
      
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      // Restore body scroll
      if (preventScroll) {
        document.body.style.overflow = '';
      }
      
      // Return focus to last focused element
      if (lastFocusedElement.current) {
        lastFocusedElement.current.focus();
      }
      
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, preventScroll]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className={`modal-overlay ${overlayClassName}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-label={ariaLabel}
    >
      <div 
        ref={modalRef}
        className={`modal modal--${size} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="modal__header">
            {title && (
              <h2 id="modal-title" className="modal__title">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button 
                className="modal__close" 
                onClick={onClose}
                aria-label="Close modal"
              >
                <Icon name="close" size={20} />
              </button>
            )}
          </div>
        )}
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  preventScroll: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

Modal.defaultProps = {
  size: 'medium',
  preventScroll: true,
  closeOnOverlayClick: true,
  showCloseButton: true,
};

export default Modal;
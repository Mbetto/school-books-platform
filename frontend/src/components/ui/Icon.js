import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, size = 24, color = 'black', className = '', ...props }) => {
    return (
        <svg
            className={`icon ${className}`}
            width={size}
            height={size}
            fill={color}
            aria-hidden="true"
            {...props}
        >
            <use xlinkHref={`#${name}`} />
        </svg>
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
};

export default Icon;
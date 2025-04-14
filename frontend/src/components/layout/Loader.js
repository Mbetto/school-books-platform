import React from 'react';
import './Loader.css'; // Optional: Add styles for the loader

const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loader;
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>404 - Page Not Found</h1>
            <p style={styles.text}>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" style={styles.link}>Go back to Home</Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    header: {
        fontSize: '2.5rem',
        color: '#333',
    },
    text: {
        fontSize: '1.2rem',
        color: '#666',
    },
    link: {
        marginTop: '20px',
        display: 'inline-block',
        fontSize: '1rem',
        color: '#007BFF',
        textDecoration: 'none',
    },
};

export default NotFoundPage;
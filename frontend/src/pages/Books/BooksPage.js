import React, { useState, useEffect } from 'react';
import { Box, Grid, Alert } from '@mui/material';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import BookCard from './BookCard';
import api from '../../utils/api';  // Fixed import path
import './BooksPage.scss';  // Changed from BooksList.scss to BooksPage.scss

const BooksList = ({ onBookSelect }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/books');
                setBooks(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <LoadingSpinner fullPage />;  // Using the LoadingSpinner component
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box className="books-list-container">
            <Grid container spacing={3}>
                {books.map((book) => (
                    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                        <BookCard 
                            book={book} 
                            onClick={() => onBookSelect(book)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BooksList;
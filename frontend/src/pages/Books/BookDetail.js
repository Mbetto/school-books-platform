import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Box, Typography, Button, CircularProgress, Alert, Chip, Stack, 
    Breadcrumbs, Link, Divider, Rating
} from '@mui/material';
import useBooks from '../../hooks/useBooks'; // Changed from named import to default import
import api from '../../utils/api';
import './BookDetail.scss';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [book, setBook] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [quantity, setQuantity] = React.useState(1);
    const { addToCart } = useBooks(); // Now using the default import

    React.useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await api.get(`/books/${id}`);
                setBook(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await addToCart({ 
                bookId: book.id, 
                quantity,
                price: book.price 
            });
            navigate('/cart');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add to cart');
        }
    };

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!book) return <Alert severity="info">Book not found</Alert>;

    return (
        <Box className="book-detail-container">
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Link color="inherit" href="/books">
                    Books
                </Link>
                <Typography color="text.primary">{book.title}</Typography>
            </Breadcrumbs>

            <Box className="book-detail">
                <Box className="book-image">
                    <img 
                        src={book.imageUrl || '/book-placeholder.jpg'} 
                        alt={book.title} 
                        className="book-main-image"
                    />
                </Box>
                <Box className="book-info">
                    <Typography variant="h4" component="h1" gutterBottom>
                        {book.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        by {book.author}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={book.rating || 0} precision={0.5} readOnly />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            ({book.reviewCount || 0} reviews)
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                        <Chip label={book.category} color="primary" />
                        <Chip label={`${book.pages} pages`} />
                        <Chip label={`Published: ${new Date(book.publishedDate).getFullYear()}`} />
                    </Stack>

                    <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                        {book.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h4" sx={{ mb: 3 }}>
                        ${book.price.toFixed(2)}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Typography>Quantity:</Typography>
                        <input 
                            type="number" 
                            min="1" 
                            max="10" 
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Math.min(10, e.target.value)))}
                            className="quantity-input"
                        />
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleAddToCart}
                        sx={{ px: 4, mb: 2 }}
                        fullWidth
                    >
                        Add to Cart
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate(-1)}
                        sx={{ px: 4 }}
                        fullWidth
                    >
                        Back to Books
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default BookDetail;
import React from 'react';
import { Box, Typography, Chip, Rating, Button, Stack } from '@mui/material';
import { 
  School, Bookmark, Download, ShoppingCart, Share, 
  Favorite, FavoriteBorder 
} from '@mui/icons-material';
import './BookDetailHeader.scss';

const BookDetailHeader = ({ 
  book, 
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onDownload
}) => {
  return (
    <Box className="book-detail-header">
      <Box className="book-cover-container">
        <img 
          src={book.imageUrl || '/assets/images/book-placeholder.png'} 
          alt={`${book.title} cover`} 
          className="book-cover"
          loading="lazy"
        />
        {book.isNew && (
          <Chip 
            label="NEW" 
            color="primary" 
            size="small" 
            className="new-badge"
          />
        )}
      </Box>

      <Box className="book-info">
        <Typography variant="h3" className="book-title">
          {book.title}
        </Typography>
        
        <Typography variant="subtitle1" className="book-author">
          by {book.author}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ my: 2 }}>
          {book.grade && (
            <Chip 
              icon={<School fontSize="small" />}
              label={book.grade}
              color="secondary"
            />
          )}
          {book.subject && (
            <Chip label={book.subject} />
          )}
        </Stack>

        <Box className="rating-container">
          <Rating 
            value={book.rating || 0} 
            precision={0.5} 
            readOnly 
            size="medium"
          />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({book.reviewCount || 0} reviews)
          </Typography>
        </Box>

        <Typography variant="h4" className="book-price" sx={{ my: 2 }}>
          KES {book.price?.toLocaleString() || 'Free'}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={book.price > 0 ? <ShoppingCart /> : <Download />}
            onClick={book.price > 0 ? onAddToCart : onDownload}
          >
            {book.price > 0 ? 'Add to Cart' : 'Download Now'}
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
            onClick={onToggleFavorite}
            color={isFavorite ? "error" : "inherit"}
          >
            {isFavorite ? 'Saved' : 'Save'}
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            startIcon={<Share />}
          >
            Share
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BookDetailHeader;
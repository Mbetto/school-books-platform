import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box, Typography, Button, Chip, Stack, Rating,
  Skeleton, useMediaQuery
} from '@mui/material';
import { 
  School, Bookmark, Star, Download, ShoppingCart,
  Visibility, Share, Pages
} from '@mui/icons-material';
import './BookPreview.scss';

const BookPreview = ({ 
  title, 
  author, 
  coverImage, 
  description,
  grade,
  categories = [],
  pages,
  rating,
  reviewCount,
  viewCount,
  price,
  isRecommended,
  loading = false,
  onDownload,
  onAddToCart
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  if (loading) {
    return (
      <Box className="book-preview loading">
        <Skeleton variant="rectangular" height={200} />
        <Box sx={{ p: 2 }}>
          <Skeleton width="60%" height={32} />
          <Skeleton width="40%" height={24} sx={{ mt: 1 }} />
          <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
          </Box>
          <Skeleton width="100%" height={72} />
          <Skeleton width="30%" height={36} sx={{ mt: 2 }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box className="book-preview">
      <Box className="preview-header">
        <Box className="book-cover-container">
          <img 
            src={coverImage || '/assets/images/book-placeholder.png'} 
            alt={`${title} cover`} 
            className="book-cover" 
          />
          {isRecommended && (
            <Bookmark className="recommended-badge" color="secondary" />
          )}
        </Box>

        <Box className="book-meta">
          <Typography variant="h5" className="book-title" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" className="book-author" gutterBottom>
            {author}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: '8px' }}>
            {grade && (
              <Chip 
                icon={<School fontSize="small" />}
                label={grade}
                size="small"
                color="secondary"
              />
            )}
            {categories.slice(0, 2).map(category => (
              <Chip 
                key={category} 
                label={category} 
                size="small" 
                color="primary"
              />
            ))}
            {pages && (
              <Chip 
                icon={<Pages fontSize="small" />}
                label={`${pages} pages`}
                size="small"
                variant="outlined"
              />
            )}
          </Stack>

          <Box className="rating-container">
            <Rating 
              value={rating || 0} 
              precision={0.5} 
              readOnly 
              size="medium"
              emptyIcon={<Star fontSize="inherit" style={{ opacity: 0.5 }} />}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({reviewCount || 0} reviews)
            </Typography>
            {viewCount > 1000 && (
              <Typography variant="body2" sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                <Visibility fontSize="small" sx={{ mr: 0.5 }} />
                {(viewCount / 1000).toFixed(1)}k views
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Typography variant="body1" className="book-description">
        {description || 'No description available.'}
      </Typography>

      <Box className="preview-footer">
        <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
          {price ? `KES ${price.toLocaleString()}` : 'Free'}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            startIcon={<Share />}
            size={isMobile ? 'small' : 'medium'}
          >
            Share
          </Button>
          <Button 
            variant="contained" 
            color={price ? 'primary' : 'success'}
            startIcon={price ? <ShoppingCart /> : <Download />}
            onClick={price ? onAddToCart : onDownload}
            size={isMobile ? 'small' : 'medium'}
          >
            {price ? 'Add to Cart' : 'Download Now'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

BookPreview.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  coverImage: PropTypes.string,
  description: PropTypes.string,
  grade: PropTypes.string,
  categories: PropTypes.array,
  pages: PropTypes.number,
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
  viewCount: PropTypes.number,
  price: PropTypes.number,
  isRecommended: PropTypes.bool,
  loading: PropTypes.bool,
  onDownload: PropTypes.func,
  onAddToCart: PropTypes.func
};

export default BookPreview;
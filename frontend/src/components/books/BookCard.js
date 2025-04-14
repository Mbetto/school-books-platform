import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardMedia, CardContent, CardActions, 
  Typography, Button, Chip, Stack, Tooltip, Badge, Box, Rating, IconButton,
  Skeleton, useMediaQuery, ThemeProvider, createTheme
} from '@mui/material';
import {
  ShoppingCart,
  Download,
  Favorite,
  FavoriteBorder,
  School,
  Bookmark,
  Star,
  Visibility,
  Share
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import './BookCard.scss';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    left: 10,
    top: 10,
    padding: '0 4px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
}));

const BookCard = ({ 
  book, 
  onAddToCart, 
  onToggleFavorite,
  onShare,
  isFavorite = false,
  showActions = true,
  layout = 'grid',
  loading = false
}) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleViewDetails = () => {
    navigate(`/books/${book.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart?.(book);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(book.id);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    onShare?.(book);
  };

  const cardClasses = `book-card ${layout === 'list' ? 'list-view' : ''} ${loading ? 'loading' : ''}`;

  if (loading) {
    return (
      <Card className={cardClasses} elevation={layout === 'list' ? 0 : 3}>
        <Skeleton variant="rectangular" height={layout === 'list' ? 160 : 200} />
        <CardContent>
          <Skeleton width="60%" />
          <Skeleton width="40%" />
          <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
          </Box>
          <Skeleton width="30%" />
        </CardContent>
        {showActions && (
          <CardActions>
            <Skeleton width="100%" height={36} />
          </CardActions>
        )}
      </Card>
    );
  }

  return (
    <Card className={cardClasses} elevation={layout === 'list' ? 0 : 3} onClick={handleViewDetails}>
      <StyledBadge 
        badgeContent={book.isNew ? "NEW" : 0} 
        color="primary"
        invisible={!book.isNew}
      >
        <CardMedia
          component="img"
          height={layout === 'list' ? '160' : '200'}
          image={book.imageUrl || '/assets/images/book-placeholder.png'}
          alt={book.title}
          loading="lazy"
          className="book-image"
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        {!imageLoaded && (
          <Skeleton variant="rectangular" height={layout === 'list' ? 160 : 200} />
        )}
      </StyledBadge>

      <CardContent className="book-content">
        <Typography gutterBottom variant={layout === 'list' ? "h5" : "h6"} component="h3" noWrap>
          {book.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} noWrap>
          {book.author}
        </Typography>

        {layout === 'list' && (
          <Typography variant="body2" sx={{ mb: 2 }} className="book-description">
            {book.shortDescription || book.description?.substring(0, 150) + '...'}
          </Typography>
        )}

        <Stack direction="row" spacing={1} sx={{ my: 1, flexWrap: 'wrap', gap: '8px' }}>
          {book.grade && (
            <Chip 
              icon={<School fontSize="small" />}
              label={book.grade}
              size="small"
              color="secondary"
            />
          )}
          {book.categories?.slice(0, 2).map(category => (
            <Chip 
              key={category} 
              label={category} 
              size="small" 
              color="primary"
            />
          ))}
          {book.pages && (
            <Chip 
              label={`${book.pages} pages`}
              size="small"
              variant="outlined"
            />
          )}
        </Stack>

        <Box className="rating-container">
          <Rating 
            value={book.rating || 0} 
            precision={0.5} 
            readOnly 
            size="small"
            emptyIcon={<Star fontSize="inherit" style={{ opacity: 0.5 }} />}
          />
          <Typography variant="caption" sx={{ ml: 1 }}>
            ({book.reviewCount || 0} reviews)
          </Typography>
          {book.viewCount > 1000 && (
            <Typography variant="caption" sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
              <Visibility fontSize="inherit" sx={{ mr: 0.5 }} />
              {(book.viewCount / 1000).toFixed(1)}k
            </Typography>
          )}
        </Box>

        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 2
        }}>
          <Typography variant="h6" color="primary">
            KES {book.price?.toLocaleString() || 'Free'}
          </Typography>
          
          {book.isRecommended && (
            <Tooltip title="Recommended for your grade">
              <Bookmark color="secondary" />
            </Tooltip>
          )}
        </Box>
      </CardContent>

      {showActions && (
        <CardActions className="action-buttons">
          <Button 
            size="small" 
            color="primary"
            variant="contained"
            startIcon={book.price > 0 ? <ShoppingCart /> : <Download />}
            onClick={handleAddToCart}
            fullWidth={layout === 'list' && !isMobile}
            sx={{ flexGrow: 1 }}
          >
            {book.price > 0 ? 'Add to Cart' : 'Download'}
          </Button>
          
          <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <IconButton onClick={handleToggleFavorite} color={isFavorite ? "error" : "default"}>
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Share">
            <IconButton onClick={handleShare}>
              <Share fontSize="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
};

export default BookCard;
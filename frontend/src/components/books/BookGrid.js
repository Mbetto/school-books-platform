import React from 'react';
import { 
  Grid, Box, Typography, Button, CircularProgress, Stack,
  Alert, Pagination, Skeleton, useMediaQuery
} from '@mui/material';
import BookCard from './BookCard';

const BookGrid = ({
  books, 
  layout = 'grid', 
  loading = false,
  error = null,
  onAddToCart, 
  onToggleFavorite, 
  onShare,
  favorites,
  onLoadMore, 
  hasMore,
  pagination = null,
  onPageChange,
  skeletonCount = 8
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  if (loading && books.length === 0) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Grid
            item
            key={`skeleton-${index}`}
            xs={12}
            sm={layout === 'grid' ? 6 : 12}
            md={layout === 'grid' ? 4 : 12}
            lg={layout === 'grid' ? 3 : 12}
          >
            <BookCard loading />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 4 }}>
        Error loading books: {error.message}
        <Button 
          onClick={onLoadMore} 
          sx={{ mt: 1 }}
          size="small"
        >
          Try Again
        </Button>
      </Alert>
    );
  }

  if (books.length === 0) {
    return (
      <Box sx={{ 
        py: 4,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <Typography variant="h6">
          No resources found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your search or filters
        </Typography>
        <Button 
          variant="outlined" 
          onClick={onResetFilters}
          startIcon={<Clear />}
        >
          Reset Filters
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid
            item
            key={book.id}
            xs={12}
            sm={layout === 'grid' ? 6 : 12}
            md={layout === 'grid' ? 4 : 12}
            lg={layout === 'grid' ? 3 : 12}
          >
            <BookCard
              book={book}
              isFavorite={favorites.includes(book.id)}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
              onShare={onShare}
              layout={isMobile ? 'grid' : layout}
            />
          </Grid>
        ))}
      </Grid>

      {/* Loading more indicator */}
      {loading && books.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Pagination */}
      {pagination && (
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
            showFirstButton
            showLastButton
            siblingCount={isMobile ? 0 : 1}
          />
        </Stack>
      )}

      {/* Load More (for infinite scroll) */}
      {hasMore && !pagination && (
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <Button 
            onClick={onLoadMore} 
            variant="outlined"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{ minWidth: 200 }}
          >
            {loading ? 'Loading...' : 'Load More Resources'}
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default BookGrid;
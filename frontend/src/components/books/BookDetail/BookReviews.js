import React from 'react';
import { 
  Box, Typography, Rating, Avatar, Divider, 
  TextField, Button, Paper, Stack 
} from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';

const BookReviews = ({ reviews = [], onAddReview }) => {
  const [newReview, setNewReview] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmitReview = () => {
    if (newReview.trim() && rating > 0) {
      setIsSubmitting(true);
      onAddReview?.({
        rating,
        comment: newReview
      }).finally(() => {
        setIsSubmitting(false);
        setNewReview('');
        setRating(0);
      });
    }
  };

  return (
    <Box className="book-reviews">
      {reviews.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No reviews yet. Be the first to review!
        </Typography>
      ) : (
        <Stack spacing={3}>
          {reviews.map((review, index) => (
            <Paper key={index} elevation={0} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2 }}>
                  {review.user?.name?.[0] || <AccountCircle />}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {review.user?.name || 'Anonymous'}
                  </Typography>
                  <Rating 
                    value={review.rating} 
                    precision={0.5} 
                    readOnly 
                    size="small"
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                  {new Date(review.date).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {review.comment}
              </Typography>
              {index < reviews.length - 1 && <Divider />}
            </Paper>
          ))}
        </Stack>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Write a Review
        </Typography>
        <Rating
          value={rating}
          onChange={(_, value) => setRating(value)}
          precision={0.5}
          size="large"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Share your thoughts about this resource..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          startIcon={<Send />}
          onClick={handleSubmitReview}
          disabled={isSubmitting || !newReview.trim() || rating === 0}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </Box>
    </Box>
  );
};

export default BookReviews;
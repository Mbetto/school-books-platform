import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Rating, Chip, Box } from '@mui/material';
import { Book as BookIcon, MonetizationOn, School } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="div"
        sx={{
          pt: '56.25%',
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BookIcon fontSize="large" color="action" />
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By {book.author}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
          <Rating value={book.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({book.rating})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip icon={<School />} label={book.grade} size="small" />
          <Chip label={book.subject} size="small" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="primary">
            KES {book.price}
          </Typography>
          <Button
            component={Link}
            to={`/book/${book.id}`}
            variant="contained"
            size="small"
            color="primary"
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;
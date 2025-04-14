import React from 'react';
import { Container, Grid, Typography, Button, Paper } from '@mui/material';
import { Book, School, Assignment, Quiz } from '@mui/icons-material';
import BookCard from '../components/books/BookCard';

const Home = () => {
  const featuredBooks = [
    {
      id: 1,
      title: 'Mathematics Form 1 Notes',
      author: 'Mr. Johnson',
      grade: 'Junior Secondary',
      subject: 'Mathematics',
      price: 150,
      previewUrl: '/sample1.pdf',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'English Primary Notes',
      author: 'Ms. Wanjiku',
      grade: 'Primary',
      subject: 'English',
      price: 100,
      previewUrl: '/sample2.pdf',
      rating: 4.2,
    },
    {
      id: 3,
      title: 'Science Revision Papers',
      author: 'Dr. Smith',
      grade: 'Senior Secondary',
      subject: 'Science',
      price: 200,
      previewUrl: '/sample3.pdf',
      rating: 4.7,
    },
  ];

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, my: 4, textAlign: 'center', background: 'linear-gradient(45deg, #6a1b9a 30%, #9c27b0 90%)', color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Quality Educational Resources
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Access textbooks, notes, exam papers and solutions for all grades
        </Typography>
        <Button variant="contained" color="secondary" size="large" sx={{ mt: 3 }}>
          Browse Resources
        </Button>
      </Paper>

      <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
        Categories
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <School fontSize="large" color="primary" />
            <Typography variant="h6" component="h3" sx={{ mt: 1 }}>
              Primary School
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Comprehensive notes for all primary school subjects
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <School fontSize="large" color="primary" />
            <Typography variant="h6" component="h3" sx={{ mt: 1 }}>
              Junior Secondary
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Detailed notes and exam papers for junior secondary
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <School fontSize="large" color="primary" />
            <Typography variant="h6" component="h3" sx={{ mt: 1 }}>
              Senior Secondary
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Advanced materials for KCSE preparation
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Assignment fontSize="large" color="primary" />
            <Typography variant="h6" component="h3" sx={{ mt: 1 }}>
              Exam Papers
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Past papers with marking schemes
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
        Featured Resources
      </Typography>
      <Grid container spacing={3}>
        {featuredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ p: 4, my: 4, textAlign: 'center' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Are you a tutor or content creator?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Join our platform and start earning by sharing your educational materials
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
          Become a Tutor
        </Button>
      </Paper>
    </Container>
  );
};

export default Home;
// HomePage.js
import React from 'react';
import { Box, Container, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import HeroImage from '../../assets/images/hero-image.jpg'; // Updated import path
import './HomePage.scss';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Box className="home-page">
      <Box 
        className="hero-section" 
        sx={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 10,
          textAlign: 'center',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to the School Books Platform
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Browse our extensive collection of books from all genres
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => isAuthenticated ? navigate('/books') : navigate('/register')}
            sx={{ 
              mt: 3,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            {isAuthenticated ? 'Browse Books' : 'Get Started'}
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Featured Categories
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3,
          mt: 6
        }}>
          {['Fiction', 'Science', 'History', 'Biography'].map(category => (
            <Box 
              key={category} 
              className="category-card"
              onClick={() => navigate(`/books?category=${category.toLowerCase()}`)}
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                boxShadow: 2,
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4
                }
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>{category}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            How It Works
          </Typography>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mt: 6
          }}>
            {[
              { title: 'Browse', desc: 'Explore our collection of books' },
              { title: 'Select', desc: 'Choose the books you want' },
              { title: 'Enjoy', desc: 'Start reading immediately' }
            ].map((step, index) => (
              <Box key={step.title} textAlign="center" sx={{ px: 2 }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', mb: 2 }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
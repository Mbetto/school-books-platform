/**
 * Global footer component with:
 * - Platform information
 * - Quick links
 * - Payment methods
 * - Copyright and legal links
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography } from '@mui/material';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4,
        px: 2,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Platform information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              School Books Platform
            </Typography>
            <Typography variant="body2">
              Quality educational resources for primary and secondary students
            </Typography>
          </Grid>
          
          {/* Quick links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <li>
                <Link to="/books" className="footer-link">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
            </Box>
          </Grid>
          
          {/* Payment methods */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Payment Methods
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Box 
                component="span" 
                className="payment-method"
                aria-label="M-Pesa"
              >
                M-Pesa
              </Box>
              <Box 
                component="span" 
                className="payment-method"
                aria-label="Visa"
              >
                Visa
              </Box>
              <Box 
                component="span" 
                className="payment-method"
                aria-label="Mastercard"
              >
                Mastercard
              </Box>
              <Box 
                component="span" 
                className="payment-method"
                aria-label="PayPal"
              >
                PayPal
              </Box>
            </Box>
          </Grid>
          
          {/* Contact info */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" component="address">
              Email: info@schoolbooks.com<br />
              Phone: +254 700 123456<br />
              Nairobi, Kenya
            </Typography>
          </Grid>
        </Grid>
        
        {/* Copyright and legal links */}
        <Box 
          sx={{ 
            mt: 4,
            pt: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2">
            &copy; {currentYear} School Books Platform. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer-link">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
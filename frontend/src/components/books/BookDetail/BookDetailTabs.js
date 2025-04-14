import React, { useState } from 'react';
import { 
  Box, Tab, Tabs, Typography, Button, 
  List, ListItem, ListItemText, Divider, Chip
} from '@mui/material';
import {
  Description, Info, Reviews, LibraryBooks,
  Download, ShoppingCart, Share
} from '@mui/icons-material';
import BookReviews from './BookDetail/BookReviews';
import RelatedBooks from './RelatedBooks';
import './BookDetailTabs.scss';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`book-tabpanel-${index}`}
      aria-labelledby={`book-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const BookDetailTabs = ({ 
  book, 
  relatedBooks = [],
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onDownload
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="book-detail-tabs">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          variant="scrollable" 
          scrollButtons="auto"
        >
          <Tab label="Description" icon={<Description />} iconPosition="start" />
          <Tab label="Details" icon={<Info />} iconPosition="start" />
          <Tab label="Reviews" icon={<Reviews />} iconPosition="start" />
          <Tab label="Related" icon={<LibraryBooks />} iconPosition="start" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Typography variant="body1" paragraph>
          {book.description || "No description available."}
        </Typography>
        
        {book.keyFeatures && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Key Features:
            </Typography>
            <List dense>
              {book.keyFeatures.map((feature, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText primary={`• ${feature}`} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <List>
          <ListItem>
            <ListItemText 
              primary="Publisher" 
              secondary={book.publisher || "N/A"} 
            />
          </ListItem>
          <Divider component="li" />
          
          <ListItem>
            <ListItemText 
              primary="Pages" 
              secondary={book.pages || "N/A"} 
            />
          </ListItem>
          <Divider component="li" />
          
          <ListItem>
            <ListItemText 
              primary="Language" 
              secondary={book.language || "N/A"} 
            />
          </ListItem>
          <Divider component="li" />
          
          <ListItem>
            <ListItemText 
              primary="ISBN" 
              secondary={book.isbn || "N/A"} 
            />
          </ListItem>
          <Divider component="li" />
          
          <ListItem>
            <ListItemText 
              primary="Resource Type" 
              secondary={
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  {book.categories?.map(category => (
                    <Chip key={category} label={category} size="small" />
                  ))}
                </Stack>
              } 
            />
          </ListItem>
        </List>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <BookReviews reviews={book.reviews || []} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <RelatedBooks 
          books={relatedBooks} 
          currentBookId={book.id}
        />
      </TabPanel>

      <Box sx={{ 
        position: 'sticky', 
        bottom: 0, 
        bgcolor: 'background.paper',
        p: 2, 
        boxShadow: 3,
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'space-between',
        gap: 2
      }}>
        <Button
          variant="contained"
          size="large"
          startIcon={book.price > 0 ? <ShoppingCart /> : <Download />}
          onClick={book.price > 0 ? onAddToCart : onDownload}
          fullWidth
        >
          {book.price > 0 ? 'Add to Cart' : 'Download'}
        </Button>
        
        <Button
          variant={isFavorite ? "contained" : "outlined"}
          size="large"
          startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
          onClick={onToggleFavorite}
          color={isFavorite ? "error" : "inherit"}
        >
          {isFavorite ? 'Saved' : 'Save'}
        </Button>
      </Box>
    </Box>
  );
};

export default BookDetailTabs;
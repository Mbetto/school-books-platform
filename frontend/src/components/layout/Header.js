/**
 * Main header component with:
 * - Logo/branding
 * - Search functionality
 * - Dark mode toggle
 * - User account menu
 */
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Switch, Box, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Search as SearchIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = ({ darkMode, setDarkMode }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  // Handle user menu open
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle user menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle logout action
  const handleLogout = () => {
    // TODO: Implement actual logout logic
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        {/* Mobile menu button (hidden on larger screens) */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Brand/logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            SchoolBooks
          </Link>
        </Typography>
        
        {/* Search bar (hidden on mobile) */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <SearchBar />
        </Box>
        
        {/* Dark mode toggle */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          ml: 2,
          '& .MuiTypography-root': {
            display: { xs: 'none', sm: 'block' }
          }
        }}>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            color="secondary"
            inputProps={{ 'aria-label': 'Dark mode toggle' }}
          />
          <Typography variant="body2">
            {darkMode ? 'Dark' : 'Light'}
          </Typography>
        </Box>
        
        {/* User account menu */}
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}>
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => { navigate('/tutor'); handleClose(); }}>
              Tutor Portal
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
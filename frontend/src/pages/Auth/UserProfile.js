import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Box, Typography, Avatar, CircularProgress, Alert, Button, TextField } from '@mui/material';
import api from '../../utils/api';
import './UserProfile.scss';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/me');
        setProfile(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          bio: response.data.bio || ''
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch('/users/me', formData);
      setProfile(response.data);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box className="user-profile-container">
      <Box className="profile-header">
        <Avatar 
          src={profile?.avatar} 
          sx={{ width: 120, height: 120, mb: 2 }}
        />
        {!editMode ? (
          <>
            <Typography variant="h4">{profile?.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {profile?.email}
            </Typography>
            {profile?.bio && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                {profile.bio}
              </Typography>
            )}
            <Button 
              variant="outlined" 
              sx={{ mt: 3 }}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="bio"
              label="Bio"
              multiline
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Box sx={{ mt: 2 }}>
              <Button 
                type="submit" 
                variant="contained"
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button 
                variant="outlined"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Box>
      <Button 
        color="error" 
        sx={{ mt: 4 }}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default UserProfile;
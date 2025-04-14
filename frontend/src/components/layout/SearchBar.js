import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Divider, MenuItem, Select, FormControl, Box, Tooltip } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/browse?search=${encodeURIComponent(searchTerm)}&grade=${grade}&subject=${subject}`);
  };

  const handleClear = () => {
    setSearchTerm('');
    setGrade('');
    setSubject('');
  };

  return (
    <Paper
      component="form"
      sx={{ p: 1, display: 'flex', alignItems: 'center', width: '100%', maxWidth: 600 }}
      onSubmit={handleSearch}
    >
      {/* Search Input */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search books, notes, exams..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        inputProps={{ 'aria-label': 'Search content' }}
      />
      {searchTerm && (
        <Tooltip title="Clear">
          <IconButton onClick={handleClear} sx={{ p: '10px' }} aria-label="clear search">
            <ClearIcon />
          </IconButton>
        </Tooltip>
      )}
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
      {/* Filters */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <FormControl size="small" sx={{ minWidth: 130, flex: 1 }}>
          <Select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Filter by grade' }}
          >
            <MenuItem value="">All Grades</MenuItem>
            <MenuItem value="primary">Primary</MenuItem>
            <MenuItem value="junior">Junior Secondary</MenuItem>
            <MenuItem value="senior">Senior Secondary</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" sx={{ minWidth: 130, flex: 1 }}>
          <Select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Filter by subject' }}
          >
            <MenuItem value="">All Subjects</MenuItem>
            <MenuItem value="math">Mathematics</MenuItem>
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="science">Science</MenuItem>
            <MenuItem value="history">History</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default SearchBar;

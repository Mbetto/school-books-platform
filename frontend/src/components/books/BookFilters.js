import React, { useState, useEffect } from 'react';
import {
  Box, TextField, MenuItem, Slider,
  Typography, Stack, Chip, Button, ToggleButtonGroup, ToggleButton,
  Accordion, AccordionSummary, AccordionDetails, Divider,
  useMediaQuery, IconButton, Popover, Badge
} from '@mui/material';
import { 
  FilterList, GridView, ViewList, ExpandMore,
  Search, Clear, PriceChange, Star, Sort,
  Tune, CheckCircle
} from '@mui/icons-material';
import { debounce } from 'lodash';
import './BookFilters.scss';

const BookFilters = ({
  categories = [],
  grades = [],
  subjects = [],
  selectedCategories = [],
  selectedGrades = [],
  selectedSubjects = [],
  priceRange = [0, 1000],
  sortOption = 'newest',
  layout = 'grid',
  maxPrice = 1000,
  onCategoryToggle,
  onGradeToggle,
  onSubjectToggle,
  onPriceChange,
  onSortChange,
  onSearch,
  onResetFilters,
  onLayoutChange,
  appliedFiltersCount = 0
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [expandedPanel, setExpandedPanel] = useState('search');
  const [mobileFiltersAnchor, setMobileFiltersAnchor] = useState(null);
  const isMobile = useMediaQuery('(max-width:900px)');

  const handlePanelChange = (panel) => (_, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const debouncedSearch = debounce((query) => {
    onSearch(query);
  }, 400);

  useEffect(() => {
    debouncedSearch(searchInput);
    return () => debouncedSearch.cancel();
  }, [searchInput]);

  const handleMobileFiltersOpen = (event) => {
    setMobileFiltersAnchor(event.currentTarget);
  };

  const handleMobileFiltersClose = () => {
    setMobileFiltersAnchor(null);
  };

  const mobileFiltersOpen = Boolean(mobileFiltersAnchor);

  const renderFilters = () => (
    <>
      {grades.length > 0 && (
        <>
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
            Grade Level
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: '8px' }}>
            {grades.map((grade) => (
              <Chip
                key={grade}
                label={grade}
                clickable
                color={selectedGrades.includes(grade) ? 'primary' : 'default'}
                onClick={() => onGradeToggle(grade)}
                icon={selectedGrades.includes(grade) ? <CheckCircle fontSize="small" /> : undefined}
              />
            ))}
          </Stack>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {subjects.length > 0 && (
        <>
          <Typography variant="subtitle2" gutterBottom>
            Subject
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: '8px' }}>
            {subjects.map((subject) => (
              <Chip
                key={subject}
                label={subject}
                clickable
                color={selectedSubjects.includes(subject) ? 'primary' : 'default'}
                onClick={() => onSubjectToggle(subject)}
                icon={selectedSubjects.includes(subject) ? <CheckCircle fontSize="small" /> : undefined}
              />
            ))}
          </Stack>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {categories.length > 0 && (
        <>
          <Typography variant="subtitle2" gutterBottom>
            Resource Type
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                clickable
                color={selectedCategories.includes(category) ? 'primary' : 'default'}
                onClick={() => onCategoryToggle(category)}
                icon={selectedCategories.includes(category) ? <CheckCircle fontSize="small" /> : undefined}
              />
            ))}
          </Stack>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      <Typography variant="subtitle2" gutterBottom>
        Price Range (KES)
      </Typography>
      <Slider
        value={priceRange}
        onChange={onPriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={maxPrice}
        step={50}
        sx={{ mb: 3 }}
        valueLabelFormat={(value) => `${value.toLocaleString()}`}
      />
    </>
  );

  return (
    <Box sx={{ mb: 4 }}>
      {isMobile ? (
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Search books, notes, exams..."
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              InputProps={{
                startAdornment: <Search color="action" sx={{ mr: 1 }} />,
              }}
            />
            <Badge badgeContent={appliedFiltersCount} color="primary">
              <Button
                variant="outlined"
                startIcon={<Tune />}
                onClick={handleMobileFiltersOpen}
              >
                Filters
              </Button>
            </Badge>
          </Box>

          <Popover
            open={mobileFiltersOpen}
            anchorEl={mobileFiltersAnchor}
            onClose={handleMobileFiltersClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{
              '& .MuiPaper-root': {
                width: '90vw',
                maxWidth: '400px',
                p: 2
              }
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Filters
            </Typography>
            {renderFilters()}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={onResetFilters}
                startIcon={<Clear />}
              >
                Reset All
              </Button>
              <Button 
                variant="contained" 
                onClick={handleMobileFiltersClose}
              >
                Apply
              </Button>
            </Box>
          </Popover>
        </>
      ) : (
        <>
          <Accordion expanded={expandedPanel === 'search'} onChange={handlePanelChange('search')}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Search />
                <Typography>Search</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                label="Search books, notes, exams..."
                variant="outlined"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                InputProps={{
                  startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                }}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expandedPanel === 'filters'} onChange={handlePanelChange('filters')}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge badgeContent={appliedFiltersCount} color="primary">
                  <FilterList />
                </Badge>
                <Typography>Filters</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {renderFilters()}
            </AccordionDetails>
          </Accordion>
        </>
      )}

      <Accordion expanded={expandedPanel === 'sort'} onChange={handlePanelChange('sort')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Sort />
            <Typography>Sort & View</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            select
            fullWidth
            label="Sort By"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            sx={{ mb: 3 }}
          >
            <MenuItem value="newest">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterList fontSize="small" /> Newest First
              </Box>
            </MenuItem>
            <MenuItem value="price-low">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PriceChange fontSize="small" /> Price: Low to High
              </Box>
            </MenuItem>
            <MenuItem value="price-high">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PriceChange fontSize="small" /> Price: High to Low
              </Box>
            </MenuItem>
            <MenuItem value="rating">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star fontSize="small" /> Highest Rated
              </Box>
            </MenuItem>
            <MenuItem value="title-asc">Title: A-Z</MenuItem>
            <MenuItem value="title-desc">Title: Z-A</MenuItem>
          </TextField>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={onResetFilters}
              startIcon={<Clear />}
            >
              Reset All
            </Button>

            <ToggleButtonGroup
              value={layout}
              exclusive
              onChange={(_, value) => value && onLayoutChange(value)}
              size="small"
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridView fontSize="small" />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ViewList fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BookFilters;
// src/components/SearchBar/SearchBar.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { fetchWeather } from '../../features/weather/weatherSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a city name.');
      return;
    }
    dispatch(fetchWeather(query));
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <Paper
        component="form"
        elevation={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 12px',
          borderRadius: '999px',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="E.g., Colombo, London, Tokyo"
          inputProps={{ 'aria-label': 'search city' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </form>
  );
};

export default SearchBar;

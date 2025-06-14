// src/components/SearchBar/SearchBar.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
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
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="E.g., London, Tokyo, or New York"
          className="w-full px-6 py-4 text-lg text-gray-700 bg-white border-2 border-transparent rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow"
          aria-label="Search for a city"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-3 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          aria-label="Submit search"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

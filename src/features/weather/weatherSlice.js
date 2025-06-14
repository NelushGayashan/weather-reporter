// src/features/weather/weatherSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherData } from './weatherAPI';
import { CACHE_DURATION } from '../../utils/constants';

export const WEATHER_ACTION_TYPES = {
  FETCH_WEATHER: 'weather/fetchWeather',
};

export const fetchWeather = createAsyncThunk(
  WEATHER_ACTION_TYPES.FETCH_WEATHER,
  async (city, { getState, rejectWithValue, signal }) => {
    const { weather } = getState();
    const { data, lastFetched } = weather;

    if (!city || typeof city !== 'string' || !city.trim()) {
      return rejectWithValue('Invalid city name provided');
    }

    const normalizedCity = city.trim().toLowerCase();

    if (
      data && 
      data.location?.name?.toLowerCase() === normalizedCity && 
      lastFetched &&
      (Date.now() - lastFetched < CACHE_DURATION)
    ) {
      return { ...data, fromCache: true };
    }

    try {
      const responseData = await fetchWeatherData(city, signal);
      
      if (!responseData || !responseData.location || !responseData.current) {
        throw new Error('Invalid response data received');
      }

      return { ...responseData, fromCache: false };
    } catch (error) {
      if (error.name === 'AbortError' || signal?.aborted) {
        return rejectWithValue({ type: 'ABORTED', message: 'Request was cancelled' });
      }
      
      if (error.message?.includes('No matching location found')) {
        return rejectWithValue({ type: 'NOT_FOUND', message: 'City not found' });
      }
      
      if (error.message?.includes('API key')) {
        return rejectWithValue({ type: 'API_KEY', message: 'API configuration error' });
      }
      
      return rejectWithValue({ 
        type: 'NETWORK', 
        message: error.message || 'Failed to fetch weather data' 
      });
    }
  }
);

const initialState = {
  data: null,
  status: 'idle',
  error: null,
  lastFetched: null,
  requestId: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetWeather: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.requestId = action.meta.requestId;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        if (state.requestId === action.meta.requestId) {
          state.status = 'succeeded';
          state.data = action.payload;
          state.lastFetched = Date.now();
          state.error = null;
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        if (
          state.requestId === action.meta.requestId && 
          action.payload?.type !== 'ABORTED'
        ) {
          state.status = 'failed';
          state.error = action.payload;
          state.data = null;
        }
      });
  },
});

export const { clearError, resetWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
export const selectWeatherData = (state) => state.weather.data;
export const selectWeatherStatus = (state) => state.weather.status;
export const selectWeatherError = (state) => state.weather.error;
export const selectIsLoading = (state) => state.weather.status === 'loading';
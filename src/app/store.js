// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

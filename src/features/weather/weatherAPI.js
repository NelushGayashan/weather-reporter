// src/features/weather/weatherAPI.js

export const fetchWeatherData = async (city, signal) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('API Key is missing. Please add VITE_WEATHER_API_KEY to your .env file.');
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  const maxRetries = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'WeatherApp/1.0',
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.message || 'No matching location found.');
        }
        if (response.status === 401) {
          throw new Error('API key is invalid or expired.');
        }
        if (response.status === 403) {
          throw new Error('API quota exceeded. Please try again later.');
        }
        if (response.status >= 500) {
          throw new Error('Weather service temporarily unavailable.');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.location || !data.current) {
        throw new Error('Invalid response format from weather service.');
      }

      return data;
    } catch (error) {
      lastError = error;
      
      if (
        error.name === 'AbortError' ||
        error.message.includes('API key') ||
        error.message.includes('No matching location') ||
        attempt === maxRetries
      ) {
        throw error;
      }

      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};
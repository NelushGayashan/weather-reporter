// src/App.jsx

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { fetchWeather, selectWeatherData, selectWeatherStatus, selectWeatherError } from './features/weather/weatherSlice.js';
import { useWeatherNotifications } from './hooks/useWeatherNotifications.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import WeatherCard from './components/WeatherCard/WeatherCard.jsx';
import { LoadingSkeleton } from './components/Loading/LoadingSkeleton.jsx';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectWeatherData);
  const status = useSelector(selectWeatherStatus);
  const error = useSelector(selectWeatherError);
  const initRef = useRef(false);
  const abortControllerRef = useRef(null);

  useWeatherNotifications({ status, data, error });

  useEffect(() => {
    if (initRef.current) return;
    
    initRef.current = true;
    abortControllerRef.current = new AbortController();
    dispatch(fetchWeather('Colombo'));

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 font-sans">
      <header className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            WeatherSphere
          </h1>
          <p className="text-gray-600 mb-8">
            Your real-time window to the weather, anywhere in the world.
          </p>
          <SearchBar />
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
        {status === 'loading' && <LoadingSkeleton />}
        
        {status === 'failed' && error && (
          <div className="text-center text-red-600 bg-red-100 p-6 rounded-2xl max-w-md mx-auto shadow-md">
            <h3 className="font-bold text-lg">Unable to Load Weather</h3>
            <p className="mt-2">
              {error.type === 'NOT_FOUND' && 'City not found. Please check the spelling.'}
              {error.type === 'API_KEY' && 'Weather service configuration error.'}
              {error.type === 'NETWORK' && 'Network error. Please check your connection.'}
              {!['NOT_FOUND', 'API_KEY', 'NETWORK'].includes(error.type) && 
                (error.message || 'Something went wrong. Please try again.')}
            </p>
          </div>
        )}
        
        {status === 'succeeded' && data && <WeatherCard data={data} />}
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1f2937',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
          },
          success: {
            style: {
              border: '1px solid #10b981',
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
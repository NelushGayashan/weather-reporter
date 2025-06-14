// src/hooks/useWeatherNotifications.jsx

import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export const useWeatherNotifications = (weatherState) => {
  const prevStatusRef = useRef();
  const prevDataRef = useRef();

  useEffect(() => {
    const { status, data, error } = weatherState;
    const prevStatus = prevStatusRef.current;
    const prevData = prevDataRef.current;

    if (prevStatus === undefined) {
      prevStatusRef.current = status;
      prevDataRef.current = data;
      return;
    }

    if (status === 'succeeded' && prevStatus === 'loading' && data) {
      if (data.fromCache) {
        toast.success(`Showing cached weather for ${data.location.name}`, {
          icon: <CloudDownloadIcon style={{ color: '#0288d1' }} />,
          duration: 3000,
        });
      } else {
        toast.success(`Weather for ${data.location.name} updated!`, {
          icon: <CloudDoneIcon style={{ color: '#43a047' }} />,
          duration: 4000,
        });
      }
    }

    if (status === 'failed' && prevStatus === 'loading' && error) {
      const errorMessages = {
        NOT_FOUND: 'City not found. Please check the spelling.',
        API_KEY: 'Weather service unavailable. Please try again later.',
        NETWORK: 'Network error. Please check your connection.',
      };

      toast.error(errorMessages[error.type] || error.message || 'Something went wrong', {
        icon: <CloudOffIcon style={{ color: '#e53935' }} />,
        duration: 5000,
      });
    }

    prevStatusRef.current = status;
    prevDataRef.current = data;
  }, [weatherState]);
};
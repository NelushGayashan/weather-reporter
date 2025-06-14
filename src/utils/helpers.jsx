// src/utils/helpers.jsx

import React from 'react';
import WbSunny from '@mui/icons-material/WbSunny';
import NightsStay from '@mui/icons-material/NightsStay';
import Cloud from '@mui/icons-material/Cloud';
import Grain from '@mui/icons-material/Grain';
import Thunderstorm from '@mui/icons-material/Thunderstorm';
import AcUnit from '@mui/icons-material/AcUnit';

/**
 * Returns a Material-UI weather icon based on the provided weather code and time of day.
 * @param {number} code - The weather condition code from the API.
 * @param {boolean} isDay - True if it's daytime, false if nighttime.
 * @returns {JSX.Element} The corresponding Material-UI weather icon component.
 */
export const getWeatherIcon = (code, isDay) => {
  const iconStyle = { fontSize: '80px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' };
  switch (code) {
    case 1000: 
      return isDay ? <WbSunny sx={iconStyle} className="text-yellow-500" /> : <NightsStay sx={iconStyle} className="text-blue-300" />;
    case 1003: 
    case 1006: 
    case 1009: 
      return <Cloud sx={iconStyle} className="text-gray-500" />;
    case 1063: 
    case 1180: case 1183: case 1186: case 1189: case 1192: case 1195: 
      return <Grain sx={iconStyle} className="text-blue-500" />;
    case 1087: 
    case 1273: case 1276: 
      return <Thunderstorm sx={iconStyle} className="text-yellow-600" />;
    case 1114: case 1117: case 1210: case 1213: case 1216: case 1219: case 1222: case 1225: 
      return <AcUnit sx={iconStyle} className="text-cyan-300" />;
    default:
      return <Cloud sx={iconStyle} className="text-gray-500" />;
  }
};
/**
 * Provides a human-readable description for the US EPA Air Quality Index.
 * @param {number} index - The numerical US EPA index (1-6+).
 * @returns {string} A descriptive string for the air quality level.
 */
export const getAirQualityDescription = (index) => {
  switch (index) {
    case 1: return 'Good';
    case 2: return 'Moderate';
    case 3: return 'Unhealthy for Sensitive Groups';
    case 4: return 'Unhealthy';
    case 5: return 'Very Unhealthy';
    case 6: return 'Hazardous';
    default: return 'N/A';
  }
};
/**
 * Rounds a number to a specified number of decimal places.
 * @param {number} value - The number to round.
 * @param {number} decimals - The number of decimal places.
 * @returns {number} The rounded number.
 */
export const round = (value, decimals = 0) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

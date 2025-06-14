// src/components/WeatherCard/WeatherCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import styles from './WeatherCard.module.css';
import { getAirQualityDescription, getWeatherIcon } from '../../utils/helpers';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudIcon from '@mui/icons-material/Cloud';
import SpeedIcon from '@mui/icons-material/Speed';

const WeatherCard = ({ data }) => {
  const { location, current } = data;
  const airQualityIndex = current.air_quality?.['us-epa-index'] ?? 0;
  const airQualityText = getAirQualityDescription(airQualityIndex);

  const weatherMetrics = [
    { label: 'Wind Speed', value: `${current.wind_kph} km/h`, icon: <AirIcon /> },
    { label: 'Humidity', value: `${current.humidity}%`, icon: <WaterDropIcon /> },
    { label: 'UV Index', value: current.uv, icon: <WbSunnyIcon /> },
    { label: 'Feels Like', value: `${Math.round(current.feelslike_c)}°C`, icon: <ThermostatIcon /> },
    { label: 'Precipitation', value: `${current.precip_mm} mm`, icon: <OpacityIcon /> },
    { label: 'Visibility', value: `${current.vis_km} km`, icon: <VisibilityIcon /> },
    { label: 'Air Quality', value: airQualityText, icon: <CloudIcon /> },
    { label: 'Pressure', value: `${current.pressure_mb} mb`, icon: <SpeedIcon /> },
  ];

  return (
    <div className={`${styles.card} fade-in`}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.locationName}>
            {location.name}, {location.country}
          </h2>
          <p className={styles.localTime}>
            {format(new Date(location.localtime), 'EEEE, h:mm a')}
          </p>
        </div>
        <div className={styles.weatherIcon}>
          <img
            src={current.condition.icon}
            alt={current.condition.text}
            width="80"
            height="80"
          />
        </div>
      </div>

      {/* Temperature */}
      <div className={styles.temperatureSection}>
        <p className={styles.temperature}>{Math.round(current.temp_c)}°C</p>
        <p className={styles.conditionText}>{current.condition.text}</p>
      </div>

      {/* Weather Metrics */}
      <div className={styles.detailsGrid}>
        {weatherMetrics.map((metric) => (
          <div key={metric.label} className={styles.metricItem}>
            <span className="flex items-center gap-2 text-gray-700 font-semibold">
              {metric.icon} {metric.label}
            </span>
            <span className="text-gray-900">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

WeatherCard.propTypes = {
  data: PropTypes.shape({
    location: PropTypes.object.isRequired,
    current: PropTypes.object.isRequired,
  }).isRequired,
};

export default WeatherCard;

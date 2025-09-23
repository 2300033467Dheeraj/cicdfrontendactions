import { useState, useEffect, useCallback } from 'react';
import { weatherService, weatherUtils } from '../services/weatherApi';

const detectAlerts = (weatherData, forecastData) => {
  const detectedAlerts = [];

  if (weatherData) {
    const temp = weatherData.temperature;
    const condition = weatherData.description.toLowerCase();
    const windSpeed = weatherData.windSpeed;

    if (temp > 35) {
      detectedAlerts.push({
        id: 'heat-current',
        type: 'extreme_heat',
        message: `Extreme heat warning: ${temp}°C`,
        severity: 'high',
      });
    }
    if (temp < 0) {
      detectedAlerts.push({
        id: 'freeze-current',
        type: 'freezing',
        message: `Freezing conditions: ${temp}°C`,
        severity: 'high',
      });
    }
    if (condition.includes('thunderstorm')) {
      detectedAlerts.push({
        id: 'thunder-current',
        type: 'thunderstorm',
        message: 'Thunderstorm in progress',
        severity: 'high',
      });
    }
    if (condition.includes('heavy rain')) {
      detectedAlerts.push({
        id: 'rain-current',
        type: 'heavy_rain',
        message: 'Heavy rainfall detected',
        severity: 'medium',
      });
    }
    if (windSpeed > 50) { // assuming km/h
      detectedAlerts.push({
        id: 'wind-current',
        type: 'high_wind',
        message: `High winds: ${windSpeed} km/h`,
        severity: 'medium',
      });
    }
  }

  if (forecastData && forecastData.length > 0) {
    forecastData.forEach((day, index) => {
      if (index < 3) { // Check next 3 days only
        const maxTemp = day.high;
        const minTemp = day.low;
        const condition = day.description.toLowerCase();

        if (maxTemp > 38) {
          detectedAlerts.push({
            id: `heat-forecast-${index}`,
            type: 'extreme_heat',
            message: `Extreme heat forecast for ${day.day}: ${maxTemp}°C`,
            severity: 'medium',
          });
        }
        if (minTemp < 5) {
          detectedAlerts.push({
            id: `freeze-forecast-${index}`,
            type: 'freezing',
            message: `Freezing conditions forecast for ${day.day}: ${minTemp}°C`,
            severity: 'medium',
          });
        }
        if (condition.includes('thunderstorm')) {
          detectedAlerts.push({
            id: `thunder-forecast-${index}`,
            type: 'thunderstorm',
            message: `Thunderstorm forecast for ${day.day}`,
            severity: 'medium',
          });
        }
        if (condition.includes('heavy rain')) {
          detectedAlerts.push({
            id: `rain-forecast-${index}`,
            type: 'heavy_rain',
            message: `Heavy rain forecast for ${day.day}`,
            severity: 'low',
          });
        }
        
      }
    });
  }
  return detectedAlerts;
};

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async (cityName) => {
    if (!cityName?.trim()) return;

    console.log('Fetching weather for:', cityName);
    setLoading(true);
    setError(null);

    try {
      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeather(cityName),
        weatherService.getForecast(cityName),
      ]);

      const transformedCurrent = weatherUtils.transformCurrentWeather(currentWeather);
      const transformedForecast = weatherUtils.transformForecast(forecast);

      setWeatherData(transformedCurrent);
      setForecastData(transformedForecast);
      setHourlyTemps(weatherUtils.transformHourly(forecast));

      const newAlerts = detectAlerts(transformedCurrent, transformedForecast);
      setAlerts(newAlerts);

      // Fetch AQI data if we have coordinates
      if (currentWeather.coord) {
        try {
          const aqiResponse = await weatherService.getAirQuality(
            currentWeather.coord.lat,
            currentWeather.coord.lon
          );
          setAqiData(aqiResponse.list[0]);
        } catch (aqiError) {
          console.warn('Failed to fetch AQI data:', aqiError);
          setAqiData(null);
        }
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true,
        });
      });

      const { latitude, longitude } = position.coords;

      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeatherByCoords(latitude, longitude),
        weatherService.getForecastByCoords(latitude, longitude),
      ]);

      const transformedCurrent = weatherUtils.transformCurrentWeather(currentWeather);
      const transformedForecast = weatherUtils.transformForecast(forecast);

      setWeatherData(transformedCurrent);
      setForecastData(transformedForecast);
      setHourlyTemps(weatherUtils.transformHourly(forecast));

      const newAlerts = detectAlerts(transformedCurrent, transformedForecast);
      setAlerts(newAlerts);

      // Fetch AQI data
      try {
        const aqiResponse = await weatherService.getAirQuality(latitude, longitude);
        setAqiData(aqiResponse.list[0]);
      } catch (aqiError) {
        console.warn('Failed to fetch AQI data:', aqiError);
        setAqiData(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to get your location');
      console.error('Location fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearData = useCallback(() => {
    setWeatherData(null);
    setForecastData([]);
    setHourlyTemps([]);
    setAlerts([]);
    setAqiData(null);
    setError(null);
  }, []);

  return {
    weatherData,
    forecastData,
    hourlyTemps,
    alerts,
    aqiData,
    loading,
    error,
    fetchWeatherData,
    fetchWeatherByLocation,
    clearError,
    clearData,
  };
};

export default useWeather;

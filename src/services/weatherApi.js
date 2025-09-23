import axios from 'axios';

// Base configuration for weather API
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const API_BASE_URL = import.meta.env.VITE_WEATHER_API_URL || "https://api.openweathermap.org/data/2.5";

// Create axios instance with default config
const weatherApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
weatherApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Weather API Error:', error);
    return Promise.reject(error);
  }
);

// API service functions
export const weatherService = {
  getCurrentWeather: async (cityName) => {
    try {
      const response = await weatherApi.get('/weather', {
        params: { q: cityName, appid: API_KEY, units: 'metric' },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch current weather: ${error.message}`);
    }
  },

  getCurrentWeatherByCoords: async (lat, lon) => {
    try {
      const response = await weatherApi.get('/weather', {
        params: { lat, lon, appid: API_KEY, units: 'metric' },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch current weather: ${error.message}`);
    }
  },

  getForecast: async (cityName) => {
    try {
      const response = await weatherApi.get('/forecast', {
        params: { q: cityName, appid: API_KEY, units: 'metric' },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  },

  getForecastByCoords: async (lat, lon) => {
    try {
      const response = await weatherApi.get('/forecast', {
        params: { lat, lon, appid: API_KEY, units: 'metric' },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  },

  getAirQuality: async (lat, lon) => {
    try {
      const response = await weatherApi.get('/air_pollution', {
        params: { lat, lon, appid: API_KEY },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch air quality: ${error.message}`);
    }
  },

  // ⚠️ Removed alerts (not available in free plan)
  getAlerts: async () => {
    return { alerts: [] }; // return empty array always
  },

  searchCities: async (query) => {
    try {
      const response = await weatherApi.get('/find', {
        params: { q: query, type: 'like', sort: 'population', cnt: 5, appid: API_KEY, units: 'metric' },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search cities: ${error.message}`);
    }
  },
};

// Utility functions for data transformation
// Utility functions for data transformation
export const weatherUtils = {
  transformCurrentWeather: (apiData) => {
    if (!apiData || !apiData.main) return null;

    const cityName = apiData.name || 'Unknown';
    const countryCode = apiData.sys?.country || '';
    const location = countryCode ? `${cityName}, ${countryCode}` : cityName;

    // Adjust sunrise/sunset with timezone offset (seconds)
    const timezoneOffset = apiData.timezone || 0;
    const formatTime = (timestamp) => {
      if (!timestamp) return null;
      // Convert to milliseconds and adjust UTC + timezone offset
      const utc = (timestamp + timezoneOffset) * 1000;
      return new Date(utc).toISOString().substr(11, 5); 
      // gives "HH:MM" in 24hr format without device shift
    };

    return {
      location,
      temperature: Math.round(apiData.main.temp),
      humidity: apiData.main.humidity,
      windSpeed: Math.round(apiData.wind?.speed * 3.6 || 0),
      weatherIcon: getWeatherIcon(apiData.weather?.[0]?.main),
      description: apiData.weather?.[0]?.description || '',
      feelsLike: Math.round(apiData.main.feels_like),
      pressure: apiData.main.pressure,
      visibility: Math.round(apiData.visibility / 1000) || 0,
      uvIndex: apiData.uvi || 0,
      sunrise: formatTime(apiData.sys?.sunrise),
      sunset: formatTime(apiData.sys?.sunset),
    };
  },


  transformForecast: (apiData) => {
    if (!apiData || !apiData.list) return [];

    const dailyForecasts = {};
    apiData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = { date, temps: [], weather: item.weather[0] };
      }
      dailyForecasts[date].temps.push(item.main.temp);
    });

    return Object.values(dailyForecasts)
      .slice(0, 5)
      .map((day, index) => ({
        day:
          index === 0
            ? 'Tomorrow'
            : new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }),
        high: Math.round(Math.max(...day.temps)),
        low: Math.round(Math.min(...day.temps)),
        icon: getWeatherIcon(day.weather?.main),
        description: day.weather?.description || '',
      }));
  },

  // Extract next 10-12 hours temps from 3-hourly OpenWeather forecast
  transformHourly: (apiData) => {
    if (!apiData || !apiData.list) return [];
    // Take first 8 buckets (3h each) ~ 24 hours
    const slices = apiData.list.slice(0, 8);
    return slices.map((item) => ({
      timeLabel: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }),
      temp: Math.round(item.main.temp),
    }));
  },

  transformAlerts: () => {
    return []; // always empty for free plan
  },
};

// Helper function to get weather icon
const getWeatherIcon = (weatherMain) => {
  const iconMap = {
    Clear: '☀️',
    Clouds: '⛅',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Fog: '🌫️',
    Haze: '🌫️',
    Dust: '🌫️',
    Sand: '🌫️',
    Ash: '🌫️',
    Squall: '💨',
    Tornado: '🌪️',
  };
  return iconMap[weatherMain] || '☀️';
};

export default weatherApi;

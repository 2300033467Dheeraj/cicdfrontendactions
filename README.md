# Weather App

A modern, responsive weather application built with React, TailwindCSS, and Framer Motion. Features beautiful animations, real-time weather data, and a clean, intuitive interface.

## Features

- 🌤️ **Current Weather Display** - Temperature, humidity, wind speed, pressure, and more
- 📅 **5-Day Forecast** - Animated forecast cards with smooth transitions
- 🚨 **Weather Alerts** - Banner notifications for severe weather conditions
- 🔍 **City Search** - Search for weather in any city worldwide
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- ✨ **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- 🎨 **Modern UI** - Beautiful blue gradient theme with glassmorphism effects

## Tech Stack

- **React 19** - Modern React with hooks
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The app is prepared for weather API integration. To connect to a real weather API:

1. **Get an API Key** from a weather service provider (e.g., OpenWeatherMap, WeatherAPI)

2. **Create a `.env` file** in the root directory:
```env
REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

3. **Update the API service** in `src/services/weatherApi.js` if needed for your chosen provider

4. **Replace mock data** in `src/pages/WeatherPage.jsx` with real API calls using the `useWeather` hook

### Example API Integration

```jsx
import { useWeather } from './hooks/useWeather';

const WeatherPage = () => {
  const { 
    weatherData, 
    forecastData, 
    alerts, 
    loading, 
    error, 
    fetchWeatherData 
  } = useWeather();

  // Use fetchWeatherData('City Name') to get real weather data
};
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.jsx   # City search input
│   ├── WeatherCard.jsx # Current weather display
│   ├── ForecastCard.jsx # 5-day forecast item
│   ├── AlertBanner.jsx # Weather alerts banner
│   └── LoadingSpinner.jsx # Loading animation
├── pages/              # Page components
│   └── WeatherPage.jsx # Main weather page
├── services/           # API services
│   └── weatherApi.js   # Weather API configuration
├── hooks/              # Custom React hooks
│   └── useWeather.js   # Weather data management hook
├── App.jsx             # Main app component
└── index.css           # Global styles
```

## Customization

### Colors and Theme

The app uses a blue gradient theme. To customize colors, update the Tailwind classes in:

- `src/App.jsx` - Main background gradient
- `src/components/WeatherCard.jsx` - Card styling
- `src/components/SearchBar.jsx` - Search input styling

### Animations

Animations are powered by Framer Motion. Key animation configurations are in:

- `src/pages/WeatherPage.jsx` - Page-level animations
- `src/components/` - Component-specific animations

### Responsive Breakpoints

The app uses Tailwind's responsive utilities:

- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository.
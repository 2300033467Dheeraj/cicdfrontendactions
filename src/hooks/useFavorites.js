import { useState, useEffect, useCallback } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  // Load favorites from localStorage on mount and whenever storage changes
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('weatherFavorites');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setFavorites(parsed);
          }
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    load();
    setHasLoadedFromStorage(true);
    const onStorage = (e) => {
      if (e.key === 'weatherFavorites') {
        load();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (!hasLoadedFromStorage) return; // avoid overwriting storage on first mount
    try {
      localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites, hasLoadedFromStorage]);

  const addFavorite = useCallback((weatherData) => {
    if (!weatherData) return;

    const normalizedLocation = (weatherData.location || '').trim();

    const favorite = {
      id: `${normalizedLocation.toLowerCase().replace(/\s+/g, '-')}`,
      location: normalizedLocation,
      temperature: weatherData.temperature,
      description: weatherData.description,
      weatherIcon: weatherData.weatherIcon,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      addedAt: new Date().toISOString(),
    };

    setFavorites(prev => {
      // Check if already exists
      const exists = prev.some(fav => fav.location?.toLowerCase() === favorite.location?.toLowerCase());
      if (exists) return prev;
      const next = [...prev, favorite];
      try {
        localStorage.setItem('weatherFavorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites(prev => {
      const next = prev.filter(fav => fav.id !== id);
      try {
        localStorage.setItem('weatherFavorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    try {
      localStorage.removeItem('weatherFavorites');
    } catch {}
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };
};

export default useFavorites;

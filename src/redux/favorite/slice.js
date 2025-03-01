import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Завантаження улюблених з localStorage
const loadFavoritesFromLocalStorage = () => {
  const savedFavorites = localStorage.getItem('favorites');
  try {
    // Якщо дані є, перевіряємо чи це масив
    const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    if (Array.isArray(parsedFavorites)) {
      return parsedFavorites;
    } else {
      console.error(
        'Favorites in localStorage are not an array, resetting to empty array.'
      );
      return []; // Якщо це не масив, повертаємо порожній масив
    }
  } catch (e) {
    console.error('Error parsing favorites from localStorage:', e);
    return []; // Якщо є помилка, повертаємо порожній масив
  }
};

const initialState = loadFavoritesFromLocalStorage(); // Ініціалізація state з масиву обраних;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const carId = action.payload;
      const index = state.indexOf(carId); // Перевіряємо, чи є такий carId в масиві
      if (index === -1) {
        state.push(carId); // Додаємо автомобіль до списку
      } else {
        state.splice(index, 1); // Видаляємо автомобіль зі списку
      }
    },
    clearFavorites(state) {
      state.length = 0; // Очищаємо список обраних
    },
  },
});

// Налаштування збереження в localStorage за допомогою redux-persist
const favoritesPersistConfig = {
  key: 'favorites',
  storage,
};

// Дія слайсу
export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;

export const favoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesSlice.reducer
);

import { configureStore } from '@reduxjs/toolkit';
import { carsReducer } from './cars/slice.js';
import { filtersReducer } from './filters/slice.js';
import { favoritesReducer } from './favorite/slice.js';
import { persistStore } from 'redux-persist';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Налаштування стора
export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ігноруємо дії persist
      },
    }),
});

export const persistor = persistStore(store);
export default store;

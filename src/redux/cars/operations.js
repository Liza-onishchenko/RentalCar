import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (filters, thunkAPI) => {
    try {
      const {
        brand = '',
        rentalPrice = '',
        minMileage = '',
        maxMileage = '',
        limit = 8,
        page = 1,
      } = filters;
      const response = await apiInstance.get('/cars', {
        params: {
          brand,
          rentalPrice,
          minMileage,
          maxMileage,
          limit,
          page,
        },
      });
      console.log('API Response:', response.data);
      const { cars, totalPages } = response.data;
      return { cars, totalPages };
    } catch (error) {
      const message = error.message || 'Failed to fetch cars';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchNextCars = createAsyncThunk(
  'cars/fetchNextCars',
  async (filters, thunkAPI) => {
    try {
      const {
        brand = '',
        rentalPrice = '',
        minMileage = '',
        maxMileage = '',
        limit = 8,
        page = 1,
      } = filters;
      const response = await apiInstance.get('/cars', {
        params: {
          brand,
          rentalPrice,
          minMileage,
          maxMileage,
          limit,
          page,
        },
      });
      console.log('Next Cars Response:', response.data);
      return response.data;
    } catch (error) {
      const message = error.message || 'Failed to fetch next cars';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (id, thunkAPI) => {
    try {
      const response = await apiInstance.get(`/cars/${id}`);
      console.log('Car details response:', response.data);
      return response.data;
    } catch (error) {
      const message = error.message || 'Failed to fetch car details';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

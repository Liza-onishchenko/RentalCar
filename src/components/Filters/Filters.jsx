import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBrand,
  selectRentalPrice,
  selectMinMileage,
  selectMaxMileage,
  selectBrands,
  selectIsLoading,
  selectError,
} from '../../redux/filters/selector';
import {
  setBrand,
  setRentalPrice,
  setMinMileage,
  setMaxMileage,
  clearFilters,
} from '../../redux/filters/slice';
import { fetchCars } from '../../redux/cars/operations';
import { fetchBrands } from '../../redux/filters/operations';
import { clearCars } from '../../redux/cars/slice';
import css from './Filters.module.css';

const Filters = () => {
  const dispatch = useDispatch();
  const brand = useSelector(selectBrand);
  const rentalPrice = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);
  const brands = useSelector(selectBrands);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [localMinMileage, setLocalMinMileage] = useState(minMileage);
  const [localMaxMileage, setLocalMaxMileage] = useState(maxMileage);

  useEffect(() => {
    setLocalMinMileage(minMileage);
    setLocalMaxMileage(maxMileage);
  }, [minMileage, maxMileage]);

  useEffect(() => {
    if (!brands.length && !isLoading && !error) {
      dispatch(fetchBrands());
    }
  }, [dispatch, brands.length, isLoading, error]);

  const handleBrandChange = useCallback(
    e => {
      dispatch(setBrand(e.target.value));
    },
    [dispatch]
  );

  const handlePriceChange = useCallback(
    e => {
      const value = e.target.value;
      if (value === '') {
        dispatch(setRentalPrice('')); // Скидаємо ціну до початкового стану
      } else {
        dispatch(setRentalPrice(value)); // Встановлюємо обрану ціну
      }
    },
    [dispatch]
  );

  const handleMinMileageChange = useCallback(e => {
    setLocalMinMileage(e.target.value);
  }, []);

  const handleMaxMileageChange = useCallback(e => {
    setLocalMaxMileage(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    dispatch(clearCars());
    dispatch(setMinMileage(localMinMileage));
    dispatch(setMaxMileage(localMaxMileage));
    const priceForApi = ['30', '40', '50', '60', '70', '80'].includes(
      rentalPrice
    )
      ? rentalPrice
      : '';
    dispatch(
      fetchCars({
        brand,
        rentalPrice: priceForApi,
        minMileage: localMinMileage,
        maxMileage: localMaxMileage,
      })
    );
  }, [dispatch, brand, rentalPrice, localMinMileage, localMaxMileage]);

  const handleClear = useCallback(() => {
    dispatch(clearFilters());
    dispatch(clearCars());
    dispatch(
      fetchCars({ brand: '', rentalPrice: '', minMileage: '', maxMileage: '' })
    );
  }, [dispatch]);

  // Динамічний список цін
  const priceOptions = useMemo(() => {
    const basePrices = ['30', '40', '50', '60', '70', '80'];

    // Якщо вибрано конкретну ціну, то показуємо всі ціни, окрім вибраної
    if (['30', '40', '50', '60', '70', '80'].includes(rentalPrice)) {
      return [
        `To $${rentalPrice}`,
        ...basePrices.filter(price => price !== rentalPrice), // Відображаємо всі ціни, окрім вибраної
      ];
    }

    // Якщо ціна не вибрана, то відображаємо всі опції
    return [...basePrices];
  }, [rentalPrice]);

  if (isLoading) return <div>Loading filters...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={css.filters}>
      <div className={css.filterGroup}>
        <label>Car brand</label>
        <select
          value={brand}
          onChange={handleBrandChange}
          className={css.select}
          disabled={isLoading}
        >
          <option value="">Choose a brand</option>
          {brands.map(b => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className={css.filterGroup}>
        <label>Price/hour</label>
        <select
          value={rentalPrice}
          onChange={handlePriceChange}
          className={css.select}
          disabled={isLoading}
        >
          {priceOptions.map(p => (
            <option
              key={p}
              value={p === `To $${rentalPrice}` ? rentalPrice : p}
            >
              {p === `To $${rentalPrice}` ? `To $${rentalPrice}` : p}
            </option>
          ))}
        </select>
      </div>
      <div className={css.filterGroup}>
        <label>Car mileage/km</label>
        <div className={css.mileageRange}>
          <input
            type="number"
            value={localMinMileage}
            onChange={handleMinMileageChange}
            placeholder="From"
            className={css.input}
            disabled={isLoading}
          />
          <input
            type="number"
            value={localMaxMileage}
            onChange={handleMaxMileageChange}
            placeholder="To"
            className={css.input}
            disabled={isLoading}
          />
        </div>
      </div>
      <button
        className={css.searchButton}
        onClick={handleSearch}
        disabled={isLoading}
      >
        Search
      </button>
      <button
        className={css.clearButton}
        onClick={handleClear}
        disabled={isLoading}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;

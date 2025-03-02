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
import Loader from '../Loader/Loader.jsx';

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
        dispatch(setRentalPrice('')); // Скид ціни до початкового стану
      } else {
        dispatch(setRentalPrice(value)); // Встановить обрану ціну
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

  // Динамічний список цін
  const priceOptions = useMemo(() => {
    const basePrices = [
      '30',
      '40',
      '50',
      '60',
      '70',
      '80',
      '90',
      '100',
      '110',
      '120',
      '130',
    ];

    if (['30', '40', '50', '60', '70', '80'].includes(rentalPrice)) {
      return [
        `To $${rentalPrice}`,
        ...basePrices.filter(price => price !== rentalPrice), // Відображає всі ціни, окрім вибраної
      ];
    }
    // Якщо ціна не вибрана, то відображає всі опції
    return [...basePrices];
  }, [rentalPrice]);

  if (isLoading) {
    return <Loader isLoading={true} size={50} />;
  }
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
          <option value="">Choose a price</option>
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
            className={css.input1}
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
    </div>
  );
};

export default Filters;

import React, { useEffect } from 'react';
import css from './CatalogPage.module.css';
import Filters from '../../components/Filters/Filters.jsx';
import CarList from '../../components/CarList/CarList.jsx';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations.js';
import { clearCars } from '../../redux/cars/slice.js';
import { formatMileage } from '../../utils/format.js';
import {
  selectCars,
  selectError,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from '../../redux/cars/selector.js';
import {
  selectBrand,
  selectMaxMileage,
  selectMinMileage,
  selectRentalPrice,
} from '../../redux/filters/selector.js';

const CatalogPage = () => {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const brand = useSelector(selectBrand);
  const rentalPrice = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);

  useEffect(() => {
    dispatch(clearCars()); // Очищає список автомобілів перед новим запитом
    dispatch(
      fetchCars({
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
        limit: '8',
        page: page.toString(),
      })
    );
  }, [dispatch, brand, rentalPrice, minMileage, maxMileage, page]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className={css.catalogPage}>
      <Filters />
      {isLoading && page > 1 && <p>Loading more cars...</p>}
      {error && <p>Error: {error}</p>}
      {cars.length === 0 && !isLoading && !error && (
        <p>No cars matching your criteria!</p>
      )}
      <CarList
        cars={cars.map(car => ({
          ...car,
          mileage: formatMileage(car.mileage),
        }))}
      />
      {page < totalPages && <LoadMoreButton />}
    </div>
  );
};

export default CatalogPage;

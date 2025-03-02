import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
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
import css from './LoadMoreButton.module.css';
import { setPage } from '../../redux/cars/slice.js';
import { fetchNextCars } from '../../redux/cars/operations.js';
import Loader from '../Loader/Loader.jsx';

const LoadMoreButton = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const brand = useSelector(selectBrand);
  const rentalPrice = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);
  const isLoading = useSelector(selectIsLoading);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      dispatch(setPage(nextPage));
      dispatch(
        fetchNextCars({
          brand,
          rentalPrice,
          minMileage,
          maxMileage,
          limit: 8,
          page: nextPage,
        })
      );
    }
  };

  if (isLoading) {
    return <Loader isLoading={true} size={50} />;
  }

  return (
    <button
      className={css.loadMore}
      onClick={handleLoadMore}
      disabled={currentPage >= totalPages || totalPages === 1}
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;

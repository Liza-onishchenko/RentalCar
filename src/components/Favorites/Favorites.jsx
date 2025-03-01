import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBrand,
  selectMaxMileage,
  selectMinMileage,
  selectRentalPrice,
} from '../../redux/filters/selector.js';

const Favorites = () => {
  const dispatch = useDispatch();

  const brand = useSelector(selectBrand);
  const rentalPrice = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);

  useEffect(() => {
    const fetchBrands = awaitfe;
  });
  return <div>Favorites</div>;
};

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCarById } from '../../redux/cars/operations';
import Loader from '../../components/Loader/Loader.jsx';
import {
  selectSelectedCar,
  selectIsLoading,
  selectError,
} from '../../redux/cars/selector';
import BookingForm from '../../components/BookingForm/BookingForm';
import css from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const car = useSelector(selectSelectedCar);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]); // Ефект для завантаження деталей при зміні id

  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>Car not found</div>;

  const safeYear = car.year;

  const safeMileage = Number(car.mileage) || 0;

  const rentalConditionsArray =
    typeof car.rentalConditions === 'string'
      ? car.rentalConditions.split(', ')
      : car.rentalConditions;

  const accessoriesAndFunctionalities = [
    // Об'єднаний масив аксесуарів і функціональностей
    ...(car.accessories || []),
    ...(car.functionalities || []),
  ];

  const locationPart =
    car.address.split(', ').slice(1).join(', ') || 'Unknown Location';

  const displayId = `Id: ${String(car.id).replace(/-/g, '').slice(0, 4)}`;

  return (
    <div className={css.carDetailsPage}>
      <Loader isLoading={isLoading} />
      <div className={css.leftColumn}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={css.carImage}
        />
        <BookingForm carId={id} />
      </div>
      <div className={css.carInfo}>
        <h1>
          {car.brand} {car.model}, {safeYear}
          <span className={css.carId}>{displayId}</span>
        </h1>
        <p className={css.location}>
          <svg className={css.icon}>
            <use href={`/images/icons.svg#location`} />
          </svg>
          {locationPart} {safeMileage.toLocaleString()} km
        </p>

        <p className={css.price}>{car.rentalPrice}$</p>
        <p className={css.infoDetal}>{car.description}</p>

        <h3>Rental Conditions:</h3>
        <ul className={css.conditions}>
          {rentalConditionsArray.map((condition, index) => (
            <li key={index} className={css.listItem}>
              <svg className={css.icon}>
                <use href={`/images/icons.svg#icon-check`} />
              </svg>
              {condition}
            </li>
          ))}
        </ul>
        <h3>Car Specifications:</h3>
        <ul className={css.specs}>
          <li className={css.listItem}>
            <svg className={css.icon}>
              <use href={`/images/icons.svg#calendar`} />
            </svg>
            Year: {safeYear}
          </li>
          <li className={css.listItem}>
            <svg className={css.icon}>
              <use href={`/images/icons.svg#car`} />
            </svg>
            Type: {car.type}
          </li>
          <li className={css.listItem}>
            <svg className={css.icon}>
              <use href={`/images/icons.svg#icon-document`} />
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={css.listItem}>
            <svg className={css.icon}>
              <use href={`/images/icons.svg#icon-star`} />
            </svg>
            Engine Size: {car.engineSize}
          </li>
        </ul>
        <h3>Accessories and functionalities:</h3>
        <ul className={css.accessories}>
          {accessoriesAndFunctionalities.map((item, index) => (
            <li key={index} className={css.listItem}>
              <svg className={css.icon}>
                <use href={`/images/icons.svg#icon-check`} />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarDetailsPage;

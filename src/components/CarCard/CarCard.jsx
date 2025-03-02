import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorite/slice';
import { NavLink } from 'react-router-dom';
import { selectFavorites } from '../../redux/favorite/selector';
import css from './CarCard.module.css';

const CarCard = ({ car }) => {
  const {
    id,
    img = 'https://picsum.photos/300/200',
    brand = 'Unknown Brand',
    model = 'Unknown Model',
    year = 'Unknown Year',
    rentalPrice = 'N/A',
    mileage = 0,
    address = 'Unknown Location',
    rentalCompany = 'Unknown Company',
  } = car;

  const locationPart =
    car.address.split(', ').slice(1).join(', ') || 'Unknown Location';

  const formattedMileage = mileage.toLocaleString();

  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(car.id));
  };

  return (
    <div className={css.carCard}>
      <img src={img} alt={`${brand} ${model}`} className={css.img} />

      <div className={css.favoriteIcon} onClick={handleToggleFavorite}>
        <svg className={`${css.icon} ${isFavorite ? css.active : ''}`}>
          <use
            href={`/images/icons.svg#${
              isFavorite ? 'favorite' : 'not-favorite'
            }`}
          />
        </svg>
      </div>

      <div className={css.headerContainer}>
        <h3 className={css.carTitle}>
          <span className={css.brand}>{car.brand}</span>{' '}
          <span className={css.model}>{car.model}</span>,{' '}
          <span className={css.year}>{car.year}</span>
        </h3>
        <span className={css.price}>${rentalPrice}</span>
      </div>

      <p className={css.mileage}>
        {locationPart} | {rentalCompany} | {car.type} | {formattedMileage}
      </p>

      <NavLink
        to={`/catalog/${id}`}
        className={({ isActive }) =>
          isActive ? `${css.readMoreButton} ${css.active}` : css.readMoreButton
        }
      >
        Read more
      </NavLink>
    </div>
  );
};

export default CarCard;

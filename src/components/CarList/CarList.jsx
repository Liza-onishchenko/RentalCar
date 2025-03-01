import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/favorite/selector.js';
import { toggleFavorite } from '../../redux/favorite/slice.js';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CarList.module.css';

const CarList = ({ cars }) => {
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavorites) || [];

  const handleToggleFavorite = carId => {
    dispatch(toggleFavorite(carId));
  };

  return (
    <div className={css.carList}>
      {Array.isArray(cars) && cars.length > 0 ? (
        cars.map(car => (
          <CarCard
            key={car.id}
            car={car}
            isFavorite={Array.isArray(favorites) && favorites.includes(car.id)} // Додаткова перевірка на масив
            onToggleFavorite={handleToggleFavorite}
          />
        ))
      ) : (
        <p>No cars available.</p>
      )}
    </div>
  );
};

export default CarList;

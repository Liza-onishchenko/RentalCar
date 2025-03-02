import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/favorite/selector.js';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CarList.module.css';

const CarList = ({ cars }) => {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={css.carList}>
      {Array.isArray(cars) && cars.length > 0 ? (
        cars.map(car => (
          <CarCard
            key={car.id}
            car={car}
            isFavorite={favorites.includes(car.id)}
          />
        ))
      ) : (
        <p className={css.noCars}>No cars available.</p>
      )}
    </div>
  );
};

export default CarList;

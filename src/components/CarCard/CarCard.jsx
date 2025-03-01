import css from './CarCard.module.css';

const CarCard = ({ car, isFavorite, onToggleFavorite }) => {
  // Деструктуризація з правильними полями та значеннями за замовчуванням
  const {
    id,
    img = 'https://picsum.photos/300/200', // Використовуємо img замість image
    brand = 'Unknown Brand',
    model = 'Unknown Model',
    year = 'Unknown Year',
    rentalPrice = 'N/A',
    mileage = 0,
    address = 'Unknown Location',
    rentalCompany = 'Unknown Company',
  } = car;

  // Розбиваємо адресу на локацію та країну (якщо є)
  const [locationPart = 'Unknown Location'] = address.split(', ');
  const formattedMileage = car.mileage.toLocaleString();

  return (
    <div className={css.carCard}>
      <img src={img} alt={`${brand} ${model}`} />
      <div className={css.favoriteIcon} onClick={() => onToggleFavorite(id)}>
        {isFavorite ? '❤️' : '🤍'}
      </div>
      <h3 className={css.carTitle}>
        {brand} {model}, {year}
      </h3>
      <p className={css.price}>{rentalPrice}$</p>
      <p className={css.mileage}>
        {locationPart} | {rentalCompany}, {formattedMileage} km
      </p>
      <button
        className={css.readMoreButton}
        onClick={() => onToggleFavorite(id)}
      >
        Read more
      </button>
    </div>
  );
};

export default CarCard;

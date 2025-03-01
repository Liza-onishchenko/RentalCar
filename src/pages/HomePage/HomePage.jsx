import css from './HomePage.module.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className={css.homePage}>
      <div className={css.catalog}>
        <h1 className={css.catalogTitle}>Find your perfect rental car</h1>
        <p className={css.catalogTitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link to="/catalog" className={css.catalogButton}>
          View Catalog
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

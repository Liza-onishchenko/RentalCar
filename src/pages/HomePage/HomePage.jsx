import css from './HomePage.module.css';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className={css.homePage}>
      <div className={css.catalog}>
        <h1 className={css.catalogTitle}>Find your perfect rental car</h1>
        <p className={css.catalogP}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <NavLink to="/catalog" className={css.catalogButton}>
          View Catalog
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;

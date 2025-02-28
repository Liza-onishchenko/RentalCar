import React from 'react';
import css from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        <Link to="/">
          <span className={css.logoRental}>Rental</span>
          <span className={css.logoCar}>Car</span>
        </Link>
      </div>
      <nav className={css.nav}>
        <Link to="/" className={css.navLink}>
          Home
        </Link>
        <Link to="/catalog" className={css.navLink}>
          Catalog
        </Link>
      </nav>
    </header>
  );
}

export default Header;

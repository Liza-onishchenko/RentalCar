import React from 'react';
import css from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import LogoIcon from '../LogoIcon/LogoIcon.jsx';

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        <Link to="/">
          <LogoIcon />
        </Link>
      </div>
      <nav className={css.nav}>
        <Link to="/" className={css.navLink}>
          Home
        </Link>
        <Link to="/catalog" className={css.navLink1}>
          Catalog
        </Link>
      </nav>
    </header>
  );
};

export default Header;

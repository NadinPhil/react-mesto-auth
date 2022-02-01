import React from 'react';
import logo from '../images/Vector.svg';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      {props.location === "/sign-up" && (
        <Link to="/sign-in" className="header__text">
          Войти
        </Link>
      )} 
      {props.location === "/sign-in" && (
        <Link to="/sign-up" className="header__text">
          Зарегистрироваться
        </Link>
      )}
      {props.loggedIn && (
      <p className="header__text">{props.email}              
      <Link to="/sign-in" className="header__email" onClick={props.onLogout}>Выйти</Link></p>
      )}
    </header>
  );
}
export default Header;
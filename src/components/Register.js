import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [values, setValues] = useState({email: "", password: ""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister({ password: values.password, email: values.email  });  
  };

  return (
    <div className="register">
      <p className="register__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="register__input"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          className="register__input"
        />
        <div className="register__button-container">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="register__link"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="register__signup">
        <p>Уже зарегистрированы? <Link to="/sign-in" className="register__login-link"> Войти</Link></p>
      </div>
    </div>
  );
}


export default Register;
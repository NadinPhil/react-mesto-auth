import React, { useState } from "react";

function Login(props) {
  const [values, setValues] = useState({ email: "", password: "", });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSubmit(e){                                        
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    props.onLogin({ password: values.password, email: values.email });
  };

  return (
    <div className="login">
      <p className="login__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="login__input"
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          className="login__input"
        />
        <div className="login__button-container">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="login__link"
          >
            Войти
          </button>
        </div>
      </form>

    </div>
  );

}

export default Login;
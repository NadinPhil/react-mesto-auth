import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
          <button aria-label="Закрыть" type="button" className="popup__button" onClick={props.onClose}></button>
          <form name={`form-${props.name}`} className={`form form_type_${props.name}`}>
              <div className="form__container">
                <h2 className="form__title">{props.title}</h2>
                {props.children}
                <button type="submit" className="form__button" >{props.buttonText}</button>
              </div>
          </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
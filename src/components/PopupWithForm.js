import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
          <button aria-label="Закрыть" type="button" className="popup__button" onClick={props.onClose}></button>
          <form name="form-add" className="form form_type_add" noValidate>
              <div className="form__container">
                <h2 className="form__title">{props.title}</h2>
                {props.children}
              </div>
          </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
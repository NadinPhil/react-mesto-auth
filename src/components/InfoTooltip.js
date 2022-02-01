import React from 'react';
import Union from '../images/Union.png';
import Error from '../images/Error.png';

function InfoTooltip(props) {

  return (
    <>
      <div className={`popup popup_type_register ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
            <button aria-label="Закрыть" type="button" className="popup__button" onClick={props.onClose}></button>
            <form name="form-register" className="form form_type_register">
                <div className="form__container">
                  {props.onInfoTooltip
                  ? (<>
                    <img className="form__img" src={Union}></img>
                    <p className="form__text">Вы успешно зарегистрировались!</p>
                    </>
                  )
                  : (<>
                    <img className="form__img" src={Error}></img>
                    <p className="form__text">Что-то пошло не так! Попробуйте ещё раз.</p>
                    </>
                  )}
                </div>
            </form>
        </div>
      </div>
      </>
  )
}

export default InfoTooltip;
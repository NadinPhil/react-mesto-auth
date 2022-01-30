import React from 'react';
import PopupWithForm from './PopupWithForm.js';



function AddPlacePopup(props) {
  
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
        name: nameRef.current.value,
        link: linkRef.current.value
    });
  } 

    return (
    <>
   <PopupWithForm name="add" title="Новое место" onClose={props.onClose} isOpen={props.isOpen} buttonText={'Создать'} onSubmit={handleSubmit}>
        <label className="popup__label">
          <input ref={nameRef} type="text" name="name" defaultValue="" className="form__input form__input_text_name" required placeholder="Название" id="picture" minLength="2" maxLength="30"/>
          <span id="picture-error" className="error"></span>
          <input ref={linkRef} type="url" name="link" defaultValue="" className="form__input form__input_text_link" required placeholder="Ссылка на картинку" id="link"/>
          <span id="link-error" className="error"></span>
        </label>
      </PopupWithForm>
   </>
    ) 
    
}

export default AddPlacePopup;
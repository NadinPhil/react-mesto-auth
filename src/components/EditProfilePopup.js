import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    
    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser]);  
  
  function handleChangeName(e) {
    setName(e.target.value);
  }
 
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

    return (
    <>
   <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} buttonText={'Сохранить'} onSubmit={handleSubmit}>
        <label className="popup__label">
          <input value={`${name}`} onChange={handleChangeName} type="text" name="name" className="form__input form__input_text_title" required placeholder="Ваше имя" id="name" minLength="2" maxLength="40"></input>
          <span id="name-error" className="error"></span>
          <input value={`${description}`} onChange={handleChangeDescription} type="text" name="about" className="form__input form__input_text_subtitle" required placeholder="Ваша деятельность" id="job" minLength="2" maxLength="200"></input>
          <span id="job-error" className="error"></span>
        </label>
   </PopupWithForm>
   </>
    )
    
    
}

export default EditProfilePopup;
import React, { useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';



function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
}, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" onClose={props.onClose} isOpen={props.isOpen} buttonText={'Сохранить'} onSubmit={handleSubmit}>
      <label className="popup__label">
        <input ref={avatarRef} type="url" name="avatar" defaultValue="" className="form__input form__input_text_link" required placeholder="Ссылка на картинку" id="avatar" />
        <span id="avatar-error" className="error"></span>
      </label>
    </PopupWithForm>
  )

}

export default EditAvatarPopup;
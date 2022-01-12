import '../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  
  // Хук, управляющий внутренним состоянием
 
 const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
 const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
 const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
 const [selectedCard, setSelectedCard] = React.useState({name:'', link:''});
 
 // Обработчики событий: изменяют внутреннее состояние

 function handleEditAvatarClick(){
  setEditAvatarPopupOpen(true)
}
function handleEditProfileClick(){
  setEditProfilePopupOpen(true)
}
function handleAddPlaceClick(){
  setAddPlacePopupOpen(true)
}
function handleCardClick(card){
  setSelectedCard(card)
}
function closeAllPopups(){
  setEditAvatarPopupOpen(false)
  setEditProfilePopupOpen(false)
  setAddPlacePopupOpen(false)
  setSelectedCard({name:'', link:''})
}

  return (
    <div className="page">
      <div className="page__container">
      <Header />
      <Main 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} 
      onEditAvatar={handleEditAvatarClick} 
      onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm name="edit" title="Редактировать профиль" onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} buttonText={'Сохранить'} >
        <label className="popup__label">
          <input type="text" name="name" defaultValue="" className="form__input form__input_text_title" required placeholder="Ваше имя" id="name" minLength="2" maxLength="40"/>
          <span id="name-error" className="error"></span>
          <input type="text" name="about" defaultValue="" className="form__input form__input_text_subtitle" required placeholder="Ваша деятельность" id="job" minLength="2" maxLength="200"/>
          <span id="job-error" className="error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="add" title="Новое место" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} buttonText={'Создать'}>
        <label className="popup__label">
          <input type="text" name="name" defaultValue="" className="form__input form__input_text_name" required placeholder="Название" id="picture" minLength="2" maxLength="30"/>
          <span id="picture-error" className="error"></span>
          <input type="url" name="link" defaultValue="" className="form__input form__input_text_link" required placeholder="Ссылка на картинку" id="link"/>
          <span id="link-error" className="error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="avatar" title="Обновить аватар" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} buttonText={'Сохранить'}>
        <label className="popup__label">
          <input type="url" name="avatar" defaultValue="" className="form__input form__input_text_link" required placeholder="Ссылка на картинку" id="avatar"/>
          <span id="avatar-error" className="error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="delete" title="Вы уверены?" buttonText={'Да'}>
        <label className="popup__label">
        </label>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </div>
    
  );
}
export default App;



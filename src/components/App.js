import '../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  
 const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
 const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
 const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
 const [selectedCard, setSelectedCard] = React.useState({name:'', link:''});
 const [cards, setCards] = React.useState([]);
 
 React.useEffect(() => {
  api.getAllCards()
  .then (cards => {setCards(cards)})
  .catch((err) => console.log(`Ошибка: ${err}`)) 
}, []);

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCardStatus(isLiked, card._id)
  .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
}

function handleCardDelete(card) {
  api.removeCard(card._id)
  .then(() => {
    setCards(cards.filter(item => item._id !== card._id))   
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
}
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
function handleUpdateUser(data){
  api.editUserInfo(data)
  .then ( (dataUser) => { 
    setCurrentUser(dataUser)
  })
  .catch((err) => console.log(`Ошибка: ${err}`)) 
  closeAllPopups()
}

function handleUpdateAvatar(data) {
  api.editUserAvatar(data)
  .then ( (dataUser) => { 
    setCurrentUser(dataUser)
  })
  .catch((err) => console.log(`Ошибка: ${err}`)) 
  closeAllPopups()
}

function handleAddPlaceSubmit(data){
  api.addCard(data)
  .then ( (newCard) => { 
    setCards([newCard, ...cards]); 
  })
  .catch((err) => console.log(`Ошибка: ${err}`)) 
  closeAllPopups()
}


const [currentUser, setCurrentUser] = React.useState({});

React.useEffect((data) => {
  api.getUserInfo(data)
  .then (data => { 
    setCurrentUser(data)
  })
  .catch((err) => console.log(`Ошибка: ${err}`)) 
}, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__container">
      <Header />
      <Main 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} 
      onEditAvatar={handleEditAvatarClick} 
      onCardClick={handleCardClick}
      cards={cards}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
      <PopupWithForm name="delete" title="Вы уверены?" buttonText={'Да'}>
        <label className="popup__label">
        </label>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </div>
    </CurrentUserContext.Provider> 
  );
}
export default App;



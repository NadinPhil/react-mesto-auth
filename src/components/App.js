import '../index.css';
import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Route, Routes, Navigate, useLocation, useNavigate, } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js'
import Login from './Login.js'
import InfoTooltip from './InfoTooltip.js'
import * as auth from "../utils/auth.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [infoTooltip, setInfoTooltip] = React.useState(false);

  useEffect(() => {
    handleTokenCheck('/');
  }, []);

  // проверяем токен пользователя
  function handleTokenCheck(path) {
    if (!loggedIn && localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate(path);
        }
      })
      .catch((err) => {
      console.log(err);
      });
    }
  };

  // вход по логину
  const handleLogin = (data) => {
    auth
      .authorize(data.email, data.password)
      .then((res) => {
        if (res.token) {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setEmail(data.email)
        navigate("/");
        } else {
          setInfoTooltipOpen(true);
          setInfoTooltip(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        setInfoTooltip(false);
      });
  };

  // вход по регистрации
  const handleRegister = (data) => {
    auth
      .register(data.email, data.password)
      .then((res) => {
        if (res.data) {
          setInfoTooltipOpen(true);
          setInfoTooltip(true);
          setTimeout(() => {
            handleLogin({ password: data.password, email: data.email });
            setInfoTooltipOpen(false);
          }, 2000);
        } else {
          setInfoTooltipOpen(true);
          setInfoTooltip(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        setInfoTooltip(false);
      });
  };

  //удаляем пользователя при нажатии на выход, переводим на логин
  const handleLogout = (evt) => {
    evt.preventDefault();
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in')
  }

  // РАБОТА С КАРТОЧКАМИ
  React.useEffect(() => {
    if (loggedIn) {
    api.getAllCards()
      .then(cards => { setCards(cards) })
      .catch((err) => console.log(`Ошибка: ${err}`))}
  }, [loggedIn]);

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
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setInfoTooltipOpen(false)
    setSelectedCard({ name: '', link: '' })
  }
  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((dataUser) => {
        setCurrentUser(dataUser)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then((dataUser) => {
        setCurrentUser(dataUser)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  React.useEffect(() => { 
    Promise.all([ //в Promise.all передаем массив промисов которые нужно выполнить
     api.getUserInfo(),
     api.getAllCards()
 ])
    .then(([user, cards])=>{ //попадаем сюда, когда оба промиса будут выполнены
       setCurrentUser(user)// 
       setCards(cards)        // у нас есть все нужные данные, отрисовываем страницу
     })
     .catch((err)=>{ //попадаем сюда, если один из промисов завершаться ошибкой
       console.log(err);
     })
 }, []) 


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            location={location.pathname}
            email={email}
            onLogout={handleLogout}
            loggedIn={loggedIn} />
          <Routes>
            <Route
              exact path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
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
                </ProtectedRoute>
              }
            />
            <Route exact path="/sign-up" element={<Register onRegister={handleRegister} />} />
            <Route exact path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route exact path="*" element={<Navigate to="/" />} />
          </Routes>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip isOpen={infoTooltipOpen} onClose={closeAllPopups} onInfoTooltip={infoTooltip} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;



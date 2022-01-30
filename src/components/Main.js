import React from 'react';
//import api from '../utils/api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          <div className="profile__edit-container" onClick={props.onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__flex">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
        </div>
        <button type="button" className="profile__add" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="card-list">
          {props.cards.map(card => {
            return (
              <Card
                key={card._id}
                cardName={card.name}
                cardLink={card.link}
                cardLikes={card.likes.length}
                onCardClick={props.onCardClick}
                card={card}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
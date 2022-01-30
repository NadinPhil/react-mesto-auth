import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    //debugger
    const [cards, setCards] = React.useState([]);
    const currentUser = React.useContext(CurrentUserContext);
    
    React.useEffect(() => {
        api.getAllCards()
        .then (data => {
            const cards = data.map(item => {
             return{
               id: item._id,
               link: item.link,
               name: item.name,
               //length: item.likes.length,
               likes: item.likes
             } 
        })
        setCards(cards)
        })
        .catch((err) => console.log(`Ошибка: ${err}`)) 
    }, []);
    
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(isLiked, card.id)
        .then((newCard) => {
            setCards((state) => state.map((c) => c.id === card.id ? newCard : c));
        });
        //debugger
    }
    
    return (
      <>
      <main className="content">
          <section className="profile">
              <div className="profile__avatar-container">
              <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
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
                {cards.map(card => {
                    return(
                    <Card 
                    key={card.id}
                    cardName={card.name}
                    cardLink={card.link}
                    cardLikes={card.likes.length}
                    onCardClick={props.onCardClick}
                    card={card}
                    onCardLike={handleCardLike}
                    />  
                )})}    
              </ul>
          </section>
          <section className="elements-grid"></section>
      </main>
  
      </>
    );
  }
  
  export default Main;
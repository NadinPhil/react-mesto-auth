import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js'

function Main(props) {
    const [userName, setUserName] = React.useState('слон');
    const [userDescription, setuserDescription] = React.useState('окно');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
        .then (data => { 
            setUserName(data.name)
            setuserDescription(data.about)
            setUserAvatar(data.avatar)
        })
        .catch((err) => console.log(`Ошибка: ${err}`)) 
  
        api.getAllCards()
        .then (data => {
            const cards = data.map(item => {
             return{
               id: item._id,
               link: item.link,
               name: item.name,
               likes: item.likes.length
             } 
        })
        setCards(cards)
        })
        .catch((err) => console.log(`Ошибка: ${err}`)) 
    }, []);
    
    
    return (
      <>
      <main className="content">
          <section className="profile">
              <div className="profile__avatar-container">
              <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
              <div className="profile__edit-container" onClick={props.onEditAvatar}></div>
              </div>
              <div className="profile__info">
                  <div className="profile__flex">
                      <h1 className="profile__title">{userName}</h1>
                      <p className="profile__subtitle">{userDescription}</p>
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
                    cardLikes={card.likes}
                    onCardClick={props.onCardClick}
                    card={card}
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
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {
    
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
      }  

    function handleLikeClick() {
        props.onCardLike(props.card);
    } 
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }
    
    const isOwn = props.card.owner._id === currentUser._id; 
    const cardDeleteButtonClassName = `elements-grid__delete${isOwn ? '_active' : ''}`; 
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `elements-grid__like${isLiked ? '_active' : ''}`
    
    return(
        <li className="elements-grid__item">
        <div className="elements-grid__img-container">
            <img className="elements-grid__image" src={props.cardLink} alt={props.cardName} onClick={handleClick}/> 
        </div>
        <button aria-label="Удалить" type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        <div className="elements-grid__text">
            <h2 className="elements-grid__title">{props.cardName}</h2>
            <div className="elements-grid__like-container">
            <button aria-label="Лайк" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <h2 className="elements-grid__like-number">{props.cardLikes}</h2>
            </div>
        </div>
    </li>
    )
    
}

export default Card;
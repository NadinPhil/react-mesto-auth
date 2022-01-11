import React from 'react';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
      }  
      
    return(
        <li className="elements-grid__item">
        <div className="elements-grid__img-container">
            <img className="elements-grid__image" src={props.cardLink} alt={props.cardName} onClick={handleClick}/> 
        </div>
        <button aria-label="Удалить" type="button" className="elements-grid__delete"></button>
        <div className="elements-grid__text">
            <h2 className="elements-grid__title">{props.cardName}</h2>
            <div className="elements-grid__like-container">
            <button aria-label="Лайк" type="button" className="elements-grid__like"></button>
            <h2 className="elements-grid__like-number">{props.cardLike}</h2>
            </div>
        </div>
    </li>
    )
}

export default Card;